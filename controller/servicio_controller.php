<?php

include 'dao/dao.php';
include 'conf.php';
include 'dao/dao_servicio.php';
if ($_GET) {
    $id = $_GET['id'];
}else{
    $id = 0;
}

$dao = new dao(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$dao->conectar();
$daoServicio = new daoServicio($dao);

$descripciones = $daoServicio->getDescripciones($id);
$servicio = $daoServicio->getServicio($id);

$servicios = $daoServicio->getServicios(5);
$servicios_portafolio = $daoServicio->getServicios(0);
$titulo = $servicio[0];
