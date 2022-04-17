<?php
include "connection.php";
include "crud.php";
include "authentication.php";

switch ($_GET) {
    case 'watched-history':
		$statement = mysqli_prepare($conn,"
            SELECT movie_id, movie_title, movie_thumbnail FROM Ticket
            JOIN Scheduled_Movie USING (scheduled_movie_id)
            JOIN Member USING (member_id)
            JOIN Movie USING (movie_id)
            WHERE member_id = ? ORDER BY scheduled_movie_showing_date DESC LIMIT 9;
		");

        mysqli_stmt_bind_param($statement,"is",$member_id, $date);
		read($statement);
		break;
		
	case 'purchased-ticket':
		$statement = mysqli_prepare($conn,"
            SELECT ticket_id, movie_id, movie_title, movie_thumbnail FROM Ticket
            JOIN Scheduled_Movie USING (scheduled_movie_id)
            JOIN Member USING (member_id)
            JOIN Movie USING (movie_id)
            WHERE member_id = ? AND ticket_status = 'paid' OR ticket_status = 'unpaid' 
            AND scheduled_movie_showing_date >= ? ORDER BY ticket_made_date DESC LIMIT 9;
		");
		date_default_timezone_set('Asia/Kuala_Lumpur');
		$date = date("y-m-d");
	
		mysqli_stmt_bind_param($statement,"is",$member_id, $date);
		read($statement);
		break;		
}
