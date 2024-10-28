<?php

function dbconnect(){
    try{
        $conn = new PDO("sqlite:test.db");
        return $conn;
    }catch(PDOException $e){
        echo $e->getMessage();
    }
}

function get_process($sql){
    $dbcon = dbconnect();
    $rows = $dbcon->query($sql);
    $dbcon = null;
    return $rows;
}

function post_process($sql){
    $dbcon = dbconnect();
    $stmt = $dbcon->prepare($sql);
    $ok = $stmt->execute();
    $dbcon = null;
    return $ok;
}

function get_all_records($table){
    $query = "SELECT * FROM `$table`";
    return get_process($query);
}

function add_record($table,$fields,$data){
    if(count($fields) == count($data)){
        $keys = implode("`,`",$fields);
        $values = implode("','",$data);
        $query = "INSERT INTO `$table` (`$keys`) VALUES ('$values')";
        return post_process($query);
    }
}