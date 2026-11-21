const readline = require('readline');

// ─────────────────────────────────────────────────────────────
//  03 - CARRITO DE COMPRAS
//  Conceptos: objetos, arrays, filter, map, reduce, find,
//             arrow functions, spread operator
// ─────────────────────────────────────────────────────────────

// ── CATÁLOGO DE PRODUCTOS ─────────────────────────────────────

// Array inmutable de productos disponibles en la tienda
const catalogo = [
  { id: 1, nombre: "Camiseta",      precio: 35000,  stock: 10 },
  { id: 2, nombre: "Pantalón",      precio: 75000,  stock: 5  },
  { id: 3, nombre: "Zapatos",       precio: 120000, stock: 8  },
  { id: 4, nombre: "Gorra",         precio: 25000,  stock: 15 },
  { id: 5, nombre: "Chaqueta",      precio: 180000, stock: 3  },
  { id: 6, nombre: "Medias x3",     precio: 15000,  stock: 20 },
  { id: 7, nombre: "Correa",        precio: 40000,  stock: 7  },
  { id: 8, nombre: "Mochila",       precio: 95000,  stock: 6  },
];

// Array que representa el carrito del cliente (empieza vacío)
let carrito = [];

// ── FUNCIONES DEL CARRITO ─────────────────────────────────────

/**
 * formatPesos: convierte un número a formato de moneda colombiana (COP).
 */
const formatPesos = (valor) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(valor);

/**
 * verCatalogo: usa map() para mostrar todos los productos disponibles.
 * map() transforma cada objeto producto en una línea de texto.
 */
const verCatalogo = () => {
  console.log("\n  ─ Catálogo de productos ─");
  // map convierte cada producto en una cadena descriptiva
  catalogo
    .map(p => `  [${p.id}] ${p.nombre.padEnd(14)} | ${formatPesos(p.precio).padEnd(14)} | Stock: ${p.stock}`)
    .forEach(l => console.log(l));
};

/**
 * agregarProducto: agrega un producto al carrito o aumenta su cantidad.
 * Usa find() para verificar si el producto ya existe en el carrito.
 * @param {number} productoId - ID del producto del catálogo
 * @param {number} cantidad   - unidades a agregar
 */
const agregarProducto = (productoId, cantidad) => {
  // find() busca el producto en el catálogo por su id
  const producto = catalogo.find(p => p.id === productoId);

  if (!producto)          return console.log("  ⚠  Producto no encontrado.");
  if (cantidad <= 0)      return console.log("  ⚠  Cantidad inválida.");
  if (producto.stock < cantidad) return console.log(`  ⚠  Stock insuficiente (disponible: ${producto.stock}).`);

  // Verifica si el producto ya estaba en el carrito
  const enCarrito = carrito.find(item => item.id === productoId);

  if (enCarrito) {
    // Si ya existe, solo incrementa la cantidad (muta el objeto directamente)
    enCarrito.cantidad += cantidad;
    enCarrito.subtotal  = enCarrito.precio * enCarrito.cantidad;
    console.log(`  ✔  Cantidad actualizada: ${enCarrito.nombre} × ${enCarrito.cantidad}`);
  } else {
    // Si no existe, crea un nuevo objeto y lo agrega con push()
    // El spread {...producto} copia todas las propiedades del producto original
    carrito.push({
      ...producto,          // copia: id, nombre, precio, stock
      cantidad,             // agrega la propiedad cantidad
      subtotal: producto.precio * cantidad, // calcula el subtotal inicial
    });
    console.log(`  ✔  Agregado: ${producto.nombre} × ${cantidad}`);
  }

  // Descuenta del stock del catálogo
  producto.stock -= cantidad;
};

/**
 * quitarProducto: reduce la cantidad de un producto en el carrito.
 * Si la cantidad llega a 0, lo elimina con filter().
 * @param {number} productoId - ID del producto a quitar
 * @param {number} cantidad   - unidades a quitar
 */
const quitarProducto = (productoId, cantidad) => {
  // find() busca el producto en el carrito
  const enCarrito = carrito.find(item => item.id === productoId);

  if (!enCarrito) return console.log("  ⚠  Producto no está en el carrito.");
  if (cantidad <= 0) return console.log("  ⚠  Cantidad inválida.");

  if (cantidad >= enCarrito.cantidad) {
    // filter() crea un NUEVO array excluyendo el producto quitado
    // (no modifica el array original directamente, asigna uno nuevo)
    carrito = carrito.filter(item => item.id !== productoId);

    // Devuelve el stock al catálogo
    const producto = catalogo.find(p => p.id === productoId);
    if (producto) producto.stock += enCarrito.cantidad;

    console.log(`  ✔  ${enCarrito.nombre} eliminado del carrito.`);
  } else {
    // Si queda algo, solo resta la cantidad
    enCarrito.cantidad -= cantidad;
    enCarrito.subtotal  = enCarrito.precio * enCarrito.cantidad;

    const producto = catalogo.find(p => p.id === productoId);
    if (producto) producto.stock += cantidad;

    console.log(`  ✔  Cantidad reducida. ${enCarrito.nombre} × ${enCarrito.cantidad}`);
  }
};

