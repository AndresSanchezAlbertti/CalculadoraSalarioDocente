const cargosDB = [
    { area: "primaria", nombre_cargo: "maestro_grado(j.s)", puntaje_cargo: 1135 },
    { area: "primaria", nombre_cargo: "vicedirector(j.s)", puntaje_cargo: 15 },
    { area: "primaria", nombre_cargo: "director(j.s)", puntaje_cargo: 20 },
    { area: "primaria", nombre_cargo: "m.seccion(j.s)", puntaje_cargo: 12 },
    { area: "primaria", nombre_cargo: "maestro grado(j.s)", puntaje_cargo: 1135 },
    { area: "primaria", nombre_cargo: "vicedirector(j.c)", puntaje_cargo: 18 },
    { area: "primaria", nombre_cargo: "director(j.c)", puntaje_cargo: 25 },
    { area: "primaria", nombre_cargo: "m.seccion(j.c)", puntaje_cargo: 15 }
];

const INDICE_I = 157.5300;
const sumaFijaTestigo = 163222;
const puntajeCargoTestigo = 1135;  

function calcularSueldo() {
    const area = document.getElementById("area").value;
    const jornada = document.getElementById("jornada").value;
    const antiguedad = document.getElementById("antiguedad").value;
    const cargo =
        jornada === "simple"
            ? document.getElementById("cargoprimariajs").value
            : document.getElementById("cargoprimariajc").value;

    const cargoData = cargosDB.find(c => c.area === area && c.nombre_cargo === cargo);

    if (!cargoData) {
        document.querySelector(".textoresultado").innerText =
            "No se encontró el cargo especificado.";
        return;
    }
//carga datos 
//obtengo el porcentaje de antiguedad
//calculo el sueldo basico
//calculo la antiguedad
//calculo la suma fija decreto
//calculo la antiguedad decreto
//calculo el adicional salarial
//calculo el material didactico
//calculo el material didactico NRNB
//calculo el complemento minimo garantizado
//calculo el cfp
//calculo la suma fija
//calculo la compensacion transitoria
//calculo el total del sueldo

    const puntajeCargo = cargoData.puntaje_cargo;

    const antiguedadPorcentaje = obtenerPorcentajeAntiguedad(antiguedad);
    const sueldoBasico = puntajeCargo * INDICE_I;
    const antiguedadMonto = (sueldoBasico * antiguedadPorcentaje) / 100;

    const sumaFijaDecreto = obtener_proporcionalidad(puntajeCargo, sumaFijaTestigo, puntajeCargoTestigo);
    const antiguedadDecreto = (sumaFijaDecreto * antiguedadPorcentaje)/100;
    const adicionalSalarial = (sueldoBasico + sumaFijaDecreto) * 0.1;
    const materialDidactico = sumaFijaDecreto * 0.4;
    const materialDidacticoNRNB = sumaFijaDecreto * 0.6;
    const complementoMinimoGarantizado = calcular_complemento_minimo_garantizado(sueldoBasico, antiguedadMonto, adicionalSalarial, sumaFijaDecreto, antiguedadDecreto, materialDidactico, obtenerSueldoMinimoGarantizado(jornada));
    const cfp = jornadaEquivalente(jornada) * 0.5;
    const sumaFija = puntajeCargo * 0.8;
    const compensacionTransitoria = jornadaEquivalente(jornada) * 0.7;

    const totalSueldo =
        sueldoBasico +
        antiguedadMonto +
        sumaFijaDecreto +
        antiguedadDecreto +
        adicionalSalarial +
        materialDidactico +
        materialDidacticoNRNB +
        complementoMinimoGarantizado +
        cfp +
        sumaFija +
        compensacionTransitoria;

    document.querySelector(".textoresultado").innerHTML = `
        <p><strong>Sueldo Básico:</strong> ${sueldoBasico.toFixed(2)}</p>
        <p><strong>Antigüedad:</strong> ${antiguedadMonto.toFixed(2)}</p>

        <p><strong>Suma Fija Decreto 483:</strong> ${sumaFijaDecreto.toFixed(2)}</p>
        <p><strong>Total Sueldo:</strong> ${totalSueldo.toFixed(2)}</p>
    `;
}
function obtener_proporcionalidad(puntaje_cargo, suma_fija,cargo_testigo){ 
    return suma_fija/cargo_testigo * puntaje_cargo;
}

function obtenerSueldoMinimoGarantizado(jornada){
    if (jornada === "simple") return  500000;
    if (jornada === "completa") return  60000;
    return 0;
}
    
function calcular_complemento_minimo_garantizado(sueldoBasico, antiguedadMonto, adicionalSalarial, sumaFijaDecreto, antiguedadDecreto, materialDidactico, sueldoMinimoGarantizado) {
    var complementoMinimoGarantizado = sueldoBasico + antiguedadMonto + adicionalSalarial + sumaFijaDecreto + antiguedadDecreto + materialDidactico;

    if (complementoMinimoGarantizado < sueldoMinimoGarantizado){
        return sueldoMinimoGarantizado;
    } else {
        return complementoMinimoGarantizado;
    }

        
}

function obtenerPorcentajeAntiguedad(antiguedad) {
    switch (antiguedad) {
        case "1-3":
            return 5;
        case "4-6":
            return 10;
        case "7-9":
            return 15;
        case "10-11":
            return 20;
        case "12-13":
            return 25;
        case "14-15":
            return 30;
        case "16-17":
            return 35;
        case "17-19":
            return 40;
        case "20_mas":
            return 50;
        default:
            return 0;
    }
}

function jornadaEquivalente(jornada) {
    if (jornada === "simple") return 1;
    if (jornada === "completa") return 2;
    return 0;
}