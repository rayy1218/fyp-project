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
  case "get-cinema-list": // GET
    $statement = mysqli_prepare($conn,"
    ");
    
    mysqli_stmt_bind_param($statement, "si", $_GET["cinema_address"], $_GET["cinema_id"]);
    read($statement);
    break;
                                
  case "get-theater-list": //GET
    $statement = mysqli_prepare($conn,"
    ");
    
    mysqli_stmt_bind_param($statement, "i", $_GET["cinema_id"]);
    read($statement);
    break;   
    
  case "add-cinema": //POST
    session_start();
    $statement = mysqli_prepare($conn,
        "
                    SELECT Employee.employee_id FROM Member JOIN Employee 
                    ON Member.member_id = Employee.member_id AND Member.member_username = ?
        ");
    
    mysqli_stmt_bind_param($statement, "i", $_GET["cinema_id"]);
    read($statement);
        
        
    break;
    
  case "add-theater": //POST
    $statement = mysqli_prepare($conn,"
    ");
    
    mysqli_stmt_bind_param($statement, "i", $_GET["cinema_id"]);
    read($statement);
    break;
header("HTTP/1.1 501 Not Implemented");
