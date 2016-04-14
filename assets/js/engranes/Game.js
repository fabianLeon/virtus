Juego.Game = function (game) {
};
Juego.Game.prototype = {
    preload: function () {
    },
    create: function () {
        this.timerJuego = 0;
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

        this.buttonReiniciar = this.game.add.button(780, 50, 'BottonReiniciar', this.Reiniciar_Nivel, this, 1, 0, 2);
        this.buttonReiniciar.anchor.setTo(0.5, 0.5);
        this.buttonReiniciar.name = 'Reiniciar';

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

        this.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);

        //Texto Pregunta
        this.QuestionText = this.game.add.text(250, 180, "¿Hacia donde apuntara la aguja al girar los engranes?", {
            font: "20px Comic Sans MS",
            fill: "#000000",
            align: "center"
        });
    },
    setupBombaAgua: function (bombaAgua) {

        bombaAgua.anchor.x = 0.5;
        bombaAgua.anchor.y = 0.5;
        bombaAgua.animations.add('kaboom');

    },
    update: function () {
        if (Tablero == 2) {
            this.game.physics.arcade.collide(this.Engrane17, this.Caja2, this.collisionCaja, null, this);
        }

        if (Mover_Engranes == true) {
            this.MoverEngranes();
        } else if (Mover_Engranes == false && Tablero == 2) {
            this.Caja.body.velocity.x = 0;
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
        this.timerJuego++;
        if (Tablero == 1) {
            if (Mover_Engranes == true) {
                this.tiempo_detenerse++;
                if (this.tiempo_detenerse == 2) {
                    Mover_Engranes = false
                    if (respuesta == 1) {
                        swal({title: "¡Respuesta Correcta!",
                            text: "La aguja apuntara hacia el numero 1, cuando giren los engranes.",
                            timer: 1000,
                            showConfirmButton: false,
                            type: "success"});
                        respuestas_Acertadas += 1;
                        tiempoTotal = this.timerJuego;
                        this.buttonContinue.visible = true;
                        this.time.events.loop(Phaser.Timer.SECOND, this.eliminarImagen, this);
                    } else if (respuesta == 2) {
                        swal({title: "¡Respuesta Incorrecta!",
                            text: "La aguja apuntara hacia el numero 1, cuando giren los engranes.",
                            timer: 1500,
                            showConfirmButton: false,
                            type: "error"});
                        tiempoTotal = this.timerJuego;
                        this.buttonContinue.visible = true;
                        this.time.events.loop(Phaser.Timer.SECOND, this.eliminarImagen, this);
                    }

                }
                tiempo1 = this.timerJuego;
                this.timerJuego = 0;
            }
        }
        else if (Tablero == 2) {
            if (Mover_Engranes == true) {
                this.tiempo_detenerse++;
                if (this.tiempo_detenerse == 3) {
                    Mover_Engranes = false
                    if (respuesta == 1) {
                        swal({title: "¡Respuesta Correcta!",
                            text: "El sistema de engranes que hara que la caja llegue al final de la banda es el numero 1.",
                            timer: 1000,
                            showConfirmButton: false,
                            type: "success"});
                        respuestas_Acertadas += 1;
                        tiempoTotal = tiempoTotal + this.timerJuego;
                        this.buttonContinue.visible = true;
                        this.time.events.loop(Phaser.Timer.SECOND, this.eliminarImagen, this);
                    } else if (respuesta == 2) {
                        swal({title: "¡Respuesta Incorrecta!",
                            text: "El sistema de engranes que hara que la caja llegue al final de la banda es el numero 1.",
                            timer: 1500,
                            showConfirmButton: false,
                            type: "error"});
                        tiempoTotal = tiempoTotal + this.timerJuego;
                        this.buttonContinue.visible = true;
                        this.time.events.loop(Phaser.Timer.SECOND, this.eliminarImagen, this);
                    }

                }
                tiempo2 = this.timerJuego;
                this.timerJuego = 0;
            }
        }
        else if (Tablero == 3) {
            if (Mover_Engranes == true) {
                this.tiempo_detenerse++;
                if (respuesta == 3 && this.tiempo_detenerse == 1) {
                    swal({title: "¡Respuesta Correcta!",
                            text: "Ningun sistema de engranes hace que las agujas se muevan en sentido contrario.",
                            timer: 1000,
                            showConfirmButton: false,
                            type: "success"});
                    respuestas_Acertadas += 1;
                    tiempoTotal = tiempoTotal + this.timerJuego;
                    this.buttonContinue.visible = true;
                    this.time.events.loop(Phaser.Timer.SECOND, this.eliminarImagen, this);
                }
                else if (respuesta != 3 && this.tiempo_detenerse == 3) {
                    Mover_Engranes = false
                    if (respuesta == 1 || respuesta == 2) {
                        swal({title: "¡Respuesta Incorrecta!",
                            text: "Ningun sistema de engranes hace que las agujas se muevan en sentido contrario.",
                            timer: 1500,
                            showConfirmButton: false,
                            type: "error"});
                        tiempoTotal = tiempoTotal + this.timerJuego;
                        this.buttonContinue.visible = true;
                        this.time.events.loop(Phaser.Timer.SECOND, this.eliminarImagen, this);
                    }
                }
                tiempo3 = this.timerJuego;
                this.timerJuego = 0;
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
            this.Caja.body.velocity.x = +30;

            this.Engrane10.angle += 0.5;
            this.Engrane11.angle -= 0.5;
            this.Engrane12.angle += 0.7;
            this.Engrane13.angle -= 0.9;
            this.Engrane14.angle += 0.9;
            this.Engrane15.angle -= 0.7;
            this.Engrane16.angle += 0.9;
            this.Engrane17.angle -= 0.7;
            this.Engrane18.angle -= 0.7;
            this.Tuerca2.angle -= 0.7;
            this.Caja2.body.velocity.x = -30;
        } else if (Tablero == 3 && respuesta == 1) {
            this.Engrane1.angle -= 0.5;
            this.Engrane2.angle += 0.9;
            this.Engrane3.angle -= 0.9;
            this.Engrane4.angle += 0.9;
            this.Engrane5.angle -= 0.7;
            this.Engrane6.angle += 0.9;
            this.Engrane7.angle -= 0.7;
            this.Engrane8.angle += 0.9;
            this.Engrane9.angle += 0.7;
            this.Engrane10.angle += 0.2;
            this.Tuerca1.angle -= 0.7;
            this.Tuerca2.angle -= 0.7;
            this.Tuerca3.angle -= 0.7;

            this.Engrane11.angle -= 0.5;
            this.Engrane12.angle += 0.9;
            this.Engrane13.angle -= 0.7;
            this.Engrane14.angle += 0.5;
            this.Engrane15.angle -= 0.9;
            this.Engrane16.angle += 0.7;
            this.Engrane17.angle -= 0.5;
            this.Engrane18.angle += 0.2;
            this.Tuerca3.angle -= 0.7;
            this.Tuerca4.angle += 0.7;
            this.Tuerca5.angle += 0.7;
        } else if (Tablero == 3 && respuesta == 2) {
            this.Engrane1.angle += 0.5;
            this.Engrane2.angle -= 0.9;
            this.Engrane3.angle += 0.9;
            this.Engrane4.angle -= 0.9;
            this.Engrane5.angle += 0.7;
            this.Engrane6.angle -= 0.9;
            this.Engrane7.angle += 0.7;
            this.Engrane8.angle -= 0.9;
            this.Engrane9.angle += 0.7;
            this.Engrane10.angle -= 0.2;
            this.Tuerca1.angle += 0.7;
            this.Tuerca2.angle += 0.7;
            this.Tuerca3.angle += 0.7;

            this.Engrane11.angle += 0.5;
            this.Engrane12.angle -= 0.9;
            this.Engrane13.angle += 0.7;
            this.Engrane14.angle -= 0.5;
            this.Engrane15.angle += 0.9;
            this.Engrane16.angle -= 0.7;
            this.Engrane17.angle += 0.5;
            this.Engrane18.angle -= 0.2;
            this.Tuerca3.angle += 0.7;
            this.Tuerca4.angle -= 0.7;
            this.Tuerca5.angle -= 0.7;
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
        if (Tablero == 1) {
            this.Button_Numero1.kill();
            this.Button_Numero2.kill();
            this.Imagen_Numero1 = this.game.add.sprite(750, 300, 'Numero1', 2);
            this.Imagen_Numero1.anchor.setTo(0.50, 0.50);
            this.Imagen_Numero2 = this.game.add.sprite(750, 400, 'Numero2', 0);
            this.Imagen_Numero2.anchor.setTo(0.50, 0.50);

        } else if (Tablero == 2) {
            this.Button_Numero1.kill();
            this.Button_Numero2.kill();
            this.Imagen_Numero1 = this.game.add.sprite(150, 250, 'Numero1', 2);
            this.Imagen_Numero1.anchor.setTo(0.50, 0.50);
            this.Imagen_Numero2 = this.game.add.sprite(150, 450, 'Numero2', 0);
            this.Imagen_Numero2.anchor.setTo(0.50, 0.50);
        } else if (Tablero == 3) {
            this.Button_Numero1.kill();
            this.Button_Numero2.kill();
            this.Imagen_Numero1 = this.game.add.sprite(150, 230, 'Numero1', 2);
            this.Imagen_Numero1.anchor.setTo(0.50, 0.50);
            this.Imagen_Numero2 = this.game.add.sprite(150, 440, 'Numero2', 0);
            this.Imagen_Numero2.anchor.setTo(0.50, 0.50);
            this.Imagen_Ninguno = this.game.add.sprite(150, 335, 'Ninguno', 0);
            this.Imagen_Ninguno.anchor.setTo(0.50, 0.50);
        }
        Mover_Engranes = true;
        respuesta = 1;
    },
    Mover_Engrane_Opc2: function () {
        if (Tablero == 1) {
            this.Button_Numero1.kill();
            this.Button_Numero2.kill();
            this.Imagen_Numero1 = this.game.add.sprite(750, 300, 'Numero1', 0);
            this.Imagen_Numero1.anchor.setTo(0.50, 0.50);
            this.Imagen_Numero2 = this.game.add.sprite(750, 400, 'Numero2', 2);
            this.Imagen_Numero2.anchor.setTo(0.50, 0.50);

        } else if (Tablero == 2) {
            this.Button_Numero1.kill();
            this.Button_Numero2.kill();
            this.Imagen_Numero1 = this.game.add.sprite(150, 250, 'Numero1', 0);
            this.Imagen_Numero1.anchor.setTo(0.50, 0.50);
            this.Imagen_Numero2 = this.game.add.sprite(150, 450, 'Numero2', 2);
            this.Imagen_Numero2.anchor.setTo(0.50, 0.50);
        }
        else if (Tablero == 3) {
            this.Button_Numero1.kill();
            this.Button_Numero2.kill();
            this.Imagen_Numero1 = this.game.add.sprite(150, 230, 'Numero1', 0);
            this.Imagen_Numero1.anchor.setTo(0.50, 0.50);
            this.Imagen_Numero2 = this.game.add.sprite(150, 440, 'Numero2', 2);
            this.Imagen_Numero2.anchor.setTo(0.50, 0.50);
            this.Imagen_Ninguno = this.game.add.sprite(150, 335, 'Ninguno', 0);
            this.Imagen_Ninguno.anchor.setTo(0.50, 0.50);
        }

        Mover_Engranes = true;
        respuesta = 2;
    },
    Mover_Engrane_Opc3: function () {
        this.Button_Numero1.kill();
        this.Button_Numero2.kill();
        this.Button_Ninguno.kill();

        this.Imagen_Numero1 = this.game.add.sprite(150, 230, 'Numero1', 0);
        this.Imagen_Numero1.anchor.setTo(0.50, 0.50);
        this.Imagen_Numero2 = this.game.add.sprite(150, 440, 'Numero2', 0);
        this.Imagen_Numero2.anchor.setTo(0.50, 0.50);
        this.Imagen_Ninguno = this.game.add.sprite(150, 335, 'Ninguno', 2);
        this.Imagen_Ninguno.anchor.setTo(0.50, 0.50);

        Mover_Engranes = true;
        respuesta = 3;
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
        if (Tablero == 1) {
            this.PintarTablero2();
        }
        else if (Tablero == 2) {
            this.PintarTablero3();
        }
        else if (Tablero == 3) {
            MusicaFondo.stop();
            this.game.state.start('Premiacion');
        }

    },
    PintarTablero2: function () {
        //Se crean los engranes
        Tablero = 2;
        this.tiempo_detenerse = 0;
        this.Destruir_Imagenes_Tablero1();
        this.Fondo_Engrane = this.game.add.image(520, 310, 'Fondo_Blanco2');
        this.Fondo_Engrane.anchor.setTo(0.5, 0.5);

        this.QuestionTextText = this.game.add.text(200, 120, "¿Qué sistema de engranes hará que la caja llegue al final de la banda?", {
            font: "20px Comic Sans MS",
            fill: "#000000",
            align: "center"
        });

        this.Engrane1 = new Img_Movimiento(250, 240, 'Engrane1', 1, 250);
        this.Engrane2 = new Img_Movimiento(305, 200, 'Engrane5', 2, 305);
        this.Engrane3 = new Img_Movimiento(350, 230, 'Engrane4', 3, 350);
        this.Engrane4 = new Img_Movimiento(400, 250, 'Engrane5', 4, 400);
        this.Engrane5 = new Img_Movimiento(428, 227, 'Engrane5', 5, 430);
        this.Engrane6 = new Img_Movimiento(470, 260, 'Engrane2', 6, 470);
        this.Engrane7 = new Img_Movimiento(538, 213, 'Engrane3', 7, 538);
        this.Engrane8 = new Img_Movimiento(605, 288, 'Engrane3', 7, 605);
        this.Engrane9 = new Img_Movimiento(830, 317, 'Engrane6', 7, 830);
        this.Banda = new Img_Movimiento(732, 305, 'Banda1', 7, 732);
        this.Tuerca = new Img_Movimiento(605, 288, 'Tuerca', 7, 605);
        this.Caja = this.game.add.sprite(740, 250, 'Caja');
        this.Caja.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.Caja, Phaser.Physics.ARCADE);


        this.Engrane10 = new Img_Movimiento(240, 450, 'Engrane8', 1, 240);
        this.Engrane11 = new Img_Movimiento(322, 394, 'Engrane3', 2, 322);
        this.Engrane12 = new Img_Movimiento(392, 438, 'Engrane4', 3, 392);
        this.Engrane13 = new Img_Movimiento(430, 400, 'Engrane5', 4, 430);
        this.Engrane14 = new Img_Movimiento(462, 420, 'Engrane5', 5, 462);
        this.Engrane15 = new Img_Movimiento(508, 395, 'Engrane2', 6, 508);
        this.Engrane16 = new Img_Movimiento(559, 410, 'Engrane5', 7, 559);
        this.Engrane17 = new Img_Movimiento(605, 428, 'Engrane6', 7, 605);
        this.Engrane18 = new Img_Movimiento(830, 457, 'Engrane6', 7, 830);
        this.Banda2 = new Img_Movimiento(732, 445, 'Banda1', 7, 732);
        this.Tuerca2 = new Img_Movimiento(605, 428, 'Tuerca', 7, 605);
        this.Caja2 = this.game.add.sprite(740, 390, 'Caja');
        this.Caja2.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.Caja2, Phaser.Physics.ARCADE);

        //Se agregan los numeros 1 y 2
        this.Button_Numero1 = this.add.button(150, 250, 'Numero1', this.Mover_Engrane_Opc1, this, 1, 0, 2);
        this.Button_Numero1.anchor.setTo(0.50, 0.50);
        this.Button_Numero2 = this.add.button(150, 450, 'Numero2', this.Mover_Engrane_Opc2, this, 1, 0, 2);
        this.Button_Numero2.anchor.setTo(0.50, 0.50);

        //Se agrega el Boton Continue Oculto
        this.buttonContinue = this.game.add.button(500, 500, 'BottonSiguiente', this.CambiarEscenario, this, 1, 0, 2);
        this.buttonContinue.name = "Continue";
        this.buttonContinue.anchor.setTo(0.5, 0.5);
        this.buttonContinue.visible = false;

        //Se crea explosion de bomba de agua
        this.explosions = this.game.add.group();
        this.explosions.createMultiple(10, 'kaboom');
        this.explosions.forEach(this.setupBombaAgua, this);

    },
    PintarTablero3: function () {
        //Se crean los engranes
        Tablero = 3;
        this.tiempo_detenerse = 0;
        this.Destruir_Imagenes_Tablero2();
        this.Fondo_Engrane = this.game.add.image(520, 310, 'Fondo_Blanco2');
        this.Fondo_Engrane.anchor.setTo(0.5, 0.5);
        this.QuestionTextText = this.game.add.text(130, 120, "¿Qué engrane debe moverse para que las flechas de los sistemas de engranajes giren en sentido contrario?", {
            font: "15px Comic Sans MS",
            fill: "#000000",
            align: "center"
        });


        this.Banda = new Img_Movimiento(240, 340, 'Banda2', 7, 240);
        this.Banda2 = new Img_Movimiento(457, 298, 'Banda3', 7, 457);
        this.Banda2 = new Img_Movimiento(651, 310, 'Banda4', 7, 651);

        this.Engrane1 = new Img_Movimiento(240, 240, 'Engrane1', 1, 240);
        this.Engrane2 = new Img_Movimiento(310, 240, 'Engrane5', 2, 310);
        this.Engrane3 = new Img_Movimiento(335, 215, 'Engrane5', 3, 335);
        this.Engrane4 = new Img_Movimiento(360, 240, 'Engrane5', 4, 360);
        this.Engrane5 = new Img_Movimiento(405, 215, 'Engrane2', 5, 405);
        this.Engrane6 = new Img_Movimiento(458, 215, 'Engrane5', 6, 458);
        this.Engrane7 = new Img_Movimiento(508, 235, 'Engrane2', 7, 508);
        this.Engrane8 = new Img_Movimiento(554, 210, 'Engrane5', 8, 554);
        this.Engrane9 = new Img_Movimiento(603, 190, 'Engrane2', 9, 603);
        this.Engrane10 = new Img_Movimiento(700, 250, 'Engrane7', 10, 700);
        this.Tuerca1 = new Img_Movimiento(240, 240, 'Tuerca', 7, 240);
        this.Tuerca2 = new Img_Movimiento(405, 215, 'Tuerca', 7, 405);
        this.Tuerca3 = new Img_Movimiento(603, 191, 'Tuerca', 7, 603);

        this.Engrane11 = new Img_Movimiento(240, 440, 'Engrane8', 11, 240);
        this.Engrane12 = new Img_Movimiento(308, 435, 'Engrane5', 12, 308);
        this.Engrane13 = new Img_Movimiento(337, 390, 'Engrane2', 13, 337);
        this.Engrane14 = new Img_Movimiento(405, 440, 'Engrane3', 5, 405);
        this.Engrane15 = new Img_Movimiento(460, 400, 'Engrane5', 7, 460);
        this.Engrane16 = new Img_Movimiento(510, 380, 'Engrane2', 7, 510);
        this.Engrane17 = new Img_Movimiento(573, 439, 'Engrane3', 7, 573);
        this.Engrane18 = new Img_Movimiento(700, 430, 'Engrane7', 10, 700);
        this.Tuerca4 = new Img_Movimiento(240, 440, 'Tuerca', 7, 240);
        this.Tuerca5 = new Img_Movimiento(509, 380, 'Tuerca', 7, 509);
        this.Tuerca6 = new Img_Movimiento(698, 429, 'Tuerca', 7, 698);

        //Se agregan los numeros 1 y 2
        this.Button_Numero1 = this.add.button(150, 230, 'Numero1', this.Mover_Engrane_Opc1, this, 1, 0, 2);
        this.Button_Numero1.anchor.setTo(0.50, 0.50);
        this.Button_Numero2 = this.add.button(150, 440, 'Numero2', this.Mover_Engrane_Opc2, this, 1, 0, 2);
        this.Button_Numero2.anchor.setTo(0.50, 0.50);
        this.Button_Ninguno = this.add.button(150, 335, 'Ninguno', this.Mover_Engrane_Opc3, this, 1, 0, 2);
        this.Button_Ninguno.anchor.setTo(0.50, 0.50);

        //Se agrega el Boton Continue Oculto
        this.buttonContinue = this.game.add.button(500, 500, 'BottonSiguiente', this.CambiarEscenario, this, 1, 0, 2);
        this.buttonContinue.name = "Continue";
        this.buttonContinue.anchor.setTo(0.5, 0.5);
        this.buttonContinue.visible = false;

    },
    Destruir_Imagenes_Tablero1: function () {
        this.Engrane1.kill();
        this.Engrane2.kill();
        this.Engrane3.kill();
        this.Engrane4.kill();
        this.Engrane5.kill();
        this.Engrane6.kill();
        this.Engrane7.kill();

        this.buttonContinue.kill();
        this.Imagen_Numero1.kill();
        this.Imagen_Numero2.kill();
        this.Fondo_Engrane.kill();
        this.QuestionText.kill();
    },
    Destruir_Imagenes_Tablero2: function () {
        this.Engrane1.kill();
        this.Engrane2.kill();
        this.Engrane3.kill();
        this.Engrane4.kill();
        this.Engrane5.kill();
        this.Engrane6.kill();
        this.Engrane7.kill();
        this.Engrane8.kill();
        this.Engrane9.kill();
        this.Engrane10.kill();
        this.Engrane11.kill();
        this.Engrane12.kill();
        this.Engrane13.kill();
        this.Engrane14.kill();
        this.Engrane15.kill();
        this.Engrane16.kill();
        this.Engrane17.kill();
        this.Engrane18.kill();

        this.Banda.kill();
        this.Tuerca.kill();
        this.Caja.kill();
        this.Banda2.kill();
        this.Tuerca2.kill();
        this.Caja2.kill();

        this.buttonContinue.kill();
        this.Imagen_Numero1.kill();
        this.Imagen_Numero2.kill();
        this.Fondo_Engrane.kill();
        this.QuestionText.kill();
    },
    Reiniciar_Nivel: function () {
        intentos += 1;
        tiempoTotal = tiempoTotal + this.timerJuego;
        B_musica = true;
        B_efecto = true;
        tiempo1 = 0;
        tiempo2 = 0;
        tiempo3 = 0;
        Mover_Engranes = false;
        respuesta = 0;
        respuestas_Acertadas = 0;
        Tablero = 0;
        MusicaFondo.stop();
        this.game.state.start('Game');
    }

};
