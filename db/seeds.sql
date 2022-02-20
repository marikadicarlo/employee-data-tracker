USE employee_data_trackerDB;

-- Department Seeds --
INSERT INTO department (id, name)
VALUES 
(1, "Engineering"),
(2, "Finance"),
(3, "Sales"),
(4, "Marketing");

-- SELECT * FROM department;


-- Role Seeds --
INSERT INTO role (title, salary, department_id)
VALUES
("CEO", 500000, 1),
("Lead Engineer", 450000, 2),
("Engineer", 400000, 2),
("Sales Lead", 100000, 3),
("Salesperson", 90000, 3),
("Accountant", 120000, 4),
("Lawyer", 120000, 4),
("Marketing Lead", 80000, 5),
("Marketing Assistant", 70000, 5);

-- Employee Seeds --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Joe", "Shmoe", 1, null),
("Bart", "Simpson", 8, 4),
("Betty", "Boop", 6, 3),
("Buzz", "Lightyear", 7, 1),
("Fred", "Flinstone", 5, 6),
("Mickey", "Mouse", 2, 7),
("Wile E.", "Coyote", 3, 2),
("Bugs", "Bunny", 1, 3);