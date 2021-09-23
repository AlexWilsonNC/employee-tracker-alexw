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
};

function addEmployee() {
    db.query(`SELECT * FROM role`, function (err, data) {
        if (err) return console.log(err);
        inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What\'s their first name?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What\'s their last name?'
            },
            {
                name: 'roleName',
                type: 'rawlist',
                message: 'What is their assigned role?',
                choices: [
                    'Help Desk',
                    'Call Center',
                    'Regional Director',
                    'National Coordinator',
                    'Budget Analyst',
                    'Financial Planner',
                    'CS Team Lead',
                    'Sales Manager',
                    'Financing Supervisor'
                ]
            },
        ]).then((res) => {
            db.query(`INSERT INTO employee 
                (first_name, last_name, role_id)
                VALUES (?, ?, ?)`,
                [res.firstName, res.lastName, res.roleName],
                function (err) {
                    if (err) return console.log(err);
                    openingPrompt();
                })
        });
    });
};

function updateEmployeeRole() {
    db.query(`SELECT * FROM employee`, function (err, employees) {
        if (err) return console.log(err);
        inquirer.prompt([
            {
                name: 'whichEmployeee',
                type: 'list',
                message: 'Which employee is changing roles?',
                choices: employees.map(employee =>
                ({
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                })
                )
            },
            {
                name: 'updatedRole',
                type: 'input',
                message: 'Which role is being assigned to this employee?',
                choices: [
                    'Help Desk',
                    'Call Center',
                    'Regional Director',
                    'National Coordinator',
                    'Budget Analyst',
                    'Financial Planner',
                    'CS Team Lead',
                    'Sales Manager',
                    'Financing Supervisor'
                ]
            }
        ]).then((res) => {
            db.query(`
            UPDATE employee SET role_id = ? WHERE id = ?`, [res.whichEmployeee, res.updatedRole],
                function (err) {
                    if (err) return console.log(err);
                    openingPrompt();
                })
        })
    });
};

function viewAllRoles() {
    db.query(`SELECT * FROM role`, function (err, res) {
        if (err) return console.log(err);
        console.table(res);
        openingPrompt();
    });
};

function addRole() {
    db.query(`SELECT * FROM department`, function (err, res) {
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
        ]).then(res => {
            console.log(res);
            db.query(`INSERT INTO role
            (title, department_id, salary)
            VALUES (?, ?, ?)`,
                [res.roleName, res.departmentUnder, res.roleSalary],
                function (err) {
                    if (err) return console.log(err);
                    console.table(department);
                    openingPrompt();
                })
        }
        )
    })
};

function viewAllDepartments() {
    db.query(`SELECT * FROM department`, function (err, res) {
        if (err) return console.log(err);
        console.table(res);
        openingPrompt();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            name: 'departmentName',
            type: input,
            message: 'What\'s the name of this new Department?'
        }
    ]).then((res) => {
        db.query(`INSERT INTO department (name)
        VALUES (?)`, res.departmentName, function (err) {
            if (err) return console.log(err);
            console.table(department);
            openingPrompt();
        })
    })
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});