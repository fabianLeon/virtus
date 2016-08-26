var Juego = {
    _WIDTH: 600,
    _HEIGHT: 700
};

Juego.Inicio = function (game) {
};
Juego.Inicio.prototype = {
    preload: function () {
        this.game.load.image('loading', 'assets/img/fichas/loading-bar.png');
        this.game.load.image('loadingborder', 'assets/img/fichas/loading-bg.png');
    },
    create: function () {
        this.game.state.start('Precarga');
    }
};
