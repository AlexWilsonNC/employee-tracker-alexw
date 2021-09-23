INSERT INTO department (department_name)
VALUES ('Customer Service'),
       ('Sales'),
       ('Finance'),
       ('Leadership');

INSERT INTO role (title, department_id, salary)
VALUES ('Help Desk', 1, 30000),
       ('Call Center', 1, 32000),
       ('Regional Director', 2, 43000),
       ('National Coordinator', 2, 62000),
       ('Budget Analyst', 3, 48000),
       ('Financial Planner', 3, 50000),
       ('CS Team Lead', 4, 52000),
       ('Sales Manager', 4, 60000),
       ('Financing Supervisor', 4, 80000),
       ('President', 4, 120000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Zach', 'Bivens', 1, 7),
       ('Mike', 'Reynolds', 2, 7),
       ('Chip', 'Richey', 3, 8),
       ('Grant', 'Manley', 4, 8),
       ('Blaine', 'Hill', 5, 9),
       ('Corey', 'Mesimer', 6, 9),
       ('Nora', 'Worley', 7, 10),
       ('Eddie', 'Sitavi', 8, 10),
       ('Jeremiah', 'Schmutz', 9, 10),
       ('Anthony', 'Nimmons', 10, NULL);
       