const readline = require('readline');

// ─────────────────────────────────────────────────────────────
//  01 - SISTEMA DE RESERVAS DE HOTEL
//  Conceptos: objetos, arrays, filter, map, reduce, arrow functions
// ─────────────────────────────────────────────────────────────

// ── DATOS INICIALES ──────────────────────────────────────────

// Array de clientes registrados en el sistema
const clientes = [
  { id: 1, nombre: "Ana Torres",   vip: true  },
  { id: 2, nombre: "Luis Pérez",   vip: false },
  { id: 3, nombre: "María García", vip: true  },
  { id: 4, nombre: "Carlos Ruiz",  vip: false },
  { id: 5, nombre: "Sofía Méndez", vip: true  },
];

// Catálogo de habitaciones del hotel
const habitaciones = [
  { numero: 101, tipo: "sencilla",  camas: 1, precioPorNoche: 80,  disponible: true  },
  { numero: 102, tipo: "doble",     camas: 2, precioPorNoche: 120, disponible: true  },
  { numero: 201, tipo: "suite",     camas: 2, precioPorNoche: 250, disponible: true  },
  { numero: 202, tipo: "sencilla",  camas: 1, precioPorNoche: 80,  disponible: false },
  { numero: 301, tipo: "penthouse", camas: 3, precioPorNoche: 500, disponible: true  },
  { numero: 302, tipo: "doble",     camas: 2, precioPorNoche: 120, disponible: false },
];

// Array vacío donde se van acumulando las reservas creadas
const reservas = [];

// Contador para generar números de reserva únicos y consecutivos
let contadorReserva = 1000;

// ── FUNCIONES (arrow functions) ───────────────────────────────

/**
 * crearReserva: genera una nueva reserva y la agrega al array reservas[].
 * Usa find() para localizar cliente y habitación.
 * Marca la habitación como no disponible al finalizar.
 */
const crearReserva = (clienteId, habitacionNum, noches) => {
  // find() devuelve el PRIMER elemento del array que cumple la condición
  const cliente    = clientes.find(c => c.id === clienteId);
  const habitacion = habitaciones.find(h => h.numero === habitacionNum);

  // Validaciones: abortar si algo no existe o está ocupado
  if (!cliente)               return `⚠  Cliente ${clienteId} no encontrado.`;
  if (!habitacion)            return `⚠  Habitación ${habitacionNum} no existe.`;
  if (!habitacion.disponible) return `⚠  Habitación ${habitacionNum} no disponible.`;

  // Incrementa el contador global y genera el código de reserva
  contadorReserva++;
  const numeroReserva = `RES-${contadorReserva}`;

  // Calcula el total: precio noche × cantidad de noches
  const total = habitacion.precioPorNoche * noches;

  // Objeto reserva con todos los datos relevantes
  const nuevaReserva = {
    numeroReserva,            // shorthand: equivale a numeroReserva: numeroReserva
    cliente: cliente.nombre,  // guardamos el nombre, no el id
    clienteVip: cliente.vip,  // útil para filtrar luego
    habitacion: habitacion.numero,
    tipo: habitacion.tipo,
    camas: habitacion.camas,
    noches,
    total,
  };

  // push() agrega el objeto al final del array reservas[]
  reservas.push(nuevaReserva);

  // Evita que esta habitación se reserve de nuevo
  habitacion.disponible = false;

  return `✔  ${numeroReserva} | ${cliente.nombre} | Hab. ${habitacionNum} (${habitacion.tipo}) | $${total}`;
};

/**
 * listarDisponibles: usa filter() para obtener solo habitaciones libres,
 * luego map() para convertir los objetos en texto legible.
 *
 * filter() → crea un NUEVO array con los elementos que pasan la condición
 * map()    → transforma cada elemento en otra cosa (no modifica el original)
 */
const listarDisponibles = () => {
  const libres = habitaciones.filter(h => h.disponible === true);

  if (libres.length === 0) return console.log("  Sin habitaciones disponibles.");

  // map convierte cada objeto habitación en una cadena de texto
  libres
    .map(h => `  Hab ${h.numero} | ${h.tipo.padEnd(10)} | ${h.camas} cama(s) | $${h.precioPorNoche}/noche`)
    .forEach(l => console.log(l));
};

