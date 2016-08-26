var Juego = {
    _WIDTH: 1000,
    _HEIGHT: 550
};
Juego.Inicio = function (game) {
};
Juego.Inicio.prototype = {
    preload: function () {
        this.game.load.image('loading', 'assets/img/engranes/loading-bar.png');
        this.game.load.image('loadingborder', 'assets/img/engranes/loading-bg.png');
    },
    create: function () {
        this.game.state.start('Precarga');
    }
};
