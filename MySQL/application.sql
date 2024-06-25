create database if not exists coregreen;
use coregreen;
create table if not exists applications(
    id int primary key auto_increment not null,
    username varchar(100),
    degree varchar(10),
    stream varchar(50),
    yop year,
    currently_working varchar(5),
    notice_period varchar(20),
    position varchar(50),
    status varchar(15)
);