const readline = require('readline');

// ─────────────────────────────────────────────────────────────
//  02 - CAJERO AUTOMÁTICO
//  Conceptos: objetos, arrow functions, métodos de array (map),
//             manejo de estado, operaciones bancarias
// ─────────────────────────────────────────────────────────────

// ── DATOS: cuentas bancarias disponibles ─────────────────────

// Cada cuenta es un objeto con sus propiedades y su historial de movimientos
const cuentas = [
  {
    numero: "001-2024",
    titular: "Ana Torres",
    pin: "1234",
    saldo: 2500000,
    movimientos: [],   // array donde se registran todas las transacciones
  },
  {
    numero: "002-2024",
    titular: "Luis Pérez",
    pin: "5678",
    saldo: 800000,
    movimientos: [],
  },
];

// Variable que almacena la cuenta activa durante la sesión
// null = nadie ha iniciado sesión todavía
let cuentaActiva = null;

// ── FUNCIONES DE UTILIDAD ─────────────────────────────────────

/**
 * formatPesos: formatea un número como moneda colombiana (COP).
 * Usa el objeto Intl nativo de JavaScript.
 */
const formatPesos = (valor) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(valor);

/**
 * registrarMovimiento: agrega un objeto de transacción al historial de la cuenta.
 * @param {string} tipo   - "retiro", "consignacion" o "transferencia"
 * @param {number} monto  - cantidad de dinero de la operación
 * @param {string} detalle - descripción opcional del movimiento
 */
const registrarMovimiento = (tipo, monto, detalle = '') => {
  // new Date().toLocaleString() genera la fecha y hora actual en formato legible
  const movimiento = {
    tipo,
    monto,
    detalle,
    fecha: new Date().toLocaleString('es-CO'),
  };
  // push() añade el movimiento al final del array de la cuenta activa
  cuentaActiva.movimientos.push(movimiento);
};

// ── OPERACIONES BANCARIAS ─────────────────────────────────────

/**
 * consultarSaldo: muestra el saldo actual y los últimos movimientos.
 * Usa map() para transformar el array de movimientos en texto legible.
 */
const consultarSaldo = () => {
  console.log(`\n  Titular : ${cuentaActiva.titular}`);
  console.log(`  Cuenta  : ${cuentaActiva.numero}`);
  console.log(`  Saldo   : ${formatPesos(cuentaActiva.saldo)}`);

  if (cuentaActiva.movimientos.length === 0) {
    return console.log("  Sin movimientos registrados.");
  }

  console.log("\n  Últimos movimientos:");

  // slice(-5) obtiene los últimos 5 elementos del array
  // map() convierte cada objeto movimiento en una cadena de texto
  cuentaActiva.movimientos
    .slice(-5)
    .map(m => `  ${m.fecha} | ${m.tipo.toUpperCase().padEnd(14)} | ${formatPesos(m.monto)} ${m.detalle}`)
    .forEach(l => console.log(l));
};

/**
 * retirar: descuenta un monto del saldo si hay fondos suficientes.
 * @param {number} monto - cantidad a retirar
 */
const retirar = (monto) => {
  // Validación: el monto debe ser mayor a cero
  if (monto <= 0)                    return console.log("  ⚠  Monto inválido.");
  // Validación: no se puede retirar más de lo que hay
  if (monto > cuentaActiva.saldo)    return console.log("  ⚠  Saldo insuficiente.");

  // Descuenta el monto del saldo de la cuenta activa
  cuentaActiva.saldo -= monto;

  // Registra el movimiento en el historial
  registrarMovimiento("retiro", monto);

  console.log(`  ✔  Retiro exitoso. Nuevo saldo: ${formatPesos(cuentaActiva.saldo)}`);
};

/**
 * consignar: suma un monto al saldo de la cuenta.
 * @param {number} monto - cantidad a consignar
 */
const consignar = (monto) => {
  if (monto <= 0) return console.log("  ⚠  Monto inválido.");

  // Suma el monto al saldo actual
  cuentaActiva.saldo += monto;

  registrarMovimiento("consignacion", monto);

  console.log(`  ✔  Consignación exitosa. Nuevo saldo: ${formatPesos(cuentaActiva.saldo)}`);
};

/**
 * transferir: mueve dinero desde la cuenta activa hacia otra cuenta.
 * @param {string} numeroCuentaDestino - número de la cuenta receptora
 * @param {number} monto               - cantidad a transferir
 */
