use coregreen;
CREATE TABLE IF NOT EXISTS id_proof(
    username varchar(50),
    aadhaar BIGINT,
    pan varchar(50),
    passport varchar(50),
    driving_licence varchar(50)
);