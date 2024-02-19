<?php
require "connection.php";
$fullname = $_POST['fullname'];
$contact_number = $_POST['contact'];
$email = $_POST['email'];
$username = $_POST['username'];
$password = password_hash($_POST['password'],PASSWORD_BCRYPT);

$check_username = "SELECT username FROM personal_info";
$fetched_usernames = $connection -> query($check_username);
while($row = $fetched_usernames -> fetch_assoc()){
    if($username === $row['username']){
        die("Username already exists!");
    }
}
$query = $connection -> prepare("INSERT INTO personal_info (fullname,contact_number,email,username,password) VALUES(?,?,?,?,?)");
$query -> bind_param("sisss",$fullname,$contact_number,$email,$username,$password);
if($query -> execute()){
    echo "Signed up successfully!";
}
else{
    echo "Something went wrong!";
}
$query -> close();
$connection -> close();