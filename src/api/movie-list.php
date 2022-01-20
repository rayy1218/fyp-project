<?php
include "connection.php";

$query_result = mysqli_query($conn, "SELECT movie_id, movie_title, movie_thumbnail FROM movie");
$rows = array();
while($row = mysqli_fetch_assoc($query_result)) {
    $rows[] = $row;
}

echo json_encode($rows);