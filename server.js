// Dependencies
const mysql = require("mysql2");
const table = require("console.table");
const inquierer = require("inquirer");

// Connect to SQL database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_data_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    initialPrompt();
});

// Initial Prompt for User
const initialPrompt = () =>
    inquierer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "View All Employees", 
                "View all Roles", 
                "View all Departments", 
                "Add Employee", 
                "Add Role", 
                "Add Department", 
                "Update Employee Role", 
                "Exit",
            ],
        },
    ]).then(answer => {
        switch (answer.action){
            case "View All Employees":
            viewAllEmployees();
            break;

            case "View All Roles":
            viewAllRoles();
            break;

            case "View All Departments":
            viewAllDepartments();
            break;

            case "Add Employee":
            addEmployee();
            break;

            case "Add Role":
            addRole();
            break;

            case "Add Department":
            addDepartment();
            break;

            case "Update Employee Role":
            updateEmployeeRole();
            break;

            case "Exit":
            console.log("Thanks for using my Employee Data Tracker!");
            connection.end();
            break;
        }
    });

// View All Employees function
const viewAllEmployees = () => {
    // Connect to query
    connection.query(
        `
        SELECT
        employee.id,
        employee.first_name AS "First Name",
        employee.last_name AS "Last Name",
        role.title AS "Title",
        department.name AS "Department",
        role.salary AS "Salary",
        CONCAT(e.first_name, " ", e.last_name) AS "Manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee e ON employee.manager_id = e.id
        ORDER BY employee.id;
        `,
        (err, res) => {
            if (err) throw err;
            // Display query results using console.table
            console.table(res);
            initialPrompt();
        }
    )};


// View All Roles function
const viewAllRoles = () => {
    // Connect to query
    connection.query(
        `
        SELECT 
        role.id,
        role.title AS "Title",
        role.salary AS "Salary"
        department.name AS "Department"
        FROM role
        LEFT JOIN department ON role.department_id = department.id;
        `,
        (err, res) => {
            if (err) throw err;
            // Display query results using console.table
            console.table(res);
            initialPrompt();
        }
    );
};


// View All Departments
const viewAllDepartments = () => {
    // Connect to query
    connection.query(
        `SELECT id, name AS department FROM department`,
        (err, res) => {
            if (err) throw err;
            // Display query results using console.table
            console.table(res);
            initialPrompt();
        }
    );
};


// Add Employee function
const addEmployee = () => {
    inquierer.prompt([
        {
            type: "input",
            name: "employeeFirstName",
            message: "Enter the first name of the new employee:",
        },
        {
            type: "input",
            name: "employeeLastName",
            message: "Enter the last name of the new employee:",
        },
        {
            type: "input",
            name: "employeeRole",
            message: "Enter Role ID of the new employee:",
        },
        {
            type: "input",
            name: "employeeManagerId",
            message: "Enter Manager ID of the new employee:",
        },
    ]).then(answer => {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.employeeFirstName,
                last_name: answer.employeeLastName,
                role_id: answer.employeeRole,
                manager_id: answer.employeeManagerId,
            },
            function(err, res) {
                if (err) throw err;
                console.log(`You have entered ${answer.employeeFirstName} ${answer.employeeLastName} to the database.`);
                initialPrompt();
            }
        );
    });

// Add Role

// Add Department

// Update Employee Role function