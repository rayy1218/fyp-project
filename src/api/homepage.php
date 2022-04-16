<?php
include "authentication.php";

header("HTTP/1.1 501 Not Implemented");
$action = 0;
if (isset($_POST["action"])) {
    $action = $_POST["action"];
}
else if (isset($_GET["action"])) {
    $action = $_GET["action"];
}
switch ($action) {
case "promoted-movie":
    //TBD
    break;
	
case "movie-today""recent-movie":
    SELECT TOP 9 movie_thumbnail, movie_id, movie_title FROM Member
	WHERE scheduled_movie_showing_date  = $date("Y/m/d");
    break;
	
case "movie-today":
	$statement = mysqli_prepare($conn,"
    SELECT movie_id,movie_title,movie_thumbnail FROM Scheduled_Movie
	JOIN Movie USING(movie_id)
	WHERE scheduled_movie_showing_date = ? LIMIT 9
	");
	date_default_timezone_set('Asia/Kuala_Lumur');
	$date = date("y/m/d");
	
	mysqli_stmt_bind_param($statement,"s",$date);
	read($statement);
    break;

}