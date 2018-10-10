var st3 = {
    preload: p3,
    create: c3,
    update: u3
}

function p3() {}

var win;
function c3() {
    sumoMusic.mute = true;
    game.stage.backgroundColor = '#000000'
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    win = game.add.text(game.world.centerX - 100, game.world.centerY - 50, 'VICTORY', style);
}

function u3() {
    
}
