<?php

include '../dao/dao.php';
include '../conf.php';
include '../dao/dao_session.php';

session_start();

$dao = new dao(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$dao->conectar();
$daoSession = new daoSession($dao);

$correo             = $_POST['inputEmail'];
$pass               = $_POST['inputPassword'];

if( $daoSession->inicioSesion($correo, $pass)){
    $result = $daoSession->inicioSesion($correo, $pass);
    $_SESSION['user'] = $dao->strtoupper_utf8($result[0]);
    header('Location: ../index.php');
}else{
    header('Location: ../login.php?e=QWEsdfeDFSDAcdffg');
}


