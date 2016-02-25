<?php

include '../dao/dao.php';
include '../conf.php';
include '../dao/dao_usuario_nivel.php';

session_start();

$dao = new dao(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$dao->conectar();
$daoUsuario = new daoUsuarioNivel($dao);

$campos = array();
$valores = array();

$campos[count($campos)] = "k_usuario";
$valores[count($valores)] = "'".$_SESSION['correo']."'";
if ($_GET) {
    foreach ($_GET as $clave => $valor) {
        if ($clave != "tabla") {
            $campos[count($campos)] = $clave;
            $valores[count($valores)] = $valor;
        }else{
            $tabla = $valor;
        }
    }
}
$daoUsuario->info_nivel($tabla, $campos, $valores);
