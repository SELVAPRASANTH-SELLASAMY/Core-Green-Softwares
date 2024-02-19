use coregreen;
CREATE TABLE IF NOT EXISTS query(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(50),
    email varchar(50),
    contact_number BIGINT,
    message varchar(255)
);