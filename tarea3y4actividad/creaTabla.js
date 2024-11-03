import Database from "better-sqlite3";
const db = new Database('app.sqlite3');

const queryDepartamentos = `
    CREATE TABLE IF NOT EXISTS departamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre STRING NOT NULL
    );
`;

const queryEmpleados = `
    CREATE TABLE IF NOT EXISTS empleados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre STRING NOT NULL,
        puesto STRING NOT NULL,
        telefono STRING NOT NULL,
        email STRING NOT NULL
    );
`;

const queryUsers=`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING NOT NULL,
    username STRING NOT NULL
    );    
`;

// Ejecutar las consultas para crear las tablas
db.exec(queryDepartamentos);
db.exec(queryEmpleados);
db.exec(queryUsers);

console.log("Tablas 'departamentos' , 'empleados' y 'usuarios' creadas correctamente.");
db.close();