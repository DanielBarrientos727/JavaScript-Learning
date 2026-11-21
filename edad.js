function calcularEdad(nacimiento,actual){
    return actual - nacimiento;
}

function verificarMayorEdad(edad){
    if(edad >= 18){
        return "Mayor de edad";
    }else{
        return "Menor de edad";
    }
}

function mostrarEdad(edad,estado){
    console.log("Edad:",edad);
    console.log("Estado:",estado);
}

let edad = calcularEdad(2007,2026);
let estado = verificarMayorEdad(edad);

mostrarEdad(edad,estado);