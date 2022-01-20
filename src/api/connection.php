<?php
$host="localhost";
$user="root";
$password="";
$dbname="movie-site";

$conn = mysqli_connect($host,$user,$password,$dbname);

// Check connection
if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
}
