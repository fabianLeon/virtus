Juego.Premiacion = function (game) {
};
Juego.Premiacion.prototype = {
    create: function () {
        this.game.add.image(0, 0, 'FondoPremiacion');
        this.Medalleria();

        MusicaFondo = this.game.add.audio('MusicaTriunfo');
        MusicaFondo.loopFull(0.6);

        this.buttonContinue = this.add.button(510, 480, 'BottonAceptar', this.retornarInicio, this, 1, 0, 2);
        this.buttonContinue.anchor.setTo(0.5, 0.5);
    },
    Medalleria: function () {
        var v_estrategia = 0;
        if (tiempo1 < tiempo2 && tiempo2 < tiempo3) {
            v_estrategia = 3;
        }
        else if (tiempo3 < tiempo2 && tiempo2 < tiempo1) {
            v_estrategia = 1;
        } else {
            v_estrategia = 2;
        }

        var efectividad = new Rangos(0, 1, "Efectividad");  // definir estructura de premiacion de la efectividad depende de hacerlo bien
        var eficacia = new Rangos(90, 120, "eficacia");        // definir estructura de premiacion de la eficacia depende del tiempo
        var estrategia = new Rangos(1, 2, "Estrategia");    // definir estructura de premiacion de la estrategia depende del juego

        var nivel_premiacion = new Premiacion(efectividad, eficacia, estrategia);

        medalla_eficacia = nivel_premiacion.calcularEfi(tiempoTotal);
        medalla_efectividad = nivel_premiacion.calcularEfe(3 - respuestas_Acertadas);
        medalla_estrategia = nivel_premiacion.calcularEstra(v_estrategia);

//---------------------------------MEDALLA 1-----------------------------------------
        this.medalla1 = this.game.add.sprite(510, 200, 'Medallas', medalla_efectividad);
        this.medalla1.anchor.setTo(0.5, 0.5);
//---------------------------------MEDALLA 2-----------------------------------------
        this.medalla1 = this.game.add.sprite(660, 350, 'Medallas', medalla_eficacia);
        this.medalla1.anchor.setTo(0.5, 0.5);
//---------------------------------MEDALLA 3-----------------------------------------
        this.medalla1 = this.game.add.sprite(360, 350, 'Medallas', medalla_estrategia);
        this.medalla1.anchor.setTo(0.5, 0.5);
        salvarInfo(medalla_eficacia, medalla_efectividad, medalla_estrategia, "3");
    },
    retornarInicio: function () {
        ir_a("logica_matematica.php")
    }
};