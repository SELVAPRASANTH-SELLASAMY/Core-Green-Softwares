<?php
require 'connection.php';
if($_SERVER['REQUEST_METHOD'] === "GET"){
    $query = $connection -> prepare("SELECT pi.*, pi.username as main_username, pd.*, ad.*, ed.*, a.* FROM applications a LEFT JOIN personal_info pi ON a.username = pi.username LEFT JOIN personal_details pd ON a.username = pd.username LEFT JOIN academic_details ad ON a.username = ad.username LEFT JOIN experience_details ed ON a.username = ed.username");
    $response_array = [];
    if($query -> execute()){
        $response = $query -> get_result();
        if($response -> num_rows <= 0){
            die("No applications found!");
        }
        while($row = $response->fetch_assoc()){
            unset($row['password']);
            unset($row['id']);
            unset($row['profile_pic']);
            $row['username'] = $row['main_username'];
            unset($row['main_username']);
            array_push($response_array,$row);
        }
        $encode = json_encode($response_array);
        echo $encode;
    }
    else{
    echo json_encode(array('error' => "Something went wrong"));}
}
else{
    $status = $_POST['status'];
    $username = $_POST['username'];
    if($status === "rejected"){
        $query = $connection -> prepare("DELETE FROM applications WHERE username = ?");
        $query -> bind_param("s",$username);
    }
    else{
        $query = $connection -> prepare("UPDATE applications SET status = ? WHERE username = ?");
        $query -> bind_param("ss",$status,$username);
    }
    if($query -> execute()){
        echo "Updated";
    }
    else{
        "Something went wrong";
    }
}