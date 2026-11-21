let cantidadUsuarios = parseInt(prompt("¿Cuántos usuarios va a registrar?"))
let contadorDescuentos = 0
let acumuladorIngresos = 0
let costoHora= 5000
for (let i = 1; i <= cantidadUsuarios; i++){
    let nombreCliente= prompt("Ingrese su nombre");
    let horasAlquiler = parseInt(prompt("Ingrese el número de horas de alquiler"));
    let costototal = (horasAlquiler*costoHora)
    let descuento = 0
    if ( horasAlquiler>12){
        descuento = (costototal*0.30);
        contadorDescuentos++
    }
    let totalPagar = costototal- descuento
    let mensaje = (descuento > 0)? "CON DESCUENTO": "SIN DESCUENTO"
    console.log ("-----CLIENTE----")
    console.log ("Nombre",nombreCliente)
    console.log ("Horas",horasAlquiler)
    console.log ("Costo sin descuento:"+costototal)
    console.log ("Descuento:"+descuento)
    console.log (mensaje)
    console.log ("Total a pagar"+totalPagar)
    acumuladorIngresos+=totalPagar
    console.log ("----RESUMEN DEL DIA----")
    console.log("Clientes atendidos",cantidadUsuarios)
    console.log("Ingreso total:"+acumuladorIngresos)
    console.log ("Clientes con descuento",contadorDescuentos)
}