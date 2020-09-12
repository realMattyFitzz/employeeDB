INSERT INTO department (id, department_name)
VALUES 
(1, "Software Engineering"),
(2, "Design"),
(3, "Management"),
(4, "Operations");

INSERT INTO employee_role (id, title, salary, department_id)
VALUES 
(1, "Lead Software Engineer", 120000.00, 1),
(2, "Software Engineer", 100000.00, 1),
(3, "Lead Designer", 75000.00, 2),
(4, "UX Designer", 70000.00, 2),
(5, "UI Designer", 70000.00, 2),
(6, "Software Engineering Manager", 150000.00, 3),
(7, "Design Manager", 120000.00, 3),
(8, "Operations Manager", 100000.00, 3),
(9, "Lead Application Support Engineer", 100000.00, 4),
(10, "Applications Support Engineer", 80000.00, 4),
(11, "Applications Support Associate", 60000.00, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, "Chuck", "Norris", 7, NULL), 
(2, "Tony", "Stark", 3, 1);

