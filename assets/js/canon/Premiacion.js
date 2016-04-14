Juego.Premiacion = function (game) {
};
Juego.Premiacion.prototype = {
    create: function () {
        this.game.add.image(0, 0, 'FondoPremiacion');
        this.Medalleria();

        MusicaFondo = this.game.add.audio('MusicaTriunfo');
        MusicaFondo.loopFull(0.6);

        this.buttonContinue = this.add.button(500, 520, 'BottonAceptar', this.retornarInicio, this, 1, 0, 2);
        this.buttonContinue.anchor.setTo(0.5, 0.5);
    },
    Medalleria: function () {

        var promedioFallo = bombaLanzada - 57;

        var efectividad = new Rangos(10, 57, "Efectividad");  // definir estructura de premiacion de la efectividad depende de hacerlo bien
        var eficacia = new Rangos(25, 40, "eficacia");        // definir estructura de premiacion de la eficacia depende del tiempo
        var estrategia = new Rangos(10, 20, "Estrategia");    // definir estructura de premiacion de la estrategia depende del juego

        var nivel_premiacion = new Premiacion(efectividad, eficacia, estrategia);
        medalla_eficacia = nivel_premiacion.calcularEfi(relojito);
        medalla_efectividad = nivel_premiacion.calcularEfe(bombaLanzada);
        medalla_estrategia = nivel_premiacion.calcularEstra(promedioFallo);

//---------------------------------MEDALLA 1-----------------------------------------
        this.medalla1 = this.game.add.sprite(500, 200, 'Medallas', medalla_efectividad);
        this.medalla1.anchor.setTo(0.5, 0.5);
//---------------------------------MEDALLA 2-----------------------------------------
        this.medalla1 = this.game.add.sprite(700, 300, 'Medallas', medalla_eficacia);
        this.medalla1.anchor.setTo(0.5, 0.5);
//---------------------------------MEDALLA 3-----------------------------------------
        this.medalla1 = this.game.add.sprite(300, 300, 'Medallas', medalla_estrategia);
        this.medalla1.anchor.setTo(0.5, 0.5);

    },
    retornarInicio: function () {

        salvarInfo(medalla_eficacia, medalla_efectividad, medalla_estrategia, "2", "logica_matematica.php");

    }
};
