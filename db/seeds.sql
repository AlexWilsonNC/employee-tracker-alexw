INSERT INTO department (department_name)
VALUES ('Customer Service'),
       ('Sales'),
       ('Finance'),
       ('Leadership');

INSERT INTO role (title, department_id, salary)
VALUES ('Associate', 'Customer Service', 24000),
       ('Help Desk', 'Customer Service', 30000),
       ('Call Center', 'Customer Service', 32000),
       ('Trainee', 'Sales', 20000),
       ('Regional Director', 'Sales', 43000),
       ('National Coordinator', 'Sales', 62000),
       ('Accountant', 'Finance', 45000),
       ('Budget Analyst', 'Finance', 48000),
       ('Financial Planner', 'Finance', 50000),
       ('CS Team Lead', 'Leadership', 52000),
       ('Sales Manager', 'Leadership', 60000),
       ('Financing Supervisor', 'Leadership', 80000),
       ('President', 'Leadership', 120000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Stephen', 'Hunter', 'Associate', 'Nora Worley'),
       ('Zach', 'Bivens', 'Help Desk', 'Nora Worley'),
       ('Mike', 'Reynolds', 'Call Center', 'Nora Worley'),
       ('David', 'Suddaby', 'National Coordinator', 'Eddie Sitavi'),
       ('Chip', 'Richey', 'Regional Director', 'Eddie Sitavi'),
       ('Grant', 'Manley', 'Trainee', 'Eddie Sitavi'),
       ('Chris', 'Watkins', 'Accountant', 'Jeremiah Schmutz'),
       ('Blaine', 'Hill', 'Budget Analyst', 'Jeremiah Schmutz'),
       ('Corey', 'Mesimer', 'Financial Planner', 'Jeremiah Schmutz'),
       ('Nora', 'Worley', 'CS Team Lead', 'Anthony Nimmons'),
       ('Eddie', 'Sitavi', 'Sales Manager', 'Anthony Nimmons'),
       ('Jeremiah', 'Schmutz', 'Financing Supervisor', 'Anthony Nimmons'),
       ('Anthony', 'Nimmons', 'President', NULL);
       