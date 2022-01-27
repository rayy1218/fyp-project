<?php
include "connection.php";

switch ($_GET["action"]) {
    case "create":
        $statement = sprintf("INSERT INTO Movie (%s) VALUES (%s);", $_GET["col"], $_GET["values"]);
        mysqli_query($conn, $statement);

        break;

    case "read":
        $statement = "SELECT " . $_GET["col"] . " FROM Movie";
        if (isset($_GET["join"])) {$statement .= " INNER JOIN " . $_GET["join"];}
        if (isset($_GET["join_on"])) {$statement .= " ON " . $_GET["join_on"];}
        if (isset($_GET["condition"])) {$statement .= " WHERE " . $_GET["condition"];}
        $statement .= ";";

        $query_result = mysqli_query($conn, $statement);
        $rows = array();

        while($row = mysqli_fetch_assoc($query_result)) {
            $rows[] = $row;
        }

        echo json_encode($rows);

        break;

    case "update":
        $statement = sprintf("UPDATE Movie SET %s WHERE %s;", $_GET["set"], $_GET["condition"]);
        mysqli_query($conn, $statement);

        break;

    case "delete":
        $statement = sprintf("DELETE FROM Movie WHERE %s;", $_GET["condition"]);
        mysqli_query($conn, $statement);

        break;
}

