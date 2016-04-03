Juego.GameSecond = function (game) {
};
Juego.GameSecond.prototype = {
    preload: function () {
        this.game.load.image('Fondo', 'assets/img/camino/imagenes/Fondo2.jpg');
        this.game.load.image('Solucion', 'assets/img/camino/solucion.jpg');

        this.game.load.spritesheet('Preguntas', 'assets/img/camino/preguntasAbstractas.png', 400, 80, 4);
        this.game.load.spritesheet('Solucion1', 'assets/img/camino/solucionPregunta1.png', 100, 100, 8);
        this.game.load.spritesheet('Solucion2', 'assets/img/camino/solucionPregunta2.png', 100, 100, 8);
        this.game.load.spritesheet('Solucion3', 'assets/img/camino/solucionPregunta3.png', 100, 100, 8);
        this.game.load.spritesheet('Solucion4', 'assets/img/camino/solucionPregunta4.png', 100, 100, 8);

        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/camino/BT_Siguiente.png', 150, 45, 3);

        this.game.load.spritesheet('BottonesSonido', 'assets/btn/camino/BT_Sonido.png', 50, 50, 4);
        this.game.load.spritesheet('BottonPause', 'assets/btn/camino/BT_Pause.png', 50, 50, 3);
        this.game.load.image('BotonEfecto2', 'assets/btn/camino/BT_Efectos2.png');
        this.game.load.image('BotonMusica2', 'assets/btn/camino/BT_Musica2.png');

        this.game.load.audio('MusicaFondo', 'assets/audio/camino/MusicaFondo.mp3');
        this.game.load.audio('Giro_Ficha', 'assets/audio/camino/Giro_Ficha.mp3');
    },
    create: function () {

        this.textPregunta;
        this.contadorPregunta = 1;
        this.dobleClick = 0;
        //cada posicion corresponde a la respuesta de cada pregunta, en el sprite de imagenes correspondiente a cada pregunta,
        //las dos ultimas posiciones correpsonden a la repsuesta multiple de la cuarta pregunta.
        this.respuestas = [5, 0, 0, 0, 5];
        this.GrupoTablero;
        this.pregunta;
        this.inhabilitarClick = false;



        this.game.add.image(0, 0, 'Fondo');

        this.GrupoTablero = game.add.group();


        this.cargarTableros(this.GrupoTablero, "Solucion1", 100, 250);
        this.pregunta = this.game.add.sprite(100, 120, 'Preguntas', 0);

        this.textPregunta = this.game.add.text(100, 50, "En cada caso, identifique la figura\nque continúa la secuencia.");
        this.textPregunta.anchor.setTo(0, 0.5);
        this.textPregunta.font = 'Comic Sans';
        this.textPregunta.fontSize = 38;

        this.buttonContinue = this.game.add.button(500, 350, 'BottonSiguiente', this.CambiarPregunta, this, 1, 0, 2);
        this.buttonContinue.name = "Continue";
        this.buttonContinue.anchor.setTo(0.5, 0.5);
        this.buttonContinue.visible = false;

        //Botones de sonidos y pause
        this.buttonEfecto = this.game.add.button(840, 30, 'BottonesSonido', this.Musica_Efecto, this, 1, 0, 0);
        this.buttonEfecto.anchor.setTo(0.5, 0.5);
        this.buttonEfecto.name = 'Efectos_Sonido';


        this.buttonMusica = this.game.add.button(900, 30, 'BottonesSonido', this.Musica_Efecto, this, 3, 2, 2);
        this.buttonMusica.anchor.setTo(0.5, 0.5);
        this.buttonMusica.name = 'Musica';

        this.buttonPause = this.game.add.button(960, 30, 'BottonPause', this.managePause, this, 1, 0, 2);
        this.buttonPause.anchor.setTo(0.5, 0.5);
        this.buttonPause.name = 'Pause';

        //Sonidos del videoJuego se agregan
        MusicaFondo = this.game.add.audio('MusicaFondo');
        MusicaFondo.loopFull(0.6);
        this.Sonido_Giro = this.game.add.audio('Giro_Ficha');

    },
    update: function () {
        //Si la musica fue o no desactivada que relice la gestion necesaria
        if (B_musica == false) {
            MusicaFondo.pause();
        }
        else {
            MusicaFondo.resume();
        }
    },
    cargarTableros: function (tablero, imgSprite, posicionX, posicionY) {
        var piecesIndex = 0, i, j, piece;

        for (i = 0; i < 2; i++)
        {
            for (j = 0; j < 2; j++)
            {

                if (piecesIndex == 2) {
                    piecesIndex = piecesIndex + 2;
                }

                piece = tablero.create(j * 100 + posicionX, i * 100 + posicionY, imgSprite, piecesIndex);
                piece.posicionActual = piecesIndex;
                piece.inputEnabled = true;
                piece.events.onInputDown.add(this.selectPiece, this);
                piecesIndex++;
            }
        }

    },
    selectPiece: function (piece) {
        //Giro de baldosa
        if (B_efecto) {
            this.Sonido_Giro.play();
        }
        if (this.inhabilitarClick == false) {
            switch (piece.posicionActual) {
                case 0:
                    piece.loadTexture(piece.key, 2, false);
                    this.dobleClick++;
                    break;
                case 1:
                    piece.loadTexture(piece.key, 3, false);
                    this.dobleClick++;
                    break;
                case 4:
                    piece.loadTexture(piece.key, 6, false);
                    this.dobleClick++;
                    break;
                case 5:
                    piece.loadTexture(piece.key, 7, false);
                    this.dobleClick++;
                    break;
            }
            if (this.contadorPregunta == 4 && this.dobleClick < 2) {
                this.inhabilitarClick = false;
            }
            else {
                this.inhabilitarClick = true;
                this.dobleClick = 0;
                this.buttonContinue.visible = true;
                this.contadorPregunta++;
            }

        }
    },
    CargarTableroSiguiente: function () {

        this.inhabilitarClick = false;

        switch (this.contadorPregunta) {
            case 2:
                this.cargarTableros(this.GrupoTablero, "Solucion2", 100, 250);
                this.pregunta.loadTexture(this.pregunta.key, 1);
                break;
            case 3:
                this.cargarTableros(this.GrupoTablero, "Solucion3", 100, 250);
                this.pregunta.loadTexture(this.pregunta.key, 2);
                break;
            case 4:
                this.cargarTableros(this.GrupoTablero, "Solucion4", 100, 250);
                this.pregunta.loadTexture(this.pregunta.key, 3);
                this.textPregunta.setText("Seleccione de los siguientes numeros,\nlos dos que son Coprimos.");
                break;
        }

    },
    CambiarPregunta: function () {
        this.buttonContinue.visible = false;
        if (this.contadorPregunta == 5) {
            this.contadorPregunta = 1;
            this.JuegoPrincipal();
        }
        else {
            this.CargarTableroSiguiente();
        }
    },
    JuegoPrincipal: function () {
        MusicaFondo.stop();
        this.game.state.start('Game');
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