window.addEventListener('load', init, false);
var canvas = null, canvasF = null;
var ctx2 = null, ctx = null;
var matrizFuncion, cont1 = 0, cont2 = 0, matrizMundo, f = 0, c = 0;
var xInicial = 0, yInicial = 0, xBom = 0, yBom = 0, estado = 1;
var dx = 0, dy = 0;
var gano = false;
var nivel, juego;

//inicializacion		   
function init() {
    crearMatrizFunciones();
    asignarInicial();
    canvasF = document.getElementById('canvasF');
    ctx2 = canvasF.getContext('2d');

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    run();
}

//hilo para el movimiento, y pintado del tablero
function run() {
    setTimeout(run, 100);
    pintarFunciones(ctx2);
    pintarTablero(ctx);
}
//envia orden de movimiento
function automover() {
    setTimeout(automover, 200);
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            if (matrizFuncion [i][j] != 0) {
                moverDef();
            }
        }
    }
}

//dibuja el tablero
function pintarTablero(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var val = 0, i, j, x = 0, y = 0;
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            x = ((370 - i * 50) + (j * 50));
            y = (80 + (i * 25) + 25 * j);
            val = matrizMundo[i][j];
            fondo = new Image();
            switch (val) {
                case 0:
                    fondo.src = 'assets/img/hunter/Hunter/cuadro.png';
                    break;
                case 1:
                    y -= 20;
                    fondo.src = 'assets/img/hunter/Hunter/caja1.png';
                    break;
                case 2:
                    y -= 60;
                    fondo.src = 'assets/img/hunter/Hunter/caja1HunterDerecha.png';
                    break;
                case 3:
                    y -= 60;
                    fondo.src = 'assets/img/hunter/Hunter/caja1HunterDerechaAtras.png';
                    break;
                case 4:
                    y -= 60;
                    fondo.src = 'assets/img/hunter/Hunter/caja1HunterIzquierda.png';
                    break;
                case 5:
                    y -= 60;
                    fondo.src = 'assets/img/hunter/Hunter/caja1HunterIzquierdaAtras.png';
                    break;
                case 6:
                    y -= 40;
                    fondo.src = 'assets/img/hunter/Hunter/caja2.png';
                    break;
                case 7:
                    y -= 80;
                    fondo.src = 'assets/img/hunter/Hunter/caja2HunterDerecha.png';
                    break;
                case 8:
                    y -= 80;
                    fondo.src = 'assets/img/hunter/Hunter/caja2HunterDerechaAtras.png';
                    break;
                case 9:
                    y -= 80;
                    fondo.src = 'assets/img/hunter/Hunter/caja2HunterIzquierda.png';
                    break;
                case 10:
                    y -= 80;
                    fondo.src = 'assets/img/hunter/Hunter/caja2HunterIzquierdaAtras.png';
                    break;
                case 11:
                    y -= 60;
                    fondo.src = 'assets/img/hunter/Hunter/caja3.png';
                    break;
                case 12:
                    y -= 100;
                    fondo.src = 'assets/img/hunter/Hunter/caja3HunterDerecha.png';
                    break;
                case 13:
                    y -= 100;
                    fondo.src = 'assets/img/hunter/Hunter/caja3HunterDerechaAtras.png';
                    break;
                case 14:
                    y -= 100;
                    fondo.src = 'assets/img/hunter/Hunter/caja3HunterIzquierda.png';
                    break;
                case 15:
                    y -= 100;
                    fondo.src = 'assets/img/hunter/Hunter/caja3HunterIzquierdaAtras.png';
                    break;
                case 16:
                    fondo.src = 'assets/img/hunter/dezplazamientos/luzOff.png';
                    break;
                case 17:
                    fondo.src = 'assets/img/hunter/dezplazamientos/luzOn.png';
                    break;
                case 18:
                    y -= 30;
                    fondo.src = 'assets/img/hunter/Hunter/cuadroHunterDerecha.png';
                    break;
                case 19:
                    y -= 35;
                    fondo.src = 'assets/img/hunter/Hunter/cuadroHunterDerechaAtras.png';
                    break;
                case 20:
                    y -= 30;
                    fondo.src = 'assets/img/hunter/Hunter/cuadroHunterIzquierda.png';
                    break;
                case 21:
                    y -= 35;
                    fondo.src = 'assets/img/hunter/Hunter/cuadroHunterIzquierdaAtras.png';
                    break;
                default:
                    fondo.src = 'assets/img/hunter/dezplazamientos/inicial.png';
                    break;
            }
            ctx.drawImage(fondo, x, y);
        }
    }
}

