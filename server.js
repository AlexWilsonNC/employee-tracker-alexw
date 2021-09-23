const express = require('express');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const inquirer = require('inquirer');

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
            type: 'rawlist',
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
    ]).then((res) => {
        switch (res.firstOptions) {
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
        }
    })
};

function viewAllEmployees() {
    db.query(`SELECT employee.id, 
    employee.first_name, employee.last_name, 
    role.title AS role, role.salary, 
    department.department_name AS department
    FROM employee JOIN role
    ON role.id = employee.role_id
    JOIN department
    ON role.department_id = department.id
    ORDER BY employee.id`, 
    function (err, res) {
        if (err) return console.log(err);
        console.table(res);
        openingPrompt();
    });
}

function addRole() {
    db.query(`SELECT * FROM department`, function (err, results) {
        if (err) return console.log(err);

        inquirer.prompt([
            {
                name: 'roleName',
                type: 'input',
                message: 'What is the name of the new role?'
            },
            {
                name: 'departmentUnder',
                type: 'list',
                message: 'Under which department will this role belong?',
                choices: [
                    1,
                    2,
                    3,
                    4
                ]
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'What is this role\'s salary?'
            }
        ]).then(response => {
            console.log(response);
            db.query(`INSERT INTO role
            (title, department_id, salary)
            VALUES (?, ?, ?)`,
                [response.roleName, response.roleSalary, response.departmentUnder],
                function (err) {
                    if (err) return console.log(err);
                    cohnsole.table(department);
                    openingPrompt();
                })
        }
        )
    })
};

// SELECT role.name, department.name
// FROM role
// INNER JOIN department
// ON role.department_id = department.id;

function addDepartment() {
    inquirer.prompt([
        {
            name: 'departmentName',
            type: input,
            message: 'What\'s the name of this new Department?'
        }
    ]).then((response) => {
        db.query(`INSERT INTO department (name)
        VALUES (?)`, response.departmentName, function (err) {
            if (err) return console.log(err);
            console.table(department);
            openingPrompt();
        })
    })
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});