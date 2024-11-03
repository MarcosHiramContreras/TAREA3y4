// TAREA 3 y 4 
// EQUIPO 
// 
// MARCOS HIRAM CONTRERAS MENDOZA
// ALAN VALOR VILLANUEVA
// JUAN FRANCISCO SANCHEZ RIVADENEIRA
// FERNANDO ARCOVEDO LEON

// 01/11/2024

import express from "express";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import path from "path";
import { getAllProducts, getProductById, createProduct, updateProduct, partialUpdateProduct, deleteProduct } from "./model.products.js";
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, partialUpdateEmployee, deleteEmployee } from "./model.empleados.js";
import { getAllProveedores, getProveedorById, createProveedor, updateProveedor, partialUpdateProveedor, deleteProveedor } from "./model.proveedores.js";
import { getAllVentas, getVentaById, createVenta, updateVenta, partialUpdateVenta, deleteVenta } from "./model.ventas.js";
dotenv.config();

const PORT = process.env.PORT || 3001;
const mydb = process.env.SQLITE_DB || 'app.sqlite3';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
 const db = new sqlite3.Database('./app.sqlite3');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(express.static("public"));

// Middleware para soportar métodos HTTP alternativos (PUT, PATCH, DELETE)
app.use((req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/menu.html");
});

// SERVIDOR INTERNO PARA EL BACKEND
app.get('/getAll', (req, res) => {
    const products = getAllProducts(mydb);
    res.json(products);
});
// ---------------------------------

// RUTAS PARA PRODUCTOS
app.get('/products', (req, res) => {
    const products = getAllProducts(mydb);
    res.json(products);
});

app.get('/productos', (req, res) => {
    db.all('SELECT id FROM productos', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows); // Devuelve los IDs de productos en formato JSON
    });
 });

app.get('/products/:id', (req, res) => {
    const products = getProductById(mydb, req.params.id);
    if (products) {
        res.json(products);
    } else {
        res.status(404).send("Producto no encontrado");
    }
 });

app.post('/products', (req, res) => {
    const { nombre, descripcion, precio, cantidad } = req.body;
    const response = createProduct(mydb, { nombre, descripcion, precio, cantidad });
    res.json(response);
});

app.put('/products/:id', (req, res) => {
    const { nombre, descripcion, precio, cantidad } = req.body;
    const response = updateProduct(mydb, req.params.id, { nombre, descripcion, precio, cantidad });

    if (response.changes === 0) {
        return res.status(404).json({ message: "Producto no encontrado o no actualizado." });
    }

    res.json({ message: "Producto actualizado correctamente", changes: response.changes });
});

app.patch('/products/:id', (req, res) => {
    const updates = req.body;
    const response = partialUpdateProduct(mydb, req.params.id, updates);
    res.json(response);
});

app.delete('/products/:id', (req, res) => {
    const response = deleteProduct(mydb, req.params.id);
    res.json(response);
});

// RUTAS PARA EMPLEADOS
app.get('/employees', (req, res) => {
    const employees = getAllEmployees(mydb);
    res.json(employees);
});

app.get('/employees/:id', (req, res) => {
    const employee = getEmployeeById(mydb, req.params.id);
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).send("Empleado no encontrado");
    }
});

app.post('/employees', (req, res) => {
    const { nombre, puesto, telefono, email } = req.body;
    const response = createEmployee(mydb, { nombre, puesto, telefono, email });
    res.json(response);
});

app.put('/employees/:id', (req, res) => {
    const { nombre, puesto, telefono, email } = req.body;
    const response = updateEmployee(mydb, req.params.id, { nombre, puesto, telefono, email });

    if (response.changes === 0) {
        return res.status(404).json({ message: "Empleado no encontrado o no actualizado." });
    }

    res.json({ message: "Empleado actualizado correctamente", changes: response.changes });
});

app.patch('/employees/:id', (req, res) => {
    const updates = req.body;
    const response = partialUpdateEmployee(mydb, req.params.id, updates);
    res.json(response);
});

app.delete('/employees/:id', (req, res) => {
    const response = deleteEmployee(mydb, req.params.id);
    res.json(response);
});

// RUTAS PARA PROVEEDORES

app.get('/proveedores', (req, res) => {
    const proveedores = getAllProveedores(mydb);
    res.json(proveedores);
});

app.get('/proveedores/:id', (req, res) => {
    const proveedor = getProveedorById(mydb, req.params.id);
    if (proveedor) {
        res.json(proveedor);
    } else {
        res.status(404).send("Proveedor no encontrado");
    }
});

app.post('/proveedores', (req, res) => {
    const { nombre, direccion, telefono } = req.body;
    const response = createProveedor(mydb, { nombre, direccion, telefono });
    res.json(response);
});

app.put('/proveedores/:id', (req, res) => {
    const { nombre, direccion, telefono } = req.body;
    const response = updateProveedor(mydb, req.params.id, { nombre, direccion, telefono });

    if (response.changes === 0) {
        return res.status(404).json({ message: "Proveedor no encontrado o no actualizado." });
    }

    res.json({ message: "Proveedor actualizado correctamente", changes: response.changes });
});

app.patch('/proveedores/:id', (req, res) => {
    const updates = req.body;
    const response = partialUpdateProveedor(mydb, req.params.id, updates);
    res.json(response);
});

app.delete('/proveedores/:id', (req, res) => {
    const response = deleteProveedor(mydb, req.params.id);
    res.json(response);
});

// RUTAS PARA VENTAS
app.get('/ventas', (req, res) => {
    const ventas = getAllVentas(mydb);
    res.json(ventas);
});

app.get('/ventas/:id', (req, res) => {
    const venta = getVentaById(mydb, req.params.id);
    if (venta) {
        res.json(venta);
    } else {
        res.status(404).send("Venta no encontrada");
    }
});

app.post('/ventas', (req, res) => {
    const { fecha, total } = req.body;
    const response = createVenta(mydb, { fecha, total });
    res.json(response);
});

app.put('/ventas/:id', (req, res) => {
    const { fecha, total } = req.body;
    const response = updateVenta(mydb, req.params.id, { fecha, total });

    if (response.changes === 0) {
        return res.status(404).json({ message: "Venta no encontrada o no actualizada." });
    }

    res.json({ message: "Venta actualizada correctamente", changes: response.changes });
});

app.patch('/ventas/:id', (req, res) => {
    const updates = req.body;
    const response = partialUpdateVenta(mydb, req.params.id, updates);
    res.json(response);
});

app.delete('/ventas/:id', (req, res) => {
    const response = deleteVenta(mydb, req.params.id);
    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en: http://localhost:${PORT}/`);
});