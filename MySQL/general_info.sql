use coregreen;
CREATE TABLE IF NOT EXISTS general_info(
	username varchar(50) PRIMARY KEY NOT NULL,
    birth_date date,
    blood_group varchar(4),
    marital_status varchar(50),
    gender varchar(25),
    languages_known varchar(255),
    religion varchar(50),
    nationality varchar(50)
 )