use coregreen;
CREATE TABLE IF NOT EXISTS applications(
    id int primary key not null auto_increment,
    firstname varchar(50),
    lastname varchar(50),
    degree varchar(10),
    stream varchar(50),
    email varchar(50),
    phone_number bigint,
    year_of_passing year,
    position varchar(50)
);