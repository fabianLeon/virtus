Juego.Game = function(game) {
};
Juego.Game.prototype = {
    
   preload: function() {
        this.game.load.spritesheet("background", "assets/img/camino/fichas.jpg", 100, 100);
        this.game.load.image('Solucion', 'assets/img/camino/solucion.jpg');
        this.game.load.image('Marco', 'assets/img/camino/marco.png'); 
        this.game.load.image('Fondo', 'assets/img/camino/imagenes/Fondo2.jpg');
    },

    create: function(){
        
        this.PIECE_WIDTH = 100;
        this.PIECE_HEIGHT = 100;
        this.BOARD_COLS=5;
        this.BOARD_ROWS=4;

        this.GrupoFichas;
        this.totalPiezas;
        this.matrizJuego = this.CrearMatrizDesordenada();;

        this.fichaCorrecta=0;
        this.valorCasilla=0;


        
        this.game.add.image(0, 0, 'Fondo'); 

        this.solucion=this.game.add.image(750, 50, 'Solucion');
        this.solucion.anchor.setTo(0);
        this.solucion.scale.x=0.4;
        this.solucion.scale.y=0.4;

        this.marcoSolucion=this.game.add.graphics();
        this.marcoSolucion.lineStyle(3, 0x0404B4, 1);
        this.marcoSolucion.drawRect(750, 50, 200, 160);

        this.marcoJuego=this.game.add.image(10, 36, 'Marco');  

        this.prepararTablero();

    },

    update: function() {     
    },

    prepararTablero: function() {
        
        var piecesIndex = 0, i, j, piece;

        this.GrupoFichas = this.game.add.group();

        for (i = 0; i < this.BOARD_ROWS; i++)
        {
            for (j = 0; j < this.BOARD_COLS; j++)
            { 
                if (this.matrizJuego[piecesIndex]!=10) {
                    this.valorCasilla=this.matrizJuego[piecesIndex];
                    piece = this.GrupoFichas.create(j * this.PIECE_WIDTH+25, i * this.PIECE_HEIGHT+50, "background", this.EvaluadorCasilla(this.valorCasilla));
                    piece.black = false;
                }
                //Pieza de color Negro
                else {
                    piece = this.GrupoFichas.create(j * this.PIECE_WIDTH+25, i * this.PIECE_HEIGHT+50);
                    piece.black = true;
                }
                piece.name = 'piece' + i.toString() + 'x' + j.toString();
                piece.posicionActual = piecesIndex;
                piece.posicionCorrecta = this.matrizJuego[piecesIndex];
                piece.inputEnabled = true;   

                             
                piece.events.onInputDown.add(this.selectPiece, this);
                piece.posX = j;
                piece.posY = i;
                piecesIndex++;
            }
        }
    },

    selectPiece: function(piece) {
        var blackPiece = this.canMove(piece);

        //if there is a black piece in neighborhood
        if (blackPiece) {
            this.movePiece(piece, blackPiece);
        }

    },

    canMove: function(piece) {

        var foundBlackElem = false;
        //piece es la pieza que se quiere mover y element es cada elemento que se evalua del cuadro de fichas
        this.GrupoFichas.children.forEach(function(element) {
            if (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
                element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
                element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
                element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black) {
                
                foundBlackElem = element;
                return;
            }
        });
        return foundBlackElem;
    },

    movePiece: function(piece, blackPiece) {

        var tmpPiece = {
            posX: piece.posX,
            posY: piece.posY,
            posicionActual: piece.posicionActual
        };

        this.game.add.tween(piece).to({x: blackPiece.posX * this.PIECE_WIDTH+25, y: blackPiece.posY * this.PIECE_HEIGHT+50}, 300, Phaser.Easing.Linear.None, true);
        
        //change places of piece and blackPiece
        piece.posX = blackPiece.posX;
        piece.posY = blackPiece.posY;
        piece.posicionActual = blackPiece.posicionActual;
        piece.name ='piece' + piece.posX.toString() + 'x' + piece.posY.toString();

        //piece is the new black
        blackPiece.posX = tmpPiece.posX;
        blackPiece.posY = tmpPiece.posY;
        blackPiece.posicionActual = tmpPiece.posicionActual;
        blackPiece.name ='piece' + blackPiece.posX.toString() + 'x' + blackPiece.posY.toString();

        //after every move check if puzzle is completed
        this.checkIfFinished();
    },

    checkIfFinished: function() {

        var isFinished = true;
        var posicionArray = new Array();
        var valorFichaArray = new Array();

        this.GrupoFichas.children.forEach(function(element) {
            posicionArray.push(element.posicionActual);
            valorFichaArray.push(element.posicionCorrecta); 
        });


        for(i=0; i<matrizSolucion.length; i++){
            this.EvaluarPosicionCorrecta(valorFichaArray[i], posicionArray[i]);
        }
        console.log(this.fichaCorrecta)
        if(this.fichaCorrecta!=15){
           this.fichaCorrecta=0;
           isFinished = false;
           return;
        }

        if (isFinished) {
            this.showFinishedText();
        }

    },

    showFinishedText: function() {

        var style = { font: "40px Arial", fill: "#000", align: "center"};

        var text = game.add.text(game.world.centerX, game.world.centerY, "Congratulations! \nYou made it!", style);

        text.anchor.set(0.5);

    },

    CrearMatrizDesordenada: function() {
        
        var counter = matrizSolucion.length, temp, index;
        var axuliarArray = new Array();

        for ( i = 0; i<matrizSolucion.length; i++ ) {
            axuliarArray.push(matrizSolucion[i]);
        }

        while (counter > 0)
        {
            index = Math.floor(Math.random() * counter);
            counter--;

            temp = axuliarArray[counter];
            axuliarArray[counter] = axuliarArray[index];
            axuliarArray[index] = temp;
        }

        return axuliarArray;
    },

    //Metodo que retorna el valor de la seccion que le corresponde a la imagen
    EvaluadorCasilla: function(figura) {
        var posicionImagen;
        switch (figura){   
            case 1:
                posicionImagen = 9;
                break;
            case 2:
                posicionImagen = 1;
                break;
            case 3:
                posicionImagen = 5;
                break;
            case 4:
                posicionImagen = 0;
                break;
            case 5:
                posicionImagen = 2;
                break;
            case 6:
                posicionImagen = 15;
                break;
            case 7:
                posicionImagen = 7;
                break;
            case 8:
                posicionImagen = 11;
                break;
            case 2.1:
                posicionImagen = 22;
                break;
            case 3.1:
                posicionImagen = 21;
                break;
            case 4.1:
                posicionImagen = 20;
                break;
            default: 
                posicionImagen = 3;          
        }
        return posicionImagen;
    },

    EvaluarPosicionCorrecta: function(figuraI, posicion) {
        var figura=Math.floor(figuraI);
        
        if(figura==1 && (posicion==9)){
            this.fichaCorrecta++;
        }
        if(figura==2 && (posicion==1 || posicion==16 || posicion==17 || posicion==18)){
            this.fichaCorrecta++;
        }
        if(figura==3 && (posicion==5|| posicion==10 || posicion==14)){
            this.fichaCorrecta++;
        }
        if(figura==4 && (posicion==0 || posicion==6)){
            this.fichaCorrecta++;
        }
        if(figura==5 && (posicion==2)){
            this.fichaCorrecta++;
        }
        if(figura==6 && (posicion==15)){
            this.fichaCorrecta++;
        }
        if(figura==7 && (posicion==7 || posicion==19)){
            this.fichaCorrecta++;
        }
        if(figura==8 && (posicion==11)){
            this.fichaCorrecta++;
        }

    }
};
