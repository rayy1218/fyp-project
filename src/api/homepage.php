<?php
header("HTTP/1.1 501 Not Implemented");
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
    case "promoted-movie":
       //TBD
        break;
	case "recent-movie":
       //return array[9] of object["movie_thumbnail, movie_id, movie_title"] sort by movie_added_time
        
		
		break;
	case "movie-today":
		//return array[9] of object["movie_thumbnail, movie_id, movie_title"] from scheduled movie where movie_showing_date = today
       
        break;
    
}