<?php
header("HTTP/1.1 501 Not Implemented");
include "connection.php";
include "crud.php";

switch ($_GET["action"]) {
    case "promoted-movie":
       //TBD
        break;
	case "recent-movie":
		//return array[9] of object["movie_thumbnail, movie_id, movie_title"] sort by movie_added_time
		return[movie_thumbnail, movie_id, movie_title];
	break;
		
	case "movie-today":
		//return array[9] of object["movie_thumbnail, movie_id, movie_title"] from scheduled movie where movie_showing_date = today
		return[$movie_thumbnail, $movie_id, $movie_title];
    break;
    
}
?>