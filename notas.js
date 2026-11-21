function calcularPromedio (n1,n2,n3){
    return (n1+n2+n3)/3;
}

function verificarAprobado (promedio){
    if (promedio >=3.2){
      return "Aprobaste";
    }else{
       return "Reprobaste";
    }
}
function mostrarResultado(promedio,estado){
    console.log("El promedio es:",promedio)
    console.log ("Resultado:",estado)
}
let n1 = 1.0
let n2 = 2.0
let n3 = 5.0
let promedio = calcularPromedio (n1,n2,n3)
let estado= verificarAprobado (promedio)
mostrarResultado(promedio,estado)