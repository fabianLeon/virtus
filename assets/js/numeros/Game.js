Juego.Game = function (game) {
};
Juego.Game.prototype = {
    preload: function () {
        //game.scale.pageAlignHorizontally=true;
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        this.game.load.tilemap('mundo_json', 'assets/img/numeros/Numeros.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('fondo', 'assets/img/numeros/Fondo.jpg');
        this.game.load.image('Solucion', 'assets/img/numeros/solucion.png');
        this.game.load.image('mundo_tiles', 'assets/img/numeros/mundo.png');
        this.game.load.image('Error', 'assets/img/numeros/error.png');
        this.game.load.image('VistoBueno', 'assets/img/numeros/VistoBueno.png');

        this.game.load.spritesheet('Preguntas', 'assets/img/numeros/Preguntas.png', 350, 100);
    },
    create: function () {
        this.timerInicial = 5;
        this.timer = 0;
        this.tiempoEliminar = 0;
        this.SecuenciaFinal = 0;

        this.game.add.image(0, 0, 'fondo');

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
        this.timerText = this.game.add.text(800, 300, this.timerInicial, {
            font: "100px Comic Sans MS",
            fill: "#000000",
            align: "center"
        });
        this.timerText.anchor.setTo(0.5, 0.5);

        this.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
        this.time.events.loop(Phaser.Timer.SECOND, this.eliminarImagen, this);

        this.Pregunta = this.game.add.sprite(800, 150, 'Preguntas', 0);
        this.Pregunta.anchor.setTo(0.5, 0.5);
    },
    updateTimer: function () {
        this.timer++;
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
        text = this.game.add.text(780, 30, "Logica Matematica");
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
        TextWin = this.game.add.text(770, 550, "");
        TextWin.anchor.setTo(0.5, 0.5);
        TextWin.font = 'comic sans';
        TextWin.fontSize = 38;
        TextWin.fill = grdOut;

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
    },
    processClick: function () {

        TileActual = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
        PosicionTileActual = ((layer.getTileY(this.game.input.activePointer.worldY) + 1) * 6) - (6 - (layer.getTileX(this.game.input.activePointer.worldX) + 1));

        if (this.game.input.activePointer.isDown)
        {
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
                        masterCounter++;
                        this.Pregunta.loadTexture(this.Pregunta.key, masterCounter, false);
                        this.imagen_resultado = this.game.add.image(500, 225, 'VistoBueno');
                        this.imagen_resultado.anchor.setTo(0.5, 0.5);
                        Secuencia++;
                        NumCasillasAlmacen = [];
                        AlmacenValores = [];
                        coordenadasX = [];
                        coordenadasY = [];

                        if (masterCounter == 7)
                        {
                            // Se gana el juego y se acaba
                            TextWin.setText('¡Felicitaciones Gano!');
                            banderaTiempo = false;
                            alert("secuenciaTotal: " + secuenciaTotal.toString());
                            alert("SumaTotal: " + SumaTotal.toString());
                            alert("intentos: " + intentos.toString());
                        }
                    }
                    else
                    {
                        coordenadasX.push(layer.getTileX(marker.x));
                        coordenadasY.push(layer.getTileY(marker.y));
                        flipFlag = true;
                        tiempoChequeo = this.game.time.totalElapsedSeconds();
                        this.imagen_resultado = this.game.add.image(500, 225, 'Error');
                        this.imagen_resultado.anchor.setTo(0.5, 0.5);
                        this.imagen_resultado.scale.x = 0.7;
                        this.imagen_resultado.scale.y = 0.7;
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
            //Fallos=0;
            return true;
        }
        else {
            //SumaTotal.push(suma);
            //Fallos=Fallos+1;
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
        ListaParejas = [42, 6, 1, 1, 6, 42, 6, 4, 2, 4, 2, 6, 42, 6, 3, 5, 6, 42, 42, 4, 5, 4, 5, 42, 42, 3, 5, 3, 5, 42];
        ListaCuadrados = [42, 19, 25, 26, 20, 42, 23, 37, 27, 32, 28, 24, 42, 21, 30, 40, 22, 42, 42, 31, 39, 38, 34, 42, 42, 29, 33, 36, 35, 42];

        respuestasSuma = [0, 2, 81, 30, 217, 40, 111];

        // Para Imprimir la lista Inicial como una cadena de String
        //myString1 = ListaInicial.toString();


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
    render: function () {
        //game.debug.text(Math.floor(myCountdownSeconds), 750, 200, { font: '40px Comic Sans MS', fill: '#FFF866' });

        //this.game.debug.text('Matched Pairs: ' + masterCounter, 620, 304, 'rgb(0,0,255)');
        //this.game.debug.text('Secuencia: ' + Secuencia, 620, 400, 'rgb(255,0,0)');
        //this.game.debug.text('Valor Actual: ' + respuestasSuma[Secuencia - 1], 620, 500, 'rgb(255,0,0)');
    }
};