var Datos = function () {

    function llevarDatos(tabla, campos, valores, lugar) {
        var cadena = lugar+"?";
        for (var i = campos.length - 1; i >= 0; i--) {
            cadena += campos[i] + "=" + valores[i] + "&"
        };
        cadena += "tabla="+tabla;
        window.location=cadena;
    }
}