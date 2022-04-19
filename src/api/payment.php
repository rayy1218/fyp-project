<?php
include "connection.php";
include "crud.php";
include "global.php";

$action = 0;
if (isset($_POST["action"])) {
    $action = $_POST["action"];
}
else if (isset($_GET["action"])) {
    $action = $_GET["action"];
}

session_start();

$statement = mysqli_prepare($conn, "
    SELECT member_id FROM Member WHERE member_username = ?
");
mysqli_stmt_bind_param($statement, "s", $_SESSION["username"]);
$result = readFirst($statement, true);
$row = mysqli_fetch_assoc($result);
$member_id = $row["member_id"];

date_default_timezone_set('Asia/Kuala_Lumpur');
$date = date("y-m-d");
$time = date("G:i:s");

switch ($action) {
    case "get-summary": // GET
        if (!isset($_SESSION["username"])) {
            $ret = new stdClass();
            $ret->status = "Authentication Failed";

            header("HTTP/1.1 401 Unauthorized");
            echo json_encode($ret);
        }

        $statement = mysqli_prepare($conn, "SELECT seat_row, seat_column FROM Seat WHERE ticket_id = ?");
        $seats = array();
        mysqli_stmt_bind_param($statement, "i", $_GET["ticket-id"]);
        $result = readFirst($statement, true);
        while ($row = mysqli_fetch_assoc($result)) {
            $seats[] = $row;
        }

        $statement = mysqli_prepare($conn, "
            SELECT ticket_adult_num, ticket_child_elder_num, ticket_student_num, ticket_payment_amount, Movie.movie_title 
            FROM Ticket JOIN Scheduled_Movie USING (scheduled_movie_id) JOIN Movie USING (movie_id) WHERE ticket_id = ?
        ");
        mysqli_stmt_bind_param($statement, "i", $_GET["ticket-id"]);
        $result = readFirst($statement, true);
        $row = mysqli_fetch_assoc($result);
        $ticket = $row;

        $ret = new stdClass();
        $ret->seats = $seats;
        $ret->ticket = $ticket;

        header("Content-Type: application/json");
        echo json_encode($ret);

        break;
      
    case "set-ticket": // POST
        if (!isset($_SESSION["username"])) {
            $ret = new stdClass();
            $ret->status = "Authentication Failed";

            header("HTTP/1.1 401 Unauthorized");
            echo json_encode($ret);
        }

        $statement = mysqli_prepare($conn, "
            INSERT INTO Ticket(scheduled_movie_id, ticket_adult_num, ticket_child_elder_num, ticket_student_num, 
                               member_id, ticket_made_date, ticket_made_time, ticket_status, ticket_payment_amount)
            VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        ");

        $payment =
            (int)$_POST["adult-num"] * ADULT_TICKET_PRICE +
            (int)$_POST["child-elder-num"] * CHILD_ELDER_TICKET_PRICE +
            (int)$_POST["student-num"] * STUDENT_PRICE;

        $ticket_status = "unpaid";

        mysqli_stmt_bind_param($statement, "iiiiisssi",
            $_POST["scheduled-movie-id"], $_POST["adult-num"], $_POST["child-elder-num"], $_POST["student-num"],
            $member_id, $date, $time, $ticket_status, $payment
        );

        set($statement);

        $statement = mysqli_prepare($conn, "SELECT ticket_id FROM Ticket ORDER BY ticket_id DESC LIMIT 1");

        $result = readFirst($statement, true);
        $row = mysqli_fetch_assoc($result);
        $ticket_id = $row["ticket_id"];

        $statement = mysqli_prepare($conn, "UPDATE Seat SET ticket_id = ? WHERE scheduled_movie_id = ? AND seat_id = ?");
        for ($i = 0; $i < count($_POST["seat-ids"]); $i += 1) {
            mysqli_stmt_bind_param($statement, "iii", $ticket_id, $_POST["scheduled-movie-id"], $_POST["seat-ids"][$i]);
            update($statement);
        }

        $ret = new stdClass();
        $ret->ticket_id = $ticket_id;

        header("Content-Type: application/json");
        echo json_encode($ret);

        break;

    case "pay-ticket":
        if ($_POST["token"] == PAYMENT_TOKEN) {
            $token = "";

            $char = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for ($i = 0; $i < 16; $i += 1) {
                $token .= $char[rand(0, strlen($char) - 1)];
            }

            $statement = mysqli_prepare($conn, "UPDATE Ticket SET ticket_status = 'paid', ticket_token = ? WHERE ticket_id = ?");

            mysqli_stmt_bind_param($statement, "si", $token, $_POST["id"]);
            update($statement);

            echo "success";
        }
        else {
            header("HTTP/1.1 403 Forbidden");
        }

        break;

    case "use-ticket":
        $statement = mysqli_prepare($conn, "SELECT ticket_id, ticket_status FROM Ticket WHERE ticket_token = ?");

        mysqli_stmt_bind_param($statement, "s", $_GET["token"]);
        $result = read($statement, true);
        $row = mysqli_fetch_assoc($result);

        if ($row["ticket_status"] == "paid") {
            $statement = mysqli_prepare($conn, "UPDATE Ticket SET ticket_status = 'watched' WHERE ticket_id = ?");
            mysqli_stmt_bind_param($statement, "i", $row["ticket_id"]);

            update($statement);
        }

        $ret = new stdClass();
        $ret->ticket_status = $row["ticket_status"];
        header("Content-Type: application/json");
        echo json_encode($ret);
        break;
}


