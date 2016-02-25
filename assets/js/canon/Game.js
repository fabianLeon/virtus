Juego.Game = function(game) {};
Juego.Game.prototype = {

	preload: function(){
        this.game.load.image('Fondo', 'assets/img/canon/fondo.png');
        this.game.load.image('Piso', 'assets/img/canon/piso.png');
        this.game.load.image('Globo', 'assets/img/canon/bomba.png');
        this.game.load.image('Puas', 'assets/img/canon/Caneca/Puas.png'); 
        this.game.load.image('Llanta', 'assets/img/canon/Caneca/llanta.png');
        this.game.load.image('Error', 'assets/img/canon/error.png');
        this.game.load.image('VistoBueno', 'assets/img/canon/VistoBueno.png');
  

        this.game.load.image('FondoCaneca', 'assets/img/canon/Caneca/fondoCaneca.png');
        this.game.load.image('BaseCaneca', 'assets/img/canon/Caneca/BaseCaneca.png');
        for (i = 0; i < 58; i++) {
            this.game.load.image('caneca1.'+i, 'assets/img/canon/Caneca/Imagen1.'+i+'.png');
        }


        this.game.load.spritesheet('kaboom', 'assets/img/canon/explode.png', 128, 128);
        this.game.load.spritesheet('Canon', 'assets/img/canon/cañon.png', 103, 81);
        this.game.load.spritesheet('Tiro_al_Blanco', 'assets/img/canon/tiro_blanco.png', 35, 35);
        
        this.game.load.spritesheet('BottonesSonido', 'assets/btn/canon/BT_Sonido.png', 50, 50, 4);
        this.game.load.spritesheet('BottonPause', 'assets/btn/canon/BT_Pause.png', 50, 50, 3);
        this.game.load.image('BotonEfecto2', 'assets/btn/canon/BT_Efectos2.png');
        this.game.load.image('BotonMusica2', 'assets/btn/canon/BT_Musica2.png');

        this.game.load.audio('MusicaFondo', 'assets/audio/canon/MusicaFondo.mp3');
        this.game.load.audio('Bomba_Adentro', 'assets/audio/canon/Bomba_Adentro.mp3');
        this.game.load.audio('Bomba_Afuera', 'assets/audio/canon/Bomba_Afuera.mp3');
	},

    create: function(){

        this.gravedad = 200;
        this.TasaDisparo = 100;
        this.bombaSiguiente = 0;
        this.acertadas=0;
        this.llantaRotacion = true;
        this.llantaContador = 0;
        this.timer = 0;
        this.tiempoEliminar=0;


        this.Piso  = new Img_Movimiento(0, 470, 'Piso', 0, 0);
        this.game.add.image(0, 0, 'Fondo');

        //Sonidos del videoJuego se agregan
        MusicaFondo = this.game.add.audio('MusicaFondo');
        MusicaFondo.loopFull(0.6);
        this.SonidoExpAdentro = this.game.add.audio('Bomba_Adentro');
        this.SonidoExpAfuera = this.game.add.audio('Bomba_Afuera');

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y=this.gravedad;

        
        this.buttonEfecto= this.game.add.button(840, 50, 'BottonesSonido', this.Musica_Efecto, this, 1,0,0);
        this.buttonEfecto.anchor.setTo(0.5, 0.5);
        this.buttonEfecto.name = 'Efectos_Sonido';


        this.buttonMusica = this.game.add.button(900, 50, 'BottonesSonido', this.Musica_Efecto, this, 3,2,2);
        this.buttonMusica.anchor.setTo(0.5, 0.5);
        this.buttonMusica.name = 'Musica';

        this.buttonPause = this.game.add.button(960, 50, 'BottonPause', this.managePause, this, 1,0,2);
        this.buttonPause.anchor.setTo(0.5, 0.5);
        this.buttonPause.name = 'Pause';

        this.buttonContinue = this.add.button(70, 100, 'BottonAceptar', this.Verificar_Resultado, this, 1, 0, 2);
        this.buttonContinue.anchor.setTo(0.5, 0.5);
        this.buttonContinue.scale.x=0.7;
        this.buttonContinue.scale.y=0.7;
        this.buttonContinue.name = 'Continue';

        // se crea el cañon
        this.canon = this.game.add.sprite(80, 400, 'Canon', 0);
        this.canon.anchor.setTo(0.35, 0.54);
        this.canon.bringToTop();


        // se crea la base del cañon
        this.BaseCanon = this.game.add.sprite(70, 420, 'Canon', 1);
        this.BaseCanon.anchor.setTo(0.35, 0.54);
        this.BaseCanon.bringToTop();
        

        // Se crea grupo maximo de disparos-5
        this.balaGroup = this.game.add.group();
        this.balaGroup.enableBody = true;
        this.balaGroup.physicsBodyType = Phaser.Physics.ARCADE;
        this.balaGroup.createMultiple(10, 'Globo', 0, false);
        this.balaGroup.setAll('anchor.x', 0.5);
        this.balaGroup.setAll('anchor.y', 0.5);
        this.balaGroup.setAll('outOfBoundsKill', true);
        this.balaGroup.setAll('checkWorldBounds', true);


        //Se crea explosion de bomba de agua
        this.explosions = this.game.add.group();
        this.explosions.createMultiple(10, 'kaboom');
        this.explosions.forEach(this.setupBombaAgua, this);
        
        //Se crea la caneca y su base giratoria
        this.LlantaTrasera1      = new Img_Movimiento(805, 432, 'Llanta',      1, 556);
        this.LlantaTrasera2      = new Img_Movimiento(915, 432, 'Llanta',      2, 672);
        this.BaseMadera          = new Img_Movimiento(846, 450, 'BaseCaneca',  3, 596);
        this.FondoCaneca         = new Img_Movimiento(850, 380, 'FondoCaneca', 4, 600);
        this.PuasCaneca          = new Img_Movimiento(850, 318, 'Puas',        5, 600);
        this.Caneca              = new Img_Movimiento(850, 380, 'caneca1.0',   6, 600);
        this.LlantaDelantera1    = new Img_Movimiento(775, 470, 'Llanta',      7, 529);
        this.LlantaDelantera2    = new Img_Movimiento(885, 470, 'Llanta',      8, 636);
        

        //Se crea Blanco-----------------------------------------------------------------------------------------------
        this.blanco = this.game.add.sprite(500, 500, 'Tiro_al_Blanco', 0); 
        this.blanco.anchor.setTo(0.5, 0.5);
        this.blancoDisparado = this.game.add.sprite(1035, 635, 'Tiro_al_Blanco', 1); 
        this.blancoDisparado.anchor.setTo(0.5, 0.5);

        //Texto Tiempo-------------------------------------------------------------------------------------------------
        this.timerText = this.game.add.text(15, 15, "Tiempo: "+this.timer, this.fontBig);
        this.bombasText = this.game.add.text(400, 520, "Bombas Acertadas: "+this.acertadas, this.fontBig);

        this.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
        this.time.events.loop(Phaser.Timer.SECOND, this.eliminarImagen, this);
        
        //Se crea la caja de texto del HTML5
        caja = document.createElement("input");
        caja.setAttribute("type", "text");
        caja.setAttribute("id", "caja1");
        caja.setAttribute("value", "Cantidad de Bombas");
        caja.setAttribute("size", "17");
        caja.setAttribute("style", "background-color: #F7F2E0; color: #000000; font-size:1em; font-family:Arial, sans-serif; position: absolute; top: 60px; left: 20px;");
        document.getElementById("contenedor").appendChild(caja);

    }, 

    update: function(){

        //Limite donde el puntero podra estar y dibujar el tiro al blanco
        this.X_Maximo = this.game.input.activePointer.worldX;
        this.Y_Maximo = this.game.input.activePointer.worldY;

        this.MoverLlantas();
        this.canon.rotation = this.game.physics.arcade.angleToPointer(this.canon);

        //Si la musica fue o no desactivada que relice la gestion necesaria
        if(B_musica==false){
            MusicaFondo.pause();
        }
        else {
            MusicaFondo.resume();
        }

        //Se desactiva el puntero de tiro al blanco si se requiere
        if(this.Desactivar_Tiro(this.X_Maximo,this.Y_Maximo)==false){
            this.blanco.visible=true;
            this.blanco.x=this.game.input.activePointer.worldX;
            this.blanco.y=this.game.input.activePointer.worldY;
        
            if (this.game.input.activePointer.isDown)
            {
                this.fire();
                this.blancoDisparado.x=this.game.input.activePointer.worldX;
                this.blancoDisparado.y=this.game.input.activePointer.worldY;
            }
        }
        else{
            this.blanco.visible=false;
        }

        //colisiones entre objetos y las bombas de agua
        this.game.physics.arcade.collide(this.balaGroup, this.PuasCaneca,        this.collision, null, this);
        this.game.physics.arcade.collide(this.balaGroup, this.BaseMadera,        this.collision, null, this);
        this.game.physics.arcade.collide(this.balaGroup, this.Caneca,            this.collision, null, this);
        this.game.physics.arcade.collide(this.balaGroup, this.LlantaDelantera1,  this.collision, null, this);
        this.game.physics.arcade.collide(this.balaGroup, this.LlantaTrasera1,    this.collision, null, this);
        this.game.physics.arcade.collide(this.balaGroup, this.Piso,              this.collisionPiso, null, this);

        if(this.acertadas<58){
            this.bombasText.setText("Bombas Acertadas: "+this.acertadas);
        }
    },

    updateTimer: function() {
        this.timer++;
        this.timerText.setText("Tiempo: "+this.timer);        
    },

    MoverLlantas: function(){

        this.llantaContador += 1;

        if( this.llantaRotacion == false) {
            this.LlantaDelantera1.angle += 10;
            this.LlantaDelantera2.angle += 10;
            this.LlantaTrasera1.angle += 10;
            this.LlantaTrasera2.angle += 10;
            if( this.llantaContador == 120 ){
                this.llantaContador = 0;
                this.llantaRotacion = true;
            }
        }
        else if ( this.llantaRotacion == true){
            this.LlantaDelantera1.angle -= 10;
            this.LlantaDelantera2.angle -= 10;
            this.LlantaTrasera1.angle -= 10;
            this.LlantaTrasera2.angle -= 10;
            if( this.llantaContador == 120 ){
                this.llantaContador = 0;
                this.llantaRotacion = false;
            }
        }
    },

    

    setupBombaAgua: function(bombaAgua) {

        bombaAgua.anchor.x = 0.5;
        bombaAgua.anchor.y = 0.5;
        bombaAgua.animations.add('kaboom');

    },

    collision: function(ObjetoDeColision, bala) {

        bala.kill();
        bombaLanzada++;

        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(bala.body.x, bala.body.y);
        explosion.play('kaboom', 30, false, true);

        
        if (ObjetoDeColision.i==5){
            
            this.acertadas=this.acertadas+1;       
            if(this.acertadas<58){
                this.Caneca.loadTexture('caneca1.'+this.acertadas, 0, false);
            }
            if(B_efecto) {
                this.SonidoExpAdentro.play();
            }           
        }
        else {
            if(B_efecto) {
                this.SonidoExpAfuera.play();
            }
        }
    },

    collisionPiso: function(ObjetoDeColision, bala) {

        bala.kill();
        bombaLanzada++;

        var explosion = this.explosions.getFirstExists(false);
        explosion.reset(bala.body.x, bala.body.y);
        explosion.play('kaboom', 30, false, true);

        if(B_efecto) {
                this.SonidoExpAfuera.play();
        }
    },


    fire: function () {

        if (this.game.time.now > this.bombaSiguiente && this.balaGroup.countDead() > 0)
        {   
            this.bombaSiguiente = this.game.time.now + this.TasaDisparo;

            var bala = this.balaGroup.getFirstExists(false);
            this.game.physics.arcade.enable(bala);
            bala.reset(this.canon.x, this.canon.y);        
            bala.rotation = this.game.physics.arcade.moveToPointer(bala, 60, this.game.input.activePointer, 1000);
        }
    }, 

    Musica_Efecto: function(button){
        if(button.name=="Musica"){
            if( B_musica==true){
                button.loadTexture('BotonMusica2');
            }
            else{
                button.loadTexture('BottonesSonido', 0);
            }
            B_musica=!B_musica;            
        }
        else if(button.name=="Efectos_Sonido"){
            if( B_efecto==true){
                button.loadTexture('BotonEfecto2');
            }
            else{
                button.loadTexture('BottonesSonido', 1);
            }
            B_efecto=!B_efecto;
        }
    },
    Verificar_Resultado: function(){
        var resultado=document.getElementById("caja1").value;

        if(resultado==57){
            this.imagen_resultado=this.game.add.image(500, 225, 'VistoBueno');
            this.imagen_resultado.anchor.setTo(0.5,0.5);
            tiempoTotal=this.timer;
            MusicaFondo.stop();
            this.game.state.start('Premiacion');
        }
        else{
            this.imagen_resultado=this.game.add.image(500, 225, 'Error');
            this.imagen_resultado.anchor.setTo(0.5,0.5);
            this.imagen_resultado.scale.x=0.7;
            this.imagen_resultado.scale.y=0.7;
        }
    },

    eliminarImagen: function() {

        this.tiempoEliminar++;
        if(this.tiempoEliminar==2){
            if(this.imagen_resultado!=null){
               this.imagen_resultado.kill(); 
            }
            this.tiempoEliminar=0;
        }
    },

    //Funcion que desactiva disparo y marcado de blanco si se encuentra sobre comandos de sonido y pausa
    Desactivar_Tiro: function(x, y){
        if(((x>=800 && x<=1000) && (y>=0 && y<=80)) || ((x>=0 && x<=180) && (y>=0 && y<=120))){
            return true;
        }
        else{
            return false;
        }
    },


    managePause: function() {
        this.game.paused = true;
        var pausedText = this.add.text(500, 253, "PAUSED", this.fontMessage);
        pausedText.anchor.set(0.5,0.5);

        this.input.onDown.add(function(){
            pausedText.destroy();
            this.game.paused = false;
        }, this);
    }
};
