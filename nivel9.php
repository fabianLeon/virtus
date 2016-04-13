
<?php
include_once 'templates/open_head.php';
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
            $nivel = 2;
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
            ];
            $('#myModal').on('shown.bs.modal', function () {
                $('#myInput').focus()
            })

        </script>
        <br><br><br><br>
        <div class="col-lg-8 col">

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Escenario</h3>
                </div>
                <div class="panel-body">
                    <canvas id="canvas" width="850" height="520"></canvas>
                </div>
            </div>
        </div>
        <script type="application/javascript" src="assets/js/hunter/mover.js">
        </script>
        <br>
        <div class="col-lg-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Comandos a Ejecutar</h3>
                </div>
                <div class="panel-body">
                    <div class="col-lg-8">
                        <div class="row" >
                            <canvas id="canvasF"  width="259" height="256" style="border:1px solid #000"></canvas>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-2">
                            <small>Adelante</small>
                            <button onClick="cambiarMatriz(1)"><img src="assets/img/hunter/dezplazamientos/adelante.png"></button>   
                            <small>Izquierda</small>
                            <button onClick="cambiarMatriz(2)"><img src="assets/img/hunter/dezplazamientos/derecha.png"></button>
                            <small>Derecha</small>
                            <button onClick="cambiarMatriz(3)"><img src="assets/img/hunter/dezplazamientos/izquierda.png"></button>
                            <small>Deshacer</small>
                            <button onClick="cambiarMatriz(6)"type="button" class="btn btn-theme">
                                <span class="glyphicon glyphicon-backward" aria-hidden="true"> </span>
                            </button>
                        </div>
                        <div class="col-lg-2">
                            <small>Recoger</small>
                            <button onClick="cambiarMatriz(5)"><img src="assets/img/hunter/dezplazamientos/encender.png"></button>
                            <small>Saltar</small>
                            <button onClick="cambiarMatriz(4)"><img src="assets/img/hunter/dezplazamientos/saltar.png"></button>
                            <small>Funcion</small>
                            <button onClick="cambiarMatriz(7)"><img src="assets/img/hunter/dezplazamientos/funcion.png"></button>
                            <small>Reiniciar</small>
                            <button onClick="perdio()" class="btn btn-theme">
                                <span class="glyphicon glyphicon glyphicon-off" aria-hidden="true"> </span>
                            </button>

                        </div>
                        <div class="row" style="text-align: center">
                            <button onClick="automover()" class="btn btn-theme">
                                <span class="glyphicon glyphicon-play" aria-hidden="true"></span> Iniciar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Funcion</h3>
                </div>
                <div class="panel-body">
                    <div class="panel-body">
                        <div class="col-lg-8">
                            <div class="row">
                                <canvas id="canvasF1"  width="259" height="102" style="border:1px solid #000"></canvas>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <small>Adelante</small>
                            <button onClick="cambiarMatrizFunciones(1)"><img src="assets/img/hunter/dezplazamientos/adelante.png"></button>   
                            <small>Izquierda</small>
                            <button onClick="cambiarMatrizFunciones(2)"><img src="assets/img/hunter/dezplazamientos/derecha.png"></button>
                        </div>
                        <div class="col-lg-2">
                            <small>Derecha</small>
                            <button onClick="cambiarMatrizFunciones(3)"><img src="assets/img/hunter/dezplazamientos/izquierda.png"></button>
                            <small>Saltar</small>
                            <button onClick="cambiarMatrizFunciones(4)"><img src="assets/img/hunter/dezplazamientos/saltar.png"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

</body>
<?php include_once 'templates/js.php'; ?>
</html>
