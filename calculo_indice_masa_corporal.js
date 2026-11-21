function calcularIMC(peso,altura){
    return peso/(altura*altura);
}

function clasificarIMC(imc){
    if(imc < 18.5){
        return "Bajo peso";
    }else if(imc < 25){
        return "Normal";
    }else{
        return "Sobrepeso";
    }
}

function mostrarResultado(imc,categoria){
    console.log("IMC:",imc);
    console.log("Categoria:",categoria);
}

let imc = calcularIMC(78,1.74);
let categoria = clasificarIMC(imc);

mostrarResultado(imc,categoria);