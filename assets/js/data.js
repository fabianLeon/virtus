var texto, usuario, cookies;
var relojito, clicks, intentos, borrado = true;

var Rangos = function (ini, fin, nombre) {
    // define la posicion correspondiente a la peor
    this.nombre = nombre;
    this.inicial = ini;
    this.fin = fin;
    this.orden = 0;

    this.getPosicion = function (date) {
        if (date <= this.inicial) {
            this.orden = 0;
        } else if (date > this.inicial && date <= this.fin) {
            this.orden = 1;
        } else {
            this.orden = 2;
        }
        return this.orden;
    };
};

var Premiacion = function (efectividad, eficacia, estrategia) {

    this.efe = efectividad;
    this.efi = eficacia;
    this.estra = estrategia;

    this.calcularEfe = function (date) {
        return (this.efe.getPosicion(date));
    };


    this.calcularEfi = function (date) {
        return (this.efi.getPosicion(date) + 3);
    };


    this.calcularEstra = function (date) {
        return (this.estra.getPosicion(date) + 6);
    };
};

function llevarDatos(tabla, campos, valores, lugar) {
    var lugar = lugar + "?";
    var cadena = "";
    for (var i = campos.length - 1; i >= 0; i--) {
        cadena += campos[i] + "=" + valores[i] + "&";
    }
    cadena += "tabla=" + tabla;
    window.location = lugar + cadena;
}

function obtenersesion(us, cok, data) {
    var session = sessionStorage.getItem("'" + us + cok + data + "'");
    return session;
}

function borrarCookies(us, cok, data) {
    sessionStorage.removeItem("'" + us + cok + data + "'");

}
function borrarTodasLasCookies() {
    sessionStorage.removeItem("'" + usuario + cookies + "ti" + "'");
    sessionStorage.removeItem("'" + usuario + cookies + "cl" + "'");
    sessionStorage.removeItem("'" + usuario + cookies + "in" + "'");
    sessionStorage.removeItem("'" + usuario + cookies + "te" + "'");
    console.log("borrando...");
    borrado = false;
}

function guardarSesion(us, cok, data, valor) {
    sessionStorage.setItem("'" + us + cok + data + "'", valor);
    console.log(obtenersesion(us, cok, data));
}
function concatenador(elEvento) {
    var evento = elEvento || window.event;
    var caracter = evento.charCode || evento.keyCode;
    var charar = String.fromCharCode(caracter);
    if (charar === "'") {
        charar = "";
    }
    texto += charar;
    console.log(texto);
}

function clickear() {
    clicks += 1;
    console.log(clicks);
}
document.onkeypress = concatenador;
document.onmousedown = clickear;


function reloj() {
    relojito += 1;
    setTimeout("reloj()", 1000);
}

$(window).on('beforeunload', function () {
    intentos += 1;
    if (borrado) {
        guardarSesion(usuario, cookies, "te", texto);
        guardarSesion(usuario, cookies, "cl", clicks);
        guardarSesion(usuario, cookies, "ti", relojito);
        guardarSesion(usuario, cookies, "in", intentos);
    }
    console.log("------------  saliendo  ---------------");
    console.log("lugar   : " + usuario + cookies + "ti");
    console.log("intentos: " + intentos);
    console.log("tiempo  : " + relojito);
    console.log("clicks  : " + clicks);
    console.log("texto   : " + texto);
    console.log(obtenersesion(usuario, cookies, "ti"));
//    return ("saliendo");
});

$(window).on('load', function () {
    // cargar el texto escrito
    if (obtenersesion(usuario, cookies, "te") !== "null") {
        texto = obtenersesion(usuario, cookies, "te");
    } else {
        texto = "";
    }
    // cargar el tiempo transcurrido
    if (obtenersesion(usuario, cookies, "ti") !== "null") {
        relojito = Number(obtenersesion(usuario, cookies, "ti"));
    } else {
        relojito = 0;
    }
    // cargar clicks realizados
    if (obtenersesion(usuario, cookies, "cl") !== "null") {
        clicks = Number(obtenersesion(usuario, cookies, "cl"));
    } else {
        clicks = 0;
    }
    if (obtenersesion(usuario, cookies, "in") !== "null") {
        intentos = Number(obtenersesion(usuario, cookies, "in"));
    } else {
        intentos = 0;
    }
    console.log("intentos: " + intentos);
    console.log("tiempo  : " + relojito);
    console.log("clicks  : " + clicks);
    console.log("texto   : " + texto);
    reloj();
});