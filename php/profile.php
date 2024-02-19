<?php
require "connection.php";
if($_SERVER['REQUEST_METHOD'] === "GET"){
    $userId = $_GET['userId'];
    if(!$userId){
        echo "fallback";
        exit();
    }
    $request = $connection -> prepare("SELECT p.fullname,p.contact_number,p.email,p.designation,p.place,p.profile_pic,g.birth_date,g.blood_group,g.marital_status,g.gender,g.languages_known,g.religion,g.nationality,b.bank_name,b.account_number,b.branch,b.ac_holder_name,b.ifsc_code,i.aadhaar,i.pan,i.passport,i.driving_licence FROM personal_info p LEFT JOIN general_info g ON BINARY p.username = BINARY g.username LEFT JOIN bank_info b ON BINARY p.username = BINARY b.username LEFT JOIN id_proof i ON BINARY p.username = BINARY i.username WHERE id = ?");
    $request -> bind_param("s",$userId);
    $request -> execute();
    $fetched_datas = $request -> get_result();
    if($fetched_datas -> num_rows > 0){
        $row = $fetched_datas -> fetch_assoc();
        echo json_encode($row);
    }
    else{
        echo json_encode(array("error" => "Couldn't fetch user datas!"));
    }
    $request -> close();
}
else if($_SERVER['REQUEST_METHOD'] === "POST"){
    //Updating general field
    if($_POST['field'] === "info"){
        $fullname = $_POST['username'];
        $designation = $_POST['designation'];
        $resident = $_POST['resident'];
        $email = $_POST['email'];
        $contact = $_POST['contact'];
        $user = $_POST['user'];
        $request = $connection -> prepare("UPDATE personal_info SET fullname=?,designation=?,place=?,email=?,contact_number=? WHERE BINARY username=?");
        $request -> bind_param("ssssis",$fullname,$designation,$resident,$email,$contact,$user);
        if($request->execute()){
            echo "Data's updated!";
        }
        else{
            echo "Something went wrong!";
        }
        $request -> close();
    }
    //updating personal info field
    else if($_POST['field'] === "personal_info"){
        $user = $_POST['user'];
        $dob = $_POST['dob'];
        $blood_group = $_POST['bloodgroup'];
        $marital_status = $_POST['marital_status'];
        $gender = $_POST['gender'];
        $languages = $_POST['languages_known'];
        $religion = $_POST['religion'];
        $nationality = $_POST['nationality'];
        
        $check_user_availability = $connection -> prepare("SELECT username FROM general_info WHERE BINARY username=?");
        $check_user_availability -> bind_param("s",$user);
        $check_user_availability -> execute();
        $result = $check_user_availability -> get_result();
        if($result -> num_rows > 0){
            //update
            $query = $connection -> prepare("UPDATE general_info SET birth_date=?,blood_group=?,marital_status=?,gender=?,languages_known=?,religion=?,nationality=? WHERE BINARY username=?");
            $query -> bind_param("ssssssss",$dob,$blood_group,$marital_status,$gender,$languages,$religion,$nationality,$user);
            if($query -> execute()){
                echo "Updated General info!";
            }
            else{
                echo "Something went wrong!";
            }
            $query -> close();
        }
        else{
            //insert
            $query = $connection -> prepare("INSERT INTO general_info (username,birth_date,blood_group,marital_status,gender,languages_known,religion,nationality) VALUES(?,?,?,?,?,?,?,?)");
            $query -> bind_param("ssssssss",$user,$dob,$blood_group,$marital_status,$gender,$languages,$religion,$nationality);
            if($query -> execute()){
                echo "Inserted in General info!";
            }
            else{
                echo "Something went wrong!";
            }
            $query -> close();
        }
        $check_user_availability -> close();
    }
    else if($_POST['field'] === "bank_info"){
        $user = $_POST['user'];
        $bankName = $_POST['bank_name'];
        $accountNumber = $_POST['ac_num'];
        $branch = $_POST['branch'];
        $accountHolderName = $_POST['account_holder'];
        $ifsc = $_POST['ifsc'];
        $check_data_availability = $connection -> prepare("SELECT username FROM bank_info WHERE BINARY username = ?");
        $check_data_availability -> bind_param("s",$user);
        $check_data_availability -> execute();
        $result = $check_data_availability -> get_result();
        if($result -> num_rows > 0){
            //Update
            $query = $connection -> prepare("UPDATE bank_info SET bank_name=?,account_number=?,branch=?,ac_holder_name=?,ifsc_code=? WHERE BINARY username=?");
            $query -> bind_param("ssssss",$bankName,$accountNumber,$branch,$accountHolderName,$ifsc,$user);
            if($query -> execute()){
                echo "Updated bank info!";
            }
            else{
                echo "Something went wrong!";
            }
            $query -> close();
        }
        else{
            //Insert
            $query = $connection -> prepare("INSERT INTO bank_info (username,bank_name,account_number,branch,ac_holder_name,ifsc_code) VALUES(?,?,?,?,?,?)");
            $query -> bind_param("ssssss",$user,$bankName,$accountNumber,$branch,$accountHolderName,$ifsc);
            if($query -> execute()){
                echo "Inserted in bank info!";
            }
            else{
                echo "Something went wrong!";
            }
            $query -> close();
        }
        $check_data_availability -> close();
    }
    else if($_POST['field'] === "id_proof"){
        $user = $_POST['user'];
        $aadhaar = $_POST['aadhaar'];
        $pan = $_POST['pan'];
        $passport = $_POST['passport'];
        $driving_licence = $_POST['driving_licence'];
        $check_data_availability = $connection -> prepare("SELECT username from id_proof WHERE BINARY username=?");
        $check_data_availability -> bind_param("s",$user);
        $check_data_availability -> execute();
        $result = $check_data_availability -> get_result();
        if($result -> num_rows > 0){
            //Update
            $query = $connection -> prepare("UPDATE id_proof SET aadhaar=?,pan=?,passport=?,driving_licence=? WHERE BINARY username=?");
            $query -> bind_param("sssss",$aadhaar,$pan,$passport,$driving_licence,$user);
            if($query -> execute()){
                echo "Updated id_proof!";
            }
            else{
                echo "Something went wrong!";
            }
            $query -> close();
        }
        else{
            //Insert
            $query = $connection -> prepare("INSERT INTO id_proof (username,aadhaar,pan,passport,driving_licence) VALUES(?,?,?,?,?)");
            $query -> bind_param("sisss",$user,$aadhaar,$pan,$passport,$driving_licence);
            if($query -> execute()){
                echo "Inserted in id_proof!";
            }
            else{
                echo "Something went wrong!";
            }
            $query -> close();
        }
        $check_data_availability -> close();
    }
    else if($_POST['field'] === "password_change_verification"){
        $userId = $_POST['userId'];
        $current_password = $_POST['cpw'];
        $query = $connection -> prepare("SELECT password FROM personal_info WHERE id = ?");
        $query -> bind_param("s",$userId);
        $query -> execute();
        $result = $query -> get_result();
        if($result -> num_rows > 0){
            $row = $result -> fetch_assoc();
            if(password_verify($current_password,$row['password'])){
                echo "accepted";
            }
            else{
                echo "Invalid password!";
            }
        }
        else{
            echo "Something went wrong!";
        }
        $query -> close();
    }
    else if($_POST['field'] === "change_password"){
        $userId = $_POST['userId'];
        $new_password = password_hash($_POST['npw'],PASSWORD_BCRYPT);
        $query = $connection -> prepare("UPDATE personal_info SET password = ? WHERE id = ?");
        $query -> bind_param("ss",$new_password,$userId);
        if($query -> execute()){
            echo "password changed";
        }
        else{
            echo "error while changing password";
        }
        $query -> close();
    }
    else if($_POST['field'] === "account_deletion"){
        $userId = $_POST['user_id'];
        $password = $_POST['password'];
        $verify = $connection -> prepare("SELECT password FROM personal_info WHERE id = ?");
        $verify -> bind_param("s",$userId);
        if($verify -> execute()){
            $res = $verify -> get_result();
            $row = $res -> fetch_assoc();
            if(password_verify($password,$row["password"])){
                $query = $connection -> prepare("DELETE p,g,b,i FROM personal_info p LEFT JOIN general_info g ON BINARY p.username = BINARY g.username LEFT JOIN bank_info b ON BINARY p.username = BINARY b.username LEFT JOIN id_proof i ON BINARY p.username = BINARY i.username WHERE id = ?");
                $query -> bind_param("s",$userId);
                if($query -> execute()){
                    echo "account deleted";
                }
                else{
                    echo "couldn't delete account";
                }
                $query -> close();
            }
            else{
                echo "invalid password";
            }
        }
        else{
            echo "something went wrong";
        }
        $verify -> close();
    }
    else if($_POST['field'] === "upload_profile_pic" && isset($_FILES['image'])){
        $userId = $_POST['userId'];
        $pic = $_FILES['image'];
        $uploadDir = '../profile_pictures/';
        if(!is_dir($uploadDir)){
            mkdir($uploadDir,0755,true);
        }
        $filename = uniqid().'_'.$pic['name'];
        $path = $uploadDir.$filename;
        if(move_uploaded_file($pic['tmp_name'],$path)){
            $check_existing_pic = $connection -> prepare("SELECT profile_pic FROM personal_info WHERE id = ?");
            $check_existing_pic -> bind_param("s",$userId);
            if($check_existing_pic -> execute()){
                $result = $check_existing_pic -> get_result();
                if($result -> num_rows > 0){
                    $row = $result -> fetch_assoc();
                    delete_pic($row['profile_pic']);
                }
            }
            else{
                die("something went wrong");
            }
            $check_existing_pic -> close();
            $query = $connection -> prepare("UPDATE personal_info SET profile_pic = ? WHERE id = ?");
            $query -> bind_param("ss",$path,$userId);
            if($query -> execute()){
                echo "profile picture set";
            }
            else{
                echo "something went wrong";
            }
            $query -> close();
        }
        else{
            echo "couldn't upload image";
        }
    }
    else if($_POST['field'] === "delete_profile_pic"){
        $userId = $_POST['userId'];
        $pic_path = $_POST['pic'];
        $query = $connection -> prepare("UPDATE personal_info SET profile_pic = null WHERE id = ?");
        $query -> bind_param("s",$userId);
        if($query -> execute()){
            delete_pic($pic_path);
        }
        else{
            echo "something went wrong";
        }
        $query -> close();
    }
}
$connection -> close();

function delete_pic($path){
    if(file_exists($path)){
        if(unlink($path)){
            echo "pic deleted";
        }
        else{
            echo "couldn't delete pic";
        }
    }
    else{
        echo "file not exists";
    }
}