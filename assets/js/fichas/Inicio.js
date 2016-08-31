var Juego = {
    _WIDTH: 600,
    _HEIGHT: 700
};

Juego.Inicio = function (game) {
};
Juego.Inicio.prototype = {
    preload: function () {
        this.game.load.image('odin', 'assets/img/comunes/odin.png');
        this.game.load.image('odin2', 'assets/img/comunes/odin2.png');
    },
    create: function () {
        this.game.state.start('Precarga');
    }
};
