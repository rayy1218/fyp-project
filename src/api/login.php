<?php
include "connection.php";
include "crud.php";
include "email.php";

$action = 0;
if (isset($_POST["action"])) {
    $action = $_POST["action"];
}
else if (isset($_GET["action"])) {
    $action = $_GET["action"];
}

switch ($action) {
    case "login":
        $statement = mysqli_prepare($conn, "SELECT member_username, member_password FROM Member WHERE member_username = ?");
        mysqli_stmt_bind_param($statement, "s", $_POST["username"]);
        $result = readFirst($statement, true);

        $status = 0;
        if (mysqli_num_rows($result) == 0) {
            $status = "username-failure";
        }
        else {
            $row = mysqli_fetch_assoc($result);

            if ($row["member_password"] != $_POST["password"]) {
                $status = "password-failure";
            }
            else {
                session_start();
                $_SESSION["username"] = $_POST["username"];
                $_SESSION["password"] = $_POST["password"];

                $status = "success";
            }
        }

        $ret = new stdClass();
        $ret->status = $status;
        header("Content-Type: application/json");
        echo json_encode($ret);

        break;

    case "register":
        $status = 0;

        if ($_POST["password"] != $_POST["re-password"]) {
            $status = "re-password-failure";
        }
        //TODO: check for forbidden character for status = "password-format-error"
        //else if () {
        //
        //}
        else {
            $statement = mysqli_prepare($conn, "SELECT member_id FROM Member WHERE member_username = ?");
            mysqli_stmt_bind_param($statement, "s", $_POST["username"]);
            $result = readFirst($statement, true);

            if (mysqli_num_rows($result) > 0) {
                $status = "username-failure";
            }
            else {
                $statement = mysqli_prepare($conn,
                    "
                        INSERT INTO Member(member_username, member_password, member_email, member_phone)
                        VALUES (?, ? , ?, ?);
                ");
                mysqli_stmt_bind_param($statement, "ssss", $_POST["username"], $_POST["password"], $_POST["email"], $_POST["phone-num"]);
                set($statement);

                $status = "success";

                $token = "";

                $body = "
                    <p>You have register an account in our website on this E-Mail.</p>
                    <p>If you didn't register the account, please do contact us.</p>
                ";
                email($_POST["email"], "Register", $body);
            }
        }

        $ret["status"] = $status;
        header("Content-Type: application/json");
        echo json_encode($ret);

        break;

    case "get-user-status":
        session_start();
        $status = 0;
        if (!isset($_SESSION["username"])) {
            $status = "guest";
        }
        else {
            $statement = mysqli_prepare($conn,
                "
                    SELECT Employee.employee_id FROM Member JOIN Employee 
                    ON Member.member_id = Employee.member_id AND Member.member_username = ?
            ");
            mysqli_stmt_bind_param($statement, "s", $_SESSION["username"]);
            $result = readFirst($statement, true);

            if (mysqli_num_rows($result) > 0) {
                $status = "employee";
            }
            else {
                $status = "member";
            }
        }

        $ret = new stdClass();
        $ret->status = $status;
        header("Content-Type: application/json");
        echo json_encode($ret);

        break;

    case "logout":
        session_start();

        unset($_SESSION["username"]);
        unset($_SESSION["password"]);

        session_destroy();

        break;

    case "forget-password":
        $statement = mysqli_prepare($conn, "
            SELECT member_email FROM Member WHERE member_username = ?
        ");

        mysqli_stmt_bind_param($statement, "s", $_POST["username"]);
        $result = read($statement, true);
        $row = mysqli_fetch_assoc($result);

        $email = $row["member_email"];

        $ret = new stdClass();
        if (isset($email)) {
            $token = "";

            $char = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for ($i = 0; $i < 16; $i += 1) {
                $token .= $char[rand(0, strlen($char) - 1)];
            }

            $statement = mysqli_prepare($conn, "
                UPDATE Member SET member_reset_password_token = ? WHERE member_username = ?
            ");

            mysqli_stmt_bind_param($statement, "ss", $token, $_POST["username"]);

            update($statement);

            $body = "
                    <p>You have request reset password on our website.</p>
                    <p>Please preceed the reset password on</p> 
                    <p>www.example.com/src/reset-password.html?token=" . $token . "</p>
                    <p>If you didn't request reset password, please do ignore this mail.</p>
                ";
            email($email, "Forget Password", $body);
            $ret->status = "success";
        }
        else {
            $ret->status = "username-failure";
        }
        header("Content-Type: application/json");
        echo json_encode($ret);

    case "reset-password":
        $statement = mysqli_prepare($conn, "SELECT member_id FROM Member WHERE member_reset_password_token = ?");
        mysqli_stmt_bind_param($statement, "s", $_POST["token"]);

        $result = read($statement, true);

        $ret = new stdClass();
        if (mysqli_num_rows($result) > 0) {
            $statement = mysqli_prepare($conn, "UPDATE Member SET member_password = ?, member_reset_password_token = NULL WHERE member_reset_password_token = ?");
            mysqli_stmt_bind_param($statement, "ss", $_POST["password"], $_POST["token"]);

            update($statement);

            $ret->status = "success";
        }
        else {
            $ret->status = "token-failure";
        }

        header("Content-Type: application/json");
        echo json_encode($ret);
}