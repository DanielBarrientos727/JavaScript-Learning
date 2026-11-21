function calcularPago(horas, pagoPorHora) {
    return horas * pagoPorHora;
}

function calcularBono(pago) {
    return pago * 0.10;
}

function calcularPrima(pago, mes) {
    if (mes === "junio" || mes === "diciembre") {
        return pago * 0.50;
    } else {
        return 0;
    }
}

function calcularSalarioTotal(pago, bono, prima) {
    return pago + bono + prima;
}

let horasTrabajadas = 40;
let pagoPorHora = 12000;
let mes = "junio";

let pago = calcularPago(horasTrabajadas, pagoPorHora);
let bono = calcularBono(pago);
let prima = calcularPrima(pago, mes);
let salarioTotal = calcularSalarioTotal(pago, bono, prima);

console.log("Pago:", pago);
console.log("Bono:", bono);
console.log("Prima:", prima);
console.log("Salario total:", salarioTotal);