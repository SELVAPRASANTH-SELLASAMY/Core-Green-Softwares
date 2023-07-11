<?php
header("Access-Control-Allow-Origin:*");
$cont2=$_POST['contact1'];
$pass2=$_POST['password1'];
$date=$_POST['date'];
$month=$_POST['month'];
$year=$_POST['year'];
$time=$_POST['time'];
$minute=$_POST['minute'];
$connection=mysqli_connect("sql202.infinityfree.com","if0_34591954","DuBcFJfFa6icd","20MER121");
if(!$connection)
{
    echo "Couldn't reach the servers";
    die();
}
else
{
    try{
    $database="SELECT firstname,contact,password FROM student_datas WHERE(contact=$cont2)";
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
            $sessionUpdate="UPDATE session_table SET date='$date',month='$month',year='$year',time='$time',minute='$minute' WHERE(user='$username')";
            $updateQuery=mysqli_query($connection,$sessionUpdate);
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
