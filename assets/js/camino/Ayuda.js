Juego.Ayuda = function(game) {};
Juego.Ayuda.prototype = {
	create: function() {
		this.Fondo=this.game.add.image(0, 0, 'Ayuda_1');
		this.buttonContinue = this.game.add.button(500, 450, 'BottonSiguiente', this.ActualizarFondo, this, 1, 0, 2);
		this.buttonContinue.name="Continue";
		this.buttonContinue.anchor.setTo(0.5, 0.5);
	},
	retornarInicio: function() {
		this.game.state.start('Inicio');
	},
	ActualizarFondo: function(buttonName){
		if(buttonName.name=="Continue"){
			this.Fondo.loadTexture("Ayuda_2");
			this.buttonContinue.visible=false;
			this.buttonAceptar = this.game.add.button(100, 450, 'BottonAceptar', this.retornarInicio, this, 1, 0, 2);
			this.buttonAceptar.anchor.setTo(0.5, 0.5);
			this.buttonAtras = this.game.add.button(300, 450, 'BottonAtras', this.ActualizarFondo, this, 1, 0, 2);
			this.buttonAtras.anchor.setTo(0.5, 0.5);
		}else{
			this.Fondo.loadTexture("Ayuda_1");
			this.buttonAceptar.visible=false;
			this.buttonAtras.visible=false;
			this.buttonContinue.visible=true;
		}

		
	}
};