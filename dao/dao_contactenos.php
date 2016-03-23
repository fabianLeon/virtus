<?php

/**
 * Description of daoSession
 *
 * @author Fabian
 */
class daoContactenos {

    var $database;

    /**
     * constructor de la clase
     */
    function daoContactenos($db) {
        $this->database = $db;
    }

    function crearContactenos($nombre, $correo, $asunto, $mensaje) {
        $tabla = "contacto";
        $campos = array("n_nombre", "n_correo", "n_asunto", "n_mensaje",);
        $valores = array("'" . $nombre . "'", "'" . $correo . "'","'" .$asunto. "'", "'" . $mensaje . "'");
        return $this->database->insertarRegistro($tabla, $campos, $valores);
    }
    
}