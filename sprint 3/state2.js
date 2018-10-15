var st2 = {
    preload: p2,
    create: c2,
    update: u2
}

function p2() {
    game.load.audio('deathMusic', ['assets/audio/death music.ogg', 'assets/audio/death music.wav']);
}

var deathMusic;
var gameOver;
function c2() {
    sumoMusic.mute = true;
    deathMusic = game.add.audio('deathMusic');
    deathMusic.play();
    game.stage.backgroundColor = '#000000'
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    gameOver = game.add.text(game.world.centerX - 100, game.world.centerY - 50, 'GAME OVER', style);
    console.log("WORKING2");
}

function u2() {
    
}
