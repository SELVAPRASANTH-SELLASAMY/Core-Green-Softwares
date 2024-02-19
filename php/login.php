<?php
require "connection.php";
$username = $_POST['username'];
$password= $_POST['password'];

$getData = $connection -> prepare("SELECT id,username,password from personal_info WHERE BINARY username = ?");
$getData -> bind_param("s",$username);
$getData -> execute();
$data = $getData -> get_result();
// $password_fetched_from_database;
if($data -> num_rows > 0){
    $row = $data -> fetch_assoc();
    $password_fetched_from_database = $row['password'];
    $user_id = $row['id'];
}
else{
    die ("User not found");
}
if(password_verify($password,$password_fetched_from_database)){
    echo $user_id;
}
else{
    echo "Invalid password";
}
$getData -> close();
$connection -> close();