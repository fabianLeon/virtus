
Juego.Menu = function (game) {
};
Juego.Menu.prototype = {
    create: function () {

        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.game.scale.pageAlignHorizontally = true;
        //this.game.scale.pageAlignVertically = true;

        this.game.add.image(0, 0, 'Fondo');


        this.buttonJugar = this.game.add.button(350, 400, 'Bottones', this.actionOnClick, this, 1, 0, 2);
        this.buttonJugar.anchor.setTo(0.5, 0.5);
        this.buttonJugar.name = 'Jugar';

        this.buttonAyuda = this.game.add.button(650, 400, 'Bottones', this.actionOnClick, this, 4, 3, 5);
        this.buttonAyuda.anchor.setTo(0.5, 0.5);
        this.buttonAyuda.name = 'Ayuda';


        var item;

        //Mensaje corresponde alos posiciones de las letras del Spritee. En este caso "Nivel 1"
        var mensaje = [13, 8, 21, 4, 11, 37, 30];

        for (var i = 0; i < 7; i++)
        {
            item = this.game.add.sprite(300 + 70 * i, -100, 'Abecedario', mensaje[i]);
            item.anchor.setTo(0.5, 0.5);
            item.scale.x = 0.5;
            item.scale.y = 0.5;

            this.game.add.tween(item).to({y: 240}, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * i, true);
            this.game.add.tween(item).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, 1000 + 400 * i, true);
        }

    },
    update: function () {
    },
    actionOnClick: function (button) {
        if (button.name == "Jugar") {
            this.game.state.start('Game');
        }
        else {
            this.game.state.start('Ayuda');
        }

    }
};
