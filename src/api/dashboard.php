<?php
header("HTTP/1.1 501 Not Implemented");
include "authentication.php";
function pdo_connect_mysql() {
    // Update the details below with your MySQL details
    $DATABASE_HOST = 'localhost';
    $DATABASE_USER = 'root';
    $DATABASE_PASS = '';
    $DATABASE_NAME = 'phpticket';
    try {
    	return new PDO('mysql:host=' . $DATABASE_HOST . ';dbname=' . $DATABASE_NAME . ';charset=utf8', $DATABASE_USER, $DATABASE_PASS);
    } catch (PDOException $exception) {
    	// If there is an error with the connection, stop the script and display the error.
    	exit('Failed to connect to database!');
    }
}
$member_id = ;
switch ($_GET) {
    case 'watched-history'
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
		date_default_timezone_set('Asia/Kuala_Lumur');
		$date = date("y/m/d");
	
		mysqli_stmt_bind_param($statement,"s",$date);
		read($statement);
		break;		
}
