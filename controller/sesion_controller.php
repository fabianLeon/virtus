<?php

include '../dao/dao.php';
include '../conf.php';
include '../dao/dao_session.php';

session_start();

$dao = new dao(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$dao->conectar();
$daoSession = new daoSession($dao);

$nombre             = $_POST['inputNombre'];
$correo             = $_POST['inputEmail'];
$edificio           = ''; 
if($_POST['inputEdificio']!= null){
   $edificio           = $_POST['inputE{dificio']; 
}

$telefono           = $_POST['inputTelefono'];
$pass               = $_POST['inputPassword'];

if( $daoSession->crearUsuario($correo, $pass, $edificio, $nombre, $telefono)){
    $_SESSION['user'] = $dao->strtoupper_utf8($nombre);
    header('Location: ../index.php');
}



