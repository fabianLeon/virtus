<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<!--[if lte IE 8]><meta http-equiv="X-UA-Compatible" content="chrome=1" /><![endif]-->
<title>My First Canvas Game</title>
<link rel="stylesheet" href="botones.css" type="text/css">

</head>
<body background="Fondo/fondo4.png" id="Principal">


<h1>Hunter</h1>

<style type="text/css">
    canvas{
        margin:10px;
        top:10px;
        visibility:visible z-index:1;
    }
	
</style>
<table>
    <tr>


        <td rowspan="10"><p><canvas id="canvas" width="850" height="500" style="border:1px solid #000">
            <script type="application/javascript" src="Mundo.js"></script>

            <form id="form" action="guardar.php">
                <input type="hidden" id="variable" name="variable"/>
                <div id="boton1" value = "enviar" onclick="JavaScript:guardar()">
                <label title="Botones con css">Guardar</a></div>
            </form>

            <div id="boton2" onClick="javascript:resetear()">
            <a href="#" title="Botones con css">
            <a href="Mundo.php">Reset</a></div>

            <div id="boton3">
            <a href="#" title="Botones con css">
            <a href="index.html">Volver Al Menu Inicial</a></div>
        </canvas></p>
        </td>
    </tr>
    
    <tr><tr>
        <td><button type="submit"  onClick="javascript:cambiarMatriz(0)" onClick="this.disabled=true"><img src="dezplazamientos/cuadro.png">
        </button></td>
        </tr>
        <tr>
        <td><button type="submit"  onClick="javascript:cambiarMatriz(1)"><img src="dezplazamientos/caja1.png">
        </button></td>
        </tr>
        <tr>
        <td><button type="submit"  onClick="javascript:cambiarMatriz(6)"><img src="dezplazamientos/caja2.png">
        </button></td>
        </tr>
        <tr>
        <td><button type="submit"  onClick="javascript:cambiarMatriz(11)"><img src="dezplazamientos/caja3.png">
        </button></td>
        </tr>
        <tr>
        <td><button id="btHunter" type="submit"  onClick="javascript:cambiarMatriz(18)"><img src="dezplazamientos/hunter.png">
        </button></td>
        </tr>
        <tr>
        <td><button id="btLuz" type="submit"  onClick="javascript:cambiarMatriz(16)"><img src="dezplazamientos/luzOff.png">
        </button></td>
        </tr>
        </tr>
        </table>
    </td>
    </tr>
</table>


</body>
</html>
