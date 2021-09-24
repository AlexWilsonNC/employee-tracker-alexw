const app = require('express')();
const mysql = require('mysql2');
// consoleTable is in the instructions, so using it so console/terminal is greyed out I believe
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3009;

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
    ]).then((answer) => {
        switch (answer.firstOptions) {
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
                process.exit(0);
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
    db.query(`SELECT * FROM role`, function (err, res) {
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
                choices: res.map(role =>
                ({
                    name: role.title, ///////////////////////////////////////////
                    value: role.id
                })
                )
            },
        ]).then((data) => {
            db.query(`INSERT INTO employee 
                (first_name, last_name, role_id)
                VALUES (?, ?, ?)`,
                [data.firstName, data.lastName, data.roleName],
                function (err) {
                    if (err) return console.log(err);
                    openingPrompt();
                })
        });
    });
};

function updateEmployeeRole() {
    db.query(`SELECT * FROM employee`, function (err, res) {
        if (err) return console.log(err);
        inquirer.prompt([
            {
                name: 'whichEmployeee',
                type: 'list',
                message: 'Which employee is changing roles?',
                choices: res.map(employee => /////////////////////////////////////////////////////
                ({
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                })
                )
            },
            {
                name: 'updatedRole',
                type: 'rawlist',
                message: 'Which role is being assigned to this employee?',
                choices: res.map(role =>
                    ({
                        name: role.title,
                        value: role.id
                    }))
            }
        ]).then((data) => {
            db.query(`
            UPDATE employee SET role_id = ? WHERE id = ?`, [data.whichEmployeee, data.updatedRole],
                function (err) {
                    if (err) return console.log(err);
                    openingPrompt();
                })
        })
    })
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
                choices: res.map(department =>
                ({
                    name: department.name,
                    value: department.id
                }))
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'What is this role\'s salary?'
            }
        ]).then((data) => {
            db.query(`INSERT INTO role
            (title, department_id, salary)
            VALUES (?, ?, ?)`,
                [data.roleName, data.departmentUnder, data.roleSalary],
                function (err) {
                    if (err) return console.log(err);
                    console.log(`Added ${data.roleName} to Roles!`);
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
            type: 'input',
            message: 'What is the name of this new Department?'
        }
    ]).then((data) => {
        db.query(`INSERT INTO department (name)
        VALUES (?)`, data.departmentName, function (err) {
            if (err) return console.log(err);
            console.log(`Added ${data.departmentName} to Departments`);
            openingPrompt();
        })
    })
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});