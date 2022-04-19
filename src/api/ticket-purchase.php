<?php
include "connection.php";
include "crud.php";
include "authentication.php";

date_default_timezone_set('Asia/Kuala_Lumpur');
$date = date("Y-m-d");
$time = date("G:i:s");

switch ($_GET["action"]) {
  case "get-cinema-list":
    $statement = mysqli_prepare($conn,
            "
                SELECT 
                    Cinema.cinema_id, Cinema.cinema_address
                FROM Scheduled_Movie
                JOIN Theater ON Scheduled_Movie.theater_id = Theater.theater_id
                JOIN Cinema ON Theater.cinema_id = Cinema.cinema_id

                WHERE movie_id = ? AND
                (scheduled_movie_showing_date > ? OR
                scheduled_movie_showing_date = ? AND 
                scheduled_movie_start_time > ?)
                GROUP BY cinema_address
    ");
    
    mysqli_stmt_bind_param($statement, "isss", $_GET["movie-id"], $date, $date, $time);
    read($statement);
    
    break;

  case "get-scheduled-movie":
      $statement = mysqli_prepare($conn,
            "
                SELECT 
                    scheduled_movie_id, scheduled_movie_showing_date, scheduled_movie_start_time
                FROM Scheduled_Movie
                JOIN Theater ON Scheduled_Movie.theater_id = Theater.theater_id
                JOIN Cinema ON Theater.cinema_id = Cinema.cinema_id
                
                WHERE movie_id = ? AND
                Cinema.cinema_id = ? AND
                (scheduled_movie_showing_date > ? OR
                scheduled_movie_showing_date = ? AND
                scheduled_movie_start_time > ?)
      ");
      mysqli_stmt_bind_param($statement, "iisss", $_GET["movie-id"], $_GET["cinema-id"],
                                        $date, $date, $time);
      read($statement);
      break;
      
  case "get-seat":
     $statement = mysqli_prepare($conn,
            "
                SELECT 
                    seat_id, ticket_id
                FROM Seat
                WHERE scheduled_movie_id = ?
                ORDER BY seat_row, seat_column ASC
    ");
    
     mysqli_stmt_bind_param($statement, "i", $_GET["scheduled-movie-id"]);
     read($statement);
     break;
}
