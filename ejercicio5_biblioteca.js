const multaDiaria = 1500;
const multaAdicional = 10000;
let cantidadUsuarios = parseInt(
    prompt("¿Cuántos usuarios realizan devoluciones hoy? ")
);
let totalLibros = 0;
let librosConRetraso = 0;
let librosPuntuales = 0;
let totalMultas = 0;
for (let i = 1; i <= cantidadUsuarios; i++) {
    let nombreUsuario = prompt("Nombre del usuario: ");
    console.log("\n--- USUARIO " + i + ": " + nombreUsuario + " ---");
    let cantidadLibros = parseInt(
        prompt("Cantidad de libros que devuelve (máx 3): ")
    );
    while (cantidadLibros > 3 || cantidadLibros <= 0) {
        cantidadLibros = parseInt(
            prompt("❌ Máximo 3 libros. Ingrese nuevamente: ")
        );
    }
    console.log("Libros devueltos:", cantidadLibros);
    let multaUsuario = 0;
    for (let j = 1; j <= cantidadLibros; j++) {
        let diasPrestamo = parseInt(
            prompt("Días que tuvo el libro " + j + ": ")
        );
        let diasRetraso = 0;
        let multaLibro = 0;
        if (diasPrestamo > 7) {
            diasRetraso = diasPrestamo - 7;
        }
        if (diasRetraso === 0) {
            multaLibro = 0;
            librosPuntuales++;
        } else if (diasRetraso <= 15) {
            multaLibro = diasRetraso * multaDiaria;
            librosConRetraso++;
        } else {
            multaLibro =
                (diasRetraso * multaDiaria) + multaAdicional;
            librosConRetraso++;
        }
        console.log(
            "Libro " + j +
            ": " + diasPrestamo + " días — " +
            (diasRetraso === 0
                ? "Sin retraso"
                : diasRetraso + " días de retraso") +
            " — Multa: $" + multaLibro
        );
        multaUsuario += multaLibro;
        totalLibros++;
    }
    let estadoUsuario =
        (multaUsuario === 0)
            ? "PUNTUAL"
            : "CON RETRASO";
    console.log(
        "Multa total usuario: $" +
        multaUsuario + " — " + estadoUsuario
    );
    totalMultas += multaUsuario;
}
console.log("\n=== RESUMEN BIBLIOTECH ===");
console.log("Usuarios atendidos:", cantidadUsuarios);
console.log("Total libros:", totalLibros);
console.log("Libros puntuales:", librosPuntuales);
console.log("Libros con retraso:", librosConRetraso);
console.log("MULTAS RECAUDADAS: $" + totalMultas);