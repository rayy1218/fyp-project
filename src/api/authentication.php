<?php

include_once "connection.php";
include_once "crud.php";

session_start();
if (!isset($_SESSION["username"])) {
    $ret = new stdClass();
    $ret->status = "Authentication Failed";

    header("HTTP/1.1 401 Unauthorized");
    echo json_encode($ret);
}

$statement = mysqli_prepare($conn, "
    SELECT member_id FROM Member WHERE member_username = ?
");
mysqli_stmt_bind_param($statement, "s", $_SESSION["username"]);
$result = readFirst($statement, true);
$row = mysqli_fetch_assoc($result);
$member_id = $row["member_id"];

