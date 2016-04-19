<?php

include 'dao/dao.php';
include 'conf.php';
include 'dao/dao_usuario_nivel.php';

$dao = new dao(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$dao->conectar();
$daoUsuario = new daoUsuarioNivel($dao);
$medalla =  $daoUsuario->get_medallas($_SESSION['correo']);
$medallas = array();
 foreach ($medalla as $valor) {
    $medallas[count($medallas)] = $valor['q_efectividad'];
    $medallas[count($medallas)] = $valor['q_eficiencia'];
    $medallas[count($medallas)] = $valor['q_estrategia'];
 }
 
function contarMedallas($medallas,$numero) {
    $cont = 0;
    foreach ($medallas as $valor) {
        if($numero == $valor){
            $cont ++;
        }
    }
    return $cont;
}
