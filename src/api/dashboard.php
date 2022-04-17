<?php
include "connection.php";
include "crud.php";
include "authentication.php";

switch ($_GET) {
    case 'watched-history':
		$statement = mysqli_prepare($conn,"
		SELECT movie_id,movie_title,movie_thumbnail FROM ticket
		JOIN Scheduled_Movie, Member, Movie USING(scheduled_movie_showing_date)
		WHERE member_id = = $member_id LIMIT 9 DESC
		");
		read($statement);
		break;
		
	case 'purchased-ticket':
		$statement = mysqli_prepare($conn,"
		SELECT ticket_id,movie_id,movie_title,movie_thumbnail FROM ticket
		JOIN Scheduled_Movie,Member,Movie USING(ticket_made_date)
		WHERE member_id=$member_id AND ticket_status='paid' OR ticket_status='unpaid' 
		AND scheduled_movie_showing_date >= ? limit 9 DESC;
		");
		date_default_timezone_set('Asia/Kuala_Lumpur');
		$date = date("y-m-d");
	
		mysqli_stmt_bind_param($statement,"s",$date);
		read($statement);
		break;		
}
