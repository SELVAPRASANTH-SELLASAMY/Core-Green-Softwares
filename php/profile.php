<?php
header('Access-Control-Allow-Origin:*');
if(isset($_POST['request']))
{
    if($_POST['request']=="getData"){
        $primarySelector=$_POST['key'];
        $connection=mysqli_connect('localhost','root','','20MER121');
        if(!$connection)
        {
            die("couldn't reach the servers");
        }
        $database="SELECT id,firstname,lastname,roll_no,DOB,contact FROM student_datas WHERE(contact=$primarySelector)";
        $query=mysqli_query($connection,$database);
        while($row=$query->fetch_assoc())
        {
            if($row!=null)
            {
                $encode=json_encode($row);
                echo $encode;
            }
        }
        mysqli_close($connection);
    }
    if($_POST['request']=="update")
    {
        $requestFor=$_POST['PrimaryId'];
        $fname=$_POST['fname'];
        $lname=$_POST['lname'];
        $rno=$_POST['rno'];
        $dob=$_POST['dob'];
        $cont=$_POST['cont'];
        $older=$_POST['previous_contact'];
        $contChangeRequest=$_POST['reqChangeCont'];
        $connection1=mysqli_connect('localhost','root','','20MER121');
        if(!$connection1){
            die("couldn't reach the servers");
        }
        $verifyContact="SELECT contact FROM student_datas";
        $verifying=mysqli_query($connection1,$verifyContact);
        while($row=$verifying->fetch_assoc())
        {
            if($row['contact']==$cont)
            {
                $cont=$older;
            }
        }
        $updateRequest="UPDATE student_datas SET firstname='$fname',lastname='$lname',roll_no='$rno',DOB='$dob',contact='$cont' WHERE(id=$requestFor)";
        $query1=mysqli_query($connection1,$updateRequest);
        if($query1==1)
        {
            if($contChangeRequest==1){
                if($cont==$older){
                    echo 'This phone number already has an account use a different number';
                }
                else{
                    echo "Changes saved successfully";
                }
            }
            else{
                echo "Changes saved successfully";
            }
        }
        else{
            echo "Changes can't be done";
        }
        mysqli_close($connection1);
    }
    if($_POST['request']=="updatePassword")
    {
        $From=$_POST['getFrom'];
        $currentPassword=$_POST['current'];
        $newOne=$_POST['newpassword'];
        $connection2=mysqli_connect('localhost','root','','20MER121');
        if(!$connection2)
        {
            die("couldn't reach the servers");
        }
        $verify="SELECT password from student_datas WHERE(contact=$From)";
        $run=mysqli_query($connection2,$verify);
        $res=$run->fetch_assoc();
        if($currentPassword == $res['password'])
        {
            $change="UPDATE student_datas SET password='$newOne' WHERE(contact=$From)";
            $changing=mysqli_query($connection2,$change);
            if($changing==1){
                echo "password changed successfully";
            }
            else{
                echo "Something went wrong";
            }
        }
        else{
            echo "Invalid password";
        }
        mysqli_close($connection2);
    }
    if($_POST['request']=="delete")
    {
        $account=$_POST['account'];
        $password=$_POST['password'];
        $connection3=mysqli_connect('localhost','root','','20MER121');
        if(!$connection3){
            die("couldn't reach the servers");
        }
        $verify="SELECT password FROM student_datas WHERE(contact=$account)";
        $check=mysqli_query($connection3,$verify);
        $dt=$check->fetch_assoc();
        if($password==$dt['password']){
            $deleteQuery="DELETE FROM student_datas WHERE(contact=$account)";
            $runQuery=mysqli_query($connection3,$deleteQuery);
            if($runQuery==1)
            {
                echo 'Account deleted successfully';
            }
            else{
                echo 'Something went wrong';
            }
        }
        else{
            echo 'Invalid password';
        }
        mysqli_close($connection3);
    }
    if($_POST['request']=="sessionValidation")
    {
        $For=$_POST['For'];
        $date=$_POST['date'];
        $month=$_POST['month'];
        $year=$_POST['year'];
        $time=$_POST['time'];
        $mins=$_POST['minute'];
        $date1=$_POST['date1'];
        $month1=$_POST['month1'];
        $year1=$_POST['year1'];
        $time1=$_POST['time1'];
        $mins1=$_POST['minute1'];
        if(($date1==$date && $month1==$month && $year1==$year) &&(($time1==$time)||(($time1+1==$time)&&($mins1>$mins))))
        {
            echo 'Active';
        }
        else{
            echo 'Expired';
        }
    }
}
?>