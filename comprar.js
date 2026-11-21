function calcularSubtotal (cantidad,precio){
    return cantidad * precio
}

function calcularIVA (subtotal){
    return subtotal * 0.19;
}

function calcularTotal (subtotal,iva){
    return subtotal + iva;
}

let precio = 10000
let cantidad = 4

let subtotal = calcularSubtotal(cantidad,precio)
let iva = calcularIVA(subtotal)
let total = calcularTotal(subtotal, iva)

console.log("Subtotal:", subtotal)
console.log("IVA:", iva)
console.log("Total:", total)