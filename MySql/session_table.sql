use 20MER121;
create table session_table(
    Id int PRIMARY KEY AUTO_INCREMENT,
    user varchar(255),
    date int,
    month int,
    year int,
    time int,
    minute int
);