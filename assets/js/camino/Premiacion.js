Juego.Premiacion = function(game) {
};
Juego.Premiacion.prototype = {
	preload: function(){
		this.game.load.audio('MusicaTriunfo', 'assets/audio/camino/Ganador.mp3');
		this.game.load.image('FondoPremiacion', 'assetsimg/camino/imagenes/Premiacion.png');
        this.game.load.spritesheet('Medallas', 'assets/img/camino/imagenes/Medallas.png', 200, 160, 9);
	},
	create: function() {
		this.game.add.image(0, 0, 'FondoPremiacion');
		this.Medalleria();

		MusicaFondo = this.game.add.audio('MusicaTriunfo');
        MusicaFondo.loopFull(0.6);

		this.buttonContinue = this.add.button(500, 520, 'BottonAceptar', this.retornarInicio, this, 1, 0, 2);
		this.buttonContinue.anchor.setTo(0.5, 0.5);
		document.getElementById("caja1").remove();
	},

    Medalleria: function(){
    	var promedioFallo=bombaLanzada-57;
//---------------------------------MEDALLA 1-----------------------------------------
    	if(bombaLanzada<=10){
    		this.medalla1 = this.game.add.sprite(500, 200, 'Medallas', 0);
        	this.medalla1.anchor.setTo(0.5, 0.5);
    	}
    	else if(bombaLanzada>10 && bombaLanzada<=57){
    		this.medalla1 = this.game.add.sprite(500, 200, 'Medallas', 1);
        	this.medalla1.anchor.setTo(0.5, 0.5);
    	}
    	else{
    		this.medalla1 = this.game.add.sprite(500, 200, 'Medallas', 2);
        	this.medalla1.anchor.setTo(0.5, 0.5);
    	}

//---------------------------------MEDALLA 2-----------------------------------------
    	if(tiempoTotal<=25){
    		this.medalla2 = this.game.add.sprite(700, 300, 'Medallas', 3);
        	this.medalla2.anchor.setTo(0.5, 0.5);
    	}
    	else if(tiempoTotal>25 && tiempoTotal<=40){
    		this.medalla2 = this.game.add.sprite(700, 300, 'Medallas', 4);
        	this.medalla2.anchor.setTo(0.5, 0.5);
    	}
    	else{
    		this.medalla2 = this.game.add.sprite(700, 300, 'Medallas', 5);
        	this.medalla2.anchor.setTo(0.5, 0.5);
    	}
//---------------------------------MEDALLA 3-----------------------------------------
    	if(promedioFallo<=10){
    		this.medalla3 = this.game.add.sprite(300, 300, 'Medallas', 6);
        	this.medalla3.anchor.setTo(0.5, 0.5);
    	}
    	else if(promedioFallo>10 && promedioFallo<=20){
    		this.medalla3 = this.game.add.sprite(300, 300, 'Medallas', 7);
        	this.medalla3.anchor.setTo(0.5, 0.5);
    	}
    	else{
    		this.medalla3 = this.game.add.sprite(300, 300, 'Medallas', 8);
        	this.medalla3.anchor.setTo(0.5, 0.5);
    	}

    },
	retornarInicio: function() {
		this.game.state.start('Inicio');
		MusicaFondo.stop();
	},
};