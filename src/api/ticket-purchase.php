<?php
include "connection.php";
include "crud.php";

switch ($_GET["action"]) {
  case "get-cinema-list":
    $statement = mysqli_prepare($conn,
            "
                SELECT 
                    Cinema.id, 
                FROM Scheduled_Movie
                JOIN Theater ON Scheduled_Movie.theater_id = Theater.theater_id
                JOIN Cinema ON Theater.cinema_id = Cinema.cinema_id
                WHERE Scheduled_Movie.movie_id = 1 AND
                scheduled_movie_showing_date > '2022-03-08' OR
                scheduled_movie_showing_date = '2022-03-08' AND scheduled_movie_start_time > '14:30:00';
    );
    
    mysqli_stmt_bind_param($statement, "i", $_GET["movie_id"]);
    read($statement);
    
    break;
    
  case "get-date-list":
    $statement = mysqli_prepare($conn,
                SELECT 
                    Scheduled_Movie.ticket_payment_amount,
                FROM Scheduled_Movie
                JOIN Theater ON Scheduled_Movie.theater_id = Theater.theater_id
                JOIN Cinema ON Theater.cinema_id = Cinema.cinema_id
    ");
    
    mysqli_stmt_bind_param($statement, "ii", $_GET["movie_id"], $_GET["cinema_id"]);
    read($statement);
    break;
      
  case "get-time-list":
    $statement = mysqli_prepare($conn,
                  
    ");
    
    mysqli_stmt_bind_param($statement, "id", $_GET["movie_id"], $_GET["scheduled_movie_showing_date"]);
    read($statement);
    break;
      
  case "get-scheduled-list":
    $statement = mysqli_prepare($conn,
                SELECT 
                    
                FROM Scheduled_Movie
                JOIN 
    ");                            
    mysqli_stmt_bind_param($statement, "id", $_GET["movie_id"], $_GET["scheduled_movie_showing_date"], $_GET["scheduled_movie_showing_time"]);
    read($statement);
    break;
      
  case "get-seat":
     $statement = mysqli_prepare($conn,
     ");
    
     mysqli_stmt_bind_param($statement, "i", $_GET["scheduled_movie_id"]);
     read($statement);
     break;
      
}
