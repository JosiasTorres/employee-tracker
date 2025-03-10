const inquirer = require('inquirer');
const { Client } = require('pg');

// Configuración de la conexión a PostgreSQL
const client = new Client({
    user: 'postgres',                // Usuario de PostgreSQL
    host: 'localhost',               // Servidor local
    database: 'employee_tracker',    // Nombre de la base de datos
    password: '',                    // Contraseña (déjala vacía si no usas)
    port: 5432,                      // Puerto por defecto
});

// Conéctate a PostgreSQL
client.connect()
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos', err));

// Función principal del menú
function mainMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: '¿Qué te gustaría hacer?',
                choices: [
                    'Ver todos los departamentos',
                    'Ver todos los roles',
                    'Ver todos los empleados',
                    'Agregar un departamento',
                    'Agregar un rol',
                    'Agregar un empleado',
                    'Salir'
                ],
            }
        ])
        .then(answer => {
            switch (answer.choice) {
                case 'Ver todos los departamentos':
                    viewDepartments();
                    break;
                case 'Ver todos los roles':
                    viewRoles();
                    break;
                case 'Ver todos los empleados':
                    viewEmployees();
                    break;
                case 'Agregar un departamento':
                    addDepartment();
                    break;
                case 'Agregar un rol':
                    addRole();
                    break;
                case 'Agregar un empleado':
                    addEmployee();
                    break;
                default:
                    console.log('¡Hasta luego!');
                    client.end(); // Cierra la conexión
            }
        });
}

// Función para ver todos los departamentos
function viewDepartments() {
    client.query('SELECT * FROM department', (err, res) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
        } else {
            console.table(res.rows);
        }
        mainMenu();
    });
}

// Función para ver todos los roles
function viewRoles() {
    client.query('SELECT * FROM role', (err, res) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
        } else {
            console.table(res.rows);
        }
        mainMenu();
    });
}

// Función para ver todos los empleados
function viewEmployees() {
    client.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            console.error('Error al ejecutar la consulta', err);
        } else {
            console.table(res.rows);
        }
        mainMenu();
    });
}

// Función para agregar un departamento
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Ingresa el nombre del nuevo departamento:',
            },
        ])
        .then(answer => {
            client.query(
                'INSERT INTO department (name) VALUES ($1)',
                [answer.departmentName],
                (err) => {
                    if (err) {
                        console.error('Error al agregar el departamento', err);
                    } else {
                        console.log('Departamento agregado exitosamente.');
                    }
                    mainMenu();
                }
            );
        });
}

// Función para agregar un rol
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Ingresa el título del nuevo rol:',
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'Ingresa el salario del nuevo rol:',
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'Ingresa el ID del departamento al que pertenece el rol:',
            },
        ])
        .then(answer => {
            client.query(
                'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
                [answer.roleTitle, answer.roleSalary, answer.departmentId],
                (err) => {
                    if (err) {
                        console.error('Error al agregar el rol', err);
                    } else {
                        console.log('Rol agregado exitosamente.');
                    }
                    mainMenu();
                }
            );
        });
}

// Función para agregar un empleado
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Ingresa el primer nombre del empleado:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Ingresa el apellido del empleado:',
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'Ingresa el ID del rol del empleado:',
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'Ingresa el ID del gerente (puede ser NULL si no tiene):',
            },
        ])
        .then(answer => {
            client.query(
                'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
                [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
                (err) => {
                    if (err) {
                        console.error('Error al agregar el empleado', err);
                    } else {
                        console.log('Empleado agregado exitosamente.');
                    }
                    mainMenu();
                }
            );
        });
}

// Iniciar la aplicación
mainMenu();