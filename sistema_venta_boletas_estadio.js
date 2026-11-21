const readline = require('readline');

// ─────────────────────────────────────────────────────────────
//  05 - VENTA DE BOLETAS - ESTADIO
//  Conceptos: objetos, arrays, filter, map, reduce, find,
//             arrow functions, spread operator, Date
// ─────────────────────────────────────────────────────────────

// ── CONFIGURACIÓN DEL EVENTO ──────────────────────────────────

// Objeto que describe el partido y la capacidad total del estadio
const evento = {
  nombre:   "Final Copa Ciudad",
  equipos:  "América FC vs. Deportivo Sur",
  fecha:    "2025-09-20",
  hora:     "15:00",
  estadio:  "Estadio Municipal",
};

// Zonas del estadio: cada zona tiene una capacidad máxima y boletas vendidas
// Los boletos vendidos se contarán dinámicamente desde el array ventasRealizadas
const zonas = [
  { codigo: "N", nombre: "Norte (General)",   capacidad: 5000, precio: 30000  },
  { codigo: "S", nombre: "Sur (General)",     capacidad: 5000, precio: 30000  },
  { codigo: "O", nombre: "Occidental (VIP)",  capacidad: 2000, precio: 80000  },
  { codigo: "E", nombre: "Oriental (VIP)",    capacidad: 2000, precio: 80000  },
  { codigo: "P", nombre: "Palco Preferencial",capacidad: 500,  precio: 150000 },
];

// Array donde se acumulan todas las ventas realizadas
const ventasRealizadas = [];

// Contador para generar códigos únicos de boleta
let contadorBoleta = 5000;

// ── FUNCIONES DE UTILIDAD ─────────────────────────────────────

const formatPesos = (valor) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(valor);

/**
 * boletasVendidasPorZona: cuenta cuántas boletas se han vendido en una zona.
 * Usa filter() para filtrar solo las ventas de esa zona,
 * luego reduce() para sumar las cantidades.
 * @param {string} codigoZona - código de la zona ("N", "S", "O", "E", "P")
 */
const boletasVendidasPorZona = (codigoZona) =>
  // filter: solo las ventas que corresponden a la zona indicada
  ventasRealizadas
    .filter(v => v.zona === codigoZona)
    // reduce: suma la propiedad 'cantidad' de cada venta filtrada
    .reduce((acc, v) => acc + v.cantidad, 0);

/**
 * disponibilidadZona: calcula las boletas restantes en una zona.
 * Capacidad total menos las ya vendidas.
 */
const disponibilidadZona = (codigoZona) => {
  const zona = zonas.find(z => z.codigo === codigoZona);
  return zona ? zona.capacidad - boletasVendidasPorZona(codigoZona) : 0;
};

// ── FUNCIONES PRINCIPALES ─────────────────────────────────────

/**
 * verDisponibilidad: muestra todas las zonas con sus boletas disponibles.
 * Usa map() para convertir cada zona en texto, y reduce() para el total disponible.
 */
const verDisponibilidad = () => {
  console.log(`\n  Evento   : ${evento.nombre}`);
  console.log(`  Partidos : ${evento.equipos}`);
  console.log(`  Fecha    : ${evento.fecha}  ${evento.hora}`);
  console.log(`  Estadio  : ${evento.estadio}`);
  console.log("\n  ─ Zonas disponibles ─");

  // map: transforma cada objeto zona en una línea de texto con disponibilidad actual
  zonas
    .map(z => {
      const disponibles = disponibilidadZona(z.codigo);         // boletas restantes
      const vendidas    = boletasVendidasPorZona(z.codigo);     // boletas vendidas
      const porcentaje  = Math.round((vendidas / z.capacidad) * 100); // % ocupación
      const estado      = disponibles === 0 ? " [AGOTADO]" : "";
      return `  [${z.codigo}] ${z.nombre.padEnd(22)} | ${formatPesos(z.precio).padEnd(14)} | Disponibles: ${disponibles}/${z.capacidad} (${porcentaje}% lleno)${estado}`;
    })
    .forEach(l => console.log(l));

  // reduce: suma todas las boletas disponibles en todo el estadio
  const totalDisponibles = zonas.reduce((acc, z) => acc + disponibilidadZona(z.codigo), 0);
  // reduce: suma la capacidad total del estadio
  const capacidadTotal   = zonas.reduce((acc, z) => acc + z.capacidad, 0);

  console.log("\n  ─────────────────────────────────────────");
  console.log(`  Total disponible: ${totalDisponibles} de ${capacidadTotal} boletas`);
};

