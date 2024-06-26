<?php
require 'connection.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../phpmailer-master/src/Exception.php';
require '../phpmailer-master/src/PHPMailer.php';
require '../phpmailer-master/src/SMTP.php';

date_default_timezone_set('Asia/Kolkata');

clearExpiredOTP(); //clears expired OTP's / day
if($_SERVER['REQUEST_METHOD'] === "POST" && $_POST['field'] === "send_otp"){
    $user = $_POST['username'];
    if(Checklimit($user) === "proceed"){
    $query = $connection -> prepare("SELECT email FROM personal_info WHERE BINARY username = ?");
    $query -> bind_param("s",$user);
    if($query -> execute()){
        $result = $query -> get_result();
        if($result -> num_rows > 0){
            $row = $result -> fetch_assoc();
            $email = $row['email'];
            $otp = createOTP(); //TODO:Should be hashed while storing in the database after sending email
            $expiry_time = date('Y-m-d H:i:s',strtotime('+10 minutes')); //FIXME:Need to reduce the expiry time.
            $store = $connection -> prepare("INSERT INTO otp (username,OTP,expiry_time) VALUES(?,?,?)");
            $store -> bind_param("sss",$user,$otp,$expiry_time);
            if($store -> execute()){
                //TODO:Need to send the mail
                $msg = "<h1>Reset password!</h1>
                            <p>Dear user,<br>&emsp;To reset your account password use $otp as one time password (OTP). Please, Do not share it with anyone. It will be valid for 10 minutes.</p>
                            <h2>$otp</h2>
                        </body>
                        </html>";
                sendMail($email,$msg);
            }
            else{
                echo "Something went wrong";
            }
            $store -> close();
        }
        else{
            echo "user not found";
        }
    }
    else{
        echo "Something went wrong";
    }
    $query -> close();
    }
    else{
        echo Checklimit($user);
    }
}

else if($_SERVER['REQUEST_METHOD'] === "POST" && $_POST['field'] === "verify_otp"){
    $user = $_POST['username'];
    $otp = $_POST['otp'];
    $verify = verifyOTP($user,$otp);
    echo $verify;
}

else if($_SERVER['REQUEST_METHOD'] === "POST" && $_POST['field'] === "change-password"){
    $username = $_POST['username'];
    $new_password = password_hash($_POST['password'],PASSWORD_BCRYPT);
    $query = $connection -> prepare("UPDATE personal_info SET password = ? WHERE id = ?");
    $query -> bind_param("ss",$new_password,$username);
    if($query -> execute()){
        echo "password changed";
    }
    else{
        echo "error while changing password";
    }
    $query -> close();
}

$connection -> close();

function verifyOTP($username,$otp){
    global $connection;
    $current_time = date("Y-m-d H-i-s");
    $verify = $connection -> prepare("SELECT OTP FROM otp WHERE BINARY username = ? AND expiry_time >= ?");
    $verify -> bind_param("ss",$username,$current_time);
    if($verify -> execute()){
        $result = $verify -> get_result();
        if($result -> num_rows > 0){
            while($row = $result -> fetch_assoc()){
                if($row['OTP'] === $otp){
                    $verify -> close();
                    die("verification success");
                }
            }
            die("Invalid OTP");
        }
    }
    $verify -> close();
    die("verification failed");
}

function Checklimit($user){
    global $connection;
    $count_otp = $connection -> prepare("SELECT COUNT(*) AS count from OTP WHERE BINARY username = ?");
    $count_otp -> bind_param("s",$user);
    if($count_otp -> execute()){
        $result = $count_otp -> get_result();
        $row = $result -> fetch_assoc();
        if($row['count'] >= 5){
            die("max limit exeeded");
        }
        die("proceed");
    }
    die("couldn't verify");
}

function createOTP(){
    $code = substr(uniqid(),-5);
    die($code);
}

function clearExpiredOTP(){
    global $connection;
    $max_age = date("Y-m-d");
    $query = $connection -> prepare("DELETE FROM otp WHERE expiry_time < ?");
    $query -> bind_param("s",$max_age);
    $query -> execute();
}

function sendMail($email,$message){
    $mail = new PHPMailer(true);
    try{
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'wolfwarriersolaris@gmail.com';
        $mail->Password   = 'srrqxgcntdccbnlh';
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;                                  

        //Recipients
        $mail->setFrom( "wolfwarriersolaris@gmail.com", "Core Green Softwares");
        $mail->addAddress($email);

        //Content
        $mail->isHTML(true);
        $mail->Subject = "Reset password";
        $mail -> Body = '<html lang="en">
        ';
        $mail -> Body .= '<body>
        <style>
            p{
                margin: .5rem 0;
                font-weight: 400;
                text-align: justify;
            }
            h2{
                text-align: center;
                margin: .5rem 0;
                font-weight: 700;
            }
        </style>';
        $mail -> Body .= $message;
        // Success sent message alert
        if($mail->send()){
            echo "OTP sent";
        }
        else{
            echo "Something went wrong";
        }
    }
    catch(Exception $e){
        echo "Something went wrong ".$e;
    }
}