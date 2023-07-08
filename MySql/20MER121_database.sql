create database 20MER121;
use 20MER121;
create table student_datas(
    id int PRIMARY KEY AUTO_INCREMENT,
    firstname varchar(255),
    lastname varchar(255),
    roll_no varchar(255),
    DOB date,
    contact varchar(255),
    password varchar(255)
    );