/**
 * comprarBoletas: registra la compra de boletas para una zona.
 * @param {string} nombreComprador - nombre del comprador
 * @param {string} codigoZona      - zona elegida
 * @param {number} cantidad        - boletas a comprar
 */
const comprarBoletas = (nombreComprador, codigoZona, cantidad) => {
  // find() localiza la zona en el array zonas[]
  const zona = zonas.find(z => z.codigo === codigoZona.toUpperCase());

  if (!zona)          return console.log("  ⚠  Zona no encontrada.");
  if (cantidad <= 0)  return console.log("  ⚠  Cantidad inválida.");

  const disponibles = disponibilidadZona(zona.codigo);

  if (cantidad > disponibles)
    return console.log(`  ⚠  Solo hay ${disponibles} boletas disponibles en ${zona.nombre}.`);

  // Límite de boletas por compra para evitar acaparamiento
  if (cantidad > 10)
    return console.log("  ⚠  Máximo 10 boletas por compra.");

  // Genera un código único de venta
  contadorBoleta++;
  const codigoVenta = `BOL-${contadorBoleta}`;
  const subtotal    = zona.precio * cantidad;

  // Objeto venta con todos los datos de la transacción
  const nuevaVenta = {
    codigo:      codigoVenta,
    comprador:   nombreComprador,
    zona:        zona.codigo,
    nombreZona:  zona.nombre,
    cantidad,
    precioUnitario: zona.precio,
    total:       subtotal,
    fecha:       new Date().toLocaleString('es-CO'),
  };

  // push() registra la venta en el historial
  ventasRealizadas.push(nuevaVenta);

  // Genera los códigos individuales de cada boleta
  // Array.from crea un array de longitud 'cantidad', map lo llena con códigos
  const codigosBoletas = Array.from({ length: cantidad }, (_, i) =>
    `${codigoVenta}-${String(i + 1).padStart(2, '0')}`
  );

  console.log("\n  ══════════════════════════════════════");
  console.log("   COMPROBANTE DE COMPRA");
  console.log("  ══════════════════════════════════════");
  console.log(`   Código venta : ${codigoVenta}`);
  console.log(`   Comprador    : ${nombreComprador}`);
  console.log(`   Evento       : ${evento.nombre}`);
  console.log(`   Zona         : ${zona.nombre}`);
  console.log(`   Cantidad     : ${cantidad} boleta(s)`);
  console.log(`   Precio unit. : ${formatPesos(zona.precio)}`);
  console.log(`   TOTAL        : ${formatPesos(subtotal)}`);
  console.log(`   Fecha        : ${nuevaVenta.fecha}`);
  console.log("  ──────────────────────────────────────");
  console.log("   Códigos de boletas:");
  // map: formatea cada código de boleta para mostrarlo
  codigosBoletas.map(c => `   · ${c}`).forEach(l => console.log(l));
  console.log("  ══════════════════════════════════════");
};

/**
 * historialVentas: muestra todas las ventas realizadas.
 * Usa map() para transformar y reduce() para calcular el total recaudado.
 */
