create database if not exists coregreen;
use coregreen;
create table if not exists personal_info(
    id int AUTO_INCREMENT PRIMARY KEY,
    fullname varchar(100) NOT NULL,
    contact_number bigint NOT NULL,
    email varchar(100) NOT NULL,
    username varchar(100) NOT NULL,
    password varchar(200) NOT NULL,
    designation varchar(50),
    place varchar(250),
    profile_pic varchar(255)
);