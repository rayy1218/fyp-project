<?php
include "connection.php";
include "crud.php";

date_default_timezone_set('Asia/Kuala_Lumpur');
$date = date("y-m-d");
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
                scheduled_movie_showing_date > ? OR
                scheduled_movie_showing_date = ? AND 
                scheduled_movie_start_time > ?
                GROUP BY cinema_address
    ");
    
    mysqli_stmt_bind_param($statement, "isss", $_GET["movie_id"], $date, $date, $time);
    read($statement);
    
    break;

  case "get-scheduled-list":
    $statement = mysqli_prepare($conn,
            "
                SELECT 
                    Scheduled_Movie(scheduled_movie_id, scheduled_showing date, scheduled_start_time)
                FROM Scheduled_Movie
                JOIN Theater ON Scheduled_Movie.theater_id = Theater.theater_id
                JOIN Cinema ON Theater.cinema_id = Cinema.cinema_id
                
                WHERE movie_id = ? AND
                cinema_id = ? AND
                scheduled_movie_showing_date > ? OR
                scheduled_movie_showing_date = ? AND
                scheduled_movie_start_time > ?
    ");                            
    mysqli_stmt_bind_param($statement, "iisss", $_GET["movie_id"], $_GET["cinema_id"], 
                                        $date, $date, $time);
    read($statement);
    break;
      
  case "get-seat":
     $statement = mysqli_prepare($conn,
            "
                SELECT 
                    Seat(seat_id, ticket_id)
                FROM Seat
                Where scheduled_movie_id = ?
                ORDER BY seat_row, seat_column ASC
    ");
    
     mysqli_stmt_bind_param($statement, "i", $_GET["scheduled_movie_id"]);
     read($statement);
     break;
      
}
