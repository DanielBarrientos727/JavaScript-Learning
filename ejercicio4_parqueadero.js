let opcionMenu = 0;
let contMotos = 0;
let contCarros = 0;
let contCamionetas = 0;
let ingresoTotal = 0;
let sumaHoras = 0;
let totalVehiculos = 0;
while (opcionMenu != 2) {
    console.log("=== PARQUIFÁCIL ===");
    console.log("1. Registrar vehículo");
    console.log("2. Cerrar jornada");
    opcionMenu = parseInt(prompt("Seleccione una opción:"));
    if (opcionMenu == 1) {
        let tipoVehiculo = parseInt(prompt(
            "Tipo vehículo:\n1. Moto\n2. Carro\n3. Camioneta/SUV"
        ));
        let tarifaHora = 0;
        let nombreTipo = "";
        if (tipoVehiculo == 1) {
            tarifaHora = 2000;
            nombreTipo = "Moto";
            contMotos++;
        }
        else if (tipoVehiculo == 2) {
            tarifaHora = 4000;
            nombreTipo = "Carro";
            contCarros++;
        }
        else if (tipoVehiculo == 3) {
            tarifaHora = 6000;
            nombreTipo = "Camioneta/SUV";
            contCamionetas++;
        }
        else {
            console.log("❌ Tipo inválido");
            continue; // vuelve al menú
        }
        let horasPermanencia = parseFloat(
            prompt("Horas de permanencia:")
        );
        let costoTotal = tarifaHora * horasPermanencia;
        let descuento = 0;
        if (horasPermanencia > 8) {
            descuento = costoTotal * 0.20;
        }
        let totalPagar = costoTotal - descuento;
        let tipoTarifa =
            (horasPermanencia > 8)
            ? "TARIFA DÍA COMPLETO (20% desc.)"
            : "TARIFA POR HORAS";
        console.log("---- VEHÍCULO REGISTRADO ----");
        console.log("Tipo:", nombreTipo);
        console.log("Horas:", horasPermanencia);
        console.log("Subtotal: $" + costoTotal);
        console.log("Descuento: $" + descuento);
        console.log(tipoTarifa);
        console.log("Total a pagar: $" + totalPagar);
        ingresoTotal += totalPagar;
        sumaHoras += horasPermanencia;
        totalVehiculos++;

    }
}
let promedioHoras =
    totalVehiculos > 0
    ? sumaHoras / totalVehiculos
    : 0;

console.log("=== CIERRE DE JORNADA ===");
console.log("Motos:", contMotos);
console.log("Carros:", contCarros);
console.log("Camionetas:", contCamionetas);
console.log("Total vehículos:", totalVehiculos);
console.log("Ingreso total: $" + ingresoTotal);
console.log("Promedio permanencia:", promedioHoras.toFixed(2), "horas");