Juego.Ayuda = function (game) {
};
Juego.Ayuda.prototype = {
    create: function () {
        this.Fondo = this.game.add.image(0, 0, 'Ayuda');
        this.buttonAceptar = this.game.add.button(820, 500, 'BottonAceptar', this.retornarInicio, this, 1, 0, 2);
        this.buttonAceptar.name = "Aceptar";
        this.buttonAceptar.anchor.setTo(0.5, 0.5);
    },
    retornarInicio: function () {
        this.game.state.start('Menu');
    }
};