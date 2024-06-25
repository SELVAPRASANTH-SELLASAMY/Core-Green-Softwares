use coregreen;
CREATE TABLE IF NOT EXISTS personal_details(
    id int primary key not null auto_increment,
    username varchar(100),
    dob date,
    blood_group varchar(5),
    marital_status varchar(10),
    gender varchar(10),
    languages_known varchar(250),
    religion varchar(25),
    nationality varchar(25)
);