/**
 * listarReservas: usa map() para transformar el array reservas[] en texto.
 * map() devuelve un array del MISMO tamaño, solo cambia la forma de cada elemento.
 */
const listarReservas = () => {
  if (reservas.length === 0) return console.log("  No hay reservas registradas.");

  reservas
    .map((r, i) =>
      `  [${i + 1}] ${r.numeroReserva} | ${r.cliente} | Hab ${r.habitacion} | ${r.noches} noche(s) | $${r.total}`
    )
    .forEach(l => console.log(l));
};

/**
 * reservasVip: usa filter() para quedarse solo con las reservas VIP.
 */
const reservasVip = () => {
  const vip = reservas.filter(r => r.clienteVip === true);

  if (vip.length === 0) return console.log("  No hay reservas VIP activas.");

  vip
    .map(r => `  ★ ${r.numeroReserva} | ${r.cliente} | Hab ${r.habitacion} | $${r.total}`)
    .forEach(l => console.log(l));
};

/**
 * ingresoTotal: usa reduce() para sumar todos los totales de las reservas.
 * reduce(función acumuladora, valor inicial)
 * acc     = acumulador (suma parcial)
 * reserva = elemento actual del array en cada iteración
 */
const ingresoTotal = () => {
  const total = reservas.reduce((acc, reserva) => acc + reserva.total, 0);
  console.log(`  Ingreso total: $${total}`);
};

/**
 * resumenPorTipo: encadena filter + reduce para agrupar ingresos por tipo.
 * Primero filtra las reservas de cada tipo, luego reduce para sumarlas.
 */
const resumenPorTipo = () => {
  if (reservas.length === 0) return console.log("  Sin datos. Crea reservas primero.");

  // Set elimina duplicados; spread [...] lo convierte en array
  const tipos = [...new Set(reservas.map(r => r.tipo))];

  tipos.forEach(tipo => {
    // filter: solo reservas del tipo actual
    const delTipo = reservas.filter(r => r.tipo === tipo);
    // reduce: suma los totales de esas reservas filtradas
    const suma = delTipo.reduce((acc, r) => acc + r.total, 0);
    console.log(`  ${tipo.padEnd(12)} → ${delTipo.length} reserva(s) | $${suma}`);
  });
};

// ── INTERFAZ readline ─────────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const menu = () => {
  console.log("\n─── HOTEL JS ───────────────────────────────");
  console.log(" 1. Habitaciones disponibles (filter)");
  console.log(" 2. Crear reserva de ejemplo");
  console.log(" 3. Listar reservas          (map)");
  console.log(" 4. Reservas VIP             (filter)");
  console.log(" 5. Ingreso total            (reduce)");
  console.log(" 6. Resumen por tipo         (filter + reduce)");
  console.log(" 7. Salir");
  console.log("────────────────────────────────────────────");

  rl.question(" Opción: ", opcion => {
    console.log("");
    switch (opcion.trim()) {
      case "1": listarDisponibles();  menu(); break;
      case "2": {
        // Busca el primer cliente que aún no tenga reserva
        const libre = clientes.find(c => !reservas.some(r => r.cliente === c.nombre));
        const hab   = habitaciones.find(h => h.disponible);
        console.log(libre && hab
          ? crearReserva(libre.id, hab.numero, 3)
          : "  Sin clientes o habitaciones libres.");
        menu();
        break;
      }
      case "3": listarReservas(); menu(); break;
      case "4": reservasVip();    menu(); break;
      case "5": ingresoTotal();   menu(); break;
      case "6": resumenPorTipo(); menu(); break;
      case "7": console.log(" Hasta pronto.\n"); rl.close(); break;
      default:  console.log(" Opción inválida."); menu(); break;
    }
  });
};

// Carga 3 reservas iniciales de demo y arranca el menú
console.log(crearReserva(1, 101, 3));
console.log(crearReserva(3, 201, 2));
console.log(crearReserva(2, 102, 5));
menu();