var st_lev1 = {
    preload: p1,
    create: c1,
    update: u1
}

function p1() {
    game.load.audio('sumoMusic', ['assets/audio/boss fight music.ogg', 'assets/audio/boss fight music.mp3']);
    game.load.image('castle', 'assets/castle_background_v2.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('sam', 'assets/player3.png', 172, 135);
    game.load.image('stone', 'assets/stone.png')
    game.load.image('platform_img', 'assets/platform.png')
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
    game.load.spritesheet('sumo', 'assets/sumo.png', 110, 110);
    game.load.image('wave', 'assets/Wave smash.png')
    game.load.image('stone_flat', 'assets/stone_flat2.png')
    game.load.image('closed_door', 'assets/closed_door.png');
    
    game.load.tilemap('castle_map','assets/tilemap/castle.json',null, Phaser.Tilemap.TILED_JSON);
    game.load.image('stone_tile', 'assets/tilemap/stone_tile2.png');
    game.load.image('castle_tile', 'assets/tilemap/castle_background_v2.png');
}

var image; //background
var attackButton; // F to attack
var playerHealth; //keeps track of total player health
var bossHealth; //keeps track of total boss health
var sumoMusic; //boss music
var instructions; //game instructions'


function c1() {
    
    
    //  Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    image = game.add.sprite(0, 0, 'castle'); // first visible bkgd
    image.width = game.width;
    image.height = game.height + 100;
    game.physics.enable(image, Phaser.Physics.ARCADE); 
    
    //creating map
    var map = game.add.tilemap('castle_map');
    map.addTilesetImage('stone_tile');
    map.addTilesetImage('castle_tile');
    
    //creating layers
    var background = map.createLayer('Background');
    var stone_platforms = map.createLayer('Platforms');
    
    
    
    // create platform for ground
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 25, 'ground');
    ground.scale.setTo(2, 2); //make ground right size
    
    //  Make ground stable
    ground.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(250, game.world.height - 250, 'sam');
    player.scale.setTo(.6,.6)
    
    
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    
    //  Player physics properties
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
    player.body.setSize(15, 40, 0, 100);
    
    //  animations
    player.animations.add('left', [0, 1], 10, true);
    player.animations.add('right', [0, 1], 10, true);
    player.animations.add('attack', [2, 3, 4], 10, true);
    
    cursors = game.input.keyboard.createCursorKeys();
    attackButton = game.input.keyboard.addKey(Phaser.Keyboard.F);
    attackButton.onDown.add(swordAttack)
    playerHealth = game.add.text(16, 16, 'Your Health: 100', { fontSize: '32px', fill: '#fff' });

    
    sumoMusic = game.add.audio('sumoMusic');
    sumoMusic.play();
    
    instructions = game.add.text(17,55, 'use arrow keys to move, up key to jump, f key to attack', {fontSize: '25px', fill:'#fff'});
    
}

var pHealth = 100; //player health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')


function u1() {
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms); //collide with platform (i.e. ground) check
    
    //movement tree for player
    if (cursors.left.isDown) {
        movePLeft();
    } else if (cursors.right.isDown) {
        movePRight();
    } else if(attackButton.isDown) {
        player.animations.play('attack');
    }
    /*else if(attackButton.isDown) {
        player.animations.play('attack');
        if(swordHit && sumoVulnerable) { //hitbox check for sumo boss to take away health
            bHealth -= 5;
            sumoVulnerable = false; 
        } */
    else {
        //  Stand still
        player.animations.stop();
        player.frame = 0;
        player.body.velocity.x = 0;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -700;
    }
    playerHealth.text = "Sam HP: " + pHealth;
    
    
    //start on initial bar scene INSERT THIS CODE FOR LOGIC ON CHANGING FROM CUTSCENE, DOOR

    var tutorial_done = false

    //change once tutorial is completed
    if(tutorial_done){
        game.state.start('state0')
    }
    
}

//note: some functions are small, but are as functions with the idea that more will be added to them later

function swordAttack() {
    player.animations.play('attack');
}

function movePLeft() {
    //  Move to the left
    player.body.velocity.x = -300;
    player.animations.play('left');
}

function movePRight() {
    player.body.velocity.x = 300;
    player.animations.play('right');
}


function makePlayerVulnerable() {
    playerVulnerable = true;
}