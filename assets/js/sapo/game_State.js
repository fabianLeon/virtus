Juego.Game_State = function (game) {
};
Juego.Game_State.prototype = {
    create: function () {
//        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//        this.game.scale.pageAlignHorizontally = true;
//        this.game.scale.pageAlignVertically = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.set(0, 60);

        var fondo = game.add.sprite(0, 0, 'Fondo');

        var me = this;
        this.timerJuego = 0;
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
        
        this.buttonReiniciar = this.game.add.button(930, 50, 'BottonReiniciar', this.Reiniciar_Nivel, this, 1, 0, 2);
        this.buttonReiniciar.anchor.setTo(0.5, 0.5);
        this.buttonReiniciar.name = 'Reiniciar';

        //Sonidos del videoJuego se agregan
        MusicaFondo = this.game.add.audio('MusicaFondo');
        MusicaFondo.loopFull(0.6);
        Sonido_Salto = this.game.add.audio('Salto_Sapo');
        this.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
    },
    updateTimer: function () {
        this.timerJuego++;
    },
    update: function () {
        game.physics.arcade.collide(plataformas, sapos);
        if (saposGame[0] !== null &&
                saposGame[1] !== null &&
                saposGame[2] !== null &&
                saposGame[4] !== null &&
                saposGame[5] !== null &&
                saposGame[6] !== null) {

            if (saposGame[0].cl == 'azul' &&
                    saposGame[1].cl == 'azul' &&
                    saposGame[2].cl == 'azul' &&
                    saposGame[4].cl == 'rojo' &&
                    saposGame[5].cl == 'rojo' &&
                    saposGame[6].cl == 'rojo') {
                /// listo mk aqui es donde gana el socio
                borrarTodasLasCookies();
                game.state.start('Premiacion');
                MusicaFondo.stop();
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
    },
    Reiniciar_Nivel: function () {
        intentos += 1;
        tiempoTotal = tiempoTotal + this.timerJuego;
        B_musica = true;
        B_efecto = true;
        
        posiciones_sapos = [80,230,380,530,680,830,980];
        saposGame = [];
        sapos = null;
        plataformas = null;

        MusicaFondo.stop();
        this.game.state.start('Game');
    }

};
