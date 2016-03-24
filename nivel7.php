
<?php
include_once 'templates/open_head.php';
session_start();
if (isset($_SESSION['nivel6'])) {
    $_SESSION['nivel6'] = $_SESSION['nivel6'] + 1;
    echo "<br>" . $_SESSION['nivel6'];
} else {
    $_SESSION['nivel1'] = 1;
    echo "<br>" . $_SESSION['nivel6'];
}
?>
</head>
<body>

    <?php include_once 'templates/header.php'; ?>

    <table>
        <tr>
            <!-- sentencia php para el manejo de archivos, (cargar los mundos ya creados) -->
            <?php
            error_reporting(E_ALL & ~E_NOTICE | E_STRICT);
            $filas = file('assets/backup_db/mundo.txt');
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
        <div class="col-lg-8 col">
            <br><br>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Escenario</h3>
                </div>
                <div class="panel-body">
                    <canvas id="canvas" width="850" height="500"></canvas>
                </div>
            </div>
        </div>
        <script type="application/javascript" src="assets/js/hunter/mover.js">
        </script>
        <div class="col-lg-4">
            <br>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Comandos a Ejecutar</h3>
                </div>
                <div class="panel-body">
                    <div class="row" style="text-align: center">
                        <canvas id="canvasF"  width="259" height="255" style="border:1px solid #000"></canvas>
                    </div>
                </div>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Funcion</h3>
                </div>
                <div class="panel-body">
                    <div class="row" style="text-align: center">
                        <canvas id="canvasF1"  width="259" height="102" style="border:1px solid #000"></canvas>
                    </div>
                </div>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Panel de Comandos</h3>
                </div>
                <div class="panel-body">
                    <div class="row" style="text-align: center">
                        <div class="col-lg-2 col-lg-offset-1" style="text-align: center">
                            <label>Adelante</label>
                            <button onClick="cambiarMatriz(1)"><img src="assets/img/hunter/dezplazamientos/adelante.png"></button>
                        </div>
                        <div class="col-lg-2" style="text-align: center">
                            <label>Izquierda</label>
                            <button onClick="cambiarMatriz(2)"><img src="assets/img/hunter/dezplazamientos/derecha.png"></button>
                        </div>
                        <div class="col-lg-2" style="text-align: center">
                            <label>Derecha</label>
                            <button onClick="cambiarMatriz(3)"><img src="assets/img/hunter/dezplazamientos/izquierda.png"></button>
                        </div>
                        <div class="col-lg-2" style="text-align: center">
                            <label>Encender</label>
                            <button onClick="cambiarMatriz(5)"><img src="assets/img/hunter/dezplazamientos/encender.png"></button>
                        </div>
                        <div class="col-lg-2" style="text-align: center">
                            <label>Saltar</label>
                            <button onClick="cambiarMatriz(4)"><img src="assets/img/hunter/dezplazamientos/saltar.png"></button>
                        </div>
                    </div>
                    <hr>
                    <div class="row" style="text-align: center">
                        <button onClick="automover()" class="btn btn-theme"> go !!!</button>
                        <button onClick="reset()" class="btn btn-theme">again</button>
                        <button onClick="backLevel()" class="btn btn-theme">Back Level</button>
                        <button onClick="cambiarMatriz(6)" class="btn btn-theme">Delete!!!</button>
                    </div>
                </div>
            </div>
        </div>

</body>
<?php include_once 'templates/js.php'; ?>
</html>
