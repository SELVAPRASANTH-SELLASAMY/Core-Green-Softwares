use coregreen;
CREATE TABLE IF NOT EXISTS OTP(
    username varchar(50),
    OTP varchar(25),
    expiry_time DATETIME
 )