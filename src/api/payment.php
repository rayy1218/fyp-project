<?php
include "connection.php";
include "crud.php";

$action = 0;
if (isset($_POST["action"])) {
    $action = $_POST["action"];
}
else if (isset($_GET["action"])) {
    $action = $_GET["action"];
}

switch ($action) {
  case "get-summary": // GET
    $statement = mysqli_prepare($conn,
        "
            SELECT 
              Movie.movie_title, Seat.seat_id,
              Ticket.ticket_adult_num, Ticket.ticket_child_elder_num, Ticket.ticket_student_num, Ticket.ticket_payment_amount
            FROM Ticket
            JOIN Seat ON Seat.seat_id = Ticket.ticket_id
            JOIN Scheduled_Movie ON Scheduled_Movie.
              
        "
    );
        
    mysqli_stmt_bind_param($statement, "ssiiif", $_GET["movie_title"], $_GET["seat_str"], $_GET["adult_num"], $_GET["child_elder_num"], $_GET["student_num"], $_GET["ticket_payment_amount"]);
    readFirst($statement);
    break;
      
  case "set-ticket": // POST
    $statement = mysqli_prepare($conn, 
        "
            SELECT 
              Scheduled_Movie.scheduled_movie_id, Seat.seat_id,
              Ticket.ticket_adult_num, Ticket.ticket_child_elder_num, Ticket.ticket_student_num
            FROM Member 
            WHERE member_username = ?
         ");
    mysqli_stmt_bind_param($statement, "i", $_POST["ticket_id"])
    session_start();
    
    
    break;
}
header("HTTP/1.1 501 Not Implemented");