const historialVentas = () => {
  console.log("\n  ─ Historial de ventas ─");

  if (ventasRealizadas.length === 0)
    return console.log("  Sin ventas registradas.");

  // map: convierte cada venta en una cadena de texto legible
  ventasRealizadas
    .map((v, i) =>
      `  [${i + 1}] ${v.codigo} | ${v.comprador.padEnd(16)} | ${v.nombreZona.padEnd(22)} | ${v.cantidad} boleta(s) | ${formatPesos(v.total)}`
    )
    .forEach(l => console.log(l));

  // reduce: suma todos los totales para obtener el recaudo global
  const recaudoTotal = ventasRealizadas.reduce((acc, v) => acc + v.total, 0);
  const totalBoletas = ventasRealizadas.reduce((acc, v) => acc + v.cantidad, 0);

  console.log("  ─────────────────────────────────────────");
  console.log(`  Boletas vendidas : ${totalBoletas}`);
  console.log(`  Recaudo total    : ${formatPesos(recaudoTotal)}`);
};

/**
 * buscarBoleta: permite a un comprador verificar su compra.
 * Usa find() para localizar la venta por código.
 */
const buscarBoleta = (codigoVenta) => {
  // find() busca la primera venta cuyo código coincida
  const venta = ventasRealizadas.find(v => v.codigo === codigoVenta.toUpperCase());

  if (!venta) return console.log(`  ⚠  Código ${codigoVenta} no encontrado.`);

  console.log(`\n  ✔  Venta válida`);
  console.log(`     Comprador : ${venta.comprador}`);
  console.log(`     Zona      : ${venta.nombreZona}`);
  console.log(`     Boletas   : ${venta.cantidad}`);
  console.log(`     Total     : ${formatPesos(venta.total)}`);
  console.log(`     Fecha     : ${venta.fecha}`);
};

/**
 * resumenPorZona: usa filter + reduce para mostrar estadísticas por zona.
 */
const resumenPorZona = () => {
  if (ventasRealizadas.length === 0)
    return console.log("  Sin ventas para mostrar resumen.");

  console.log("\n  ─ Resumen por zona ─");

  // Para cada zona, filtra sus ventas y reduce para sumar el recaudo
  zonas.forEach(z => {
    // filter: solo ventas de esta zona
    const ventasZona = ventasRealizadas.filter(v => v.zona === z.codigo);

    if (ventasZona.length === 0) return; // si no hay ventas, omite esta zona

    // reduce: suma el total recaudado en esta zona
    const recaudo = ventasZona.reduce((acc, v) => acc + v.total, 0);
    const boletas = ventasZona.reduce((acc, v) => acc + v.cantidad, 0);

    console.log(`  ${z.nombre.padEnd(22)} | ${boletas} boletas | ${formatPesos(recaudo)}`);
  });
};

// ── INTERFAZ readline ─────────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const menu = () => {
  console.log("\n─── VENTA DE BOLETAS - ESTADIO ─────────────");
  console.log(" 1. Ver disponibilidad de zonas");
  console.log(" 2. Comprar boletas");
  console.log(" 3. Historial de ventas");
  console.log(" 4. Buscar boleta por código");
  console.log(" 5. Resumen de ventas por zona");
  console.log(" 6. Salir");
  console.log("────────────────────────────────────────────");

  rl.question(" Opción: ", opcion => {
    switch (opcion.trim()) {
      case "1":
        verDisponibilidad();
        menu();
        break;

      case "2":
        rl.question("  Nombre del comprador: ", nombre => {
          rl.question("  Zona (N/S/O/E/P): ", zona => {
            rl.question("  Cantidad de boletas: ", cant => {
              comprarBoletas(nombre.trim(), zona.trim(), Number(cant));
              menu();
            });
          });
        });
        break;

      case "3": historialVentas(); menu(); break;

      case "4":
        rl.question("  Código de venta (ej: BOL-5001): ", codigo => {
          buscarBoleta(codigo.trim());
          menu();
        });
        break;

      case "5": resumenPorZona(); menu(); break;
      case "6": console.log("\n  ¡Hasta el partido!\n"); rl.close(); break;
      default:  console.log("  Opción inválida."); menu(); break;
    }
  });
};

console.log("\n════════════════════════════════════════════");
console.log("       SISTEMA DE VENTA DE BOLETAS");
console.log(`       ${evento.equipos}`);
console.log("════════════════════════════════════════════");
menu();