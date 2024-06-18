<?php
require "connection.php";
if($_SERVER['REQUEST_METHOD'] === "POST"){
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $degree = $_POST['degree'];
    $stream = $_POST['stream'];
    $email = $_POST['email'];
    $phone_number = $_POST['phone_number'];
    $year_of_passing = $_POST['year_of_passing'];
    $position = $_POST['position'];
    $query = $connection -> prepare("INSERT INTO applications (firstname,lastname,degree,stream,email,phone_number,year_of_passing,position) VALUES(?,?,?,?,?,?,?,?)");
    $query -> bind_param("sssssiis",$firstname,$lastname,$degree,$stream,$email,$phone_number,$year_of_passing,$position);
    if($query -> execute()){
        echo "Applied";
    }
    else{
        echo "Something went wrong";
    }
    $query -> close();
    $connection -> close();
}