// Array de palabras
let palabras = ["gato","perro","futbol","computador","pizza"]

// Variable de intentos
let intentos = 3

// Función para elegir palabra secreta
function generarPalabra(){
    let indice = Math.floor(Math.random() * palabras.length)
    return palabras[indice]
}

// Función para verificar la respuesta
function verificarPalabra(secreta, intento){

    if(intento === secreta){
        return true
    }else{
        return false
    }

}

// Función principal del juego
function jugar(){

    let palabraSecreta = generarPalabra()

    while(intentos > 0){

        let intento = prompt("Adivina la palabra")

        if(verificarPalabra(palabraSecreta,intento)){
            console.log("¡Ganaste!")
            return
        }else{
            intentos--
            console.log("Incorrecto. Intentos restantes:",intentos)
        }

    }

    console.log("Perdiste. La palabra era:",palabraSecreta)

}

// iniciar juego
jugar()