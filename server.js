// Dependencies
const mysql = require("mysql");
const table = require("console.table");
const inquierer = require("inquirer");

// Connect to SQL database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3006,
    user: "root",
    password: "",
    database: "employee_data_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id ${connection.threadId}");
    initialPrompt();
});

// Initial Prompt for User