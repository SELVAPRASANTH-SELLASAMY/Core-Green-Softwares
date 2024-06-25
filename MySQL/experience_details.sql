use coregreen;
create table if not exists experience_details(
    id int primary key not null auto_increment,
    username varchar(100),
    experience varchar(15),
    company_name varchar(25),
    position_worked varchar(30),
    current_ctc varchar(10),
    expected_ctc varchar(10)
);