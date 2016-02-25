var datos = function () {

    function llevarDatos(tabla, campos, valores, lugar) {
        var cadena = "";
        for (var i = campos.length - 1; i >= 0; i--) {
            cadena += campos[i] + "=" + valores[i] + "&"
        };
    }
    function traerDatos() {
    };
}