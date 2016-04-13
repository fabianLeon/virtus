Juego.Game_State = function (game) {
};
Juego.Game_State.prototype = {
    preload: function () {
        game.load.image('plataforma', 'assets/img/sapo/plataforma.png');
        game.load.image('fondo', 'assets/img/sapo/fondo1.jpg');
        game.load.spritesheet('azul', 'assets/img/sapo/rojo.png', 138, 100);
        game.load.spritesheet('rojo', 'assets/img/sapo/azul.png', 138, 100);

        game.load.spritesheet('BottonesSonido', 'assets/btn/sapo/BT_Sonido.png', 50, 50, 4);
        game.load.spritesheet('BottonPause', 'assets/btn/sapo/BT_Pause.png', 50, 50, 3);
        game.load.image('BotonEfecto2', 'assets/btn/sapo/BT_Efectos2.png');
        game.load.image('BotonMusica2', 'assets/btn/sapo/BT_Musica2.png');

        game.load.audio('MusicaFondo', 'assets/audio/sapo/MusicaFondo.mp3');
        game.load.audio('Salto_Sapo', 'assets/audio/sapo/Salto_Sapo.mp3');
    },
    create: function () {
//        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//        this.game.scale.pageAlignHorizontally = true;
//        this.game.scale.pageAlignVertically = true;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.set(0, 60);

        var fondo = game.add.sprite(0, 0, 'fondo');

        var me = this;
        sapos = game.add.group();
        plataformas = game.add.group();


        for (var i = 0; i < 7; i++) {
            var plataforma = game.add.sprite((100 + (150 * i)), game.height - 100, 'plataforma');
            game.physics.arcade.enable(plataforma);
            plataforma.body.immovable = true;
            plataforma.body.allowGravity = false;
            var bound1 = plataforma.getBounds();
            bound1.width -= 20;
            bound1.height -= 50;
            console.log(bound1);
            plataformas.add(plataforma);
            
        }
        for (var i = 0; i < 7; i++) {

            if (i < 3) {
                var s = new sapo(game, i, 'rojo');
                sapos.add(s);
                saposGame[i] = s;
                s.animations.play('saltar');
            }
            if (i > 3) {
                var s = new sapo(game, i, 'azul');
                sapos.add(s);
                saposGame[i] = s;
                s.animations.play('saltar');
            }
            saposGame[3] = null;
        }

        //Botones de sonidos y pause
        this.buttonEfecto = this.game.add.button(990, 50, 'BottonesSonido', this.Musica_Efecto, this, 1, 0, 0);
        this.buttonEfecto.anchor.setTo(0.5, 0.5);
        this.buttonEfecto.name = 'Efectos_Sonido';

        this.buttonMusica = this.game.add.button(1050, 50, 'BottonesSonido', this.Musica_Efecto, this, 3, 2, 2);
        this.buttonMusica.anchor.setTo(0.5, 0.5);
        this.buttonMusica.name = 'Musica';

        this.buttonPause = this.game.add.button(1110, 50, 'BottonPause', this.managePause, this, 1, 0, 2);
        this.buttonPause.anchor.setTo(0.5, 0.5);
        this.buttonPause.name = 'Pause';

        //Sonidos del videoJuego se agregan
        MusicaFondo = this.game.add.audio('MusicaFondo');
        MusicaFondo.loopFull(0.6);
        Sonido_Salto = this.game.add.audio('Salto_Sapo');
    },
    update: function () {
        game.physics.arcade.collide(plataformas, sapos);
        if (    saposGame[0] !== null &&
                saposGame[1] !== null &&
                saposGame[2] !== null &&
                saposGame[4] !== null &&
                saposGame[5] !== null &&
                saposGame[6] !== null) {

            if (    saposGame[0].cl == 'azul' &&
                    saposGame[1].cl == 'azul' &&
                    saposGame[2].cl == 'azul' &&
                    saposGame[4].cl == 'rojo' &&
                    saposGame[5].cl == 'rojo' &&
                    saposGame[6].cl == 'rojo') {
                console.log("GANOOOOO"); /// listo mk aqui es donde gana el socio
                borrarTodasLasCookies();
            }
        }
        //Si la musica fue o no desactivada que relice la gestion necesaria
        if (B_musica == false) {
            MusicaFondo.pause();
        } else {
            MusicaFondo.resume();
        }

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
        var pausedText = this.add.text(600, 300, "PAUSED", this.fontMessage);
        pausedText.anchor.set(0.5, 0.5);

        this.input.onDown.add(function () {
            pausedText.destroy();
            this.game.paused = false;
        }, this);
    }

};
