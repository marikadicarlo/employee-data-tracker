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
const initialPrompt = () => {
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
}

// View All Employees function
const viewAllEmployees = (table) => {
  // const query = `SELECT * FROM ${table}`;
  let query;
  if (table === "department") {
    query = `SELECT * FROM department`;
  } else if (table === "ROLE") {
    query = `SELECT R.id AS id, title, salary, D.name AS department
    FROM ROLE AS R LEFT JOIN DEPARTMENT AS D
    ON R.department_id = D.id;`;
  } else {
    //employee
    query = `SELECT E.id AS id, E.first_name AS first_name, E.last_name AS last_name, 
    R.title AS role, D.name AS department, CONCAT(M.first_name, " ", M.last_name) AS manager
    FROM EMPLOYEE AS E LEFT JOIN ROLE AS R ON E.role_id = R.id
    LEFT JOIN DEPARTMENT AS D ON R.department_id = D.id
    LEFT JOIN EMPLOYEE AS M ON E.manager_id = M.id;`;
  }
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    initialPrompt();
  });
};
    
// View All Roles function
const viewAllRoles = (table) => {
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
function viewAllDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    console.table(res);
    initialPrompt();
  });
}


// Add Employee function
const addEmployee = () => {
  //get all the employee list to make choice of employee's manager
  connection.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
    if (err) throw err;
    const employeeChoice = [
      {
        name: "None",
        value: 0,
      },
    ]; //an employee could have no manager
    emplRes.forEach(({ first_name, last_name, id }) => {
      employeeChoice.push({
        name: first_name + " " + last_name,
        value: id,
      });
    });

    //get all the role list to make choice of employee's role
    connection.query("SELECT * FROM ROLE", (err, rolRes) => {
      if (err) throw err;
      const roleChoice = [];
      rolRes.forEach(({ title, id }) => {
        roleChoice.push({
          name: title,
          value: id,
        });
      });

      let questions = [
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "role_id",
          choices: roleChoice,
          message: "What is the employee's role?",
        },
        {
          type: "list",
          name: "manager_id",
          choices: employeeChoice,
          message: "Who is the employee's manager? (could be null)",
        },
      ];

      inquierer
        .prompt(questions)
        .then((response) => {
          const query = `INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES (?)`;
          let manager_id =
            response.manager_id !== 0 ? response.manager_id : null;
          connection.query(
            query,
            [
              [
                response.first_name,
                response.last_name,
                response.role_id,
                manager_id,
              ],
            ],
            (err, res) => {
              if (err) throw err;
              console.log(
                `Successfully added employee ${response.first_name} ${response.last_name} with id ${res.insertId}`
              );
              initialPrompt();
            }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });
};

// Add Role
const addRole = () => {
  //get the list of all department with department_id to make the choices object list for prompt question
  const departments = [];
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    res.forEach((dep) => {
      let qObj = {
        name: dep.name,
        value: dep.id,
      };
      departments.push(qObj);
    });

    //question list to get arguments for making new roles
    let questions = [
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the new role?",
      },
      {
        type: "list",
        name: "department",
        choices: departments,
        message: "Which department is this role in?",
      },
    ];

    inquierer
      .prompt(questions)
      .then((response) => {
        const query = `INSERT INTO ROLE (title, salary, department_id) VALUES (?)`;
        connection.query(
          query,
          [[response.title, response.salary, response.department]],
          (err, res) => {
            if (err) throw err;
            console.log(
              `Successfully added ${response.title} role at id ${res.insertId}`
            );
            initialPrompt();
          }
        );
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

// Add Department
const addDepartment = () => {
  let questions = [
    {
      type: "input",
      name: "name",
      message: "What is the new department name?",
    },
  ];

  inquierer
    .prompt(questions)
    .then((response) => {
      const query = `INSERT INTO department (name) VALUES (?)`;
      connection.query(query, [response.name], (err, res) => {
        if (err) throw err;
        console.log(
          `Successfully inserted ${response.name} department at id ${res.insertId}`
        );
        initialPrompt();
      });
    })
    .catch((err) => {
      console.error(err);
    });
};


// Update Employee Role function
const updateEmployeeRole = () => {
  //get all the employee list
  connection.query("SELECT * FROM employee", (err, emplRes) => {
    if (err) throw err;
    const employeeChoice = [];
    emplRes.forEach(({ first_name, last_name, id }) => {
      employeeChoice.push({
        name: first_name + " " + last_name,
        value: id,
      });
    });

    //get all the role list to make choice of employee's role
    connection.query("SELECT * FROM role", (err, rolRes) => {
      if (err) throw err;
      const roleChoice = [];
      rolRes.forEach(({ title, id }) => {
        roleChoice.push({
          name: title,
          value: id,
        });
      });

      let questions = [
        {
          type: "list",
          name: "id",
          choices: employeeChoice,
          message: "Whose role do you want to update?",
        },
        {
          type: "list",
          name: "role_id",
          choices: roleChoice,
          message: "What is the employee's new role?",
        },
      ];

      inquierer
        .prompt(questions)
        .then((response) => {
          const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
          connection.query(
            query,
            [{ role_id: response.role_id }, "id", response.id],
            (err, res) => {
              if (err) throw err;

              console.log("Successfully updated employee's role!");
              initialPrompt();
            }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    });
  });
};