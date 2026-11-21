function calcularLitros(km,consumo){
    return km/consumo;
}

function calcularCosto(litros,precio){
    return litros*precio;
}

function mostrarResultado(litros,costo){
    console.log("Litros usados:",litros);
    console.log("Costo:",costo);
}

let litros = calcularLitros(200,12);
let costo = calcularCosto(litros,15000);

mostrarResultado(litros,costo);