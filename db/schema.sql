DROP DATABASE IF EXISTS tracker;
CREATE DATABASE tracker;

USE tracker; 

CREATE TABLE department (
    id INT NOT NULL,
    department_name VARCHAR(30), 
    PRIMARY KEY(id)
);

CREATE TABLE employee_role ( 
    id INT NOT NULL,
    title VARCHAR(75),
    salary DECIMAL,
    department_id INT NOT NULL,
    PRIMARY KEY(id), 
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,  
    manager_id INT, 
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES employee_role(id), 
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);








