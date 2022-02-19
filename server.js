// require("dotenv").config();
// Dependencies
const mysql = require("mysql");
const table = require("console.table");
const inquierer = require("inquirer");

// Connect to SQL database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "process.env.DB_PASSWORD",
    database: "employee_data_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id ${connection.threadId}");
    initialPrompt();
});

// Initial Prompt for User
function startPrompt() {
  const startQuestion = [{
    type: "list",
    name: "action",
    message: "what would you like to do?",
    loop: false,
    choices: ["View all employees", "View all roles", "View all departments", "add an employee", "add a role", "add a department", "update role for an employee", "update employee's manager", "view employees by manager", "delete a department", "delete a role", "delete an employee", "View the total utilized budget of a department", "quit"]
  }]
}