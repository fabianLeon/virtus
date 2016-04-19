Juego.Game = function (game) {
};
Juego.Game.prototype = {
    create: function () {
        this.timerInicial = 3;
        this.timerJuego = 0;
        this.tiempoEliminar = 0;
        this.SecuenciaFinal = 0;

        this.game.add.image(0, 0, 'Fondo');

        map = this.game.add.tilemap('mundo_json');
        map.addTilesetImage('Desert', 'mundo_tiles');
        layer = map.createLayer('Ground');
        layer.resizeWorld();


        //Linea Verde al rededor del puntero con 100 pixeles X 100 pixeles
        marker = this.game.add.graphics();
        marker.lineStyle(3, 0x0404B4, 1);
        marker.drawRect(0, 0, 100, 100);

        this.randomizeTiles();

        this.createText();
        this.Solucion = this.game.add.image(0, 0, 'Solucion');

        //Texto del tiempo
        this.timerText = this.game.add.text(800, 350, this.timerInicial, {
            font: "100px Comic Sans MS",
            fill: "#000000",
            align: "center"
        });
        this.timerText.anchor.setTo(0.5, 0.5);

        this.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);

        this.Pregunta = this.game.add.sprite(800, 200, 'Preguntas', 0);
        this.Pregunta.anchor.setTo(0.5, 0.5);

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

        this.buttonReiniciar = this.game.add.button(780, 30, 'BottonReiniciar', this.Reiniciar_Nivel, this, 1, 0, 2);
        this.buttonReiniciar.anchor.setTo(0.5, 0.5);
        this.buttonReiniciar.name = 'Reiniciar';

        //Sonidos del videoJuego se agregan
        MusicaFondo = this.game.add.audio('MusicaFondo');
        MusicaFondo.loopFull(0.6);
        this.Sonido_Giro = this.game.add.audio('Giro_Ficha');
    },
    updateTimer: function () {
        this.timerJuego++;
        this.timerInicial--;
        if (this.timerInicial == 0) {
            this.timerText.setText("¡¡Go!!");
        }
        else if (this.timerInicial == -1) {
            this.timerText.kill();
            this.Solucion.kill();
        }
        else {
            this.timerText.setText(this.timerInicial);
        }
    },
    createText: function () {

        //Primero el Titulo---------------------------------------------------------
        text = this.game.add.text(780, 80, "Logica Matematica");
        //El puntero se ubicara en el centro del texto, para ubicarlo en el CANVAS
        text.anchor.setTo(0.5, 0.5);

        text.font = 'comic sans';
        text.fontSize = 50;

        //Degrade cuando el cursor no este sobre el texto
        grdOut = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grdOut.addColorStop(0, '#8ED6FF');
        grdOut.addColorStop(1, '#004CB3');

        //Degrade cuando el cursor este sobre el texto
        grdOver = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
        grdOver.addColorStop(0, '#FFF866');
        grdOver.addColorStop(1, '#FF9703');

        //Se pinta con el degrade inicial
        text.fill = grdOut;

        text.stroke = '#000000';
        text.strokeThickness = 2;
        text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

        text.inputEnabled = true;

        text.events.onInputOver.add(this.overText, this);
        text.events.onInputOut.add(this.outText, this);

        //-----------Texto Ganador
        TextWin = this.game.add.text(780, 350, "");
        TextWin.anchor.setTo(0.5, 0.5);
        TextWin.font = 'comic sans';
        TextWin.fontSize = 38;
        TextWin.fill = grdOut;
    },
//Cuando el puntero del mouse este fuera del Texto
    outText: function () {
        text.fill = grdOut;
    },
