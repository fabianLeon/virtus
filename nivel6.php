
<?php
include_once 'templates/open_head.php';
session_start();
if (isset($_SESSION['nivel1'])) {
    $_SESSION['nivel1'] = $_SESSION['nivel1'] + 1;
    echo "<br>" . $_SESSION['nivel1'];
} else {
    $_SESSION['nivel1'] = 1;
    echo "<br>" . $_SESSION['nivel1'];
}
?>

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
    <style>
        canvas{
            float:inherit;
            margin:10px;
            top:10px;
            visibility:visible z-index:1;
        }
        canvasF{
            float:inherit;
            margin:10px;
            visibility:visible z-index:2;
        }
    </style>
    <table>
        <tr>

            <!-- sentencia php para el manejo de archivos, (cargar los mundos ya creados) -->
            <?php
            error_reporting(E_ALL & ~E_NOTICE | E_STRICT);
            $filas = file('mundo.txt');
            $nivel = $_GET['mundo'];
            $mundo = explode(",", $filas[$nivel]);
            // mientras exista una fila
            ?>
            <!-- asignar la matriz guardada en el archivo a la matriz creada en javascript que contiene el mundo creado -->
        <script type="text/javascript">

            nivel = "<?php echo $nivel; ?>";
            matrizMundo = [
<?php
for ($i = 0; $i < 8; $i++) {

    echo '[';

    for ($j = 0; $j < 8; $j++) {

        echo $mundo[$i * 8 + $j] . ',';
    }

    echo '],';
}
?>
            ]

        </script>
        <div class="col-lg-8">
            <canvas id="canvas" width="850" height="500">
        </div>
        <script type="application/javascript" src="Mover.js">
        </script>
        <div class="col-lg-4"
            <div class="row">
                <br><br><br>
                <canvas id="canvasF"  width="259" height="256" style="border:1px solid #000"></canvas>
            </div>
             
            <button type="submit" style='background-color:#FFFFFF' onClick="javascript:cambiarMatriz(1)"><img src="dezplazamientos/adelante.png">
            </button>
            <button type="submit" style='background-color:#FFFFFF' onClick="javascript:cambiarMatriz(2)"><img src="dezplazamientos/derecha.png">
            </button>
            <button type="submit" style='background-color:#FFFFFF' onClick="javascript:cambiarMatriz(3)"><img src="dezplazamientos/izquierda.png">
            </button>
             
             
            <button type="submit" style='background-color:#FFFFFF' onClick="javascript:cambiarMatriz(5)"><img src="dezplazamientos/encender.png">
            </button>
            <button type="submit" style='background-color:#FFFFFF' onClick="javascript:cambiarMatriz(4)"><img src="dezplazamientos/saltar.png">
            </button>
            <button type="submit" style='background-color:#FFFFFF' onClick="javascript:cambiarMatriz(6)"><img src="dezplazamientos/nada.png">
            </button

            <div onClick="javascript:automover()">
                <a href="#" title="Botones con css">
                    <a href="#" title="Botones con css">Go!</a></div>

            <div onClick="javascript:reset()">
                <a href="#" title="Botones con css">
                    <a href="#">Reset</a></div>

            <div >
                <a href="#" title="Botones con css">
                    <a href="index.html">Volver Al Menu Inicial</a>
            </div>
        </div>
</body>
</html>
