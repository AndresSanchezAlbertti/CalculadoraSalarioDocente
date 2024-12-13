//Necesito una clase antiguedad que tome como parametros un porcentaje de antiguedad y un sueldo basico y que tenga una funcions calcularAntiguedad que devuelva el monto de la antiguedad (Formula del calculo de la antiguedad sueldoBasico * porcentajeAntiguedad / 100)

class Antiguedad {
    constructor(porcentajeAntiguedad, sueldoBasico) {
        this.porcentajeAntiguedad = porcentajeAntiguedad;
        this.sueldoBasico = sueldoBasico;
    }
    calcularAntiguedad() {
        return (this.sueldoBasico * this.porcentajeAntiguedad) / 100;
    }
}