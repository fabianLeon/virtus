var Juego = {
    _WIDTH: 1000,
    _HEIGHT: 550
};

Juego.Inicio = function (game) {
};
Juego.Inicio.prototype = {
    preload: function () {

        this.game.load.image('Fondo', 'assets/img/canon/fondo.png');


        //Archivos Inicio
        this.game.load.spritesheet('Bottones', 'assets/btn/canon/BT_Jugar_Ayuda.png', 150, 45, 6);
        this.game.load.spritesheet('Abecedario', 'assets/img/canon/Abecedario.png', 159, 151, 45);

        //Archivos Ayuda
        this.game.load.image('Ayuda_1', 'assets/img/canon/Ayuda1.png');
        this.game.load.image('Ayuda_2', 'assets/img/canon/Ayuda2.png');

        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/canon/BT_Siguiente.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAtras', 'assets/btn/canon/BT_Atras.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAceptar', 'assets/btn/canon/BT_Aceptar.png', 150, 45, 3);

        //Archivos Juego
        this.game.load.image('Piso', 'assets/img/canon/piso.png');
        this.game.load.image('Globo', 'assets/img/canon/bomba.png');
        this.game.load.image('Puas', 'assets/img/canon/Caneca/Puas.png');
        this.game.load.image('Llanta', 'assets/img/canon/Caneca/llanta.png');
        this.game.load.image('FondoCaneca', 'assets/img/canon/Caneca/fondoCaneca.png');
        this.game.load.image('BaseCaneca', 'assets/img/canon/Caneca/BaseCaneca.png');
        this.game.load.spritesheet('kaboom', 'assets/img/canon/explode.png', 128, 128);
        this.game.load.spritesheet('Canon', 'assets/img/canon/cañon.png', 103, 81);
        this.game.load.spritesheet('Tiro_al_Blanco', 'assets/img/canon/tiro_blanco.png', 35, 35);
        for (i = 0; i < 58; i++) {
            this.game.load.image('caneca1.' + i, 'assets/img/canon/Caneca/Imagen1.' + i + '.png');
        }

        this.game.load.spritesheet('BottonesSonido', 'assets/btn/canon/BT_Sonido.png', 50, 50, 4);
        this.game.load.spritesheet('BottonPause', 'assets/btn/canon/BT_Pause.png', 50, 50, 3);
        this.game.load.spritesheet('BottonReiniciar', 'assets/btn/canon/BT_Reiniciar.png', 50, 50, 3);
        this.game.load.image('BotonEfecto2', 'assets/btn/canon/BT_Efectos2.png');
        this.game.load.image('BotonMusica2', 'assets/btn/canon/BT_Musica2.png');

        this.game.load.audio('MusicaFondo', 'assets/audio/canon/MusicaFondo.mp3');
        this.game.load.audio('Bomba_Adentro', 'assets/audio/canon/Bomba_Adentro.mp3');
        this.game.load.audio('Bomba_Afuera', 'assets/audio/canon/Bomba_Afuera.mp3');

        //Archivos Premiacion
        this.game.load.audio('MusicaTriunfo', 'assets/audio/canon/Ganador.mp3');
        this.game.load.image('FondoPremiacion', 'assets/img/canon/Premiacion.png');
        this.game.load.spritesheet('Medallas', 'assets/img/canon/Medallas.png', 200, 160, 9);


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


        var item;

        //Mensaje corresponde alos posiciones de las letras del Spritee. En este caso "Nivel 1"
        var mensaje = [13, 8, 21, 4, 11, 37, 28];

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
            this.game.state.start('Game');
        }
        else {
            this.game.state.start('Ayuda');
        }

    }
};
