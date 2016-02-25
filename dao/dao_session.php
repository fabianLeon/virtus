<?php

/**
 * Description of daoSession
 *
 * @author Fabian
 */
class daoSession {

    var $database;

    /**
     * constructor de la clase
     */
    function daoSession($db) {
        $this->database = $db;
    }

    function crearUsuario($correo, $pass, $edificio, $nombre, $telefono) {
        $tabla = "usuario";
        $campos = array("k_correo", "n_contrasena", "n_edificio_direccion", "n_nombre", "n_telefono");
        $valores = array("'" . $correo . "'", "'" . $pass . "'", "'" . $edificio . "'", "'" . $nombre . "'", "'" . $telefono . "'");
        return $this->database->insertarRegistro($tabla, $campos, $valores);
    }
    
    function inicioSesion($correo,$pass){
        $sql = "select n_nombre from usuario where k_correo = '$correo' and n_contrasena = '$pass'";
        $result = $this->database->ejecutarConsulta($sql);
        return ($this->database->transformarResultado($result));
    }

}
