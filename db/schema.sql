-- Crear tabla de departamentos
CREATE TABLE department (
    id SERIAL PRIMARY KEY,          -- Identificador único para cada departamento
    name VARCHAR(30) UNIQUE NOT NULL -- Nombre del departamento (único y obligatorio)
);

-- Crear tabla de roles
CREATE TABLE role (
    id SERIAL PRIMARY KEY,          -- Identificador único para cada rol
    title VARCHAR(30) UNIQUE NOT NULL, -- Título del rol (único y obligatorio)
    salary DECIMAL NOT NULL,        -- Salario asociado al rol
    department_id INTEGER NOT NULL REFERENCES department(id) ON DELETE CASCADE
    -- Relación con la tabla department; si se elimina un departamento, se eliminan los roles asociados
);

-- Crear tabla de empleados
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,          -- Identificador único para cada empleado
    first_name VARCHAR(30) NOT NULL, -- Nombre del empleado
    last_name VARCHAR(30) NOT NULL, -- Apellido del empleado
    role_id INTEGER NOT NULL REFERENCES role(id) ON DELETE CASCADE,
    -- Relación con la tabla role; si se elimina un rol, se eliminan los empleados asociados
    manager_id INTEGER REFERENCES employee(id) ON DELETE SET NULL
    -- Relación recursiva para establecer al gerente del empleado; al eliminar un gerente, el campo se vuelve NULL
);