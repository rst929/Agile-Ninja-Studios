var st1 = {
    preload: p1,
    create: c1,
    update: u1
}

function p1() {
    game.load.audio('deathMusic', ['assets/audio/death music.ogg', 'assets/audio/death music.wav']);
}

var deathMusic;
var gameOver;
function c1() {
    sumoMusic.mute = true;
    deathMusic = game.add.audio('deathMusic');
    deathMusic.play();
    game.stage.backgroundColor = '#000000'
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    gameOver = game.add.text(game.world.centerX - 100, game.world.centerY - 50, 'GAME OVER', style);
}

function u1() {
    
}
