let precio1= 15000
let precio2= 22000
let precio3= 35000
let totalCombos=0
let totalCuenta=0
let contadorCombo1= 0
let contadorCombo2= 0 
let contadorCombo3= 0
let opcion;
do {
    console.log ("----BURGUER PALACE----")
    console.log("1. Clásica - 15000")
    console.log("2. Doble poder - 22000")
    console.log("3.Mega Fest - 35000")
    console.log ("4. Finalizar pedido")
    opcion= parseInt(prompt("Escoge tu combo"))
    let precioCombo=0
    let nombreCombo= ""
    if (opcion===1){
        precioCombo=15000
        nombreCombo= "Clásica"
    }else if (opcion===2){
        precioCombo= 22000
        nombreCombo= "Doble poder"
    }else if (opcion=== 3){
        precioCombo= 35000
        nombreCombo="Mega Fest"
    }else if (opcion===4){
        break;
    }else {
        console.log ("Opcion inválida");
        continue;
    }
    let cantidadCombo= parseInt(prompt("Cantidad: "))
    if (opcion === 1) {
        contadorCombo1 += cantidadCombo;
    } else if (opcion === 2) {
        contadorCombo2 += cantidadCombo;
    } else if (opcion === 3) {
        contadorCombo3 += cantidadCombo;
    }
    let subtotal = precioCombo*cantidadCombo
    totalCuenta += subtotal
    totalCombos +=cantidadCombo
    console.log("Combo:",nombreCombo)
    console.log ("Cantidad:", cantidadCombo)
    console.log("Subtotal:", subtotal)
    console.log("Total acumulado", totalCuenta)
}while (opcion !== 4);
console.log("----RESUMEN FINAL----")
console.log("Combo Clásica",contadorCombo1)
console.log("Combo Doble Poder", contadorCombo2)
console.log("Combo Mega Fest" ,contadorCombo3)
console.log("Total combos:", totalCombos)
console.log ("Total a pagar:", totalCuenta)