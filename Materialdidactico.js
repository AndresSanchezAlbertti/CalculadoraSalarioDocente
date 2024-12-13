//necesito una clase MaterialDidactico que reciba umaFijaMaterialDidactico, puntajeCargo,puntajeCargoTestigo y que tenga un metodo calcularMaterialDidactico que devuelva la proporcionalidad del material didactico (Formula para calcular proporcionalidad del material didactico: sumaFijaMaterialDidactico / puntaje_cargo_testigo * puntaje_cargo)

class MaterialDidactico {
    constructor(sumaFijaMaterialDidactico, puntajeCargo, puntajeCargoTestigo) {
        this.sumaFijaMaterialDidactico = sumaFijaMaterialDidactico;
        this.puntajeCargo = puntajeCargo;
        this.puntajeCargoTestigo = puntajeCargoTestigo;
    }
    calcularMaterialDidactico() {
        return this.sumaFijaMaterialDidactico / this.puntajeCargoTestigo * this.puntajeCargo;
    }
}