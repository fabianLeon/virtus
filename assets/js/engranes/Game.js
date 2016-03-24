Juego.Game = function (game) {
};
Juego.Game.prototype = {
    preload: function () {
        this.game.load.image('Fondo', 'assets/img/engranes/fondo.png');
        this.game.load.image('Fondo_Blanco', 'assets/img/engranes/Fondo_Blanco.png');
        this.game.load.image('Fondo_Blanco2', 'assets/img/engranes/Fondo_Blanco2.png');

        for (i = 1; i < 9; i++) {
            this.game.load.image('Engrane' + i, 'assets/img/engranes/Engranes/engrane' + i + '.png');
        }
        this.game.load.image('Banda', 'assets/img/engranes/Engranes/Banda.png');
        this.game.load.image('Caja', 'assets/img/engranes/Engranes/Caja.png');
        this.game.load.image('Tuerca', 'assets/img/engranes/Engranes/Tuerca.png');
        this.game.load.spritesheet('kaboom', 'assets/img/engranes/explode.png', 128, 128);

        this.game.load.spritesheet('Numero1', 'assets/btn/engranes/BT_Numero1.png', 50, 50, 3);
        this.game.load.spritesheet('Numero2', 'assets/btn/engranes/BT_Numero2.png', 50, 50, 3);

        this.game.load.image('Error', 'assets/img/engranes/error.png');
        this.game.load.image('VistoBueno', 'assets/img/engranes/VistoBueno.png');


        this.game.load.spritesheet('BottonesSonido', 'assets/btn/engranes/BT_Sonido.png', 50, 50, 4);
        this.game.load.spritesheet('BottonPause', 'assets/btn/engranes/BT_Pause.png', 50, 50, 3);
        this.game.load.image('BotonEfecto2', 'assets/btn/engranes/BT_Efectos2.png');
        this.game.load.image('BotonMusica2', 'assets/btn/engranes/BT_Musica2.png');
        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/engranes/BT_Siguiente.png', 150, 45, 3);


        this.game.load.audio('MusicaFondo', 'assets/audio/engranes/MusicaFondo.mp3');
    },
    create: function () {
        this.timer = 0;
        this.tiempo_detenerse = 0;
        this.tiempoEliminar = 0;
        Tablero = 1;

        this.game.add.image(0, 0, 'Fondo');
        this.Fondo_Engrane = this.game.add.image(490, 310, 'Fondo_Blanco');
        this.Fondo_Engrane.anchor.setTo(0.5, 0.5);

        //Sonidos del videoJuego se agregan
        MusicaFondo = this.game.add.audio('MusicaFondo');
        MusicaFondo.loopFull(0.6);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);


        this.buttonEfecto = this.game.add.button(840, 50, 'BottonesSonido', this.Musica_Efecto, this, 1, 0, 0);
        this.buttonEfecto.anchor.setTo(0.5, 0.5);
        this.buttonEfecto.name = 'Efectos_Sonido';


        this.buttonMusica = this.game.add.button(900, 50, 'BottonesSonido', this.Musica_Efecto, this, 3, 2, 2);
        this.buttonMusica.anchor.setTo(0.5, 0.5);
        this.buttonMusica.name = 'Musica';

        this.buttonPause = this.game.add.button(960, 50, 'BottonPause', this.managePause, this, 1, 0, 2);
        this.buttonPause.anchor.setTo(0.5, 0.5);
        this.buttonPause.name = 'Pause';

        this.buttonContinue = this.game.add.button(500, 500, 'BottonSiguiente', this.CambiarEscenario, this, 1, 0, 2);
        this.buttonContinue.name = "Continue";
        this.buttonContinue.anchor.setTo(0.5, 0.5);
        this.buttonContinue.visible = false;


        //Se crean los engranes
        this.Engrane1 = new Img_Movimiento(250, 300, 'Engrane1', 1, 250);
        this.Engrane2 = new Img_Movimiento(315, 250, 'Engrane2', 2, 315);
        this.Engrane3 = new Img_Movimiento(380, 300, 'Engrane3', 3, 380);
        this.Engrane4 = new Img_Movimiento(448, 350, 'Engrane4', 4, 448);
        this.Engrane5 = new Img_Movimiento(497, 330, 'Engrane5', 5, 497);
        this.Engrane6 = new Img_Movimiento(537, 300, 'Engrane6', 6, 537);
        this.Engrane7 = new Img_Movimiento(633, 350, 'Engrane7', 7, 633);

       
    
        //Se agregan los numeros 1 y 2
        this.Button_Numero1 = this.add.button(750, 300, 'Numero1', this.Mover_Engrane_Opc1, this, 1, 0, 2);
        this.Button_Numero1.anchor.setTo(0.50, 0.50);
        this.Button_Numero2 = this.add.button(750, 400, 'Numero2', this.Mover_Engrane_Opc2, this, 1, 0, 2);
        this.Button_Numero2.anchor.setTo(0.50, 0.50);

        this.PintarTablero2();
        this.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);

        //Se crea explosion de bomba de agua
        this.explosions = this.game.add.group();
        this.explosions.createMultiple(10, 'kaboom');
        this.explosions.forEach(this.setupBombaAgua, this);
        
    },
    setupBombaAgua: function (bombaAgua) {

        bombaAgua.anchor.x = 0.5;
        bombaAgua.anchor.y = 0.5;
        bombaAgua.animations.add('kaboom');

    },
    update: function () {
        
        this.game.physics.arcade.collide(this.Engrane17, this.Caja2, this.collisionCaja, null, this);
        this.MoverEngranes();
        if (Mover_Engranes == true) {
            this.MoverEngranes();
        }
        //Si la musica fue o no desactivada que relice la gestion necesaria
        if (B_musica == false) {
            MusicaFondo.pause();
        }
        else {
            MusicaFondo.resume();
        }

    },
    render: function () {  
    //game.debug.body(this.Engrane17);
    //game.debug.body(this.Caja2);
    },
    updateTimer: function () {
        this.timer++;
        if (Mover_Engranes == true) {
            this.tiempo_detenerse++;
            if (this.tiempo_detenerse == 2) {
                Mover_Engranes = false
                if (respuesta == 1) {
                    this.imagen_resultado = this.game.add.image(500, 225, 'VistoBueno');
                    this.imagen_resultado.anchor.setTo(0.5, 0.5);
                    respuestas_Acertadas += 1;
                    tiempoTotal = this.timer;
                    this.buttonContinue.visible = true;
                    this.time.events.loop(Phaser.Timer.SECOND, this.eliminarImagen, this);
                } else if (respuesta == 2) {
                    this.imagen_resultado = this.game.add.image(500, 225, 'Error');
                    this.imagen_resultado.anchor.setTo(0.5, 0.5);
                    this.imagen_resultado.scale.x = 0.7;
                    this.imagen_resultado.scale.y = 0.7;
                    tiempoTotal = this.timer;
                    this.buttonContinue.visible = true;
                    this.time.events.loop(Phaser.Timer.SECOND, this.eliminarImagen, this);
                }

            }
        }
    },
    MoverEngranes: function () {
        if (Tablero == 1) {
            this.Engrane1.angle -= 0.5;
            this.Engrane2.angle += 0.8;
            this.Engrane3.angle -= 0.5;
            this.Engrane4.angle += 0.5;
            this.Engrane5.angle -= 1;
            this.Engrane6.angle += 0.5;
            this.Engrane7.angle -= 0.2;
        }
        else if (Tablero == 2) {
            this.Engrane1.angle -= 0.5;
            this.Engrane2.angle += 0.9;
            this.Engrane3.angle -= 0.7;
            this.Engrane4.angle += 0.9;
            this.Engrane5.angle -= 0.9;
            this.Engrane6.angle += 0.7;
            this.Engrane7.angle -= 0.5;
            this.Engrane8.angle += 0.5;
            this.Engrane9.angle += 0.5;
            this.Tuerca.angle += 0.7;
            this.tweenCaja.start();

            this.Engrane10.angle += 0.5;
            this.Engrane11.angle -= 0.5;
            this.Engrane12.angle += 0.7;
            this.Engrane13.angle -= 0.9;
            this.Engrane14.angle += 0.9;
            this.Engrane15.angle -= 0.7;
            this.Engrane16.angle += 0.9;
            this.Engrane17.angle -= 0.7;
            this.Engrane18.angle -= 0.7;
            this.Tuerca2.angle += 0.7;
            this.Caja2.body.velocity.x = -30;
            //this.tweenCaja2.start();
        }


    },
    collisionCaja: function (ObjetoDeColision, bala) {
        bala.kill();

        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(bala.body.x, bala.body.y);
        explosion.play('kaboom', 30, false, true);
    },
    Musica_Efecto: function (button) {
        if (button.name == "Musica") {
            if (B_musica == true) {
                button.loadTexture('BotonMusica2');
            }
            else {
                button.loadTexture('BottonesSonido', 0);
            }
            B_musica = !B_musica;
        }
        else if (button.name == "Efectos_Sonido") {
            if (B_efecto == true) {
                button.loadTexture('BotonEfecto2');
            }
            else {
                button.loadTexture('BottonesSonido', 1);
            }
            B_efecto = !B_efecto;
        }
    },
    Mover_Engrane_Opc1: function () {
        this.Button_Numero1.visible = false;
        this.Button_Numero2.visible = false;
        this.Imagen_Numero1 = this.game.add.sprite(750, 300, 'Numero1', 2);
        this.Imagen_Numero1.anchor.setTo(0.50, 0.50);
        this.Imagen_Numero2 = this.game.add.sprite(750, 400, 'Numero2', 0);
        this.Imagen_Numero2.anchor.setTo(0.50, 0.50);
        Mover_Engranes = true;
        respuesta = 1;
    },
    Mover_Engrane_Opc2: function () {
        this.Button_Numero1.visible = false;
        this.Button_Numero2.visible = false;
        this.Imagen_Numero1 = this.game.add.sprite(750, 300, 'Numero1', 0);
        this.Imagen_Numero1.anchor.setTo(0.50, 0.50);
        this.Imagen_Numero2 = this.game.add.sprite(750, 400, 'Numero2', 2);
        this.Imagen_Numero2.anchor.setTo(0.50, 0.50);
        Mover_Engranes = true;
        respuesta = 2;
    },
    eliminarImagen: function () {

        this.tiempoEliminar++;
        if (this.tiempoEliminar == 2) {
            if (this.imagen_resultado != null) {
                this.imagen_resultado.kill();
            }
            this.tiempoEliminar = 0;
        }
    },
    managePause: function () {
        this.game.paused = true;
        var pausedText = this.add.text(500, 253, "PAUSED", this.fontMessage);
        pausedText.anchor.set(0.5, 0.5);

        this.input.onDown.add(function () {
            pausedText.destroy();
            this.game.paused = false;
        }, this);
    },
    CambiarEscenario: function () {
        this.PintarTablero2();
        //MusicaFondo.stop();
        //this.game.state.start('Premiacion');
        //this.buttonContinue.visible=false;     
    },
    PintarTablero2: function () {
        //Se crean los engranes
        Tablero = 2;
        this.Destruir_Imagenes_Tablero1();
        this.Fondo_Engrane = this.game.add.image(520, 310, 'Fondo_Blanco2');
        this.Fondo_Engrane.anchor.setTo(0.5, 0.5);

        this.Engrane1 = new Img_Movimiento(250, 200, 'Engrane1', 1, 250);
        this.Engrane2 = new Img_Movimiento(305, 160, 'Engrane5', 2, 305);
        this.Engrane3 = new Img_Movimiento(350, 190, 'Engrane4', 3, 350);
        this.Engrane4 = new Img_Movimiento(400, 210, 'Engrane5', 4, 400);
        this.Engrane5 = new Img_Movimiento(428, 187, 'Engrane5', 5, 430);
        this.Engrane6 = new Img_Movimiento(470, 220, 'Engrane2', 6, 470);
        this.Engrane7 = new Img_Movimiento(538, 173, 'Engrane3', 7, 538);
        this.Engrane8 = new Img_Movimiento(605, 248, 'Engrane3', 7, 605);
        this.Engrane9 = new Img_Movimiento(830, 277, 'Engrane6', 7, 830);
        this.Banda = new Img_Movimiento(732, 265, 'Banda', 7, 732);
        this.Tuerca = new Img_Movimiento(605, 248, 'Tuerca', 7, 605);
        this.Caja = this.game.add.sprite(690, 210, 'Caja');
        this.Caja.anchor.setTo(0.5, 0.5);
        this.tweenCaja = game.add.tween(this.Caja).to({x: 850}, 24000, "Quart.easeOut");
                

        this.Engrane10 = new Img_Movimiento(240, 420, 'Engrane8', 1, 240);
        this.Engrane11 = new Img_Movimiento(322, 364, 'Engrane3', 2, 322);
        this.Engrane12 = new Img_Movimiento(392, 408, 'Engrane4', 3, 392);
        this.Engrane13 = new Img_Movimiento(430, 370, 'Engrane5', 4, 430);
        this.Engrane14 = new Img_Movimiento(462, 390, 'Engrane5', 5, 462);
        this.Engrane15 = new Img_Movimiento(508, 365, 'Engrane2', 6, 508);
        this.Engrane16 = new Img_Movimiento(559, 380, 'Engrane5', 7, 559);
        this.Engrane17 = new Img_Movimiento(605, 398, 'Engrane6', 7, 605);
        this.Engrane18 = new Img_Movimiento(830, 427, 'Engrane6', 7, 830);
        this.Banda2 = new Img_Movimiento(732, 415, 'Banda', 7, 732);
        this.Tuerca2 = new Img_Movimiento(605, 398, 'Tuerca', 7, 605);
        this.Caja2 = this.game.add.sprite(800, 360, 'Caja');   
        this.Caja2.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.Caja2, Phaser.Physics.ARCADE);
        
        //Se agregan los numeros 1 y 2
        this.Button_Numero1 = this.add.button(150, 200, 'Numero1', this.Mover_Engrane_Opc1, this, 1, 0, 2);
        this.Button_Numero1.anchor.setTo(0.50, 0.50);
        this.Button_Numero2 = this.add.button(150, 420, 'Numero2', this.Mover_Engrane_Opc2, this, 1, 0, 2);
        this.Button_Numero2.anchor.setTo(0.50, 0.50);
    },
    Destruir_Imagenes_Tablero1: function () {
        this.Engrane1.kill();
        this.Engrane2.kill();
        this.Engrane3.kill();
        this.Engrane4.kill();
        this.Engrane5.kill();
        this.Engrane6.kill();
        this.Engrane7.kill();
        this.Button_Numero1.kill();
        this.Button_Numero2.kill();
        this.Fondo_Engrane.kill();
    }

};
