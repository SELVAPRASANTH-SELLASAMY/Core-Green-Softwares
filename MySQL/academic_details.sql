use coregreen;
create table if not exists academic_details(
    id int primary key not null auto_increment,
    username varchar(100),
    degree_percent int,
    highest_degree_college varchar(250),
    hsc_percent int,
    sslc_percent int
);