# employee-data-tracker

![employee-data-tracker]()

# Description
This application is a command-line application that allows the user to manage a company's employee database, using Node.js, Inquirer, and MySQL. 
This application is not meant to be deployed, so there is a walkthrough video that demonstrates its functionality.
Unfortunately, I ran into three major issues while creating this application. I am not able to deploy viewAllEmployees(), viewAllRoles() and viewAllDepartments(). 
All other functions work properly, and I am still working on fixing these issues, and will update this application when I have solved the issue.

## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Table of Contents
- [Installation](#Installation)
- [Links](#Links)
- [Questions](#Questions)

## Installation
`npm init` <br />
`npm install inquirer` <br />
`npm install mysql2` <br />
`npm install console-table` <br />

Run `npm install` to install dependencies. To use the application locally, run `node server.js`

## Links
[Link to Video](https://drive.google.com/file/d/1jVkL9ka6AgfhIupa5zb5gjJGS8ihVTRi/view)
[Link to the GitHub Repository](https://marikadicarlo.github.io/employee-data-tracker/)

## Questions
Contact me with any questions at <mdicarlo19@yahoo.com> or [visit my GitHub page](https://github.com/marikadicarlo)