-- Insertar departamentos
INSERT INTO department (name)
VALUES 
    ('Sales'), 
    ('Engineering'), 
    ('Finance'), 
    ('Legal');

-- Insertar roles
INSERT INTO role (title, salary, department_id)
VALUES 
    ('Salesperson', 50000, 1),
    ('Lead Engineer', 120000, 2),
    ('Accountant', 80000, 3),
    ('Lawyer', 110000, 4);

-- Insertar empleados
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, NULL),
    ('Sara', 'Connor', 3, 1),
    ('Kyle', 'Reese', 4, 2);