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

    function crearUsuario($correo, $pass, $profesion, $nombre, $edad) {
        $tabla = "usuario";
        $campos = array("k_correo", "n_contrasena", "en_profesion", "n_nombre", "q_edad");
        $valores = array("'" . $correo . "'", "'" . $pass . "'",$profesion, "'" . $nombre . "'",$edad);
        return $this->database->insertarRegistro($tabla, $campos, $valores);
    }
    
    function inicioSesion($correo,$pass){
        $sql = "select n_nombre from usuario where k_correo = '$correo' and n_contrasena = '$pass'";
        $result = $this->database->ejecutarConsulta($sql);
        return ($this->database->transformarResultado($result));
    }

}
