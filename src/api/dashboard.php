<?php
header("HTTP/1.1 501 Not Implemented");
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

switch ($_GET) {
    case 'watched-history'
       //TBD
    break;
	
	case 'recent-movie':
		//query ticket join scheduled_movie and movie with ticket_status = "watched"
		$stmt = $pdo->prepare('SELECT * FROM tickets WHERE id = ?');
		$stmt->execute([ $_GET['id'] ]);
		$ticket = $stmt->fetch(PDO::FETCH_ASSOC);
		// Check if ticket exists
		if (!$ticket) {
		exit('Invalid ticket ID!');
		//return array[9] of object["movie_thumbnail, movie_id, movie_title"] sort by movie_added_time
		return[movie_thumbnail, movie_id, movie_title];
	break;
		
	case 'purchased-ticket':
		//query ticket join scheduled_movie and movie with ticket_status = "paid"
		//return array[9] of object["movie_thumbnail, movie_id, movie_title"] from scheduled movie where movie_showing_date = today
		return[$movie_thumbnail, $movie_id, $movie_title];
    break;	
}
