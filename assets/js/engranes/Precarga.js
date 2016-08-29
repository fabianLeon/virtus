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
        
        
        this.game.load.image('Fondo', 'assets/img/engranes/Fondo.png');
        this.game.load.spritesheet('Abecedario', 'assets/img/engranes/Abecedario.png', 159, 151, 45);
        this.game.load.image('Ayuda', 'assets/img/engranes/Ayuda.png');
        this.game.load.image('Fondo_Blanco', 'assets/img/engranes/Fondo_Blanco.png');
        this.game.load.image('Fondo_Blanco2', 'assets/img/engranes/Fondo_Blanco2.png');
        this.game.load.spritesheet('kaboom', 'assets/img/engranes/explode.png', 128, 128);
        this.game.load.image('FondoPremiacion', 'assets/img/engranes/Premiacion.png');
        this.game.load.spritesheet('Medallas', 'assets/img/engranes/Medallas.png', 200, 160, 9);
        this.game.load.image('Caja', 'assets/img/engranes/Engranes/Caja.png');
        this.game.load.image('Tuerca', 'assets/img/engranes/Engranes/Tuerca.png');
        for (i = 1; i < 9; i++) {
            this.game.load.image('Engrane' + i, 'assets/img/engranes/Engranes/Engrane' + i + '.png');
        }
        for (i = 1; i < 5; i++) {
            this.game.load.image('Banda' + i, 'assets/img/engranes/Engranes/Banda' + i + '.png');
        }


        this.game.load.spritesheet('Bottones', 'assets/btn/engranes/BT_Jugar_Ayuda.png', 150, 45, 6);
        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/engranes/BT_Siguiente.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAtras', 'assets/btn/engranes/BT_Atras.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAceptar', 'assets/btn/engranes/BT_Aceptar.png', 150, 45, 3);
        this.game.load.spritesheet('Numero1', 'assets/btn/engranes/BT_Numero1.png', 50, 50, 3);
        this.game.load.spritesheet('Numero2', 'assets/btn/engranes/BT_Numero2.png', 50, 50, 3);
        this.game.load.spritesheet('Ninguno', 'assets/btn/engranes/BT_Ninguno.png', 50, 50, 3);
        this.game.load.spritesheet('BottonesSonido', 'assets/btn/engranes/BT_Sonido.png', 50, 50, 4);
        this.game.load.spritesheet('BottonPause', 'assets/btn/engranes/BT_Pause.png', 50, 50, 3);
        this.game.load.image('BotonEfecto2', 'assets/btn/engranes/BT_Efectos2.png');
        this.game.load.image('BotonMusica2', 'assets/btn/engranes/BT_Musica2.png');
        this.game.load.spritesheet('BottonReiniciar', 'assets/btn/engranes/BT_Reiniciar.png', 50, 50, 3);

        this.game.load.audio('MusicaFondo', 'assets/audio/engranes/MusicaFondo.mp3');
        this.game.load.audio('MusicaTriunfo', 'assets/audio/engranes/Ganador.mp3');
    },
    create: function() {
	this.game.state.start('Menu');
    }
};
