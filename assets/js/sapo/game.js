var game = new Phaser.Game(1240, 600, Phaser.AUTO, '');
var saposGame = [];
var sapos = null;
var plataformas = null;
var VAzul = new Phaser.Point(-43,-90); //velocidad sapo azul
var VRojo = new Phaser.Point(45,-90); // velocidad sapo rojo
//var plataformas = [];
game.state.add('game',GameState);
game.state.start('game');

