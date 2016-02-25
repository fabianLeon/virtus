var GameState = {
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
            }
            if (i > 3) {
                var s = new sapo(game, i, 'azul');
                sapos.add(s);
                saposGame[i] = s;
            }
            saposGame[3] = null;
        }
    },
    update: function () {
        game.physics.arcade.collide(plataformas, sapos);
        //game.physics.arcade.collide(sapos, sapos);
    }

}


var sapo = function (game, pl, cl) {
    Phaser.Sprite.call(this, game);
    var me = this;
    var plataforma_inicial = pl;
    var plataforma = pl;
    me.cl = cl;
    var vx = 0;
    var vy = 0;
    init();
    var sePuede = false;
    //animar();


    function dondeSaltar() {
        console.log("old: " + plataforma);
        if (me.cl == 'rojo') {
            if (saposGame[plataforma + 1] == null) {
                saposGame[plataforma] = null;
                plataforma += 1;
                saposGame[plataforma] = me;
                vx = 44;
                vy = -50;
                sePuede = true;
            }
            else if (saposGame[plataforma + 2] == null) {
                saposGame[plataforma] = null;
                plataforma += 2;
                saposGame[plataforma] = me;
                vx = 88;
                vy = -100;
                sePuede = true;
            }
        } else {
            if (saposGame[plataforma - 1] == null) {
                saposGame[plataforma] = null;
                plataforma -= 1;
                saposGame[plataforma] = me;
                vx = -44;
                vy = -50;
                sePuede = true;
            }
            else if (saposGame[plataforma - 2] == null) {
                saposGame[plataforma] = null;
                plataforma -= 2;
                saposGame[plataforma] = me;
                vx = -88;
                vy = -100;
                sePuede = true;
            }
        }
        console.log("new: " + plataforma);
    }

    function mover() {
        dondeSaltar();
        console.log(sePuede);
        if (sePuede == true) {
            animar();
            me.body.velocity = new Phaser.Point(vx, vy);
        }
    }

    function animationStopped(me, animation) {
        vx = 0;
        vy = 0;
        me.body.velocity = new Phaser.Point(vx, vy);
        me.inputEnabled = true;
    }

    function animationPlay(me, animation) {
        sePuede = false;
        me.inputEnabled = false;
    }

    function init() {
        //me.body.mass = 1;
        if (me.cl == 'azul') {
            me.loadTexture('azul');
            saltar = me.animations.add('saltar', [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 19, 18], 6, false);
        } else {
            me.loadTexture('rojo');
            saltar = me.animations.add('saltar', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0, 1], 6, false);
        }

        me.inputEnabled = true;
        me.events.onInputUp.add(mover);

        me.x = 110 + (150 * plataforma);
        //me.y = game.height - me.height- 70;
        me.y = game.height / 2;

        saltar.onComplete.add(animationStopped, game);
        saltar.onLoop.add(animationPlay, game);
        game.physics.arcade.enable(me);
        game.add.existing(me);
        me.body.bounce.y = 0.2;
        //me.body.gravity.y = 300;
    }
    function animar() {
        me.animations.play('saltar');
    }
}

sapo.prototype = Object.create(Phaser.Sprite.prototype);
sapo.prototype.constructor = sapo;