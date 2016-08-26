var Juego = {
    _WIDTH: 1240,
    _HEIGHT: 600
};
Juego.Inicio = function (game) {
};
Juego.Inicio.prototype = {
    preload: function () {
        this.game.load.image('loading', 'assets/img/sapo/loading-bar.png');
        this.game.load.image('loadingborder', 'assets/img/sapo/loading-bg.png');
    },
    create: function () {
        this.game.state.start('Precarga');
    }
};