//crear matriz que guarda las acciones o movimientos
function crearMatrizFunciones() {

    matrizFuncion = new Array(5);
    for (i = 0; i < 5; i++) {
        matrizFuncion[i] = new Array(5);
        for (j = 0; j < 5; j++) {
            matrizFuncion [i][j] = 0;
        }
    }
}
//adiciona movimientos a la matriz
function cambiarMatriz(val) {

    if (val != null) {
        if (val == 6) {
            cont2--;
            if (cont2 < 0 && cont1 != 0) {
                cont1--;
                cont2 = 4;
            }
            else if (cont2 < 0 && cont1 <= 0) {
                cont1 = 0;
                cont2 = 0;
            }
            matrizFuncion[cont2][cont1] = 0;
        }
        else {
            matrizFuncion[cont2][cont1] = val;
            cont2++;
            if (cont2 > 4) {
                cont1++;
                cont2 = 0;
            }
            else if (cont1 > 4)
                alert("No hay Espacio");
        }
    }
}
// controla las iteracciones de movimiento(girar)
function girar(act, acc) {//acc es la accion y act es al imagen actual
    var valor = 0;
    if (act == 2 && acc == 2)
        valor = 3;
    else if (act == 2 && acc == 2)
        valor = 3;
    else if (act == 2 && acc == 3)
        valor = 4;
    else if (act == 3 && acc == 2)
        valor = 5;
    else if (act == 3 && acc == 3)
        valor = 2;
    else if (act == 4 && acc == 2)
        valor = 2;
    else if (act == 4 && acc == 3)
        valor = 5;
    else if (act == 5 && acc == 2)
        valor = 4;
    else if (act == 5 && acc == 3)
        valor = 3;
    else if (act == 7 && acc == 2)
        valor = 8;
    else if (act == 7 && acc == 3)
        valor = 9;
    else if (act == 8 && acc == 2)
        valor = 10;
    else if (act == 8 && acc == 3)
        valor = 7;
    else if (act == 9 && acc == 2)
        valor = 7;
    else if (act == 9 && acc == 3)
        valor = 10;
    else if (act == 10 && acc == 2)
        valor = 9;
    else if (act == 10 && acc == 3)
        valor = 8;
    else if (act == 12 && acc == 2)
        valor = 13;
    else if (act == 12 && acc == 3)
        valor = 14;
    else if (act == 13 && acc == 2)
        valor = 15;
    else if (act == 13 && acc == 3)
        valor = 12;
    else if (act == 14 && acc == 2)
        valor = 12;
    else if (act == 14 && acc == 3)
        valor = 15;
    else if (act == 15 && acc == 2)
        valor = 14;
    else if (act == 15 && acc == 3)
        valor = 13;
    else if (act == 18 && acc == 2)
        valor = 19;
    else if (act == 18 && acc == 3)
        valor = 20;
    else if (act == 19 && acc == 2)
        valor = 21;
    else if (act == 19 && acc == 3)
        valor = 18;
    else if (act == 20 && acc == 2)
        valor = 18;
    else if (act == 20 && acc == 3)
        valor = 21;
    else if (act == 21 && acc == 2)
        valor = 20;
    else if (act == 21 && acc == 3)
        valor = 19;
    else
        valor = act;
    return valor;
}
//escencial para el movimiento	
function mover(mov) {
    if ((mov == 1 || mov == 4) && estado == 1) {
        dx = 0;
        dy = 1;
    }
    else if ((mov == 1 || mov == 4) && estado == 2) {
        dx = -1;
        dy = 0;
    }
    else if ((mov == 1 || mov == 4) && estado == 3) {
        dx = 0;
        dy = -1;
    }
    else if ((mov == 1 || mov == 4) && estado == 4) {
        dx = 1;
        dy = 0;
    }
    else if (mov == 2) {
        if (estado == 1)
            estado = 2;
        else if (estado == 2)
            estado = 3;
        else if (estado == 3)
            estado = 4;
        else if (estado == 4)
            estado = 1;
    }
    else if (mov == 3) {
        if (estado == 1)
            estado = 4;
        else if (estado == 2)
            estado = 1;
        else if (estado == 3)
            estado = 2;
        else if (estado == 4)
            estado = 3;
    }
}

