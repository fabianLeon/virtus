
<?php include_once 'templates/open_head.php'; ?>
<script type="text/javascript" src="assets/js/phaser.min.js"></script>
<script type="text/javascript" src="assets/js/engranes/Inicio.js"></script>
<script type="text/javascript" src="assets/js/engranes/Game.js"></script>
<script type="text/javascript" src="assets/js/engranes/Ayuda.js"></script>
<script type="text/javascript" src="assets/js/engranes/Premiacion.js"></script>
<style type="text/css">
    body {
        margin: 13%;
    }
</style>
</head>
<body>

    <?php include_once 'templates/header.php'; ?>



    <!-- *****************************************************************************************************************
     FOOTER
     ***************************************************************************************************************** -->
    <?php include_once 'templates/js.php'; ?>
    <script>

        var game = new Phaser.Game(1000, 550, Phaser.CANVAS, 'game');
        game.state.add('Inicio', Juego.Inicio);
        game.state.add('Game', Juego.Game);
        game.state.add('Ayuda', Juego.Ayuda);
        game.state.add('Premiacion', Juego.Premiacion);
        game.state.start('Inicio');

        var B_musica = true;
        var B_efecto = true;
        var MusicaFondo;
        var tiempoTotal = 0;
        var tiempo1 = 0;
        var tiempo2 = 0;
        var tiempo3 = 0;
        var Mover_Engranes = false;
        var respuesta = 0;
        var respuestas_Acertadas = 0;
        var Tablero = 0;

        var Img_Movimiento = function (x, y, t, i, dx) {

            Phaser.Sprite.call(this, game);

            var me = this;

            init(x, y, t, i);

            game.add.tween(me).to({x: dx}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

            function init(x, y, t, i) {
                me.i = i;
                me.x = x;
                me.y = y;
                me.loadTexture(t);
                game.add.existing(me);
                game.physics.arcade.enable(me);

                me.anchor.setTo(0.5, 0.5);
                me.scale.x = 0.5;
                me.scale.y = 0.5;

                me.body.moves = false;
            }
        }
        Img_Movimiento.prototype = Object.create(Phaser.Sprite.prototype);
        Img_Movimiento.prototype.constructor = Img_Movimiento;
    </script>
    <div id="contenedor"></div>
