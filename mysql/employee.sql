use mysql_db;

CREATE TABLE employees(
    id int not null AUTO_INCREMENT,
    F_name varchar(100) NOT NULL,
    L_name varchar(100) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO employees(F_name,L_name)
VALUES("Vara","Varawithya"),("Parichaya","Nasomdang");