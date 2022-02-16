<?php

function read($prepared_statement) {
    header("Content-Type: application/json");
    mysqli_stmt_execute($prepared_statement);
    $query_result = mysqli_stmt_get_result($prepared_statement);

    $rows = array();

    while($row = mysqli_fetch_assoc($query_result)) {
        $rows[] = $row;
    }

    echo json_encode($rows);
}

function readFirst($prepared_statement) {
    header("Content-Type: application/json");
    mysqli_stmt_execute($prepared_statement);
    $query_result = mysqli_stmt_get_result($prepared_statement);

    $row = mysqli_fetch_assoc($query_result);

    echo json_encode($row);
}

function set($prepared_statement) {
    header("HTTP/1.1 201 Created");
    mysqli_stmt_execute($prepared_statement);
}

function update($prepared_statement) {
    header("HTTP/1.1 202 Accepted");
    mysqli_stmt_execute($prepared_statement);
}

function delete($prepared_statement) {
    header("HTTP/1.1 202 Accepted");
    mysqli_stmt_execute($prepared_statement);
}
