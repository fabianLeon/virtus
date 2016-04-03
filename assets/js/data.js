var texto = "";
var relojito = 0;
var clicks = 0;
var intentos;

var Rangos = function(ini, fin, nombre){
    // define la posicion correspondiente a la peor
    this.nombre         = nombre;
    this.inicial        = ini;
    this.fin            = fin;
    this.orden          = 0;

    this.getPosicion = function(date){
        if(date<=this.inicial){
            this.orden = 0;
        }else if(date>=this.inicial && date<=this.fin){
            this.orden = 1;
        }else{
            this.orden = 2;
        }
        return this.orden;    
    }
}

var Premiacion = function(efectividad,eficacia,estrategia){

    this.efe             = efectividad;
    this.efi             = eficacia;
    this.estra           = estrategia;

    this.calcularEfe = function(date){
        return (this.efe.getPosicion(date));
    };


    this.calcularEfi = function(date){
        return (this.efi.getPosicion(date)+3);
    };


    this.calcularEstra = function(date){
        return (this.estra.getPosicion(date)+6);
    };
}


function llevarDatos(tabla, campos, valores, lugar) {
    var lugar = lugar+"?";
    var cadena = "";
    for (var i = campos.length - 1; i >= 0; i--) {
        cadena += campos[i] + "=" + valores[i] + "&"
    };
    cadena += "tabla="+tabla;
    window.location=lugar + cadena;
}

function obtenersesion(datos_session){
    var session = sessionStorage.getItem(datos_session);
     return session;
}

function borrarIntentos(datos_session){
     sessionStorage.removeItem(datos_session);
}

function contarIntento(datos_session){
  console.log(obtenersesion(datos_session));
    if(obtenersesion(datos_session) != "null"){
        intentos = Number(obtenersesion(datos_session));

    }else{
        intentos = 0;

    }
    intentos +=1 ;
    sessionStorage.setItem(datos_session, intentos);
}




function concatenador(elEvento) {
  var evento = elEvento || window.event;
  var caracter = evento.charCode || evento.keyCode;
  var charar = String.fromCharCode(caracter);
  if (charar == "'"){
      charar = "";
  }
  texto += charar;
  console.log(texto);
}

function clickear(){
    clicks +=1;
    console.log(clicks); 
}

document.onkeypress = concatenador;
reloj();

function reloj(){
    relojito +=1 ;
    sessionStorage.setItem(datos_session, relojito);
    setTimeout("reloj(nivel,usuario)",1000);
}

document.onmousedown = clickear;

$(window).on('beforeunload', function(){
    alert("desea salir? ");
});