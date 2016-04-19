
<?php include_once 'templates/open_head.php'; ?>
<script type="text/javascript" src="assets/js/phaser.min.js"></script>
<script type="text/javascript" src="assets/js/sapo/Inicio.js"></script>
<script type="text/javascript" src="assets/js/sapo/Ayuda.js"></script>
<script type="text/javascript" src="assets/js/sapo/game_State.js"></script>
<script type="text/javascript" src="assets/js/sapo/Premiacion.js"></script>
<style type="text/css">
    body {
        margin-top: 7%;
        margin-left: 1%;
    }
</style>
</head>
<body>

    <?php include_once 'templates/header.php'; ?>



    <!-- *****************************************************************************************************************
     game
     ***************************************************************************************************************** -->
    <?php include_once 'templates/js.php'; ?>
    <script>
        // definicion de variables de sesion de javascript para almacenar los distintos valores
        // estos cambiaran para cada usuario y nivel
        // cookies almacenara el nivel en este caso nivel uno
        // usuario traido de la variable de session de php
        usuario = "<?php echo($_SESSION['correo']); ?>";
        usuario = usuario.substring(0, 5);
        cookies = "dos";

        var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'game');
        game.state.add('Inicio', Juego.Inicio);
        game.state.add('Game', Juego.Game_State);
        game.state.add('Ayuda', Juego.Ayuda);
        game.state.add('Premiacion', Juego.Premiacion);
        game.state.start('Inicio');

        var saposGame = [];
        var sapos = null;
        var plataformas = null;
        var VAzul = new Phaser.Point(-55, -90); //velocidad sapo azul
        var VRojo = new Phaser.Point(55, -90); // velocidad sapo rojo

        var B_musica = true;
        var B_efecto = true;
        var Sonido_Salto;
        var MusicaFondo;
        var tiempoTotal = 0;
        var logrosAlcanzados = new Array();

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
                sePuede = false;
                console.log("old: " + plataforma);
                if (me.cl === 'rojo') {
                    if (saposGame[plataforma + 1] === null && plataforma + 1 <= 6) {
                        saposGame[plataforma] = null;
                        plataforma += 1;
                        saposGame[plataforma] = me;
                        vx = 97;
                        vy = -40;
                        sePuede = true;
                    } else if (saposGame[plataforma + 2] === null && plataforma + 2 <= 6) {
                        saposGame[plataforma] = null;
                        plataforma += 2;
                        saposGame[plataforma] = me;
                        vx = 195;
                        vy = -60;
                        sePuede = true;
                    }
                } else {
                    if (saposGame[plataforma - 1] === null && plataforma - 1 >= 0) {
                        saposGame[plataforma] = null;
                        plataforma -= 1;
                        saposGame[plataforma] = me;
                        vx = -85;
                        vy = -40;
                        sePuede = true;
                    } else if (saposGame[plataforma - 2] === null && plataforma - 2 >= 0) {
                        saposGame[plataforma] = null;
                        plataforma -= 2;
                        saposGame[plataforma] = me;
                        vx = -170;
                        vy = -60;
                        sePuede = true;
                    }
                }
            }

            function mover() {
                dondeSaltar();
                if (sePuede == true) {
                    animar();
                    me.body.velocity = new Phaser.Point(vx, vy);
                    if (B_efecto) {
                        Sonido_Salto.play();
                    }
                } else {
                    game.state.start('Game');
                    MusicaFondo.stop();
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
                    saltar = me.animations.add('saltar', [3, 10, 9, 8, 7, 6, 5, 4, 3], 5, false);
                    me.x = 90 + (150 * plataforma);
                } else {
                    me.loadTexture('rojo');
                    saltar = me.animations.add('saltar', [10, 4, 5, 6, 7, 8, 9, 10], 5, false);
                    me.x = 60 + (150 * plataforma);
                }

                me.inputEnabled = true;
                me.events.onInputUp.add(mover);

                me.y = 2 * (game.height / 3);

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

    </script>
    <div id="contenedor"></div>
