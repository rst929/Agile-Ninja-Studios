var st2 = {
    preload: p1,
    create: c1,
    update: u1
}

function p1() {}

var win;
function c1() {
    sumoMusic.mute = true;
    game.stage.backgroundColor = '#000000'
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    win = game.add.text(game.world.centerX - 100, game.world.centerY - 50, 'VICTORY', style);
}

function u1() {
    
}
