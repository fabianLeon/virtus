var Juego = {
    _WIDTH: 1000,
    _HEIGHT: 600
};
Juego.Inicio = function (game) {
};
Juego.Inicio.prototype = {
    preload: function () {
        this.game.load.image('odin', 'assets/img/comunes/odin.png');
        this.game.load.image('odin2', 'assets/img/comunes/odin2.png');
    },
    create: function () {
        
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.game.scale.pageAlignHorizontally = true;
        //this.game.scale.pageAlignVertically = true;
        this.game.state.start('Precarga');
    }
};
