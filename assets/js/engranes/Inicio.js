var Juego = {
    _WIDTH: 1000,
    _HEIGHT: 550
};

Juego.Inicio = function(game) {};
Juego.Inicio.prototype = {


    preload: function() {

        this.game.load.image('Fondo', 'assets/img/engranes/fondo.png');
        this.game.load.image('Ayuda_1', 'assets/img/engranes/Ayuda1.png');
        this.game.load.image('Ayuda_2', 'assets/img/engranes/Ayuda2.png');

        this.game.load.spritesheet('BottonSiguiente', 'assets/btn/engranes/BT_Siguiente.png', 150, 45, 3);
        this.game.load.spritesheet('BottonAtras', 'assets/btn/engranes/BT_Atras.png', 150, 45, 3);

        this.game.load.spritesheet('BottonAceptar', 'assets/btn/engranes/BT_Aceptar.png', 150, 45, 3);
        this.game.load.spritesheet('Bottones', 'assets/btn/engranes/BT_Jugar_Ayuda.png', 150, 45, 6);
        this.game.load.spritesheet('Abecedario', 'assets/img/engranes/Abecedario.png', 159, 151, 45);
    },

    create: function() {

        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.game.scale.pageAlignHorizontally = true;
        //this.game.scale.pageAlignVertically = true;

        this.game.add.image(0, 0, 'Fondo');


        this.buttonJugar = this.game.add.button(350, 400, 'Bottones', this.actionOnClick, this, 1, 0, 2);
        this.buttonJugar.anchor.setTo(0.5, 0.5);
        this.buttonJugar.name = 'Jugar';
        
        this.buttonAyuda = this.game.add.button(650, 400, 'Bottones', this.actionOnClick, this, 4, 3, 5);
        this.buttonAyuda.anchor.setTo(0.5, 0.5);
        this.buttonAyuda.name = 'Ayuda';


        var item;

        //Mensaje corresponde alos posiciones de las letras del Spritee. En este caso "Nivel 1"
        var mensaje = [13,8,21,4,11,37,33];

        for (var i = 0; i < 7; i++)
        {
            item = this.game.add.sprite(300 + 70 * i, -100, 'Abecedario', mensaje[i]);
            item.anchor.setTo(0.5,0.5);
            item.scale.x=0.5;
            item.scale.y=0.5;

            this.game.add.tween(item).to({y: 240}, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * i, true);
            this.game.add.tween(item).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, 1000 + 400 * i, true);
        }

    },

    update: function(){
    },


    actionOnClick: function(button){
        if(button.name=="Jugar"){
            this.game.state.start('Game');
        }
        else{
            this.game.state.start('Ayuda');
        }

    }
};
