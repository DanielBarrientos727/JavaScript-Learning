function calcularSubtotal(precio,cantidad){
    return precio*cantidad;
}

function calcularDescuento(subtotal){
    return subtotal*0.10;
}

function calcularTotal(subtotal,descuento){
    return subtotal-descuento;
}

let subtotal = calcularSubtotal(12000,3);
let descuento = calcularDescuento(subtotal);
let total = calcularTotal(subtotal,descuento);

console.log("Subtotal:",subtotal);
console.log("Descuento:",descuento);
console.log("Total:",total);