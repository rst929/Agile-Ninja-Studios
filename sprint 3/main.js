var game = new Phaser.Game(800,416, Phaser.AUTO);
game.state.add('state0', st0);
game.state.add('state1', st1);
game.state.add('state2', st2);
game.state.add('state3', st3);
game.state.add('state_tutorial', st_tut);
game.state.add('state_level1', st_lev1 );
//game.state.start('state_tutorial',st_tut);
// CHANGE BACK WHEN READY game.state.start('state0')
//game.state.start('state_level1');
game.state.start('state0');