function colision(act, sig) {
    //retornos: 0 siginifica que continua de corrido
    //-1 no se peude realizar movimiento por colision
    //otro toca escalar
    var actual = 0, siguiente = 0, valor = 0;
    actual = act;
    siguiente = sig;
    if (actual == 2 && siguiente == 6)
        valor = 7;
    else if (actual == 3 && siguiente == 6)
        valor = 8;
    else if (actual == 4 && siguiente == 6)
        valor = 9;
    else if (actual == 5 && siguiente == 6)
        valor = 10;
    else if (actual == 7 && siguiente == 11)
        valor = 12;
    else if (actual == 8 && siguiente == 11)
        valor = 13;
    else if (actual == 9 && siguiente == 11)
        valor = 14;
    else if (actual == 10 && siguiente == 11)
        valor = 15;
    else if (actual == 12 && siguiente == 6)
        valor = 7;
    else if (actual == 13 && siguiente == 6)
        valor = 8;
    else if (actual == 14 && siguiente == 6)
        valor = 9;
    else if (actual == 15 && siguiente == 6)
        valor = 10;
    else if (actual == 7 && siguiente == 1)
        valor = 2;
    else if (actual == 8 && siguiente == 1)
        valor = 3;
    else if (actual == 9 && siguiente == 1)
        valor = 4;
    else if (actual == 10 && siguiente == 1)
        valor = 5;
    else if (actual == 18 && siguiente == 1)
        valor = 2;
    else if (actual == 19 && siguiente == 1)
        valor = 3;
    else if (actual == 20 && siguiente == 1)
        valor = 4;
    else if (actual == 21 && siguiente == 1)
        valor = 5;
    else if (actual == 2 && (siguiente == 0 || siguiente == 16))
        valor = 18;
    else if (actual == 3 && (siguiente == 0 || siguiente == 16))
        valor = 19;
    else if (actual == 4 && (siguiente == 0 || siguiente == 16))
        valor = 20;
    else if (actual == 5 && (siguiente == 0 || siguiente == 16))
        valor = 21;
    else if ((actual >= 18 && actual <= 21) && siguiente == 0)
        valor = 0;
    else if ((actual >= 2 && actual <= 5) && siguiente == 1)
        valor = 0;
    else if ((actual >= 7 && actual <= 10) && siguiente == 6)
        valor = 0;
    else if ((actual >= 12 && actual <= 15) && siguiente == 11)
        valor = 0;
    else if (siguiente == 16)
        valor = 0;
    else
        valor = -1;
    return valor;
}

