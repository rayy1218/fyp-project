<?php
include "connection.php";
include "crud.php";

switch ($_GET["action"]) {
    case "get-receipt":
        $statement = mysqli_prepare($conn,
            "
                SELECT Ticket.ticket_payment_amount, Ticket.ticket_adult_num, Ticket.ticket_child_elder_num, Ticket.ticket_student_num,
                       Ticket.ticket_token,
                       Movie.movie_censorship_rating, Movie.movie_title,
                       Scheduled_Movie.scheduled_movie_showing_date, Scheduled_Movie.scheduled_movie_start_time,
                       Member.member_username, Theater.theater_name, Cinema.cinema_address
                FROM Ticket
                JOIN Scheduled_Movie ON Ticket.scheduled_movie_id = Scheduled_Movie.scheduled_movie_id
                JOIN Movie ON Scheduled_Movie.movie_id = Movie.movie_id
                JOIN Theater ON Scheduled_Movie.theater_id = Theater.theater_id
                JOIN Cinema ON Theater.cinema_id = Cinema.cinema_id
                JOIN Member ON Ticket.member_id = Member.member_id
        ");

        mysqli_stmt_bind_param($statement, "i", $_GET["ticket-id"]);
        readFirst($statement);
        break;

    case "send-email":
        $statement = mysqli_prepare($conn,
            "
                SELECT Member.member_email FROM Ticket
                JOIN Member ON Ticket.ticket_id = ? AND Ticket.member_id = ?
            ");
        mysqli_stmt_bind_param($statement, "i", $_GET["ticket-id"]);
        $result = readFirst($statment, true);

        $row = mysqli_fetch_assoc($result);
        $to = $row["member_email"];
        $subject="Ticket Purchase";
        $from="Cinema Website";

        $header =
            "MIME-Version: 1.0\r\n" .
            "Content-Type: text/html\r\n" .
            "From: " . $from . "\r\n" .
            "Reply-To: " . $from . "\r\n" .
            "X-Mailer: PHP/" . phpversion() . "\r\n"
        ;

        $href = "localhost/src/receipt.html?action=get-receipt&ticket-id=" . $_GET["ticket-id"];
        $msg = "
            <html>
              <body>
                <h1>Movie Ticket</h1>
                <p>You have purchase a ticket at our website, check <a href='". $href ."'>here</a> to check the ticket detail</p>
              </body>
            </html>
        ";

        mail($to, $subject, $msg, $header);

        break;
}

