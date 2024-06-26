<?php
require 'connection.php';
if($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['deletepic'])){
    $username = $_POST['username'];
    removePic($connection,$username);
}
else if($_SERVER['REQUEST_METHOD'] === "POST" && !isset($_FILES['profile_pic'])){
    $username = $_POST['username'];
    if(isset($_POST['deleteRequest'])){
        die(deleteAccount($connection,$username));
    }
    $table = $_POST['table'];
    unset($_POST['table']);
    $request = $_POST["request"];
    unset($_POST['request']);
    if(isset($_POST['password'])){
        $_POST['password'] = password_hash($_POST['password'],PASSWORD_BCRYPT);
    }
    $keys = implode(", ",array_keys($_POST));
    $placeholder = implode(", ",array_fill(0,count(array_keys($_POST)),"?"));
    $types = str_repeat("s",count(array_keys($_POST)));
    $values = [...array_values($_POST)];
    if($request === "insert"){
        $isExists = $connection -> prepare("SELECT username FROM $table WHERE username = ?");
        $isExists -> bind_param('s',$username);
        $isExists -> execute();
        $exists_res = $isExists -> get_result();
        $isExists -> close();
        if($exists_res -> num_rows > 0){ // update query
            unset($_POST['username']);
            $placeholder = implode(" = ?, ",array_keys($_POST))." = ?";
            $query = $connection -> prepare("UPDATE $table SET $placeholder WHERE username = ?");
        }
        else{ // insert query
            $query = $connection -> prepare("INSERT INTO $table ($keys) values($placeholder)");
        }
    }
    $query -> bind_param($types,...$values);
    if($query -> execute()){
        echo "executed";
    }
    else{
        echo "Something went wrong";
    }
    $query -> close();
}
else if($_SERVER['REQUEST_METHOD'] === "POST" && isset($_FILES['profile_pic'])){
    $username = $_POST['username'];
    $profilePic = $_FILES['profile_pic'];
    $uploadDir = '../profile_pictures/';
    if(!$uploadDir){
        mkdir($uploadDir,0755,true);
    }
    $filename = uniqid().'_'.str_replace(' ','',$profilePic['name']);
    $pathToUpload = $uploadDir.$filename;
    if(move_uploaded_file($profilePic['tmp_name'],$pathToUpload)){
        removePic($connection,$username);
        $updatePath = $connection -> prepare("UPDATE personal_info SET profile_pic = ? WHERE username = ?");
        $updatePath -> bind_param("ss",$pathToUpload,$username);
        if($updatePath -> execute()){
            echo "profile picture set!";
        }
        else{
            die("couldn't set profile picture");
        }
    }
    else{
        die("couldn't upload profile picture!");
    }
}
else{
    $user = $_GET['username'];
    $query = $connection -> prepare("SELECT * from personal_info pi LEFT JOIN personal_details pd ON pi.username = pd.username LEFT JOIN bank_id_details bd ON pi.username = bd.username LEFT JOIN academic_details ad ON pi.username = ad.username LEFT JOIN experience_details ed ON pi.username = ed.username LEFT JOIN applications a ON pi.username = a.username WHERE(pi.username = ?)");
    $query -> bind_param("s",$user);
    if($query -> execute()){
        $datas = $query -> get_result();
        if($datas -> num_rows > 0){
            $row = $datas -> fetch_assoc();
            if(isset($_GET['password'])){
                if(password_verify($_GET['password'],$row['password'])){
                    echo json_encode(array('password_verification'=> true));
                }
                else{
                    echo json_encode(array('password_verification'=>false));
                }
            }
            else{
                unset($row['id']);
                unset($row['password']);
                echo json_encode($row);
            }
        }
        else{
            echo json_encode(array('execution_error'=>"User not found!"));
        }
    }
    else{
        echo json_encode(array('execution_error'=>"Something went wrong couldn't fetch data's!"));
    }
    $query -> close();
}

$connection -> close();

function deleteAccount($connection,$user){
    $query = $connection -> prepare("DELETE pi,pd,bd,ad,ed,a from personal_info pi LEFT JOIN personal_details pd ON pi.username = pd.username LEFT JOIN bank_id_details bd ON pi.username = bd.username LEFT JOIN academic_details ad ON pi.username = ad.username LEFT JOIN experience_details ed ON pi.username = ed.username LEFT JOIN applications a ON pi.username = a.username WHERE(pi.username = ?)");
    $query -> bind_param("s",$user);
    if($query -> execute()){
        return true;
    }
    else{
        return false;
    }
    $query -> close();
}

function removePic($connection,$username){
    $isPicExists = $connection -> prepare("SELECT profile_pic from personal_info WHERE username = ?");
    $isPicExists -> bind_param('s',$username);
    if($isPicExists -> execute()){
        $result = $isPicExists -> get_result();
        if($result -> num_rows > 0){
            $row = $result -> fetch_assoc();
            if($row['profile_pic']){
                if(file_exists($row['profile_pic'])){
                    if(unlink($row['profile_pic'])){
                        echo "pic deleted";
                    }
                    else{
                        die("couldn't remove picture");
                    }
                }
                else{
                    echo "file not exist";
                }
            }
        }
    }
    else{
        die("Something went wrong!");
    }
    $isPicExists -> close();
}