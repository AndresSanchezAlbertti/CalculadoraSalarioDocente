
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
const sumaFijaTestigoJornadaSimple = 224445;
const puntajeCargoTestigoJornadaSimple = 1135;  
const sumaFijaMaterialDidactico = 264204;

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
    //OBTENGO PORCENTAJE DE ANTIGUEDAD
    const antiguedadPorcentaje = obtenerPorcentajeAntiguedad(antiguedad);
    //CALCULO SUELDO BASICO
    const sueldoBasico = new SueldoBasico(puntajeCargo, INDICE_I).calcularSueldoBasico();
    //CAÑCULO ANTIGUEDAD
    const antiguedadMonto = new Antiguedad(antiguedadPorcentaje, sueldoBasico).calcularAntiguedad();
    //CALCULO SUMA FIJA DECRETO

    const sumaFijaDecreto = new Decreto483(antiguedadPorcentaje, puntajeCargo, sumaFijaTestigoJornadaSimple).calcularProporcionalidad(sumaFijaTestigoJornadaSimple, puntajeCargoTestigoJornadaSimple);
    //CALCULO ANTIGUEDAD DECRETO
    const antiguedadDecreto = new Decreto483(antiguedadPorcentaje, puntajeCargo, sumaFijaDecreto).calcularAntiguedadDecreto();
    
    const adicionalSalarial = (sueldoBasico + sumaFijaDecreto) *0.1;
    const materialDidactico= obtener_proporcionalidad(puntajeCargo, sumaFijaMaterialDidactico, puntajeCargoTestigoJornadaSimple);
    const complementoMinimoGarantizado = calcular_complemento_minimo_garantizado(sueldoBasico, antiguedadMonto, adicionalSalarial, sumaFijaDecreto, antiguedadDecreto, materialDidactico, obtenerSueldoMinimoGarantizado(jornada));
    const cfp = jornadaEquivalente(jornada) * 0.5;
    const sumaFija = puntajeCargo * 0.8;
    const compensacionTransitoria = jornadaEquivalente(jornada) * 0.7;
    const salarioNeto = calcularSalarioNeto(antiguedadPorcentaje,sueldoBasico, antiguedadMonto, sumaFijaDecreto, antiguedadDecreto, adicionalSalarial, materialDidactico);

    document.querySelector(".textoresultado").innerHTML = `
        <p><strong>Sueldo Básico:</strong> ${sueldoBasico.toFixed(2)}</p>
        <p><strong>Antigüedad:</strong> ${antiguedadMonto.toFixed(2)}</p>
        <p><strong>Suma Fija:</strong> ${sumaFija.toFixed(2)}</p>
        
        <p><strong>Antigüedad Decreto:</strong> ${antiguedadDecreto.toFixed(2)}</p>

        <p><strong>Adicional Salarial:</strong> ${adicionalSalarial.toFixed(2)}</p>
        <p><strong>Material Didáctico:</strong> ${materialDidactico.toFixed(2)}</p>

        <p><strong>Suma Fija Decreto 483:</strong> ${sumaFijaDecreto.toFixed(2)}</p>
        <p><strong>Total Sueldo:</strong> ${salarioNeto.toFixed(2)}</p>
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

function calcularSalarioNeto(antiguedadPorcentaje,sueldoBasico, antiguedadMonto, sumaFijaDecreto, antiguedadDecreto, adicionalSalarial, materialDidactico){
    salarioNeto = 0
    if (antiguedadPorcentaje > 50){

        salarioNeto = (sueldoBasico + antiguedadMonto + sumaFijaDecreto + antiguedadDecreto + adicionalSalarial + materialDidactico ) *0.19;
    } else {
        salarioNeto = (sueldoBasico + antiguedadMonto + sumaFijaDecreto + antiguedadDecreto + adicionalSalarial) *0.19 + materialDidactico;
    }
    return salarioNeto;    
}


function calcularMaterialDidactico(sumaFijaMaterialDidactico, puntajeCargo,puntajeCargoTestigo){
    return obtener_proporcionalidad(puntajeCargo, sumaFijaMaterialDidactico, puntajeCargoTestigo);
     
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
            return 0;
        case "4-6":
            return 30;
        case "7-9":
            return 40;
        case "10-11":
            return 50;
        case "12-13":
            return 60;
        case "14-15":
            return 70;
        case "16-17":
            return 80;
        case "17-19":
            return 90;
        case "20_mas":
            return 100;
        default:
            return 0;
    }
}

function jornadaEquivalente(jornada) {
    if (jornada === "simple") return 1;
    if (jornada === "completa") return 2;
    return 0;
}