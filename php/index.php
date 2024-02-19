<?php
require "connection.php";
if($_SERVER['REQUEST_METHOD'] === "POST"){
    $name = $_POST['name'] !== ' ' ? $_POST['name'] : "unknown";
    $email = $_POST['email'] !== '' ? $_POST['email'] : "unknown";
    $contact = $_POST['contact_number'] !== '' ? $_POST['contact_number'] : "unknown";
    $message = $_POST['message'] !== '' ? $_POST['message'] : "unknown";
    $query = $connection -> prepare("INSERT INTO query (name,email,contact_number,message) VALUES(?,?,?,?)");
    $query -> bind_param("ssis",$name,$email,$contact,$message);
    if($query -> execute()){
        echo "success";
    }
    else{
        echo "Something went wrong";
    }
    $query -> close();
    $connection -> close();
}