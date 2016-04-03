Juego.Game_State = function (game) {
};
Juego.Game_State.prototype = {
    preload: function () {
        game.load.image('plataforma', 'assets/img/sapo/plataforma.png');
        game.load.image('fondo', 'assets/img/sapo/fondo1.jpg');
        game.load.spritesheet('azul', 'assets/img/sapo/camaleon-azul.png', 100, 94);
        game.load.spritesheet('rojo', 'assets/img/sapo/camaleon-rojo.png', 100, 94);
    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.set(0, 60);

        var fondo = game.add.sprite(0, 0, 'fondo');

        var me = this;
        sapos = game.add.group();
        plataformas = game.add.group();


        for (var i = 0; i < 7; i++) {
            var plataforma = game.add.sprite((100 + (150 * i)), game.height - 50, 'plataforma');
            game.physics.arcade.enable(plataforma);
            plataforma.body.immovable = true;
            plataforma.body.allowGravity = false;
            plataformas.add(plataforma);

        }
        for (var i = 0; i < 7; i++) {

            if (i < 3) {
                var s = new sapo(game, i, 'rojo');
                sapos.add(s);
                saposGame[i] = s;
                s.animations.play('saltar');
            }
            if (i > 3) {
                var s = new sapo(game, i, 'azul');
                sapos.add(s);
                saposGame[i] = s;
                s.animations.play('saltar');
            }
            saposGame[3] = null;
        }
    },
    update: function () {
        game.physics.arcade.collide(plataformas, sapos);
        //game.physics.arcade.collide(sapos, sapos);
        
    }

};
