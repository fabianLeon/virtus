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
        
        
        this.game.load.image('Fondo', 'assets/img/sapo/Fondo.jpg');
        this.game.load.image('Ayuda', 'assets/img/sapo/Ayuda.png');
        this.game.load.image('FondoPremiacion', 'assets/img/sapo/Premiacion.png');
        this.game.load.spritesheet('Abecedario', 'assets/img/sapo/Abecedario.png', 159, 151, 45);
        this.game.load.spritesheet('Medallas', 'assets/img/sapo/Medallas.png', 200, 160, 9);
        this.game.load.image('plataforma', 'assets/img/sapo/Plataforma.png');
        this.game.load.spritesheet('azul', 'assets/img/sapo/Sapo_Rojo.png', 138, 100);
        this.game.load.spritesheet('rojo', 'assets/img/sapo/Sapo_Azul.png', 138, 100);

        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/sapo/BT_Siguiente.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAtras', 'assets/btn/sapo/BT_Atras.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAceptar', 'assets/btn/sapo/BT_Aceptar.png', 150, 45, 3);
        this.game.load.spritesheet('Bottones', 'assets/btn/sapo/BT_Jugar_Ayuda.png', 150, 45, 6);
        this.game.load.spritesheet('BottonesSonido', 'assets/btn/sapo/BT_Sonido.png', 50, 50, 4);
        this.game.load.spritesheet('BottonPause', 'assets/btn/sapo/BT_Pause.png', 50, 50, 3);
        this.game.load.image('BotonEfecto2', 'assets/btn/sapo/BT_Efectos2.png');
        this.game.load.image('BotonMusica2', 'assets/btn/sapo/BT_Musica2.png');
        this.game.load.spritesheet('BottonReiniciar', 'assets/btn/sapo/BT_Reiniciar.png', 50, 50, 3);

        //Archivos Premiacion
        this.game.load.audio('MusicaTriunfo', 'assets/audio/sapo/Ganador.mp3');
        this.game.load.audio('MusicaFondo', 'assets/audio/sapo/MusicaFondo.mp3');
        this.game.load.audio('Salto_Sapo', 'assets/audio/sapo/Salto_Sapo.mp3');
    },
    create: function() {
	this.game.state.start('Menu');
    }
};
