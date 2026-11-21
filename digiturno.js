const readline = require('readline');

// ─────────────────────────────────────────────────────────────
//  04 - DIGITURNO
//  Conceptos: objetos, arrays, push, shift (cola FIFO),
//             filter, map, reduce, arrow functions
//
//  Lógica de la cola: FIFO (First In, First Out)
//  El primero en llegar es el primero en ser atendido.
//  → push()  agrega al FINAL de la cola (llegada)
//  → shift() saca del INICIO de la cola (atención)
// ─────────────────────────────────────────────────────────────

// ── ESTADO DEL SISTEMA ────────────────────────────────────────

// Array que representa la COLA de espera (orden de llegada)
// Los turnos se agregan al final (push) y se atienden desde el inicio (shift)
let cola = [];

// Array de todos los turnos atendidos (histórico)
let atendidos = [];

// Contador global para generar números de turno consecutivos
let contadorTurno = 0;

// Tipos de servicio disponibles y su tiempo estimado en minutos
const servicios = {
  "CAJA":     { nombre: "Caja",             tiempoEstimado: 5  },
  "INFO":     { nombre: "Información",      tiempoEstimado: 3  },
  "CREDITO":  { nombre: "Créditos",         tiempoEstimado: 15 },
  "RECLAMO":  { nombre: "Reclamos",         tiempoEstimado: 10 },
};

// ── FUNCIONES DEL DIGITURNO ───────────────────────────────────

/**
 * asignarTurno: crea un nuevo turno y lo agrega al FINAL de la cola.
 * El número de turno se genera combinando el tipo de servicio + contador.
 * @param {string} nombre  - nombre de la persona
 * @param {string} servicio - código del servicio (ej: "CAJA")
 */
const asignarTurno = (nombre, servicio) => {
  const servicioUpper = servicio.toUpperCase();

  // Valida que el servicio solicitado exista en el catálogo
  if (!servicios[servicioUpper]) {
    return console.log(`  ⚠  Servicio "${servicio}" no existe. Opciones: ${Object.keys(servicios).join(', ')}`);
  }

  // Incrementa el contador y genera el código del turno (ej: CAJA-001)
  contadorTurno++;
  const codigoTurno = `${servicioUpper}-${String(contadorTurno).padStart(3, '0')}`;

  // Objeto turno con toda la información del cliente en espera
  const nuevoTurno = {
    turno:     codigoTurno,                       // identificador único
    nombre,                                        // nombre del cliente
    servicio:  servicioUpper,                      // tipo de servicio solicitado
    posicion:  cola.length + 1,                    // posición actual en la cola
    horaLlegada: new Date().toLocaleTimeString('es-CO'), // hora de llegada
    estado:    "en espera",                        // estado inicial
  };

  // push() agrega el turno al FINAL del array (cola FIFO)
  cola.push(nuevoTurno);

  // Calcula el tiempo de espera estimado sumando los tiempos de todos los turnos anteriores
  // reduce acumula el tiempo de cada persona en espera antes que el nuevo cliente
  const tiempoEspera = cola
    .slice(0, -1)   // todos los turnos excepto el recién agregado
    .reduce((acc, t) => acc + servicios[t.servicio].tiempoEstimado, 0);

  console.log(`\n  ══════════════════════════════`);
  console.log(`   TURNO ASIGNADO: ${codigoTurno}`);
  console.log(`   Cliente : ${nombre}`);
  console.log(`   Servicio: ${servicios[servicioUpper].nombre}`);
  console.log(`   Posición: ${cola.length} en la cola`);
  console.log(`   Espera aprox.: ${tiempoEspera} minutos`);
  console.log(`  ══════════════════════════════`);
};

/**
 * llamarSiguiente: atiende al PRIMER turno de la cola.
 * shift() extrae y devuelve el primer elemento del array (cola FIFO).
 * Actualiza las posiciones de todos los demás con map().
 */
const llamarSiguiente = () => {
  if (cola.length === 0) return console.log("\n  ⚠  La cola está vacía. No hay turnos pendientes.");

  // shift() saca el PRIMER elemento del array (el que lleva más tiempo esperando)
  const turnoAtendido = cola.shift();
  turnoAtendido.estado      = "atendido";
  turnoAtendido.horaAtencion = new Date().toLocaleTimeString('es-CO');

  // Agrega el turno al histórico de atendidos
  atendidos.push(turnoAtendido);

  console.log(`\n  ► Llamando al turno: ${turnoAtendido.turno}`);
  console.log(`    Cliente : ${turnoAtendido.nombre}`);
  console.log(`    Servicio: ${servicios[turnoAtendido.servicio].nombre}`);

  // map() actualiza la posición de cada turno restante en la cola
  // como se quitó el primero, todos bajan una posición
  cola = cola.map((t, index) => ({
    ...t,               // spread: conserva todas las propiedades del turno
    posicion: index + 1 // actualiza la posición (0 + 1 = 1, 1 + 1 = 2...)
  }));

  // Anuncia quién es el próximo si hay más personas esperando
  if (cola.length > 0) {
    console.log(`\n    Próximo turno: ${cola[0].turno} (${cola[0].nombre})`);
  } else {
    console.log("\n    Cola vacía. No hay más turnos.");
  }
};

