var GameState = {
    preload: function () {
        game.load.image('cuadro', 'assets/img/fichas/cuadro1.png');
        game.load.image('horizontal', 'assets/img/fichas/horizontal3.png');
        game.load.image('vertical', 'assets/img/fichas/vertical2.png');
        game.load.image('cuadrito', 'assets/img/fichas/cuadrito2.png');
        game.load.image('tablero', 'assets/img/fichas/fondo2.png');
        game.load.spritesheet('fuego', 'assets/img/fichas/fuego.png', 200, 200);
    },
    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#FFFFFF';
        var x = 100;
        var y = 100;
        bounds = game.add.sprite(x - 29, y - 25, 'tablero');



        // creacion de las fichas
        var vertical1 = new Ficha(x + 0, y + 0, 'vertical', 0);
        var vertical2 = new Ficha(x + 0, y + 200, 'vertical', 1);
        var vertical3 = new Ficha(x + 300, y + 0, 'vertical', 2);
        var vertical4 = new Ficha(x + 300, y + 200, 'vertical', 3);
        var cuadrito1 = new Ficha(x + 200, y + 300, 'cuadrito', 4);
        var cuadrito2 = new Ficha(x + 200, y + 200, 'cuadrito', 5);
        var cuadrito3 = new Ficha(x + 100, y + 300, 'cuadrito', 6);
        var cuadrito4 = new Ficha(x + 100, y + 200, 'cuadrito', 7);
        var horizontal = new Ficha(x + 100, y + 400, 'horizontal', 8);
        var cuadro = new Ficha(x + 100, y + 0, 'cuadro', 9);

        var fire = game.add.sprite(202, 522, 'fuego');
        fire.animations.add('encendido');
        fire.animations.play('encendido', 12, true);
        // adicionando al arreglo fichas todas las fichas del tablero
        fichas.push(vertical1);
        fichas.push(vertical2);
        fichas.push(vertical3);
        fichas.push(vertical4);
        fichas.push(cuadrito1);
        fichas.push(cuadrito2);
        fichas.push(cuadrito3);
        fichas.push(cuadrito4);
        fichas.push(horizontal);
        fichas.push(cuadro);
    }
}

var Ficha = function (x, y, t, i) {

    Phaser.Sprite.call(this, game);
    var me = this;
    me.xOld = x;
    me.yOld = y;
    init(x, y, t, i);

    function dragStart() {
        me.bringToTop();
        me.xOld = me.x;
        me.yOld = me.y;
    }

    function dragStop() {
        me.moveDown();
        var result = false;
        var bound1 = me.getBounds();

        bound1.x += 1;
        bound1.y += 1;
        bound1.width -= 50;
        bound1.height -= 50;

        //validacion de colisiones con las demas fichas
        for (var i = fichas.length - 1; i >= 0; i--) {
            if (me.i != i) {
                var bound2 = fichas[i].getBounds();

                result = Phaser.Rectangle.intersects(bound1, bound2);
                if (result || (Math.abs(me.y - me.yOld) + Math.abs(me.x - me.xOld)) > 200) {
                    console.log("colision con" + i);
                    me.x = me.xOld;
                    me.y = me.yOld;
                }
                if (fichas[9].x == 200 && fichas[9].y == 400) {
                    alert("GANAMOOOS    WEEEEEEEEE  ");
                }
            }
        }
    }

    function init(x, y, t, i) {
        me.i = i;
        me.loadTexture(t);
        me.x = x;
        me.y = y;
        me.inputEnabled = true;
        me.input.enableDrag();
        me.input.enableSnap(100, 100, true, true);
        me.input.boundsSprite = bounds;
        me.events.onDragStart.add(dragStart);
        me.events.onDragStop.add(dragStop);
        game.add.existing(me);
        game.physics.arcade.enable(me);
    }
}

Ficha.prototype = Object.create(Phaser.Sprite.prototype);
Ficha.prototype.constructor = Ficha;