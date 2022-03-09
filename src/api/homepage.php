<?php
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
case "recent-movie":
    SELECT movie_thumbnail,movie_id,movie_title FROM Member
	ORDER BY movie_added_time;
    break;
case "movie-today":
    SELECT movie_thumbnail, movie_id, movie_title FROM Member
	ORDER BY  movie_showing_date = today;
    break;
}