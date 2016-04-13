<?php

include 'dao/dao.php';
include 'conf.php';
include 'dao/dao_usuario_nivel.php';


$dao = new dao(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$dao->conectar();
$daoUsuario = new daoUsuarioNivel($dao);
$nivel =  $daoUsuario->get_levels($_SESSION['correo']);
$niveles = $nivel;
 foreach ($nivel as $valor) {
    $niveles[count($niveles)] = $valor['k_nivel'];
 }