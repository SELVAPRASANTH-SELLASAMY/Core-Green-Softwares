<?php
require 'connection.php';
if($_SERVER['REQUEST_METHOD'] === "POST"){
    $username = $_POST['username'];
    if(isset($_POST['deleteRequest'])){
        die(deleteAccount($connection,$username));
    }
    $table = $_POST['table'];
    unset($_POST['table']);
    // $id = $_POST['id'];
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
            // echo $placeholder;
            $query = $connection -> prepare("UPDATE $table SET $placeholder WHERE username = ?");
        }
        else{ // insert query
            $query = $connection -> prepare("INSERT INTO $table ($keys) values($placeholder)");
        }
    }
    // if($request === "delete"){
    //     $query = $connection -> prepare("DELETE from $table WHERE id = 1"); //FIXME: id should be dynamic binded value
    // }
    $query -> bind_param($types,...$values);
    if($query -> execute()){
        echo "executed";
        $query -> close();
    }
    else{
        echo "Something went wrong";
    }
}
else{
    $user = $_GET['username'];
    $query = $connection -> prepare("SELECT * from personal_info pi LEFT JOIN personal_details pd ON pi.username = pd.username LEFT JOIN bank_id_details bd ON pi.username = bd.username LEFT JOIN academic_details ad ON pi.username = ad.username LEFT JOIN experience_details ed ON pi.username = ed.username LEFT JOIN applications a ON pi.username = a.username WHERE(pi.username = ?)");
    $query -> bind_param("s",$user);
    if($query -> execute()){
        $datas = $query -> get_result();
        $query -> close();
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
}