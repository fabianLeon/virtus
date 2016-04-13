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
        echo var_dump($tabla) . "<br>";
        echo var_dump($campos) . "<br>";
        echo var_dump($valores) . "<br>";
        $this->database->insertarRegistro($tabla, $campos, $valores);
    }

    function get_levels($user) {
        $sql = "SELECT k_nivel "
                . "FROM nivel_usuario "
                . "WHERE k_usuario like '" . $user . "' order by k_nivel;";
        //echo $sql;
        $result = $this->database->ejecutarConsulta($sql);
        return ($this->database->transformarResultado2($result));
    }

}
