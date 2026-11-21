function calcularDistancia(km,precioKm){
    return km * precioKm;
}

function tarifaBase(){
    return 3000;
}

function calcularTotal(costo,base){
    return costo + base;
}

let km = 5;
let precioKm = 2000;

let costo = calcularDistancia(km,precioKm);
let base = tarifaBase();
let total = calcularTotal(costo,base);

console.log("Costo distancia:",costo);
console.log("Tarifa base:",base);
console.log("Total:",total);