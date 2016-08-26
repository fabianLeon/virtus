Juego.Precarga = function (game) {
};
Juego.Precarga.prototype = {
    preload: function () {
        //Agregar texto al juego
        this.labelloading = this.game.add.text(this.game.world.centerX + 0.5, //Posicion en X
                this.game.world.centerY - 15 + 0.5, //Posicion en Y
                'cargando...', //Texto
                {font: '30px Arial', fill: '#fff'}); //Estilo del texto
        //Establecer el punto de anclaje en el centro
        this.labelloading.anchor.setTo(0.5, 0.5);

        this.preloadingborder = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 30, 'loadingborder');
        this.preloadingborder.x -= this.preloadingborder.width / 2;
        this.preloading = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 19, 'loading');
        this.preloading.x -= this.preloading.width / 2;
        //Crear la barra de carga del juego
        this.game.load.setPreloadSprite(this.preloading, 0);//Sprite, direccion(0==horizontal, 1==vertical)       

//        this.odin = this.game.add.image(500, 250, 'odin');
//        this.odin.angle += 0.8;

        this.game.load.image('Fondo', 'assets/img/camino/Fondo.jpg');
        this.game.load.image('Ayuda_1', 'assets/img/camino/Ayuda1.png');
        this.game.load.image('Ayuda_2', 'assets/img/camino/Ayuda2.png');
        this.game.load.spritesheet('Abecedario', 'assets/img/camino/Abecedario.png', 159, 151, 45);
        this.game.load.spritesheet("background", "assets/img/camino/fichas.jpg", 100, 100);
        this.game.load.image('Solucion', 'assets/img/camino/solucion.jpg');
        this.game.load.image('Marco', 'assets/img/camino/marco.png');
        this.game.load.spritesheet('Preguntas', 'assets/img/camino/preguntasAbstractas.png', 400, 80, 4);
        this.game.load.spritesheet('Solucion1', 'assets/img/camino/solucionPregunta1.png', 100, 100, 8);
        this.game.load.spritesheet('Solucion2', 'assets/img/camino/solucionPregunta2.png', 100, 100, 8);
        this.game.load.spritesheet('Solucion3', 'assets/img/camino/solucionPregunta3.png', 100, 100, 8);
        this.game.load.spritesheet('Solucion4', 'assets/img/camino/solucionPregunta4.png', 100, 100, 8);
        this.game.load.image('FondoPremiacion', 'assets/img/camino/Premiacion.png');
        this.game.load.spritesheet('Medallas', 'assets/img/camino/Medallas.png', 200, 160, 9);

        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/camino/BT_Siguiente.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAtras', 'assets/btn/camino/BT_Atras.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAceptar', 'assets/btn/camino/BT_Aceptar.png', 150, 45, 3);
        this.game.load.spritesheet('Bottones', 'assets/btn/camino/BT_Jugar_Ayuda.png', 150, 45, 6);
        this.game.load.spritesheet('BottonesSonido', 'assets/btn/camino/BT_Sonido.png', 50, 50, 4);
        this.game.load.spritesheet('BottonPause', 'assets/btn/camino/BT_Pause.png', 50, 50, 3);
        this.game.load.spritesheet('BottonReiniciar', 'assets/btn/numeros/BT_Reiniciar.png', 50, 50, 3);
        this.game.load.image('BotonEfecto2', 'assets/btn/camino/BT_Efectos2.png');
        this.game.load.image('BotonMusica2', 'assets/btn/camino/BT_Musica2.png');

        this.game.load.audio('MusicaFondo', 'assets/audio/camino/MusicaFondo.mp3');
        this.game.load.audio('Arrastrar', 'assets/audio/camino/Arrastrar_ficha.mp3');
        this.game.load.audio('Giro_Ficha', 'assets/audio/camino/Giro_Ficha.mp3');
        this.game.load.audio('MusicaTriunfo', 'assets/audio/camino/Ganador.mp3');
    },
    create: function () {
        this.game.state.start('Menu');
    }
};
