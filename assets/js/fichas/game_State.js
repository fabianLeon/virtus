Juego.Game_State = function (game) {
};
Juego.Game_State.prototype = {
    preload: function () {
        game.load.image('Fondo', 'assets/img/fichas/fondo.jpg');
        game.load.image('cuadro', 'assets/img/fichas/cuadro1.png');
        game.load.image('horizontal', 'assets/img/fichas/horizontal3.png');
        game.load.image('vertical', 'assets/img/fichas/vertical2.png');
        game.load.image('cuadrito', 'assets/img/fichas/cuadrito2.png');
        game.load.image('tablero', 'assets/img/fichas/fondo2.png');
        game.load.spritesheet('fuego', 'assets/img/fichas/fuego.png', 200, 200);

        game.load.spritesheet('BottonesSonido', 'assets/btn/sapo/BT_Sonido.png', 50, 50, 4);
        game.load.spritesheet('BottonPause', 'assets/btn/sapo/BT_Pause.png', 50, 50, 3);
        game.load.image('BotonEfecto2', 'assets/btn/sapo/BT_Efectos2.png');
        game.load.image('BotonMusica2', 'assets/btn/sapo/BT_Musica2.png');
        game.load.spritesheet('BottonReiniciar', 'assets/btn/engranes/BT_Reiniciar.png', 50, 50, 3);

        game.load.audio('MusicaFondo', 'assets/audio/fichas/MusicaFondo.mp3');
        game.load.audio('Arrastrar', 'assets/audio/fichas/Arrastrar_ficha.mp3');
    },
    create: function () {

        game.add.image(0, 0, 'Fondo');
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#FFFFFF';
        var x = 100;
        var y = 100;
        this.timerJuego = 0;
        Sonido_Movimiento = this.game.add.audio('Arrastrar');
        bounds = game.add.sprite(x - 29, y - 25, 'tablero');

        // creacion de las fichas
        var vertical1 = new Ficha(x + 0, y + 0, 'vertical', 0);
        var vertical2 = new Ficha(x + 0, y + 200, 'vertical', 1);
        var vertical3 = new Ficha(x + 300, y + 0, 'vertical', 2);
        var vertical4 = new Ficha(x + 300, y + 200, 'vertical', 3);
        var cuadrito1 = new Ficha(x + 200, y + 300, 'cuadrito', 4);
        var cuadrito2 = new Ficha(x + 200, y + 200, 'cuadrito', 5);
        var cuadrito3 = new Ficha(x + 100, y + 300, 'cuadrito', 6);
        var cuadrito4 = new Ficha(x + 100, y + 200, 'cuadrito', 7);
        var horizontal = new Ficha(x + 100, y + 400, 'horizontal', 8);
        var cuadro = new Ficha(x + 100, y + 0, 'cuadro', 9);

        var fire = game.add.sprite(202, 522, 'fuego');
        fire.animations.add('encendido');
        fire.animations.play('encendido', 12, true);
        // adicionando al arreglo fichas todas las fichas del tablero
        fichas.push(vertical1);
        fichas.push(vertical2);
        fichas.push(vertical3);
        fichas.push(vertical4);
        fichas.push(cuadrito1);
        fichas.push(cuadrito2);
        fichas.push(cuadrito3);
        fichas.push(cuadrito4);
        fichas.push(horizontal);
        fichas.push(cuadro);

        //Botones de sonidos y pause
        this.buttonEfecto = this.game.add.button(440, 30, 'BottonesSonido', this.Musica_Efecto, this, 1, 0, 0);
        this.buttonEfecto.anchor.setTo(0.5, 0.5);
        this.buttonEfecto.name = 'Efectos_Sonido';


        this.buttonMusica = this.game.add.button(500, 30, 'BottonesSonido', this.Musica_Efecto, this, 3, 2, 2);
        this.buttonMusica.anchor.setTo(0.5, 0.5);
        this.buttonMusica.name = 'Musica';

        this.buttonPause = this.game.add.button(560, 30, 'BottonPause', this.managePause, this, 1, 0, 2);
        this.buttonPause.anchor.setTo(0.5, 0.5);
        this.buttonPause.name = 'Pause';

        this.buttonReiniciar = this.game.add.button(380, 30, 'BottonReiniciar', this.Reiniciar_Nivel, this, 1, 0, 2);
        this.buttonReiniciar.anchor.setTo(0.5, 0.5);
        this.buttonReiniciar.name = 'Reiniciar';

        //Sonidos del videoJuego se agregan
        MusicaFondo = this.game.add.audio('MusicaFondo');
        MusicaFondo.loopFull(0.6);

        this.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
    }, update: function () {
        //Si la musica fue o no desactivada que relice la gestion necesaria
        if (B_musica == false) {
            MusicaFondo.pause();
        } else {
            MusicaFondo.resume();
        }

    },
    updateTimer: function () {
        this.timerJuego++;
    },
    Musica_Efecto: function (button) {
        if (button.name == "Musica") {
            if (B_musica == true) {
                button.loadTexture('BotonMusica2');
            } else {
                button.loadTexture('BottonesSonido', 0);
            }
            B_musica = !B_musica;
        } else if (button.name == "Efectos_Sonido") {
            if (B_efecto == true) {
                button.loadTexture('BotonEfecto2');
            } else {
                button.loadTexture('BottonesSonido', 1);
            }
            B_efecto = !B_efecto;
        }
    },
    managePause: function () {
        this.game.paused = true;
        var pausedText = this.add.text(300, 350, "PAUSED", this.fontMessage);
        pausedText.anchor.set(0.5, 0.5);

        this.input.onDown.add(function () {
            pausedText.destroy();
            this.game.paused = false;
        }, this);
    }, 
    Reiniciar_Nivel: function () {
        intentos += 1;
        tiempoTotal = tiempoTotal + this.timerJuego;
        B_musica = true;
        B_efecto = true;
        fichas = [];
        bounds = null;
        vertical1 = null;
        vertical2 = null;
        Movimientos = 0;
        j = -1;
        lag = [];
        MusicaFondo.stop();
        this.game.state.start('Game');
    }
};
