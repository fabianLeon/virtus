
<?php
include_once 'templates/open_head.php';
?>
<script type="text/javascript" src="assets/js/phaser.min.js"></script>
<script type="text/javascript" src="assets/js/php.js"></script>
<script type="text/javascript" src="assets/js/fichas/game_State.js"></script>
<script type="text/javascript" src="assets/js/fichas/game.js"></script>

<style type="text/css">
    body{

    }
    .phaser{
        padding-left: 25%;
    }
</style>
</head>
<body>

    <?php include_once 'templates/header.php'; ?>
    <?php include_once 'templates/js.php'; ?>
    <div class="phaser">
<script type="text/javascript">
    contarIntento("nivel1");

    var efectividad = new Rangos(10,50,"Efectividad");  // definir estructura de premiacion de la efectividad
    var eficacia = new Rangos(20,50,"eficacia");        // definir estructura de premiacion de la eficacia
    var estrategia = new Rangos(10,15,"Estrategia");    // definir estructura de premiacion de la estrategia
    var nivel1_premiacion = new Premiacion(efectividad,eficacia,estrategia);    
    console.log(nivel1_premiacion.calcularEstra(13));     // envio el parametro, recibo el orden, 1 para oro, 2 para plata, 3 para bronce
</script>

