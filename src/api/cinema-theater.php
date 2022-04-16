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
    case "get-cinema-list":
        $statement = mysqli_prepare($conn, "SELECT cinema_id, cinema_address FROM Cinema");
        read($statement);
        break;

    case "get-theater-list":
        $statement = mysqli_prepare($conn,
            "
            SELECT
            Theater.theater_id, Theater.theater_name
            FROM Theater
            WHERE cinema_id = ?
    ");

        mysqli_stmt_bind_param($statement, "i", $_GET["cinema_id"]);
        read($statement);
        break;

    case "add-cinema":
        $statement = mysqli_prepare($conn,
            "
            INSERT INTO Cinema(cinema_address, cinema_status)
            VALUES(?, 'on')
    ");
    
    mysqli_stmt_bind_param($statement, "s", $_GET["cinema_address"]);
    set($statement);
    break;

    case "add-theater":
        $statement = mysqli_prepare($conn,
            "
        INSERT INTO Theater(theater_name, theater_status, cinema_id) VALUES (?, 'on', ?)
    ");
    
    mysqli_stmt_bind_param($statement, "si", $_GET["theater_name"], $_GET["cinema_id"]);
    set($statement);
    break;
}
