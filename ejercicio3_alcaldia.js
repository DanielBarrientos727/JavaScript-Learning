let porcentajeAplicado = 0;
let cont_Beneficiarios60_80 = 0;
let cont_BeneficiariosMayor80 = 0;
let contNoAplica = 0;
let presupuestoTotal = 0;
let subsidio = 0;
let salarioMinimo = 1300000;

let cantidadPersonas = parseInt(prompt("¿Cuántas personas va a registrar? "));

for (let i = 1; i <= cantidadPersonas; i++) {

    let nombre = prompt("Ingrese su nombre completo: ");
    let edad = parseInt(prompt("Ingrese su edad: "));

    if (edad >= 60 && edad <= 80) {
        porcentajeAplicado = 12;
        subsidio = salarioMinimo * 0.12;
        cont_Beneficiarios60_80++;

    } else if (edad > 80) {
        porcentajeAplicado = 15;
        subsidio = salarioMinimo * 0.15;
        cont_BeneficiariosMayor80++;

    } else {
        console.log("No aplica");
        porcentajeAplicado = 0;
        subsidio = 0;
        contNoAplica++;
    }

    let categoria =
        (edad > 80) ? "Adulto Mayor Senior"
        : (edad >= 60) ? "Adulto Mayor"
        : "No aplica";

    console.log("---- PERSONA ----");
    console.log("Nombre",nombre);
    console.log("Edad",edad);
    console.log("Categoria",categoria);
    console.log("Porcentaje:", porcentajeAplicado + "%");
    console.log("Subsidio:", subsidio);

    presupuestoTotal += subsidio;
}
let totalBeneficiarios =
    cont_Beneficiarios60_80 + cont_BeneficiariosMayor80;

console.log("\n---- INFORME ALCALDÍA DE ARMENIA ----");
console.log("Total registrados:", cantidadPersonas);
console.log("Beneficiarios (60-80 años):", cont_Beneficiarios60_80);
console.log("Beneficiarios (>80 años):", cont_BeneficiariosMayor80);
console.log("No aplican:", contNoAplica);
console.log("Total beneficiarios:", totalBeneficiarios);
console.log("PRESUPUESTO TOTAL: $" + presupuestoTotal);