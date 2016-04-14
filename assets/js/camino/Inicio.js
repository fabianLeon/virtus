var Juego = {
    _WIDTH: 1000,
    _HEIGHT: 500
};

Juego.Inicio = function (game) {
};
Juego.Inicio.prototype = {
    preload: function () {

        //Archivos Inicio
        this.game.load.image('Fondo', 'assets/img/camino/imagenes/Fondo2.jpg');
        this.game.load.image('Ayuda_1', 'assets/img/camino/imagenes/Ayuda1.png');
        this.game.load.image('Ayuda_2', 'assets/img/camino/imagenes/Ayuda2.png');

        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/camino/BT_Siguiente.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAtras', 'assets/btn/camino/BT_Atras.png', 150, 45, 3);

        this.game.load.spritesheet('BottonAceptar', 'assets/btn/camino/BT_Aceptar.png', 150, 45, 3);
        this.game.load.spritesheet('Bottones', 'assets/btn/camino/BT_Jugar_Ayuda.png', 150, 45, 6);
        this.game.load.spritesheet('Abecedario', 'assets/img/camino/imagenes/Abecedario.png', 159, 151, 45);

        //Archivos Juego
        this.game.load.spritesheet("background", "assets/img/camino/fichas.jpg", 100, 100);
        this.game.load.image('Solucion', 'assets/img/camino/solucion.jpg');
        this.game.load.image('Marco', 'assets/img/camino/marco.png');

        this.game.load.spritesheet('BottonesSonido', 'assets/btn/camino/BT_Sonido.png', 50, 50, 4);
        this.game.load.spritesheet('BottonPause', 'assets/btn/camino/BT_Pause.png', 50, 50, 3);
        this.game.load.spritesheet('BottonReiniciar', 'assets/btn/numeros/BT_Reiniciar.png', 50, 50, 3);
        this.game.load.image('BotonEfecto2', 'assets/btn/camino/BT_Efectos2.png');
        this.game.load.image('BotonMusica2', 'assets/btn/camino/BT_Musica2.png');

        this.game.load.audio('MusicaFondo', 'assets/audio/camino/MusicaFondo.mp3');
        this.game.load.audio('Arrastrar', 'assets/audio/camino/Arrastrar_ficha.mp3');

        //Archivos Juego Secundario
        this.game.load.image('Solucion', 'assets/img/camino/solucion.jpg');

        this.game.load.spritesheet('Preguntas', 'assets/img/camino/preguntasAbstractas.png', 400, 80, 4);
        this.game.load.spritesheet('Solucion1', 'assets/img/camino/solucionPregunta1.png', 100, 100, 8);
        this.game.load.spritesheet('Solucion2', 'assets/img/camino/solucionPregunta2.png', 100, 100, 8);
        this.game.load.spritesheet('Solucion3', 'assets/img/camino/solucionPregunta3.png', 100, 100, 8);
        this.game.load.spritesheet('Solucion4', 'assets/img/camino/solucionPregunta4.png', 100, 100, 8);

        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/camino/BT_Siguiente.png', 150, 45, 3);

        this.game.load.audio('Giro_Ficha', 'assets/audio/camino/Giro_Ficha.mp3');

        //Archivos Premiacion
        this.game.load.audio('MusicaTriunfo', 'assets/audio/camino/Ganador.mp3');
        this.game.load.image('FondoPremiacion', 'assets/img/camino/Premiacion.png');
        this.game.load.spritesheet('Medallas', 'assets/img/camino/Medallas.png', 200, 160, 9);
    },
    create: function () {

        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.game.scale.pageAlignHorizontally = true;
        //this.game.scale.pageAlignVertically = true;
        this.game.add.image(0, 0, 'Fondo');


        this.buttonJugar = this.game.add.button(350, 400, 'Bottones', this.actionOnClick, this, 1, 0, 2);
        this.buttonJugar.anchor.setTo(0.5, 0.5);
        this.buttonJugar.name = 'Jugar';

        this.buttonAyuda = this.game.add.button(650, 400, 'Bottones', this.actionOnClick, this, 4, 3, 5);
        this.buttonAyuda.anchor.setTo(0.5, 0.5);
        this.buttonAyuda.name = 'Ayuda';




        //Mensaje corresponde a los posiciones de las letras del Spritee. En este caso "Nivel 1"
        var mensaje = [13, 8, 21, 4, 11, 37, 29];
        var item;
        for (var i = 0; i < 7; i++)
        {
            item = this.game.add.sprite(300 + 70 * i, -100, 'Abecedario', mensaje[i]);
            item.anchor.setTo(0.5, 0.5);
            item.scale.x = 0.5;
            item.scale.y = 0.5;

            this.game.add.tween(item).to({y: 240}, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * i, true);
            this.game.add.tween(item).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, 1000 + 400 * i, true);
        }

    },
    update: function () {
    },
    actionOnClick: function (button) {
        if (button.name == "Jugar") {
            this.game.state.start('GameSecond');
        }
        else {
            this.game.state.start('Ayuda');
        }

    }
};
