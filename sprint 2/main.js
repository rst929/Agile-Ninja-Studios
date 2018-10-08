var game = new Phaser.Game(800,600, Phaser.AUTO);
game.state.add('state0', st0);
game.state.add('state1', st1);
game.state.add('state2', st2);
game.state.add('state3', st3);
game.state.add('state4', st4);
game.state.add('state_tutorial', st_tut);
//game.state.start('state_tutorial')
// CHANGE BACK WHEN READY game.state.start('state0')
game.state.start('state0');
