function convertirDolares(pesos,tasa){
    return pesos/tasa;
}

function calcularComision(dolares){
    return dolares*0.05;
}

function totalFinal(dolares,comision){
    return dolares-comision;
}

let dolares = convertirDolares(400000,4000);
let comision = calcularComision(dolares);
let total = totalFinal(dolares,comision);

console.log("Dolares:",dolares);
console.log("Comision:",comision);
console.log("Total:",total);