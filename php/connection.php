<?php
header("Access-Control-Allow-Origin:*");
$connection = new mysqli("localhost","root","","coregreen");
if(!$connection){
    die("Couldn't reach the servers!");
}