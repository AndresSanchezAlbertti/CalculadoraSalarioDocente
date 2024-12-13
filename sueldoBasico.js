//necesito una clase sueldoBasico que reciba puntajeDelCargo y un punto indice y que tenga una funcion calcularSueldoBasico que devuelva el sueldo basico (Formula del calculo del sueldo basico puntajeDelCargo * INDICE_I)

class SueldoBasico {
    constructor(puntajeDelCargo, indice) {
        this.puntajeDelCargo = puntajeDelCargo;
        this.indice = indice;
    }
    calcularSueldoBasico() {
        return this.puntajeDelCargo * this.indice;
    }
}