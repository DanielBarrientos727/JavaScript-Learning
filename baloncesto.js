function totalPuntos(p1,p2,p3){
    return p1+p2+p3;
}

function promedioPuntos(total){
    return total/3;
}

function mostrarEstadisticas(total,promedio){
    console.log("Total puntos:",total);
    console.log("Promedio:",promedio);
}

let total = totalPuntos(20,18,25);
let promedio = promedioPuntos(total);

mostrarEstadisticas(total,promedio);