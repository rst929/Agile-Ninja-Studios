var st_lev0 = {
    preload: p_0,
    create: c_0,
    update: u_0,
    render: r_0
}

//  The Google WebFont Loader will look for this object, so create it before loading the script.


function p_0() {
    game.load.audio('sumoMusic', ['assets/audio/boss fight music.ogg', 'assets/audio/boss fight music.mp3']);
    game.load.image('castle', 'assets/castle_background_v2.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('sam', 'assets/player_fix.png', 1100, 1100); //fixed version, need scale down
    game.load.image('stone', 'assets/stone.png')
    game.load.image('platform_img', 'assets/platform.png')
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
    game.load.spritesheet('sumo', 'assets/sumo.png', 110, 110);
    game.load.image('wave', 'assets/Wave smash.png')
    game.load.image('stone_flat', 'assets/stone_flat2.png')
    game.load.image('open_door', 'assets/open_door.png');
    game.load.image('closed_door', 'assets/closed_door.png');
    
    game.load.tilemap('castle_map','assets/tilemap/castle2.json',null, Phaser.Tilemap.TILED_JSON);
    game.load.image('stone_tile', 'assets/tilemap/stone_tile2.png');
    game.load.image('castle_tile', 'assets/tilemap/castle_background_v2.png');
    game.load.image('spikes_tile', 'assets/tilemap/spikes3.png')
    
    
	game.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

}

var image; //background
var attackButton; // F to attack
var playerHealth; //keeps track of total player health
var bossHealth; //keeps track of total boss health
//var sumoMusic; //boss music
var instructions; //game instructions'


function c_0() {
    //  Physics
    game.world.setBounds(0, 0, 800, 416);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    image = game.add.sprite(0, 0,'castle'); // first visible bkgd
    image.width = game.width;
    image.height = game.height + 100;
    game.physics.enable(image, Phaser.Physics.ARCADE); 
    
    //creating map
    map = game.add.tilemap('castle_map');
    map.addTilesetImage('stone_tile2','stone_tile')
    map.addTilesetImage('castle_background','castle_tile');
    map.addTilesetImage('spikes3','spikes_tile');
    
    
    //layers
    background = map.createLayer('Background');
    stone_platforms = map.createLayer('Platforms');
    spikes_layer = map.createLayer('Spikes');
    
    
    map.setCollisionBetween(1, 300, true, 'Platforms'); //basically tells what possible positions in the json file to check for
    map.setCollisionBetween(236,255,true, 'Spikes')
    
    map.width=game.width;
    map.height=game.height+100;
    background.resizeWorld();
    stone_platforms.resizeWorld();
    spikes_layer.resizeWorld();
    
    //add door
    door = game.add.sprite(2229, game.world.height-437, 'closed_door');
    door.scale.setTo(.23, .23);
    game.physics.enable(door, Phaser.Physics.ARCADE);
    door.body.immobile = true;
    
    
    // create platform for ground
    platforms = game.add.group();
    platforms.enableBody = true;
    
    spikes = game.add.group();
    spikes.enableBody = true;
    //LOOK HER
    //HERR
    // RIGHT HERE
    //stone
    
    // The player and its settings
    player = game.add.sprite(100, game.world.height - 120, 'sam');
    player.scale.setTo(.09,.09);
    
    //create hitbox for sword
    hitbox = game.add.group();
    hitbox.enableBody = true;
    player.addChild(hitbox);
    swordHitbox = hitbox.create(0, 0, null); // creating the hitbox itself
    swordHitbox.body.setSize(40, 60, 55, 20); //hitbox parameters for sword (adjust these to work with sam's sprite)
    game.physics.arcade.enable(swordHitbox); //so can be used for overlap
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    //game.physics.arcade.enable(door);
    game.physics.arcade.enable(swordHitbox);
    
    //  Player physics properties
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
    player.body.setSize(200,500, 350, 450);
    
    //animations
    player.animations.add('left', [5, 6], 10, true);
    player.animations.add('attackL', [7, 8, 9], 10, true);
    player.animations.add('right', [0, 1], 10, true);
    player.animations.add('attackR', [2, 3, 4], 10, true);
    
    cursors = game.input.keyboard.createCursorKeys();
    attackButton = game.input.keyboard.addKey(Phaser.Keyboard.F);
    attackButton.onDown.add(swordAttack)

    
    //sumoMusic = game.add.audio('sumoMusic');
    //sumoMusic.play();
    

    game.camera.follow(player);

}

var pHealth = 100; //player health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')
var dHealth = 5; //player health
var movingRight=true;
var hitPlatform = false; //if sam has hit platform
this.jumpingAllowed = true;
var hitSpikes = false;

function u_0() {
    
    game.physics.arcade.collide(player, stone_platforms, function(){hitPlatform = true}); //collide with platform (i.e. ground) check
    game.physics.arcade.collide(player, spikes_layer, function(){
        hitSpikes = true; 
        console.log('Hitting spikes'), 
        pHealth = pHealth - 50;
    }); //collide with platform (i.e. ground) check
    game.physics.arcade.TILE_BIAS = 40;
    game.physics.arcade.collide(player, stone_platforms);
    game.physics.arcade.collide(player, spikes_layer);

    
    //  Collide the player and the stars with the platforms
    //var hitPlatform = game.physics.arcade.collide(player, platforms); //collide with platform (i.e. ground) check
    var hitPlatform2 = game.physics.arcade.collide(door, platforms); //collide with platform (i.e. ground) check
    var swordHit = game.physics.arcade.overlap(door, hitbox); // Overlap with sword and player 2
    var runIntoDoor = game.physics.arcade.overlap(player, door); // Overlap with player and door
    //movement tree for player
    if (cursors.left.isDown) {
        movePLeft();
        swordHitbox.body.setSize(40, 60, 0, 20); //hitbox parameters for sword (adjust these to work with sam's sprite)
    } else if (cursors.right.isDown) {
        movePRight();
        swordHitbox.body.setSize(40, 60, 55, 20); //hitbox parameters for sword (adjust these to work with sam's sprite)
    } else if(attackButton.isDown) {
        if(movingRight){
            player.animations.play("attackR");
        }else{
            player.animations.play("attackL");
        }
        if(swordHit) { 
           dHealth-=5;
        }
        
    } else {
        //  Stand still
        if(movingRight) {
            player.frame = 0;
        } else {
            player.frame = 5;
        }
        player.body.velocity.x = 0;
    }

    if (cursors.up.isDown && hitSpikes){
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
    }
    else{
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -700;
        }
        //playerHealth.text = "Sam HP: " + pHealth;
    
        if (cursors.up.isDown && hitPlatform && player.body.onFloor()) {
            player.body.velocity.y = -700;
            hitPlatform = false;
        }
    }
    
    
    /*
    if(this.swordsman.y - pY > 200 && this.swordsman.body.onFloor() && this.jumpingAllowed) {
        this.swordsman.body.velocity.y = -700;
        this.jumpingAllowed = false;
    }
    */
    
    //start on initial bar scene INSERT THIS CODE FOR LOGIC ON CHANGING FROM CUTSCENE, DOOR

    var tutorial_done = false

    //if player has no health, go to game over state
    if(pHealth <= 0) {
        game.state.start('state2');
    }
    
    if(dHealth <= 0) { // victory
        door.kill();
        open = game.add.sprite(2239, game.world.height -470, 'open_door');
        open.scale.setTo(.23,.23);
        game.physics.enable(open, Phaser.Physics.ARCADE);
        open.body.immovable = true;
    } 
    if(game.physics.arcade.overlap(player, open)){
           var tutorial_done = true
    } // Overlap with player and door
    //change once tutorial is completed
    if(tutorial_done){
        game.state.start('state_level1')
        
    }

}

function r_0() {
    game.debug.body(player);
}

//note: some functions are small, but are as functions with the idea that more will be added to them later

function swordAttack() {
    player.animations.play('attack');
}


function movePLeft() {
    //  Move to the left
    player.body.velocity.x = -300;
    player.animations.play('left');
    movingRight = false;
}

function movePRight() {
    if(player.x <= game.camera.x + 715) {
        player.body.velocity.x = 300;
    } else {
        player.body.velocity.x = 0;
    }
    player.animations.play('right');
    movingRight = true;
}