Juego.Precarga = function (game) {
};
Juego.Precarga.prototype = {
    preload: function () {
        //Agregar texto al juego
        this.labelloading = this.game.add.text(this.game.world.centerX + 0.5, //Posicion en X
                                     this.game.world.centerY - 15 + 0.5, //Posicion en Y
                                     'cargando...', //Texto
                                     { font: '30px Arial', fill: '#fff' }); //Estilo del texto
        //Establecer el punto de anclaje en el centro
        this.labelloading.anchor.setTo(0.5, 0.5);
 
        this.preloadingborder = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 30, 'loadingborder');
        this.preloadingborder.x -= this.preloadingborder.width / 2;
        this.preloading = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 19, 'loading');
        this.preloading.x -= this.preloading.width / 2;
        //Crear la barra de carga del juego
        this.game.load.setPreloadSprite(this.preloading, 0);//Sprite, direccion(0==horizontal, 1==vertical)       
        
        
        this.game.load.image('Fondo', 'assets/img/canon/Fondo.png');
        this.game.load.spritesheet('Abecedario', 'assets/img/canon/Abecedario.png', 159, 151, 45);
        this.game.load.image('Ayuda_1', 'assets/img/canon/Ayuda1.png');
        this.game.load.image('Ayuda_2', 'assets/img/canon/Ayuda2.png');
        this.game.load.image('FondoPremiacion', 'assets/img/canon/Premiacion.png');
        this.game.load.spritesheet('Medallas', 'assets/img/canon/Medallas.png', 200, 160, 9);
        this.game.load.image('Piso', 'assets/img/canon/piso.png');
        this.game.load.image('Globo', 'assets/img/canon/bomba.png');
        this.game.load.image('Puas', 'assets/img/canon/Caneca/Puas.png');
        this.game.load.image('Llanta', 'assets/img/canon/Caneca/llanta.png');
        this.game.load.image('FondoCaneca', 'assets/img/canon/Caneca/fondoCaneca.png');
        this.game.load.image('BaseCaneca', 'assets/img/canon/Caneca/BaseCaneca.png');
        this.game.load.spritesheet('kaboom', 'assets/img/canon/explode.png', 128, 128);
        this.game.load.spritesheet('Canon', 'assets/img/canon/canon.png', 103, 81);
        this.game.load.spritesheet('Tiro_al_Blanco', 'assets/img/canon/tiro_blanco.png', 35, 35);
        for (i = 0; i < 58; i++) {
            this.game.load.image('caneca1.' + i, 'assets/img/canon/Caneca/Imagen1.' + i + '.png');
        }

        this.game.load.spritesheet('BottonesSonido', 'assets/btn/canon/BT_Sonido.png', 50, 50, 4);
        this.game.load.spritesheet('BottonPause', 'assets/btn/canon/BT_Pause.png', 50, 50, 3);
        this.game.load.spritesheet('BottonReiniciar', 'assets/btn/canon/BT_Reiniciar.png', 50, 50, 3);
        this.game.load.image('BotonEfecto2', 'assets/btn/canon/BT_Efectos2.png');
        this.game.load.image('BotonMusica2', 'assets/btn/canon/BT_Musica2.png');
        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/canon/BT_Siguiente.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAtras', 'assets/btn/canon/BT_Atras.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAceptar', 'assets/btn/canon/BT_Aceptar.png', 150, 45, 3);
        this.game.load.spritesheet('Bottones', 'assets/btn/canon/BT_Jugar_Ayuda.png', 150, 45, 6);

        this.game.load.audio('MusicaFondo', 'assets/audio/canon/MusicaFondo.mp3');
        this.game.load.audio('Bomba_Adentro', 'assets/audio/canon/Bomba_Adentro.mp3');
        this.game.load.audio('Bomba_Afuera', 'assets/audio/canon/Bomba_Afuera.mp3');
        this.game.load.audio('MusicaTriunfo', 'assets/audio/canon/Ganador.mp3');
    },
    create: function() {
	this.game.state.start('Menu');
    }
};
