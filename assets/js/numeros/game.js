var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'Nivel1-LogicaMatematica', {preload: preload, create: create, update: update, render: render});
var flipFlag = false;

var tiempo = "";
var tiempoChequeo = 0;
var ListaInicial = new Array();
var ListaCuadrados = new Array();
var ListaValores = new Array();
var ListaParejas = new Array();
var NumCasillasAlmacen = new Array();
var AlmacenValores = new Array();
var coordenadasX = new Array();
var coordenadasY = new Array();
var respuestasSuma = new Array();

var secuenciaTotal = new Array();
var secuenciaFigura = new Array();
var SumaTotal = new Array();
var intentos = new Array();

var masterCounter = 0;
var ContadorCuadrados = 0;
var Fallos = 0;
var Secuencia = 1; //representa la Secuencia en la que va el juego
var CuadradoX;
var CuadradoY;


var map;
var layer;

var marker;
var TileActual;
var PosicionTileActual;

var TextWin = '';

var myCountdownSeconds;
var banderaTiempo = true;

WebFontConfig = {
    active: function () {
        game.time.events.add(1, createText, this);
    },
    //  The Google Fonts, se podran cargar el tipo de letra que se requiera
    google: {
        families: ['Fontdiner Swanky']
    }
};


function preload() {
    //game.scale.pageAlignHorizontally=true;
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    game.load.tilemap('mundo_json', 'assets/img/numeros/Numeros.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('fondo', 'assets/img/numeros/Background_1.jpg');
    game.load.image('mundo_tiles', 'assets/img/numeros/mundo.png');
    game.load.image('img_Tiempo', 'assets/img/numeros/img_Reloj.png');


}


function create() {

    game.add.image(0, 0, 'fondo');


    map = game.add.tilemap('mundo_json');
    map.addTilesetImage('Desert', 'mundo_tiles');
    layer = map.createLayer('Ground');
    layer.resizeWorld();


    //Linea Verde al rededor del puntero con 100 pixeles X 100 pixeles
    marker = game.add.graphics();
    marker.lineStyle(3, 0x0404B4, 1);
    marker.drawRect(0, 0, 100, 100);

    //Texto del tiempo
    tiempo = game.add.text(850, 200, Math.floor(myCountdownSeconds), {
        font: "30px Comic Sans MS",
        fill: "#000000",
        align: "center"
    });
    tiempo.anchor.setTo(0.5, 0.5);


    randomizeTiles();
}

function createText() {

    //Primero el Titulo---------------------------------------------------------
    text = game.add.text(795, 80, "Logica Matematica");
    //El puntero se ubicara en el centro del texto, para ubicarlo en el CANVAS
    text.anchor.setTo(0.5, 0.5);

    text.font = 'Fontdiner Swanky';
    text.fontSize = 38;

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

    text.events.onInputOver.add(overText, this);
    text.events.onInputOut.add(outText, this);

    //-----------Texto Ganador
    TextWin = game.add.text(770, 550, "");
    TextWin.anchor.setTo(0.5, 0.5);
    TextWin.font = 'Fontdiner Swanky';
    TextWin.fontSize = 38;
    TextWin.fill = grdOut;

}

//Cuando el puntero del mouse este fuera del Texto
function outText() {
    text.fill = grdOut;
}

//Cuando el puntero del mouse este sobre el Texto
function overText() {
    text.fill = grdOver;
}



function update() {

    if (banderaTiempo == true) {
        countDownTimer();
    }

    CuadradoX = layer.getTileX(game.input.activePointer.worldX);
    CuadradoY = layer.getTileY(game.input.activePointer.worldY);

    //Si el puntero del mouse esta sobre una cuadricula inferior o igual a 5 (0 cuenta),
    //Para evitar que el marcador se salga fuera de los límites
    if (((CuadradoX <= 4 && CuadradoX > 0) && CuadradoY <= 4) || (CuadradoX == 0 && CuadradoY == 1) || (CuadradoX == 5 && CuadradoY == 1))
    {
        marker.x = layer.getTileX(game.input.activePointer.worldX) * 100;
        marker.y = layer.getTileY(game.input.activePointer.worldY) * 100;

        if (flipFlag == true)
        {
            //Si el tiempo actual del juego menos El tiempo desde que se oprimio la segunda figura es mayor a medio segundo que voltee las figuras
            if (game.time.totalElapsedSeconds() - tiempoChequeo > 0.5)
            {
                flipBack();
            }
        }
        else
        {
            processClick();
        }
    }

    if (Secuencia >= 7) {
        Secuencia = 1;
    }
}


function countDownTimer() {

    var timeLimit = 120;

    mySeconds = game.time.totalElapsedSeconds();
    myCountdownSeconds = timeLimit - mySeconds;


    if (myCountdownSeconds <= 0)
    {
        tiempo.setText('Tiempo Vencido');
    }
    if (masterCounter != 7)
    {
        tiempo.setText(Math.floor(myCountdownSeconds));
    }
}

function processClick() {

    TileActual = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
    PosicionTileActual = ((layer.getTileY(game.input.activePointer.worldY) + 1) * 6) - (6 - (layer.getTileX(game.input.activePointer.worldX) + 1));

    if (game.input.activePointer.isDown)
    {
        // compruebe que la baldosa o Tile no está volteado, si esta volteada no actua
        if (TileActual.index == ListaInicial[PosicionTileActual - 1])
        {
            // obtiene el elemento correspondiente de la lista de cuadrados
            currentNum = ListaCuadrados[PosicionTileActual - 1];


            flipOver();
            ContadorCuadrados++;


            // Esta la segunda baldosa o Tile par volteada?
            if (ContadorCuadrados == Secuencia)
            {
                // Reiniciar ContadorCuadrados
                ContadorCuadrados = 0;
                NumCasillasAlmacen.push(ListaParejas[PosicionTileActual - 1]);
                AlmacenValores.push(ListaValores[PosicionTileActual - 1]);


                // check for match
                if (listaResultadoIgual(AlmacenValores, NumCasillasAlmacen) == true)
                {
                    masterCounter++;
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
                    tiempoChequeo = game.time.totalElapsedSeconds();
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
}

function flipOver() {

    map.putTile(currentNum, layer.getTileX(marker.x), layer.getTileY(marker.y));
}


function listaResultadoIgual(lista, lista2) {


    var suma = 0;
    var sumaParejas = 0;

    for (index = 0; index < lista.length; index++) {
        //secuenciaTotal.push(lista2[index]);
        suma = lista[index] + suma;
    }

    for (index = 0; index < lista2.length; index++) {
        //secuenciaTotal.push(lista2[index]);
        sumaParejas = lista2[index] + sumaParejas;
    }

    NumCasillasAlmacen


    if (suma == respuestasSuma[Secuencia - 1]) {
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

}



function flipBack() {
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
}




function randomizeTiles() {

    ListaInicial = [42, 10, 1, 1, 9, 42, 12, 16, 2, 17, 3, 12, 42, 15, 5, 12, 18, 42, 42, 11, 9, 13, 10, 42, 42, 4, 7, 14, 8, 42];
    ListaValores = [42, 6, 0, 0, 6, 42, 5, 8, 1, 8, 1, 5, 42, 9, 3, 5, 9, 42, 42, 7, 6, 7, 6, 42, 42, 3, 4, 3, 4, 42];
    ListaParejas = [42, 6, 1, 1, 6, 42, 6, 4, 2, 4, 2, 6, 42, 6, 3, 5, 6, 42, 42, 4, 5, 4, 5, 42, 42, 3, 5, 3, 5, 42];
    ListaCuadrados = [42, 19, 25, 26, 20, 42, 23, 37, 27, 32, 28, 24, 42, 21, 30, 40, 22, 42, 42, 31, 39, 38, 34, 42, 42, 29, 33, 36, 35, 42];

    respuestasSuma = [0, 2, 9, 30, 25, 40, 0];

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
}


function render() {

    game.add.image(640, 140, 'img_Tiempo');

    //game.debug.text(Math.floor(myCountdownSeconds), 750, 200, { font: '40px Comic Sans MS', fill: '#FFF866' });

    game.debug.text('Matched Pairs: ' + masterCounter, 620, 304, 'rgb(0,0,255)');
    game.debug.text('Secuencia: ' + Secuencia, 620, 400, 'rgb(255,0,0)');
    game.debug.text('Valor Actual: ' + respuestasSuma[Secuencia - 1], 620, 500, 'rgb(255,0,0)');
}
