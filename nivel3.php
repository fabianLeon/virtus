<?php include_once 'templates/open_head.php'; ?>
<script type="text/javascript" src="assets/js/phaser.min.js"></script>
<script type="text/javascript" src="assets/js/numeros/Inicio.js"></script>
<script type="text/javascript" src="assets/js/numeros/Precarga.js"></script>
<script type="text/javascript" src="assets/js/numeros/Menu.js"></script>
<script type="text/javascript" src="assets/js/numeros/Ayuda.js"></script>
<script type="text/javascript" src="assets/js/numeros/Game.js"></script>
<script type="text/javascript" src="assets/js/numeros/Premiacion.js"></script>
<style type="text/css">
    body {
        margin-top: 7%;
        margin-left: 13%;
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
        
        // definicion de variables de sesion de javascript para almacenar los distintos valores
        // estos cambiaran para cada usuario y nivel
        // cookies almacenara el nivel en este caso nivel uno
        // usuario traido de la variable de session de php
        usuario = "<?php echo($_SESSION['correo']); ?>";
        usuario = usuario.substring(0, 5);
        cookies = "tres";

        var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'game');
        game.state.add('Inicio', Juego.Inicio);
        game.state.add('Precarga', Juego.Precarga);
        game.state.add('Menu', Juego.Menu);
        game.state.add('Game', Juego.Game);
        game.state.add('Ayuda', Juego.Ayuda);
        game.state.add('Premiacion', Juego.Premiacion);
        game.state.start('Inicio');

        var B_musica = true;
        var B_efecto = true;
        var MusicaFondo;
        var tiempoTotal = 0;

        var flipFlag = false;

        //Variables del Juego
        var tiempoChequeo = 0;
        var ListaInicial = new Array();
        var ListaCuadrados = new Array();
        var ListaValores = new Array();
        var ListaParejas = new Array();
        var NumCasillasAlmacen = new Array();
        var AlmacenValores = new Array();
        var coordenadasX = new Array();
        var coordenadasY = new Array();
        var respuestasSuma = new Array();

        var secuenciaTotal = new Array();
        var secuenciaFigura = new Array();
        var SumaTotal = new Array();
        var Parejas_Acertadas = 0;

        var masterCounter = 0;
        var ContadorCuadrados = 0;
        var Fallos = 0;
        var Secuencia = 1; //representa la Secuencia en la que va el juego
        var CuadradoX;
        var CuadradoY;

        var map;
        var layer;
        var marker;
        var TileActual;
        var PosicionTileActual;
        var TextWin = '';
        var myCountdownSeconds;
        var banderaTiempo = true;

    </script>



    <script type="text/javascript">

        <!-- Bootstrap core JavaScript
    === === === === === === === === === === === === === === === === == -- ><!-- Placed at the end of the document so the pages load faster -->
                < /body>
                < /html>