//Cuando el puntero del mouse este sobre el Texto
    overText: function () {
        text.fill = grdOver;
    },
    update: function () {
        if (this.timerInicial < -1) {
            CuadradoX = layer.getTileX(this.game.input.activePointer.worldX);
            CuadradoY = layer.getTileY(this.game.input.activePointer.worldY);

            //Si el puntero del mouse esta sobre una cuadricula inferior o igual a 5 (0 cuenta),
            //Para evitar que el marcador se salga fuera de los límites
            if (((CuadradoX <= 4 && CuadradoX > 0) && CuadradoY <= 4) || (CuadradoX == 0 && CuadradoY == 1) || (CuadradoX == 5 && CuadradoY == 1))
            {
                marker.x = layer.getTileX(this.game.input.activePointer.worldX) * 100;
                marker.y = layer.getTileY(this.game.input.activePointer.worldY) * 100;

                if (flipFlag == true)
                {
                    //Si el tiempo actual del juego menos El tiempo desde que se oprimio la segunda figura es mayor a medio segundo que voltee las figuras
                    if (this.game.time.totalElapsedSeconds() - tiempoChequeo > 0.5)
                    {
                        this.flipBack();
                    }
                }
                else
                {
                    this.processClick();
                }
            }

            if (Secuencia >= 7) {
                this.SecuenciaFinal = Secuencia;
                Secuencia = 1;

            }
        }

        //Si la musica fue o no desactivada que relice la gestion necesaria
        if (B_musica == false) {
            MusicaFondo.pause();
        }
        else {
            MusicaFondo.resume();
        }
    },
    processClick: function () {

        TileActual = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
        PosicionTileActual = ((layer.getTileY(this.game.input.activePointer.worldY) + 1) * 6) - (6 - (layer.getTileX(this.game.input.activePointer.worldX) + 1));

        if (this.game.input.activePointer.isDown)
        {
            //Giro de baldosa
            if (B_efecto) {
                this.Sonido_Giro.play();
            }
            // compruebe que la baldosa o Tile no está volteado, si esta volteada no actua
            if (TileActual.index == ListaInicial[PosicionTileActual - 1])
            {
                // obtiene el elemento correspondiente de la lista de cuadrados
                currentNum = ListaCuadrados[PosicionTileActual - 1];


                this.flipOver();
                ContadorCuadrados++;

                // Esta la segunda baldosa o Tile par volteada?
                if (ContadorCuadrados == Secuencia)
                {
                    // Reiniciar ContadorCuadrados
                    ContadorCuadrados = 0;
                    NumCasillasAlmacen.push(ListaParejas[PosicionTileActual - 1]);
                    AlmacenValores.push(ListaValores[PosicionTileActual - 1]);


                    // check for match
                    if (this.listaResultadoIgual(AlmacenValores, NumCasillasAlmacen) == true)
                    {
                        if (this.imagen_resultado) {
                            this.imagen_resultado.kill();
                        }
                        masterCounter++;
                        this.Pregunta.loadTexture(this.Pregunta.key, masterCounter, false);

                        swal({title: "Respuesta Correcta",
                            text: "Los numeros que seleccionaste completaron la operación.",
                            timer: 1000,
                            showConfirmButton: false,
                            type: "success"});

                        Secuencia++;
                        if (this.listaParejasFigurasIguales(NumCasillasAlmacen) == true) {
                            Parejas_Acertadas++;
                        }
                        NumCasillasAlmacen = [];
                        AlmacenValores = [];
                        coordenadasX = [];
                        coordenadasY = [];

                        if (masterCounter == 7)
                        {
                            // Se gana el juego y se acaba
                            TextWin.setText('¡Felicitaciones Gano!');
                            banderaTiempo = false;
                            tiempoTotal = this.timerJuego;
                            MusicaFondo.stop();
                            this.game.state.start('Premiacion');
                            //console.log("SumaTotal: " + SumaTotal.toString());
                            //alert("secuenciaTotal: " + secuenciaTotal.toString());
                        }
                    }
                    else
                    {
                        if (this.imagen_resultado) {
                            this.imagen_resultado.kill();
                        }
                        coordenadasX.push(layer.getTileX(marker.x));
                        coordenadasY.push(layer.getTileY(marker.y));
                        flipFlag = true;
                        tiempoChequeo = this.game.time.totalElapsedSeconds();
                        swal({title: "¡Respuesta Incorrecta!",
                            text: "Los numeros que seleccionaste no completan la operación.",
                            timer: 1500,
                            showConfirmButton: false,
                            type: "error"});
                    }
                }
                else
                {
                    coordenadasX.push(layer.getTileX(marker.x));
                    coordenadasY.push(layer.getTileY(marker.y));
                    NumCasillasAlmacen.push(ListaParejas[PosicionTileActual - 1]);
                    AlmacenValores.push(ListaValores[PosicionTileActual - 1]);
                }

            }
        }
    },
    flipOver: function () {

        map.putTile(currentNum, layer.getTileX(marker.x), layer.getTileY(marker.y));
    },
    listaResultadoIgual: function (lista, lista2) {

        var suma = 0;
        var sumaParejas = 0;
        var respuesta_guardada = 0;
        for (index = 0; index < lista.length; index++) {
            //secuenciaTotal.push(lista2[index]);
            suma = lista[index] + suma;
        }

        for (index = 0; index < lista2.length; index++) {
            //secuenciaTotal.push(lista2[index]);
            sumaParejas = lista2[index] + sumaParejas;
        }

        if (this.SecuenciaFinal != 0) {
            respuesta_guardada = respuestasSuma[this.SecuenciaFinal - 1]
        } else {
            respuesta_guardada = respuestasSuma[Secuencia - 1]
        }


        if (suma == respuesta_guardada) {
            if ((sumaParejas / Secuencia) == Secuencia) {
                secuenciaFigura.push(1); //uno representa true
            }
            else {
                secuenciaFigura.push(0);//cero representa false
            }

            //intentos.push(Fallos);
            //SumaTotal.push(suma);
            return true;
        }
        else {
            //SumaTotal.push(suma);
            Fallos = Fallos + 1;
            return false;
        }

    },
    listaParejasFigurasIguales: function (lista) {
        var cantidad_numeros = 0;
        var numero_inicial = 0;
        var numero_siguiente = 0;
        var repetidos = 1;

        cantidad_numeros = lista.length;

        if (cantidad_numeros > 1) {
            for (index = 0; index < lista.length; index++) {
                if (index == 0) {
                    numero_inicial = lista[index];
                }
                else {
                    numero_siguiente = lista[index];
                    if (numero_inicial == numero_siguiente) {
                        repetidos++;
                    }
                }
            }
        }

        if (cantidad_numeros == repetidos) {
            return true;
        }
        else {
            return false;
        }
    },
    flipBack: function () {
        var posicion;
        flipFlag = false;

        for (i = 0; i < coordenadasX.length; i++) {
            posicion = ((coordenadasY[i] + 1) * 6) - (6 - (coordenadasX[i] + 1));
            map.putTile(ListaInicial[posicion - 1], coordenadasX[i], coordenadasY[i]);
        }
        coordenadasX = [];
        coordenadasY = [];
        NumCasillasAlmacen = [];
        AlmacenValores = [];
    },
    randomizeTiles: function () {

        ListaInicial = [42, 10, 1, 41, 9, 42, 12, 16, 2, 17, 3, 12, 42, 15, 5, 12, 18, 42, 42, 11, 9, 13, 10, 42, 42, 4, 7, 14, 8, 42];
        ListaValores = [42, 6, 0, 111, 6, 42, 5, 8, 1, 8, 1, 5, 42, 9, 27, 5, 9, 42, 42, 7, 6, 7, 6, 42, 42, 27, 100, 27, 100, 42];
        ListaParejas = [42, 6, 1, 7, 6, 42, 6, 4, 2, 4, 2, 6, 42, 6, 3, 5, 6, 42, 42, 4, 5, 4, 5, 42, 42, 3, 5, 3, 5, 42];
        ListaCuadrados = [42, 19, 25, 26, 20, 42, 23, 37, 27, 32, 28, 24, 42, 21, 30, 40, 22, 42, 42, 31, 39, 38, 34, 42, 42, 29, 33, 36, 35, 42];

        respuestasSuma = [0, 2, 81, 30, 217, 40, 111];


        //Ciclos For que rellenan la cuadricula inicial con la figura de la ListaInicial
        var i = 0;
        for (row = 0; row < 5; row++)
        {
            for (col = 0; col < 6; col++)
            {
                if (((col <= 5 && col >= 0) && row <= 4) || (col == 0 && row == 1) || (col == 5 && row == 1)) {
                    map.putTile(ListaInicial[i], col, row);
                    i++
                }

            }
        }
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
    },
    Reiniciar_Nivel: function () {
        intentos += 1;
        tiempoTotal = tiempoTotal + this.timerJuego;
        Parejas_Acertadas = 0;
        Fallos = 0;
        tiempoChequeo = 0;
        masterCounter = 0;
        ContadorCuadrados = 0;
        banderaTiempo = true;
        Secuencia = 1;
        B_musica = true;
        B_efecto = true;
        MusicaFondo.stop();
        this.game.state.start('Game');
    }

};