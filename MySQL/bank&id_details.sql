use coregreen;
create table IF NOT EXISTS bank_id_details(
    id int primary key not null auto_increment,
    username varchar(100),
    bank_name varchar(250),
    account_number varchar(50),
    branch varchar(25),
    ac_holder_name varchar(25),
    ifsc varchar(15),
    aadhaar bigint,
    pan varchar(15),
    passport varchar(10),
    driving_licence varchar(15)
);