/**
 * verCarrito: muestra el contenido del carrito usando map() y reduce().
 *
 * map()    → transforma cada item en texto
 * reduce() → suma todos los subtotales para obtener el total
 */
const verCarrito = () => {
  if (carrito.length === 0) return console.log("\n  El carrito está vacío.");

  console.log("\n  ─ Mi carrito ─");

  // map: convierte cada item del carrito en una línea de texto
  carrito
    .map(item =>
      `  [${item.id}] ${item.nombre.padEnd(14)} | ${formatPesos(item.precio)} × ${item.cantidad} = ${formatPesos(item.subtotal)}`
    )
    .forEach(l => console.log(l));

  // reduce: suma todos los subtotales para calcular el gran total
  // acc = acumulador (suma parcial), item = elemento actual
  const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);

  console.log("  ─────────────────────────────────────────");
  console.log(`  TOTAL: ${formatPesos(total)}`);
  console.log(`  Productos en carrito: ${carrito.length}`);
};

/**
 * vaciarCarrito: elimina todos los productos del carrito y devuelve el stock.
 * Asigna un array vacío [] al carrito (la forma más directa de vaciarlo).
 */
const vaciarCarrito = () => {
  if (carrito.length === 0) return console.log("  El carrito ya está vacío.");

  // Devuelve el stock de cada producto al catálogo antes de vaciar
  carrito.forEach(item => {
    const producto = catalogo.find(p => p.id === item.id);
    if (producto) producto.stock += item.cantidad;
  });

  carrito = [];   // reemplaza el array con uno vacío
  console.log("  ✔  Carrito vaciado.");
};

/**
 * finalizarCompra: confirma la compra y muestra el resumen.
 * Usa reduce() para calcular el total final.
 */
const finalizarCompra = () => {
  if (carrito.length === 0) return console.log("  ⚠  El carrito está vacío.");

  // reduce: acumula la suma de todos los subtotales
  const total = carrito.reduce((acc, item) => acc + item.subtotal, 0);

  console.log("\n  ══════════════ FACTURA ══════════════");
  console.log(`  Fecha: ${new Date().toLocaleDateString('es-CO')}`);
  console.log("  ─────────────────────────────────────");

  carrito.forEach(item =>
    console.log(`  ${item.nombre.padEnd(14)} × ${item.cantidad}  ${formatPesos(item.subtotal)}`)
  );

  console.log("  ─────────────────────────────────────");
  console.log(`  TOTAL A PAGAR : ${formatPesos(total)}`);
  console.log("  ══════════════════════════════════════");
  console.log("  ✔  ¡Compra realizada con éxito!");

  // Vacía el carrito después de comprar (ya no se devuelve el stock)
  carrito = [];
};

// ── INTERFAZ readline ─────────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const menu = () => {
  console.log("\n─── CARRITO DE COMPRAS ─────────────────────");
  console.log(" 1. Ver catálogo");
  console.log(" 2. Agregar producto al carrito");
  console.log(" 3. Quitar producto del carrito");
  console.log(" 4. Ver carrito");
  console.log(" 5. Vaciar carrito");
  console.log(" 6. Finalizar compra");
  console.log(" 7. Salir");
  console.log("────────────────────────────────────────────");

  rl.question(" Opción: ", opcion => {
    switch (opcion.trim()) {
      case "1":
        verCatalogo();
        menu();
        break;

      case "2":
        rl.question("  ID del producto: ", id => {
          rl.question("  Cantidad: ", cant => {
            agregarProducto(Number(id), Number(cant));
            menu();
          });
        });
        break;

      case "3":
        rl.question("  ID del producto a quitar: ", id => {
          rl.question("  Cantidad a quitar: ", cant => {
            quitarProducto(Number(id), Number(cant));
            menu();
          });
        });
        break;

      case "4": verCarrito();      menu(); break;
      case "5": vaciarCarrito();   menu(); break;
      case "6": finalizarCompra(); menu(); break;
      case "7": console.log("\n  ¡Hasta pronto!\n"); rl.close(); break;
      default:  console.log("  Opción inválida."); menu(); break;
    }
  });
};

console.log("\n════════════════════════════════════════════");
console.log("         TIENDA - CARRITO DE COMPRAS");
console.log("════════════════════════════════════════════");
menu();