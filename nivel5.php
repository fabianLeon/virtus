
<?php include_once 'templates/open_head.php'; ?>
<script type="text/javascript" src="assets/js/phaser.min.js"></script> 
<script type="text/javascript" src="assets/js/camino/Inicio.js"></script>
<script type="text/javascript" src="assets/js/camino/Game.js"></script>
<script type="text/javascript" src="assets/js/camino/GameSecond.js"></script>
<script type="text/javascript" src="assets/js/camino/Ayuda.js"></script>
<script type="text/javascript" src="assets/js/camino/Premiacion.js"></script>
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

        var game = new Phaser.Game(1000, 500, Phaser.CANVAS, 'game');
        game.state.add('Inicio', Juego.Inicio);
        game.state.add('Game', Juego.Game);
        game.state.add('GameSecond', Juego.GameSecond);
        game.state.add('Ayuda', Juego.Ayuda);
        game.state.add('Premiacion', Juego.Premiacion);
        game.state.start('Inicio');

        var B_musica = true;
        var B_efecto = true;
        var MusicaFondo;
        var tiempoTotal = 0;
        var tiempoSolucionCamino = 0;
        var Fallos=0;

        //el numero 0 corresponde a casillas sin camino y el 10 corresponde a la casilla de color negro
        var matrizSolucion = [4, 2, 5, 0, 10, 3, 4, 7, 0, 1, 3, 8, 0, 0, 3, 6, 2, 2, 2, 7];
    </script>
    <div id="contenedor"></div>
