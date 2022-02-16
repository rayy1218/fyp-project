<?php
include "connection.php";
include "crud.php";

switch ($_GET["action"]) {
    case "get-movie-list":
        $statement = mysqli_prepare($conn, "SELECT movie_id, movie_title, movie_thumbnail FROM Movie");
        read($statement);
        break;

    case "get-movie-list-employee":
        $statement = mysqli_prepare($conn, "SELECT movie_id, movie_title, movie_duration FROM Movie");
        read($statement);
        break;

    case "get-movie-detail":
        $statement = mysqli_prepare($conn,
            "
                SELECT 
                    movie_title, movie_duration, movie_genre, movie_language, movie_censorship_rating, movie_rating, 
                    movie_description, movie_thumbnail 
                FROM Movie WHERE movie_id = ?"
        );
        mysqli_stmt_bind_param($statement, "i", $_GET["movie-id"]);
        readFirst($statement);
        break;

    case "add-movie":
        $statement = mysqli_prepare($conn,
            "
                INSERT INTO Movie(
                    movie_title, movie_thumbnail, movie_duration, movie_rating, movie_genre, movie_language, 
                    movie_censorship_rating, movie_description
                ) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
        );
        mysqli_stmt_bind_param($statement, "ssisssss",
            $_GET["movie-title"], $_GET["movie-thumbnail"], $_GET["movie-duration"], $_GET["movie-rating"],
            $_GET["movie-genre"], $_GET["movie-language"], $_GET["movie-censor-rating"], $_GET["movie-description"]
        );
        set($statement);
        break;

    case "edit-movie":
        $statement = mysqli_prepare($conn,
            "
                UPDATE Movie SET 
                    movie_title=?, movie_thumbnail=?, movie_duration=?, movie_rating=?, movie_genre=?, movie_language=?, 
                    movie_censorship_rating=?, movie_description=? 
                WHERE movie_id=?"
        );
        mysqli_stmt_bind_param($statement, "ssisssssi",
            $_GET["movie-title"], $_GET["movie-thumbnail"], $_GET["movie-duration"], $_GET["movie-rating"],
            $_GET["movie-genre"], $_GET["movie-language"], $_GET["movie-censor-rating"], $_GET["movie-description"],
            $_GET["movie-id"]
        );
        update($statement);
        break;

    case "delete-movie":
        $statement = mysqli_prepare($conn, "DELETE FROM Movie WHERE movie_id = ?");
        mysqli_stmt_bind_param($statement, "i", $_GET["movie-id"]);
        delete($statement);
        break;
}