const express = require('express');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const Connection = require('mysql2/typings/mysql/lib/Connection');

const PORT = process.env.PORT || 3009;
const app = express();

// even needed?
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database!`)
);

db.connect(function (err) {
    if (err) throw err;
    openingPrompt();
  });

function openingPrompt() {
    inquirer.prompt([
        {
            name: 'firstOptions',
            type: rawlist,
            message: 'How can I help you?',
            choices: [
                'View all Employees',
                'Add Employee',
                'Update Employee Role',
                'View all Roles',
                'Add Role',
                'View all Departments',
                'Add Department',
                'Never Mind'
            ]
        }
    ])
}.then(function({firstOptions}) {
    switch(firstOptions {
        case 'View all Employees':
            viewAllEmployees();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'View all Roles':
            viewAllRoles();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'View all Departments':
            viewAllDepartments();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Never Mind':
            db.end();
            break;
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});