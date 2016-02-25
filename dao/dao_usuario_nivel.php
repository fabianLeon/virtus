<?php

/**
 * Description of daoSession
 *
 * @author Fabian
 */
class daoUsuarioNivel {

    var $database;

    /**
     * constructor de la clase
     */
    function daoUsuarioNivel($db) {
        $this->database = $db;
    }

    function info_nivel($tabla, $campos, $valores) {
        echo var_dump($tabla)."<br>";
        echo var_dump($campos)."<br>";
        echo var_dump($valores)."<br>";
        $this->database->insertarRegistro($tabla, $campos, $valores);
    }
}
