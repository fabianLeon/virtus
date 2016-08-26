var Juego = {
    _WIDTH: 1000,
    _HEIGHT: 500
};

Juego.Inicio = function (game) {
};
Juego.Inicio.prototype = {
    preload: function () {
        this.game.load.image('loading', 'assets/img/camino/loading-bar.png');
        this.game.load.image('loadingborder', 'assets/img/camino/loading-bg.png');
        this.game.load.image('odin', 'assets/img/camino/odin.jpg');
    },
    create: function () {
        this.game.state.start('Precarga');
    }
};
