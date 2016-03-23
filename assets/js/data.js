var texto = "";
var relojito = 0;
var clicks = 0;

function llevarDatos(tabla, campos, valores, lugar) {
    var lugar = lugar+"?";
    var cadena = "";
    for (var i = campos.length - 1; i >= 0; i--) {
        cadena += campos[i] + "=" + valores[i] + "&"
    };
    cadena += "tabla="+tabla;
    window.location=lugar + cadena;
}

function concatenador(elEvento) {
  var evento = elEvento || window.event;
  var caracter = evento.charCode || evento.keyCode;
  var charar = String.fromCharCode(caracter);
  if (charar == "'"){
      charar = "";
  }
  texto += charar;
}

function clickear(){
    clicks +=1;
    console.log(clicks); 
}

document.onkeypress = concatenador;
reloj();

function reloj(){
    relojito +=1;
    setTimeout("reloj()",1000);
}

document.onmousedown = clickear;
