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
var startover;
var restart;
function c2() {
    restart = game.input.keyboard.addKey(Phaser.Keyboard.R);
    sumoMusic.mute = true;
    deathMusic = game.add.audio('deathMusic');
    deathMusic.play();
    game.stage.backgroundColor = '#000000'
    var style = { font: "bold 40px Algerian", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    gameOver = game.add.text(250, 150, 'GAME OVER', style);
    startover = game.add.text(250, 250, 'Press R to Start Over', style);
    console.log("WORKING2");
}

function u2() {
    if(restart.isDown){
        //game.cache = new Phaser.Cache(game);
        //game.load.reset();
        //game.load.removeAll();4
        pHealth=100;
        tutorial_done=true;
        hitSpikes=false;
        bHealth=100;
        deathMusic.mute=true;
        location.reload();
        game.state.start("state_tutorial");
    }
}