function casillaActual(act) {//captura el valor donde esta el fantasma y dice q tipo de casilla esta
    var valor = 0;
    if (act >= 2 && act <= 5)
        valor = 1;
    else if (act >= 7 && act <= 10)
        valor = 6;
    else if (act >= 12 && act <= 15)
        valor = 11;
    else if (act >= 18 && act <= 21)
        valor = 0;
    else if (act == 16)
        valor = 1;
    return valor;
}
//efectua los movimientos (cambia las posiciones de las imagenes)
function moverDef() {
    var vector, valor, posActual, posSig;
    vector = new Array(2);
    vector = buscarFant();
    buscarLuz();
    if (matrizFuncion [f][c] == 1) {
        mover(1);
        valor = girar(matrizMundo [(vector[0])][(vector[1])], 1);
        if (colision(matrizMundo [(vector[0])][(vector[1])], matrizMundo [(vector[0]) + dx][(vector[1] + dy)]) == -1) {
            alert("No es posible este movimiento");
        }
        else if (colision(matrizMundo [(vector[0])][(vector[1])], matrizMundo [(vector[0]) + dx][(vector[1]) + dy]) == 0) {
            matrizMundo [(vector[0])][(vector[1])] = casillaActual(matrizMundo [(vector[0])][(vector[1])]);
            matrizMundo [(vector[0]) + dx][(vector[1] + dy)] = valor;
        }
        else {
            alert("No es posible este movimiento");

        }
    }
    else if (matrizFuncion [f][c] == 2) {
        mover(2);
        valor = girar(matrizMundo [(vector[0])][(vector[1])], 2);
        matrizMundo [(vector[0])][(vector[1])] = valor;
    }
    else if (matrizFuncion [f][c] == 3) {
        mover(3);
        valor = girar(matrizMundo [(vector[0])][(vector[1])], 3);
        matrizMundo [(vector[0])][(vector[1])] = valor;
    }
    else if (matrizFuncion [f][c] == 4) {
        mover(4);
        valor = girar(matrizMundo [(vector[0])][(vector[1])], 1);
        if (colision(matrizMundo [(vector[0])][(vector[1])], matrizMundo [(vector[0]) + dx][(vector[1] + dy)]) == -1) {
            alert("No es posible este movimiento");
        }
        else if (colision(matrizMundo [(vector[0])][(vector[1])], matrizMundo [(vector[0]) + dx][(vector[1]) + dy]) == 0) {
            alert("No es posible este movimiento");
        }
        else {
            valor = colision(matrizMundo [(vector[0])][(vector[1])], matrizMundo [(vector[0]) + dx][(vector[1] + dy)]);
            matrizMundo [(vector[0])][(vector[1])] = casillaActual(matrizMundo [(vector[0])][(vector[1])]);
            matrizMundo [(vector[0]) + dx][(vector[1] + dy)] = valor;
        }

    }
    else if (matrizFuncion [f][c] == 5) {

        if (vector[0] == xBom && vector[1] == yBom) {
            matrizMundo [(vector[0])][(vector[1])] = 17;
            gano = true;
            juego = parseInt(nivel);
            juego++;
            location.href = "nivel7.php?mundo=" + juego;
            alert("has pasado al nivel: " + (juego + 1));
        }
        else
            alert("No esta encima del Bombillo");
    }
    f++;
    if (f > 4) {
        c++;
        f = 0;
    }
    perdio();

}

//reinicia el juego en el nivel actual
function reset() {
    juego = parseInt(nivel);
    location.href = "nivel7.php?mundo=" + juego;
}

function backLevel() {
    juego = parseInt(nivel);
    if(juego>=1){
        location.href = "nivel7.php?mundo=" + (juego-1);
    }else{
        alert("Esta en el primer nivel");
    }
}

//localiza la posicion donde se encuentra el personaje
function buscarFant() {
    vector = new Array(2);
    var val = 0;
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            val = matrizMundo[i][j];
            if ((val >= 2 && val <= 5) || (val >= 7 && val <= 10) || (val >= 12 && val <= 15) || (val >= 18 && val <= 21)) {
                vector[0] = i;
                vector[1] = j;
            }
        }
    }
    return vector;
}

//localiza la posicion de la posicion de llegada del personaje
function buscarLuz() {
    vector = new Array(2);
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (matrizMundo[i][j] == 16) {
                vector[0] = i;
                vector[1] = j;
            }
        }
    }
    return vector;
}

//dibuja en el canvas2 (los movimientos que debe efectuar el personaje de manera secuencial)
function pintarFunciones(ctx2) {
    var val, i, j;
    ctx2.fillStyle = '#0f0';
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            val = matrizFuncion[i][j];
            fondo = new Image();
            switch (val) {
                case 1:
                    fondo.src = 'assets/img/hunter/dezplazamientos/adelante.png';
                    break;
                case 2:
                    fondo.src = 'assets/img/hunter/dezplazamientos/derecha.png';
                    break;
                case 3:
                    fondo.src = 'assets/img/hunter/dezplazamientos/izquierda.png';
                    break;
                case 4:
                    fondo.src = 'assets/img/hunter/dezplazamientos/saltar.png';
                    break;
                case 5:
                    fondo.src = 'assets/img/hunter/dezplazamientos/encender.png';
                    break;
                default:
                    fondo.src = 'assets/img/hunter/dezplazamientos/nada.png';
                    break;
            }
            ctx2.drawImage(fondo, 51 * i, 51 * j);
        }
    }
}



//verifica que solo exista un destino y un personaje por nivel
function asignarInicial() {
    var vector = new Array(2);
    var luz = new Array(2);
    vector = buscarFant();
    luz = buscarLuz();
    xInicial = vector[0];
    yInicial = vector[1];
    xBom = luz[0];
    yBom = luz[1];
}

//se;ala al jugador que perdio y que debe reiniciar el juego
function perdio() {
    if (f == 0 && c == 5 && gano == false) {
        alert("Has perdido el juego");
    }
}


