<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of dao
 *
 * @author FABIAN
 */
Class dao {

    var $link;
    var $host = null;
    var $usuario = null;
    var $password = null;
    var $database = null;
    var $log = null;

    /**
     * constructor de la clase
     */
    function dao($h, $u, $p, $db) {
        $this->host = $h;
        $this->usuario = $u;
        $this->password = $p;
        $this->database = $db;
        //$this->conectar();
    }

    function conectar() {
        $link = mysql_pconnect($this->host, $this->usuario, $this->password);
        mysql_set_charset('utf8');

        //echo ("link".$link);
        if (!$link) {
            echo "Imposible conectar";
            exit;
        }
        mysql_select_db($this->database, $link);
    }

    /**
     * ejecuta consultas en la base de datos
     *
     * @param string $sql cadena para consulta
     */
    function ejecutarConsulta($sql) {
        //echo ("<br>sql:".$sql);
        $result = mysql_query($sql);
        return $result;
    }

    function transformarResultado($result) {
        if ($result) {
            $row = mysql_fetch_array($result);
            //var_dump($row);
            return $row;
        }
    }

    function transformarResultado2($result) {
        $res = array();
        while ($row = mysql_fetch_array($result)) {
            $res[count($res)] = $row;
        }
        return $res;
    }

    function strtoupper_utf8($s) {
        $s = utf8_decode($s);
        //$s = strtoupper($s);
        $s = utf8_encode($s);
        return $s;
    }

    /**
     * almacena en la base datos de acuerdo a los parametros
     *
     * @param string $tabla tabla afectada
     * @param Array $campos campos afectados
     * @param Array $valores valores almacenados
     */
    function insertarRegistro($tabla, $campos, $valores) {
        $temp = "";
        $tempCampos = "";
        foreach ($valores as $v) {
            if ($v == "''") {
                $temp .= 'null,';
            } else {
                $temp .= $v . ",";
            }
        }
        foreach ($campos as $c) {
            $tempCampos .= $c . ",";
        }
        $temp = substr($temp, 0, strlen($temp) - 1);
        $tempCampos = substr($tempCampos, 0, strlen($tempCampos) - 1);
        $sql = "INSERT INTO " . $tabla . "(" . $tempCampos . ") VALUES (" . $temp . ")";
        echo $sql . "<hr>";
        return $this->ejecutarConsulta($sql);
    }

    /**
     * borra registros de la base datos de acuerdo a los parametros
     *
     * @param string $tabla tabla afectada
     * @param string $predicado condicion requerida
     */
    function borrarRegistro($tabla, $predicado) {
        $sql = "delete from " . $tabla . " where " . $predicado;
        //echo ("<br>borrar:".$sql);
        return mysql_query($sql);
    }

    /**
     * actualiza registros en la base datos de acuerdo a los parametros
     *
     * @param string $tabla tabla afectada
     * @param array $campos campos afectados
     * @param array $valores valores almacenados
     * @param string $condicion where de la sentecia sql
     */
    function actualizarRegistro($tabla, $campos, $valores, $condicion) {
        $sql = "update " . $tabla . " set ";
        $cont = 0;

        foreach ($campos as $c) {
            if ($valores[$cont] == "''" || $valores[$cont] == "")
                $sql .= $c . " = null , ";
            else
                $sql .= $c . " = " . $valores[$cont] . ", ";
            $cont++;
        }
        $sql = substr($sql, 0, strlen($sql) - 2);
        $sql .= " where " . $condicion;
        //echo ("<br>actualizar:".$sql."<hr>");
        return mysql_query($sql);
    }

    public function cerrarConexion() {
        mysql_close($this->link);
    }

}

?>
