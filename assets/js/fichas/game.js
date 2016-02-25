var game = new Phaser.Game(600, 700, Phaser.AUTO, '');
var fichas = [];
var bounds = null;
var vertical1 = null;
var vertical2 = null;
var j = -1;
var lag = [];
game.state.add('game', GameState);
game.state.start('game');

function llevarDatos(tabla, campos, valores, lugar) {
    var cadena = lugar + "?";
    for (var i = campos.length - 1; i >= 0; i--) {
        cadena += campos[i] + "=" + valores[i] + "&"
    }
    ;
    cadena += "tabla=" + tabla;
    window.location = cadena;
}

