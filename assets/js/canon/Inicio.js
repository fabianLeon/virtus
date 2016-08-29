var Juego = {
    _WIDTH: 1000,
    _HEIGHT: 550
};
Juego.Inicio = function (game) {
};
Juego.Inicio.prototype = {
    preload: function () {
        this.game.load.image('odin', 'assets/img/camino/odin.png');
        this.game.load.image('odin2', 'assets/img/camino/odin2.png');
    },
    create: function () {
        this.game.state.start('Precarga');
    }
};
