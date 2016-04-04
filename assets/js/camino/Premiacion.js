Juego.Premiacion = function (game) {
};
Juego.Premiacion.prototype = {
    preload: function () {
        this.game.load.audio('MusicaTriunfo', 'assets/audio/camino/Ganador.mp3');
        this.game.load.image('FondoPremiacion', 'assets/img/camino/Premiacion.png');
        this.game.load.spritesheet('Medallas', 'assets/img/camino/Medallas.png', 200, 160, 9);
    },
    create: function () {
        this.game.add.image(0, 0, 'FondoPremiacion');
        this.Medalleria();

        MusicaFondo = this.game.add.audio('MusicaTriunfo');
        MusicaFondo.loopFull(0.6);

        this.buttonContinue = this.add.button(500, 470, 'BottonAceptar', this.retornarInicio, this, 1, 0, 2);
        this.buttonContinue.anchor.setTo(0.5, 0.5);
    },
    Medalleria: function () {
        var efectividad = new Rangos(0, 2, "Efectividad");  // definir estructura de premiacion de la efectividad depende de hacerlo bien
        var eficacia = new Rangos(540, 840, "eficacia");        // definir estructura de premiacion de la eficacia depende del tiempo
        var estrategia = new Rangos(360, 660, "Estrategia");    // definir estructura de premiacion de la estrategia depende del juego

        var nivel_premiacion = new Premiacion(efectividad, eficacia, estrategia);
        console.log(Fallos);
        console.log(tiempoTotal);
        console.log(tiempoSolucionCamino);

//---------------------------------MEDALLA 1-----------------------------------------
        this.medalla1 = this.game.add.sprite(500, 200, 'Medallas', nivel_premiacion.calcularEfe(Fallos));
        this.medalla1.anchor.setTo(0.5, 0.5);
//---------------------------------MEDALLA 2-----------------------------------------
        this.medalla1 = this.game.add.sprite(700, 300, 'Medallas', nivel_premiacion.calcularEfi(tiempoTotal));
        this.medalla1.anchor.setTo(0.5, 0.5);
//---------------------------------MEDALLA 3-----------------------------------------
        this.medalla1 = this.game.add.sprite(300, 300, 'Medallas', nivel_premiacion.calcularEstra(tiempoSolucionCamino));
        this.medalla1.anchor.setTo(0.5, 0.5);

    },
    retornarInicio: function () {
        this.game.state.start('Inicio');
        MusicaFondo.stop();
    },
};