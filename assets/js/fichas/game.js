var game = new Phaser.Game(600, 700, Phaser.AUTO, '');
var fichas = [];
var bounds = null;
var vertical1 = null;
var vertical2 = null;
var j = -1;
var lag = [];
game.state.add('game', GameState);
game.state.start('game');

