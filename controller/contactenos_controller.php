<?php

include '../dao/dao.php';
include '../conf.php';
include '../dao/dao_contactenos.php';

session_start();

$dao = new dao(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$dao->conectar();
$daoContactenos = new daoContactenos($dao);

$nombre = $_POST['inputName'];
$asunto = $_POST['inputAsunto'];
$correo = $_POST['inputCorreo'];
$mensaje = $_POST['inputMensaje'];


if ($daoContactenos->crearContactenos($nombre, $correo, $asunto, $mensaje)) {
    header('Location: ../index.php');
}



