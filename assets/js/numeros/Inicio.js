var Juego = {
    _WIDTH: 1000,
    _HEIGHT: 600
};

Juego.Inicio = function (game) {
};
Juego.Inicio.prototype = {
    preload: function () {

        this.game.load.image('Fondo', 'assets/img/numeros/Fondo.jpg');
        //Archivos del Inicio
        this.game.load.spritesheet('Bottones', 'assets/btn/numeros/BT_Jugar_Ayuda.png', 150, 45, 6);
        this.game.load.spritesheet('Abecedario', 'assets/img/numeros/Abecedario.png', 159, 151, 45);

        //Archivos de la ayuda
        this.game.load.image('Ayuda', 'assets/img/numeros/Ayuda.png');
        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/numeros/BT_Siguiente.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAtras', 'assets/btn/numeros/BT_Atras.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAceptar', 'assets/btn/numeros/BT_Aceptar.png', 150, 45, 3);

        //Archivos del Juego
        this.game.load.tilemap('mundo_json', 'assets/img/numeros/Numeros.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('mundo_tiles', 'assets/img/numeros/mundo.png');
        this.game.load.image('Solucion', 'assets/img/numeros/solucion.png');
        this.game.load.spritesheet('Preguntas', 'assets/img/numeros/Preguntas.png', 350, 100);

        this.game.load.spritesheet('BottonesSonido', 'assets/btn/numeros/BT_Sonido.png', 50, 50, 4);
        this.game.load.spritesheet('BottonPause', 'assets/btn/numeros/BT_Pause.png', 50, 50, 3);
        this.game.load.spritesheet('BottonReiniciar', 'assets/btn/numeros/BT_Reiniciar.png', 50, 50, 3);
        this.game.load.image('BotonEfecto2', 'assets/btn/numeros/BT_Efectos2.png');
        this.game.load.image('BotonMusica2', 'assets/btn/numeros/BT_Musica2.png');

        this.game.load.audio('MusicaFondo', 'assets/audio/numeros/MusicaFondo.mp3');
        this.game.load.audio('Giro_Ficha', 'assets/audio/numeros/Giro_Ficha.mp3');

        //Archivos de la premiacion
        this.game.load.audio('MusicaTriunfo', 'assets/audio/numeros/Ganador.mp3');
        this.game.load.image('FondoPremiacion', 'assets/img/numeros/Premiacion.png');
        this.game.load.spritesheet('Medallas', 'assets/img/numeros/Medallas.png', 200, 160, 9);
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
    actionOnClick: function (button) {
        if (button.name == "Jugar") {
            this.game.state.start('Game');
        }
        else {
            this.game.state.start('Ayuda');
        }

    }
};
