<?php
header("Access-Control-Allow-Origin:*");
$cont2=$_POST['contact1'];
$pass2=$_POST['password1'];
//developement
$date=$_POST['date'];
$month=$_POST['month'];
$year=$_POST['year'];
$time=$_POST['time'];
$minute=$_POST['minute'];
//developement
$connection=mysqli_connect("localhost","root","","20MER121");
if(!$connection)
{
    echo "Couldn't reach the servers";
    die();
}
else
{
    try{
    $database="SELECT firstname,contact,password FROM student_datas WHERE(contact=$cont2)";//here
    $query=mysqli_query($connection,$database);
    $row=$query->fetch_assoc();
    if($row==null)
    {
        print("Account not found");
    }
    else{
        $verification=password_verify($pass2,$row['password']);
        if($verification==true)
        {
            print("Logged in");
            $username=$row['firstname'];
            //developement
            $sessionUpdate="UPDATE session_table SET date='$date',month='$month',year='$year',time='$time',minute='$minute' WHERE(user='$username')";
            $updateQuery=mysqli_query($connection,$sessionUpdate);
            //developement
        }
        else{
            print("Invalid password");
        }
    }
    }
    catch(Exception $err)
    {
        print("Invalid input");
    }
}
mysqli_close($connection);
?>