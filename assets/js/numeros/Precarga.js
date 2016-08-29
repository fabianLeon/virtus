Juego.Precarga = function (game) {
};
Juego.Precarga.prototype = {
    preload: function () {
        //Agregar texto al juego
        this.labelloading = this.game.add.text(this.game.world.centerX + 0.5, //Posicion en X
                this.game.world.centerY + 110, //Posicion en Y
                'cargando...', //Texto
                {font: '30px Arial', fill: '#fff'}); //Estilo del texto
        //Establecer el punto de anclaje en el centro
        this.labelloading.anchor.setTo(0.5, 0.5);

        this.preloadingborder = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'odin2');
        this.preloadingborder.x -= this.preloadingborder.width / 2;
        this.preloading = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100, 'odin');
        this.preloading.x -= this.preloading.width / 2;
        //Crear la barra de carga del juego
        this.game.load.setPreloadSprite(this.preloading, 1);//Sprite, direccion(0==horizontal, 1==vertical) 
        
        
        this.game.load.image('Fondo', 'assets/img/numeros/Fondo.jpg');
        this.game.load.spritesheet('Abecedario', 'assets/img/numeros/Abecedario.png', 159, 151, 45);
        this.game.load.image('Ayuda', 'assets/img/numeros/Ayuda.png');
        this.game.load.image('mundo_tiles', 'assets/img/numeros/Mundo.png');
        this.game.load.image('Solucion', 'assets/img/numeros/Solucion.png');
        this.game.load.spritesheet('Preguntas', 'assets/img/numeros/Preguntas.png', 350, 100);
        this.game.load.image('FondoPremiacion', 'assets/img/numeros/Premiacion.png');
        this.game.load.spritesheet('Medallas', 'assets/img/numeros/Medallas.png', 200, 160, 9);
        this.game.load.tilemap('mundo_json', 'assets/img/numeros/Numeros.json', null, Phaser.Tilemap.TILED_JSON);

        this.game.load.spritesheet('Bottones', 'assets/btn/numeros/BT_Jugar_Ayuda.png', 150, 45, 6);
        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/numeros/BT_Siguiente.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAtras', 'assets/btn/numeros/BT_Atras.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAceptar', 'assets/btn/numeros/BT_Aceptar.png', 150, 45, 3);
        this.game.load.spritesheet('BottonesSonido', 'assets/btn/numeros/BT_Sonido.png', 50, 50, 4);
        this.game.load.spritesheet('BottonPause', 'assets/btn/numeros/BT_Pause.png', 50, 50, 3);
        this.game.load.spritesheet('BottonReiniciar', 'assets/btn/numeros/BT_Reiniciar.png', 50, 50, 3);
        this.game.load.image('BotonEfecto2', 'assets/btn/numeros/BT_Efectos2.png');
        this.game.load.image('BotonMusica2', 'assets/btn/numeros/BT_Musica2.png');

        this.game.load.audio('MusicaFondo', 'assets/audio/numeros/MusicaFondo.mp3');
        this.game.load.audio('Giro_Ficha', 'assets/audio/numeros/Giro_Ficha.mp3');
        this.game.load.audio('MusicaTriunfo', 'assets/audio/numeros/Ganador.mp3');
    },
    create: function() {
	this.game.state.start('Menu');
    }
};