/**
 * verCola: muestra todos los turnos en espera con su posición actual.
 * Usa map() para transformar los objetos turno en texto legible.
 */
const verCola = () => {
  console.log(`\n  ─ Cola de espera (${cola.length} persona(s)) ─`);

  if (cola.length === 0) return console.log("  No hay nadie en cola.");

  // map: transforma cada turno en una línea de texto descriptiva
  cola
    .map(t =>
      `  [${t.posicion}] ${t.turno.padEnd(10)} | ${t.nombre.padEnd(16)} | ${servicios[t.servicio].nombre} | Llegó: ${t.horaLlegada}`
    )
    .forEach(l => console.log(l));

  // reduce: suma el tiempo de espera total de toda la cola
  const tiempoTotal = cola.reduce((acc, t) => acc + servicios[t.servicio].tiempoEstimado, 0);
  console.log(`\n  Tiempo total estimado de la cola: ${tiempoTotal} minutos`);
};

/**
 * estadisticas: genera un resumen de la jornada usando filter y reduce.
 */
const estadisticas = () => {
  const totalAtendidos = atendidos.length;

  if (totalAtendidos === 0) return console.log("\n  Sin estadísticas aún. Atiende algunos turnos primero.");

  console.log("\n  ─ Estadísticas de la jornada ─");
  console.log(`  Total atendidos : ${totalAtendidos}`);
  console.log(`  En espera       : ${cola.length}`);
  console.log(`  Total generados : ${contadorTurno}`);

  // Muestra cuántos turnos se atendieron por cada tipo de servicio
  // Usa filter para contar los atendidos de cada servicio
  Object.keys(servicios).forEach(tipo => {
    // filter: cuántos atendidos pertenecen a este tipo de servicio
    const count = atendidos.filter(t => t.servicio === tipo).length;
    if (count > 0) console.log(`  ${servicios[tipo].nombre.padEnd(16)}: ${count} atendido(s)`);
  });
};

/**
 * cancelarTurno: elimina un turno específico de la cola usando filter().
 * filter crea un nuevo array SIN el turno que se quiere cancelar.
 * @param {string} codigoTurno - código del turno a cancelar (ej: "CAJA-002")
 */
const cancelarTurno = (codigoTurno) => {
  const existe = cola.find(t => t.turno === codigoTurno.toUpperCase());

  if (!existe) return console.log(`  ⚠  Turno ${codigoTurno} no está en la cola.`);

  // filter: crea un nuevo array excluyendo el turno cancelado
  cola = cola.filter(t => t.turno !== codigoTurno.toUpperCase());

  // map: actualiza posiciones después de eliminar un turno intermedio
  cola = cola.map((t, index) => ({ ...t, posicion: index + 1 }));

  console.log(`  ✔  Turno ${codigoTurno} cancelado. Quedan ${cola.length} en cola.`);
};

// ── INTERFAZ readline ─────────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const menu = () => {
  console.log("\n─── DIGITURNO ──────────────────────────────");
  console.log(" 1. Asignar turno");
  console.log(" 2. Llamar siguiente turno");
  console.log(" 3. Ver cola completa");
  console.log(" 4. Cancelar turno");
  console.log(" 5. Estadísticas");
  console.log(" 6. Salir");
  console.log("────────────────────────────────────────────");
  console.log(` Personas en cola: ${cola.length}`);
  console.log("────────────────────────────────────────────");

  rl.question(" Opción: ", opcion => {
    switch (opcion.trim()) {
      case "1":
        console.log("\n  Servicios: CAJA | INFO | CREDITO | RECLAMO");
        rl.question("  Nombre del cliente: ", nombre => {
          rl.question("  Servicio: ", servicio => {
            asignarTurno(nombre.trim(), servicio.trim());
            menu();
          });
        });
        break;

      case "2": llamarSiguiente(); menu(); break;
      case "3": verCola();         menu(); break;

      case "4":
        rl.question("  Código del turno a cancelar (ej: CAJA-001): ", turno => {
          cancelarTurno(turno.trim());
          menu();
        });
        break;

      case "5": estadisticas(); menu(); break;
      case "6": console.log("\n  Sistema apagado.\n"); rl.close(); break;
      default:  console.log("  Opción inválida."); menu(); break;
    }
  });
};

console.log("\n════════════════════════════════════════════");
console.log("             SISTEMA DIGITURNO");
console.log("════════════════════════════════════════════");
menu();