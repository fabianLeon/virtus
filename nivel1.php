
<?php
include_once 'templates/open_head.php';
?>

<script type="text/javascript" src="assets/js/phaser.min.js"></script>
<script type="text/javascript" src="assets/js/php.js"></script>
<script type="text/javascript" src="assets/js/fichas/Inicio.js"></script>
<script type="text/javascript" src="assets/js/fichas/Precarga.js"></script>
<script type="text/javascript" src="assets/js/fichas/Menu.js"></script>
<script type="text/javascript" src="assets/js/fichas/Ayuda.js"></script>
<script type="text/javascript" src="assets/js/fichas/game_State.js"></script>
<script type="text/javascript" src="assets/js/fichas/Premiacion.js"></script>
<style type="text/css">
    body{
        margin-top: 8%;
        margin-left: 30%;
    }
    .phaser{
        padding-left: 30%;
    }
</style>
</head>
<body>

    <?php include_once 'templates/header.php'; ?>
    <?php include_once 'templates/js.php'; ?>
    <div class="phaser">
        <script type="text/javascript">
            var game = new Phaser.Game(600, 700, Phaser.AUTO, '');
            var fichas = [];
            var bounds = null;
            var vertical1 = null;
            var vertical2 = null;
            var j = -1;
            var lag = [];

            game.state.add('Inicio', Juego.Inicio);
            game.state.add('Precarga', Juego.Precarga);
            game.state.add('Menu', Juego.Menu);
            game.state.add('Game', Juego.Game_State);
            game.state.add('Ayuda', Juego.Ayuda);
            game.state.add('Premiacion', Juego.Premiacion);
            game.state.start('Inicio');
            
            // definicion de variables de sesion de javascript para almacenar los distintos valores
            // estos cambiaran para cada usuario y nivel
            // cookies almacenara el nivel en este caso nivel uno
            // usuario traido de la variable de session de php
            usuario = "<?php echo($_SESSION['correo']); ?>";
            usuario = usuario.substring(0, 5);
            cookies = "uno";

            var B_musica = true;
            var B_efecto = true;
            var Sonido_Movimiento;
            var MusicaFondo;
            var tiempoTotal = 0;
            var Movimientos = 0;

            var efectividad = new Rangos(10, 50, "Efectividad");  // definir estructura de premiacion de la efectividad
            var eficacia = new Rangos(20, 50, "eficacia");        // definir estructura de premiacion de la eficacia
            var estrategia = new Rangos(10, 15, "Estrategia");    // definir estructura de premiacion de la estrategia
            var nivel1_premiacion = new Premiacion(efectividad, eficacia, estrategia);
//          console.log(nivel1_premiacion.calcularEstra(13));     // envio el parametro, recibo el orden, 1 para oro, 2 para plata, 3 para bronce

            var Ficha = function (x, y, t, i) {

                Phaser.Sprite.call(this, game);
                var me = this;
                me.xOld = x;
                me.yOld = y;
                init(x, y, t, i);

                function dragStart() {
                    if (B_efecto) {
                        Sonido_Movimiento.play();
                    }
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
                            if (result || (Math.abs(me.y - me.yOld) + Math.abs(me.x - me.xOld)) > 200
                                    ) {
                                console.log("colision con" + i);
                                me.x = me.xOld;
                                me.y = me.yOld;
                            }
                            if (fichas[9].x == 200 && fichas[9].y == 400) {
                                MusicaFondo.stop();
                                game.state.start('Premiacion');        
                            }
                        }
                    }
                    Movimientos++;
                }

                function init(x, y, t, i) {
                    me.i = i;
                    me.loadTexture(t);
                    me.x = x;
                    me.y = y;
                    me.inputEnabled = true;
                    me.input.enableDrag();
                    me.input.enableSnap(100, 100, true, false);
                    me.input.boundsSprite = bounds;
                    me.events.onDragStart.add(dragStart);
                    me.events.onDragStop.add(dragStop);
                    game.add.existing(me);
                    game.physics.arcade.enable(me);
                }
            }

            Ficha.prototype = Object.create(Phaser.Sprite.prototype);
            Ficha.prototype.constructor = Ficha;
        </script>

