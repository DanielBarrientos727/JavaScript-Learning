
/*
 * PROYECTO: Sistema de gestión de una tienda
 * Temas: funciones, arrays, objetos, map, filter,
 * reduce, every, Set, push, pop, splice, indexOf y at.
 */

// ==========================================
// 1. DATOS INICIALES: ARRAY DE OBJETOS
// ==========================================

const productos = [
    { id: 1, nombre: "Teclado", precio: 85000, stock: 10, categoria: "Perifericos" },
    { id: 2, nombre: "Mouse", precio: 45000, stock: 15, categoria: "Perifericos" },
    { id: 3, nombre: "Monitor", precio: 650000, stock: 5, categoria: "Pantallas" },
    { id: 4, nombre: "Audifonos", precio: 120000, stock: 8, categoria: "Audio" },
    { id: 5, nombre: "Memoria USB", precio: 30000, stock: 0, categoria: "Almacenamiento" }
];

// ==========================================
// 2. FUNCIONES FLECHA
// ==========================================

const mostrarTitulo = () => {
    console.log("\n==============================");
    console.log("     SISTEMA DE TIENDA");
    console.log("==============================");
};

const calcularIVA = precio => precio * 0.19;

const calcularPrecioFinal = precio => precio + calcularIVA(precio);

// ==========================================
// 3. MAP: TRANSFORMAR ELEMENTOS
// ==========================================

const productosConIVA = productos.map(producto => ({
    ...producto,
    precioConIVA: calcularPrecioFinal(producto.precio)
}));

console.log("\nPRODUCTOS CON IVA:");

productosConIVA.forEach(producto => {
    console.log(
        `${producto.nombre}: $${producto.precioConIVA.toFixed(0)}`
    );
});

// ==========================================
// 4. FILTER: FILTRAR PRODUCTOS
// ==========================================

const productosDisponibles = productos.filter(
    producto => producto.stock > 0
);

const productosEconomicos = productos.filter(
    producto => producto.precio < 100000
);

console.log("\nPRODUCTOS DISPONIBLES:");
productosDisponibles.forEach(producto => {
    console.log(producto.nombre);
});

console.log("\nPRODUCTOS ECONOMICOS:");
productosEconomicos.forEach(producto => {
    console.log(producto.nombre);
});

// ==========================================
// 5. EVERY: COMPROBAR CONDICIONES
// ==========================================

const todosTienenPrecio = productos.every(
    producto => producto.precio > 0
);

console.log("\n¿Todos tienen precio válido?");
console.log(todosTienenPrecio);

// ==========================================
// 6. REDUCE: CALCULAR VALORES
// ==========================================

const valorInventario = productos.reduce(
    (total, producto) => total + (producto.precio * producto.stock),
    0
);

console.log("\nVALOR TOTAL DEL INVENTARIO:");
console.log(`$${valorInventario.toLocaleString("es-CO")}`);

// ==========================================
// 7. BUSCAR PRODUCTOS
// ==========================================

const indiceMouse = productos.findIndex(
    producto => producto.nombre === "Mouse"
);

console.log("\nÍNDICE DEL MOUSE:");
console.log(indiceMouse);

console.log("\nPRIMER PRODUCTO:");
console.log(productos.at(0).nombre);

console.log("\nÚLTIMO PRODUCTO:");
console.log(productos.at(-1).nombre);

// ==========================================
// 8. MODIFICAR ARRAYS
// ==========================================

// Agregar un producto
productos.push({
    id: 6,
    nombre: "Webcam",
    precio: 180000,
    stock: 4,
    categoria: "Perifericos"
});

// Eliminar el último producto
const productoEliminado = productos.pop();

console.log("\nPRODUCTO ELIMINADO:");
console.log(productoEliminado.nombre);

// Eliminar un producto por posición
const indiceUSB = productos.findIndex(
    producto => producto.nombre === "Memoria USB"
);

if (indiceUSB !== -1) {
    productos.splice(indiceUSB, 1);
}

// ==========================================
// 9. SET: EVITAR CATEGORÍAS DUPLICADAS
// ==========================================

const categorias = new Set();

productos.forEach(producto => {
    categorias.add(producto.categoria);
});

console.log("\nCATEGORÍAS DISPONIBLES:");
categorias.forEach(categoria => {
    console.log(categoria);
});

console.log("\n¿Existe categoría Audio?");
console.log(categorias.has("Audio"));

categorias.delete("Audio");

console.log("\nCATEGORÍAS DESPUÉS DE ELIMINAR AUDIO:");
console.log(categorias);

// ==========================================
// 10. SISTEMA DE CLIENTES
// ==========================================

const clientes = [];

const registrarCliente = (nombre, correo) => {
    clientes.push({
        nombre: nombre,
        correo: correo
    });
};

registrarCliente("Daniel", "daniel@email.com");
registrarCliente("Carlos", "carlos@email.com");
registrarCliente("Laura", "laura@email.com");

console.log("\nCLIENTES REGISTRADOS:");
console.log(clientes);

// ==========================================
// 11. RESUMEN DEL SISTEMA
// ==========================================

const mostrarResumen = () => {
    console.log("\n==============================");
    console.log("       RESUMEN FINAL");
    console.log("==============================");

    console.log("Productos registrados:", productos.length);
    console.log("Clientes registrados:", clientes.length);
    console.log("Categorías:", categorias.size);

    console.log(
        "Valor del inventario:",
        `$${valorInventario.toLocaleString("es-CO")}`
    );
};

mostrarTitulo();
mostrarResumen();

