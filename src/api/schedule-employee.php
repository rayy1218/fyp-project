<?php
include "connection.php";
include "crud.php";

const MAX_ROW = 5, MAX_COL = 8;

switch ($_GET["action"]) {
    case "get-scheduled-movie":
        $statement = mysqli_prepare($conn,
            "
                SELECT
                    Scheduled_Movie.scheduled_movie_id, Scheduled_Movie.scheduled_movie_showing_date, 
                    Scheduled_Movie.scheduled_movie_start_time, Movie.movie_title, Movie.movie_duration
                FROM Scheduled_Movie
                JOIN Movie ON Movie.movie_id = Scheduled_Movie.movie_id
                JOIN Theater ON Theater.theater_id = Scheduled_Movie.theater_id
                JOIN Cinema ON Cinema.cinema_id = Theater.cinema_id AND Cinema.cinema_id = ?
            "
        );

        mysqli_stmt_bind_param($statement, "i", $_GET["cinema-id"]);
        read($statement);

        break;

    case "get-scheduled-movie-data":
        $statement = mysqli_prepare($conn, "
            SELECT cinema_id, cinema_address, theater_id, theater_name, scheduled_movie_showing_date, scheduled_movie_start_time FROM Scheduled_Movie 
            JOIN Theater USING (theater_id)
            JOIN Cinema USING (cinema_id)
            WHERE scheduled_movie_id = ?
        ");

        mysqli_stmt_bind_param($statement, "i", $_GET["scheduled-movie-id"]);

        readFirst($statement);

        break;

    case "get-theater-list":
        $statement = mysqli_prepare($conn, "
            SELECT theater_id, theater_name FROM Theater
            WHERE cinema_id = (
                SELECT C.cinema_id from Scheduled_Movie
                JOIN Theater T on T.theater_id = Scheduled_Movie.theater_id
                JOIN Cinema C on C.cinema_id = T.cinema_id
                WHERE scheduled_movie_id = ?
            )
        ");

        mysqli_stmt_bind_param($statement, "i", $_GET["scheduled-movie-id"]);
        read($statement);

        break;
}

switch($_POST["action"]) {
    case "add-scheduled-movie":
        session_start();
        $statement = mysqli_prepare($conn,
            "
                    SELECT Employee.employee_id FROM Member JOIN Employee 
                    ON Member.member_id = Employee.member_id AND Member.member_username = ?
            ");
        mysqli_stmt_bind_param($statement, "s", $_SESSION["username"]);
        $result = readFirst($statement, true);

        $row = mysqli_fetch_assoc($result);

        if (isset($row["employee_id"])) {
            $statement = mysqli_prepare($conn,
                "
                INSERT INTO Scheduled_Movie(movie_id, theater_id, employee_id, scheduled_movie_showing_date, scheduled_movie_start_time)
                VALUES (?, ?, ?, ?, ?)
            "
            );
            mysqli_stmt_bind_param($statement, "iiiss", $_POST["movie-id"], $_POST["theater-id"], $row["employee_id"], $_POST["date"], $_POST["time"]);
            set($statement);

            $statement = mysqli_prepare($conn, "SELECT scheduled_movie_id FROM Scheduled_Movie ORDER BY scheduled_movie_id DESC LIMIT 1;");
            $result = readFirst($statement, true);
            $row = mysqli_fetch_assoc($result);
            $scheduled_movie_id = $row["scheduled_movie_id"];

            $statement = mysqli_prepare($conn,
                "
                INSERT INTO Seat(scheduled_movie_id, seat_row, seat_column) 
                VALUES (?, ?, ?)
            ");
            for ($row = 1; $row <= MAX_ROW; $row += 1) {
                for ($col = 1; $col <= MAX_COL; $col += 1) {
                    mysqli_stmt_bind_param($statement, "iii", $scheduled_movie_id, $row, $col);
                    set($statement);
                }
            }
        }
        else {
            header("HTTP/1.1 403 Forbidden");
        }
        break;

    case "edit-scheduled-movie":
        session_start();
        $statement = mysqli_prepare($conn,
            "
                    SELECT Employee.employee_id FROM Member JOIN Employee 
                    ON Member.member_id = Employee.member_id AND Member.member_username = ?
            ");
        mysqli_stmt_bind_param($statement, "s", $_SESSION["username"]);
        $result = readFirst($statement, true);

        $row = mysqli_fetch_assoc($result);

        if (isset($row["employee_id"])) {

                $statement = mysqli_prepare($conn, "
                    UPDATE Scheduled_Movie SET theater_id = ?, scheduled_movie_showing_date = ?, scheduled_movie_start_time = ? WHERE scheduled_movie_id = ?
                ");

                mysqli_stmt_bind_param($statement, "issi",
                    $_POST["theater-id"], $_POST["scheduled-movie-showing-date"],
                    $_POST["scheduled-movie-start-time"], $_POST["scheduled-movie-id"]
                );

                update($statement);
        }
        else {
            header("HTTP/1.1 403 Forbidden");
        }

        break;

    case "delete-scheduled-movie":
        session_start();
        $statement = mysqli_prepare($conn,
            "
                    SELECT Employee.employee_id FROM Member JOIN Employee 
                    ON Member.member_id = Employee.member_id AND Member.member_username = ?
            ");
        mysqli_stmt_bind_param($statement, "s", $_SESSION["username"]);
        $result = readFirst($statement, true);

        $row = mysqli_fetch_assoc($result);

        if (isset($row["employee_id"])) {
            $statement = mysqli_prepare($conn,
                "DELETE FROM Seat WHERE scheduled_movie_id = ?"
            );
            mysqli_stmt_bind_param($statement, "i", $_POST["scheduled-movie-id"]);
            delete($statement);

            $statement = mysqli_prepare($conn,
                "DELETE FROM Ticket WHERE scheduled_movie_id = ?"
            );
            mysqli_stmt_bind_param($statement, "i", $_POST["scheduled-movie-id"]);
            delete($statement);

            $statement = mysqli_prepare($conn,
                "DELETE FROM Scheduled_Movie WHERE scheduled_movie_id = ?"
            );
            mysqli_stmt_bind_param($statement, "i", $_POST["scheduled-movie-id"]);
            delete($statement);
        }
        else {
            header("HTTP/1.1 403 Forbidden");
        }

        break;
}