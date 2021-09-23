INSERT INTO department (department_name)
VALUES ('Customer Service'),
       ('Sales'),
       ('Finance'),
       ('Leadership');

INSERT INTO role (title, department_id, salary)
VALUES ('Associate', 1, 24000),
       ('Help Desk', 1, 30000),
       ('Call Center', 1, 32000),
       ('Trainee', 2, 20000),
       ('Regional Director', 2, 43000),
       ('National Coordinator', 2, 62000),
       ('Accountant', 3, 45000),
       ('Budget Analyst', 3, 48000),
       ('Financial Planner', 3, 50000),
       ('CS Team Lead', 4, 52000),
       ('Sales Manager', 4, 60000),
       ('Financing Supervisor', 4, 80000),
       ('President', 4, 120000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Stephen', 'Hunter', 1, 10),
       ('Zach', 'Bivens', 1, 10),
       ('Mike', 'Reynolds', 1, 10),
       ('David', 'Suddaby', 2, 11),
       ('Chip', 'Richey', 2, 11),
       ('Grant', 'Manley', 2, 11),
       ('Chris', 'Watkins', 3, 12),
       ('Blaine', 'Hill', 3, 12),
       ('Corey', 'Mesimer', 3, 12),
       ('Nora', 'Worley', 4, 13),
       ('Eddie', 'Sitavi', 4, 13),
       ('Jeremiah', 'Schmutz', 4, 13),
       ('Anthony', 'Nimmons', 4, NULL);
       