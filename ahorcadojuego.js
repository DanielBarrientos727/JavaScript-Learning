// ============================================================
//  AHORCADO — Se juega solo con prompt() y alert()
//  Pega este código en la consola del navegador y presiona Enter
// ============================================================

const MAX_ERRORES = 6;

const palabras = ["elefante", "mariposa", "cocodrilo", "serpiente",
                  "variable", "funcion", "operador", "algoritmo",
                  "colombia", "argentina", "mexico", "finlandia"];

// Elegir palabra aleatoria
const indice = Math.floor(Math.random() * palabras.length);
const palabraSecreta = palabras[indice];

let letrasUsadas = [];
let errores = 0;

// Mostrar la palabra con guiones
function mostrarPalabra() {
  let display = "";
  for (const letra of palabraSecreta) {
    if (letrasUsadas.includes(letra)) {
      display += letra + " ";
    } else {
      display += "_ ";
    }
  }
  return display.trim();
}

// Verificar si ganó
function verificarVictoria() {
  for (const letra of palabraSecreta) {
    if (!letrasUsadas.includes(letra)) return false;
  }
  return true;
}

// Bucle principal del juego
while (errores < MAX_ERRORES && !verificarVictoria()) {

  const mensaje = "AHORCADO\n\n" +
    "Palabra: " + mostrarPalabra() + "\n" +
    "Errores: " + errores + " / " + MAX_ERRORES + "\n" +
    "Letras usadas: " + (letrasUsadas.length > 0 ? letrasUsadas.join(", ") : "ninguna") + "\n\n" +
    "¿Qué letra intentas?";

  const entrada = prompt(mensaje);

  // Si el usuario cancela, salir
  if (entrada === null) break;

  const letra = entrada.toLowerCase().trim();

  // Validar que sea una sola letra
  if (letra.length !== 1) {
    alert("Ingresa solo UNA letra.");
    continue;
  }

  if (letrasUsadas.includes(letra)) {
    alert("Ya usaste la letra '" + letra + "'. Intenta con otra.");
    continue;
  }

  letrasUsadas.push(letra);

  if (palabraSecreta.includes(letra)) {
    alert("✅ ¡La letra '" + letra + "' está en la palabra!");
  } else {
    errores++;
    alert("❌ La letra '" + letra + "' no está. Errores: " + errores + "/" + MAX_ERRORES);
  }
}

// Resultado final
if (verificarVictoria()) {
  alert("🎉 ¡GANASTE! La palabra era: " + palabraSecreta.toUpperCase());
} else {
  alert("💀 PERDISTE. La palabra era: " + palabraSecreta.toUpperCase());
}