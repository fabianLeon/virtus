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
$perfil           = ''; 
if($_POST['inputPerfil'] > 0){
   $perfil           = $_POST['inputPerfil']; 
}else{
    header('Location: ../registro.php');
}

$edad           = $_POST['inputEdad'];
$pass               = $_POST['inputPassword'];

if( $daoSession->crearUsuario($correo, $pass, $perfil, $nombre, $edad)){
    $_SESSION['user'] = $dao->strtoupper_utf8($nombre);
    header('Location: ../index.php');
}



