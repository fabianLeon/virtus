<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<!--[if lte IE 8]><meta http-equiv="X-UA-Compatible" content="chrome=1" /><![endif]-->
<title>My First Canvas Game</title>
<link rel="stylesheet" href="botones.css" type="text/css">

</head>
<body  background="Fondo/fondo1.png" id="Principal">


<h1>Hunter</h1>

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
            $filas=file('mundo.txt');
            $nivel=$_GET['mundo'];
            $mundo = explode(",", $filas[$nivel]);
            // mientras exista una fila


        ?>
        <!-- asignar la matriz guardada en el archivo a la matriz creada en javascript que contiene el mundo creado -->
        <script type="text/javascript">

            nivel = "<?php echo $nivel;?>";
            matrizMundo = [

                <?php 

                    for($i=0; $i<8; $i++){

                        echo '[';

                        for($j=0; $j<8; $j++){

                            echo $mundo[$i*8 + $j].',';

                        }

                        echo '],';
                    }

                ?>
            ]

        </script>
        
        <td><p><canvas id="canvas" width="850" height="500" style="border:1px solid #000">
        <script type="application/javascript" src="Mover.js">
        </script>

            <div id="boton1" onClick="javascript:automover()">
            <a href="#" title="Botones con css">
            <a href="#" title="Botones con css">Go!</a></div>
        
            <div id="boton2" onClick="javascript:reset()">
            <a href="#" title="Botones con css">
        	<a href="#">Reset</a></div>

            <div id="boton3">
            <a href="#" title="Botones con css">
            <a href="index.html">Volver Al Menu Inicial</a></div>
        </canvas></p>
        </td>
        <td>
        <p><canvas id="canvasF"  width="259" height="256" style="border:1px solid #000">
        </canvas></p>
        <button type="submit" style='background-color:#FFFFFF' onClick="javascript:cambiarMatriz(1)"><img src="dezplazamientos/adelante.png">//
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
        </button>
        </td>
    <tr>
</table>
</body>
</html>
