<?php
include "connection.php";
include "crud.php";

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
            mysqli_stmt_bind_param($statement, "iiiss", $_GET["movie-id"], $_GET["theater-id"], $row["employee_id"], $_GET["date"], $_GET["time"]);

            set($statement);
        }
        else {
            header("HTTP/1.1 403 Forbidden");
        }
        break;
}