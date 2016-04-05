
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
                
                console.log("old: " + plataforma);
                if (me.cl == 'rojo') {
                    if (saposGame[plataforma + 1] == null) {
                        saposGame[plataforma] = null;
                        plataforma += 1;
                        saposGame[plataforma] = me;
                        vx = 48;
                        vy = -50;
                        sePuede = true;
                    } else if (saposGame[plataforma + 2] == null) {
                        saposGame[plataforma] = null;
                        plataforma += 2;
                        saposGame[plataforma] = me;
                        vx = 90;
                        vy = -80;
                        sePuede = true;
                    }
                } else {
                    if (saposGame[plataforma - 1] == null) {
                        saposGame[plataforma] = null;
                        plataforma -= 1;
                        saposGame[plataforma] = me;
                        vx = -48;
                        vy = -50;
                        sePuede = true;
                    } else if (saposGame[plataforma - 2] == null) {
                        saposGame[plataforma] = null;
                        plataforma -= 2;
                        saposGame[plataforma] = me;
                        vx = -90;
                        vy = -80;
                        sePuede = true;
                    }
                }
            }

            function mover() {
                
                dondeSaltar();
                if (sePuede == true) {
                    animar();
                    console.log(vx+","+vy);
                    me.body.velocity = new Phaser.Point(vx, vy);
                    if (B_efecto) {
                        Sonido_Salto.play();
                    }
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

                me.x = 105 + (150 * plataforma);
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

    </script>
    <div id="contenedor"></div>
