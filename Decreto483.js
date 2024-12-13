//necesito una clase que reciba una antiguedadPorcentaje, un puntajeDelCargo, un antiguedadMonto, y que tenga dos metodos, uno para calcular la proporcionalidad del decreto(Formula para calcular proporcionalidad del decreto: suma_fija/cargo_testigo * puntaje_cargo) (Formula del calculo del salario neto)

class Decreto483 {
    constructor(antiguedadPorcentaje, puntajeDelCargo, sumaFijaDecreto) {
        this.antiguedadPorcentaje = antiguedadPorcentaje;
        this.puntajeDelCargo = puntajeDelCargo;
        this.sumaFijaDecreto = sumaFijaDecreto;
    }
    calcularProporcionalidad(sumaFija, cargoTestigo) {
        return sumaFija / cargoTestigo * this.puntajeDelCargo;
    }
    calcularAntiguedadDecreto() {
        return (this.antiguedadPorcentaje * this.sumaFijaDecreto) / 100;
    }
}