const transferir = (numeroCuentaDestino, monto) => {
  // find() busca la cuenta destino en el array cuentas[]
  const destino = cuentas.find(c => c.numero === numeroCuentaDestino);

  if (!destino)                      return console.log("  ⚠  Cuenta destino no encontrada.");
  if (destino === cuentaActiva)      return console.log("  ⚠  No puedes transferir a tu propia cuenta.");
  if (monto <= 0)                    return console.log("  ⚠  Monto inválido.");
  if (monto > cuentaActiva.saldo)    return console.log("  ⚠  Saldo insuficiente.");

  // Descuenta de la cuenta activa
  cuentaActiva.saldo -= monto;
  registrarMovimiento("transferencia", monto, `→ ${destino.titular}`);

  // Acredita a la cuenta destino
  destino.saldo += monto;
  // También registra el ingreso en el historial del destinatario
  destino.movimientos.push({
    tipo: "transferencia recibida",
    monto,
    detalle: `← ${cuentaActiva.titular}`,
    fecha: new Date().toLocaleString('es-CO'),
  });

  console.log(`  ✔  Transferencia de ${formatPesos(monto)} a ${destino.titular} exitosa.`);
  console.log(`     Tu nuevo saldo: ${formatPesos(cuentaActiva.saldo)}`);
};

// ── AUTENTICACIÓN ─────────────────────────────────────────────

/**
 * iniciarSesion: verifica número de cuenta y PIN antes de dar acceso.
 * @param {Function} callback - función a ejecutar si el login es exitoso
 */
const iniciarSesion = (rl, callback) => {
  rl.question("\n  Número de cuenta: ", numeroCuenta => {
    // find() busca la cuenta por su número
    const cuenta = cuentas.find(c => c.numero === numeroCuenta.trim());

    if (!cuenta) {
      console.log("  ⚠  Cuenta no encontrada.");
      return callback(false);
    }

    rl.question("  PIN: ", pin => {
      if (pin.trim() !== cuenta.pin) {
        console.log("  ⚠  PIN incorrecto.");
        return callback(false);
      }

      // Si todo está correcto, activa la sesión
      cuentaActiva = cuenta;
      console.log(`\n  ✔  Bienvenido/a, ${cuentaActiva.titular}`);
      callback(true);
    });
  });
};

// ── INTERFAZ readline ─────────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const menuCajero = () => {
  console.log("\n─── CAJERO AUTOMÁTICO ──────────────────────");
  console.log(" 1. Consultar saldo");
  console.log(" 2. Retirar");
  console.log(" 3. Consignar");
  console.log(" 4. Transferir");
  console.log(" 5. Cerrar sesión");
  console.log("────────────────────────────────────────────");

  rl.question(" Opción: ", opcion => {
    switch (opcion.trim()) {

      // ── Consulta ──────────────────────────────────
      case "1":
        consultarSaldo();
        menuCajero();
        break;

      // ── Retiro ────────────────────────────────────
      case "2":
        rl.question("  Monto a retirar: $", monto => {
          retirar(Number(monto));    // Number() convierte el string del input a número
          menuCajero();
        });
        break;

      // ── Consignación ──────────────────────────────
      case "3":
        rl.question("  Monto a consignar: $", monto => {
          consignar(Number(monto));
          menuCajero();
        });
        break;

      // ── Transferencia ─────────────────────────────
      case "4":
        rl.question("  Cuenta destino: ", destino => {
          rl.question("  Monto: $", monto => {
            transferir(destino.trim(), Number(monto));
            menuCajero();
          });
        });
        break;

      // ── Cerrar sesión ─────────────────────────────
      case "5":
        console.log(`\n  Sesión cerrada. ¡Hasta pronto, ${cuentaActiva.titular}!\n`);
        cuentaActiva = null;   // limpia la sesión activa
        rl.close();
        break;

      default:
        console.log("  Opción inválida.");
        menuCajero();
    }
  });
};

// ── INICIO DEL PROGRAMA ───────────────────────────────────────

console.log("\n════════════════════════════════════════════");
console.log("          CAJERO AUTOMÁTICO");
console.log("════════════════════════════════════════════");
console.log(" Cuentas de prueba:");
console.log("   001-2024  PIN: 1234");
console.log("   002-2024  PIN: 5678");
console.log("────────────────────────────────────────────");

// Inicia sesión y, si es exitosa, muestra el menú principal
iniciarSesion(rl, (exito) => {
  if (exito) menuCajero();
  else rl.close();
});