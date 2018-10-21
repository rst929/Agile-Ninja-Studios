var st4 = {
    preload: p4,
    create: c4,
    update: u4,
}

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND/10, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia', 'Teko', 'Permanent Marker', 'Lato']
    }

};

function p4() {
    //game.load.audio('sumoMusic', ['assets/audio/boss fight music.ogg', 'assets/audio/boss fight music.mp3']);
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
    game.load.image('closed_door', 'assets/closed_door.png');
    game.load.image('open_door', 'assets/open_door.png');

    game.load.tilemap('castle_map','assets/tilemap/castle.json',null, Phaser.Tilemap.TILED_JSON);
    game.load.image('stone_tile', 'assets/tilemap/stone_tile2.png');
    game.load.image('castle_tile', 'assets/tilemap/castle_background_v2.png');
    
    //  Load the Google WebFont Loader script

	game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
    game.load.spritesheet('swordsman', 'assets/green_enemy_fix.png', 213, 116); //fixed version
    game.load.spritesheet('shurikenman', 'assets/blue_enemy.png', 500, 315);
    game.load.spritesheet('shuriken','assets/shuriken.png', 250, 170);
    this.load.text('enemySpawnLoc', 'assets/EnemySpawn.json');
    
}

Enemyshurikenman = function(index, game, x, y) {
    
    //initializing body of enemy shurikenman
    this.shurikenman = game.add.sprite(x, y, 'shurikenman');
    this.shurikenman.anchor.setTo(.5, .5);
    this.shurikenman.scale.setTo(.33,.33);
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(this.shurikenman);
        
    //gravity of shurikenman
    this.shurikenman.body.bounce.y = 0.2;
    this.shurikenman.body.gravity.y = 1000;
    this.shurikenman.body.collideWorldBounds = true;
    
    //creates the hitbox for image of the shurikenman
    this.shurikenman.body.setSize(30, 75, 95, 40); //need to fix sprite going left
    
    //animations
    this.shurikenman.animations.add('left', [0, 1], 3, true);
    this.shurikenman.animations.add('right', [5, 6], 3, true);
    this.attackL = this.shurikenman.animations.add('attackL', [2, 3, 4, 4, 3, 2], 10, false); // false because you dont' want animation to repeat constantly
    this.attackR = this.shurikenman.animations.add('attackR', [7, 8, 9, 9, 8, 7], 10, false);
    
    //
    this.enemyHitbox = game.add.group();
    this.enemyHitbox.enableBody = true;
    this.shurikenman.addChild(this.enemyHitbox);
    this.enemySwordHitbox = this.enemyHitbox.create(0, 0, null);
    this.enemySwordHitbox.body.setSize(50, 75, -75, -20);
    

    //him standing and doing nothing
    this.stand = function() {
        this.shurikenman.frame = 8;
    };
    
    // use this marker to signify global variable
    this.canAttack = false; //signifies timer is reset so enemy can attack
    this.vulnerable = true; //signifies invulnerability timer enmey reset
    this.lookingL = false;
    this.lookingR = false;
    this.extraDist = game.rnd.integerInRange(0, 20); // signifies extra distance enemy has away from player before attacking (to look right)
    velocity = game.rnd.integerInRange(200 , 300); // how fast they're moving
    this.doneAttacking = false; // after animation is complete
    this.hitCount = 2; // however many hits enemy has
    
    this.canAttack = function() {
        this.canAttack = true; //change name from something different
    };
    
    this.vulnerable = function() { //possible bug area, may need to change name to different from function
        this.vulnerable = true; //change name to something different
    };
    
    this.finishedAttack = function() {
        return this.doneAttacking; //done attacking = 
    };
    
    // when called, reduces health of enemy
    // returns if dead or not (health points 0 or less)
    this.attacked = function() {
        if(this.vulnerable) {
            this.hitCount--;
            this.vulnerable = false;
        }
        return Boolean(this.hitCount <= 0); //boolean() function pointless
    };
    
    this.hasAttacked = function() {
        this.doneAttacking = true;
    };
    
    // 
    game.time.events.loop(Phaser.Timer.SECOND * (1.5 +  game.rnd.integerInRange(1, 2)), this.canAttack, this); //how fast enemy animation should
    game.time.events.loop(Phaser.Timer.SECOND * .5, this.vulnerable, this); // i frames
    
    //movement tree for enemy
    this.move = function(pX) { //pX = player.x position
        game.debug.body(this.enemySwordHitbox);
        game.physics.arcade.collide(this.shurikenman, stone_platforms);
        if(pX + 100 + this.extraDist <= this.shurikenman.x) { //go left. Note: extra dist used to make characters not overlap completely with each other
            this.shurikenman.body.velocity.x = -velocity;
            this.shurikenman.animations.play('left');
            this.lookingL = true; //enemy is looking L (important for later in movement tree)
            this.lookingR = false; 
            this.enemySwordHitbox.body.setSize(50, 75, -75, -20);
            
        } else if (pX - this.extraDist >= this.shurikenman.x) { //go right
            this.shurikenman.body.velocity.x = velocity;
            this.shurikenman.animations.play('right');
            this.lookingL = false; 
            this.lookingR = true; //enemy is looking R (important for later in movement tree)
            this.enemySwordHitbox.body.setSize(50, 75, 25, -20);
        } else if(this.lookingL) { 
            this.shurikenman.body.velocity.x = 0;
            if(this.canAttack) { //if player is looking left and can attack (and by default via if statements), is not moving
                this.leftAttack = this.shurikenman.play('attackL');
                this.leftAttack.onComplete.add(this.hasAttacked, this);
                this.canAttack = false;
            }
        } else if(this.lookingR) {
            this.shurikenman.body.velocity.x = 0;
            if(this.canAttack) { //if player is looking left and can attack (and by default via if statements), is not moving
                this.rightAttack = this.shurikenman.play('attackR');
                this.rightAttack.onComplete.add(this.hasAttacked, this);
                this.canAttack = false;
            }
        } else {
            this.shurikenman.body.velocity.x = 0;
            this.shurikenman.frame = 8;
        }
    };
    
    //if shurikenman is dead
    this.die = function() {
        console.log("should be dead");
        this.shurikenman.kill();
    };
}

var image; //background
var attackButton; // F to attack
var playerHealth; //keeps track of total player health
var bossHealth; //keeps track of total boss health
//var sumoMusic; //boss music
var instructions; //game instructions'
var stone_platforms;
var map;
var stone_platforms;
var background;
var hitbox;
function c4() {
    
    game.world.setBounds(0, 0, 2400, 416);
    //  Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //creating map
    map = game.add.tilemap('castle_map');
    map.addTilesetImage('stone_tile2','stone_tile')
    map.addTilesetImage('castle_background','castle_tile');
    
    //layers
    background = map.createLayer('Background');
    stone_platforms = map.createLayer('Platforms');
    
    map.setCollisionBetween(1, 300, true, 'Platforms'); //basically tells what possible positions in the json file to check for
    map.width=game.width;
    map.height=game.height+100;
    background.resizeWorld();
    stone_platforms.resizeWorld();
    
    //add door
    door = game.add.sprite(2229, game.world.height-437, 'closed_door');
    door.scale.setTo(.23, .23);
    game.physics.enable(door, Phaser.Physics.ARCADE);
    door.body.immobile = true;
    
    // The player and its settings
    player = game.add.sprite(350, game.world.height - 500, 'sam');
    player.scale.setTo(.09,.09) //FIX SCALE HERE
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    
    //  Player physics properties
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
    player.body.setSize(300, 600, 350, 350);
    
    //create hitbox for sword
    hitbox = game.add.group();
    hitbox.enableBody = true;
    player.addChild(hitbox);
    swordHitbox = hitbox.create(0, 0, null); // creating the hitbox itself
    swordHitbox.body.setSize(40, 60, 55, 20); //hitbox parameters for sword (adjust these to work with sam's sprite)
    game.physics.arcade.enable(swordHitbox); //so can be used for overlap
    //  animations, true 
    player.animations.add('left', [5, 6], 10, true);
    player.animations.add('attackL', [7, 8, 9], 10, true);
    player.animations.add('right', [0, 1], 10, true);
    player.animations.add('attackR', [2, 3, 4], 10, true);
    
    cursors = game.input.keyboard.createCursorKeys();
    attackButton = game.input.keyboard.addKey(Phaser.Keyboard.F);
    attackButton.onDown.add(swordAttack)
    
    //sumoMusic = game.add.audio('sumoMusic');
    //sumoMusic.play();
    
    //camerma moves
    
    //instructions = game.add.text(38,43, 'use arrow keys to move, up key to jump, f key to attack', {fontSize: '22px', fill:'#fff'});
    
    //instructions.font = 'Lato';

    //camera moves
    game.camera.follow(player);
    
    //setting up JSON file to be read
    this.enemyLocData = JSON.parse(this.game.cache.getText('enemySpawnLoc'));
    game.time.events.loop(Phaser.Timer.SECOND * .5, makePlayerVulnerable, this);
    
}

var pHealth = 100; //player health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')
var enemyLocIndex = 0; //index variable for keeping track of enemy json file (which enemy that needs to spawn)
var shurikenmanArray = []; //array that starts out empty here, but later holds all the enemy objects. I.e. 
var hitPlatform = false; //if sam has hit platform
var lastEnemyX = 0; //not necessary now, but to be used later on to possibly deal with kill attack bug
var movingRight = true; //if sam is looking right, is true. Looking left = false

function u4() {
//    game.debug.body(player.hitbox);
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, stone_platforms, function(){hitPlatform = true}); //collide with platform (i.e. ground) check
    game.physics.arcade.TILE_BIAS = 40;
    game.physics.arcade.collide(player, stone_platforms);
    
    //game.physics.arcade.collide(player, map);
    
    //movement tree for player
    if (cursors.left.isDown) {
        movePLeft();
        swordHitbox.body.setSize(40, 60, 0, 20); //hitbox parameters for sword (adjust these to work with sam's sprite)
    } else if (cursors.right.isDown) {
        movePRight();
        swordHitbox.body.setSize(40, 60, 55, 20); //hitbox parameters for sword (adjust these to work with sam's sprite)
        if(this.enemyLocData.enemySpawnLoc[enemyLocIndex].x != -1) { //spawning enemies, check for array bounds
            if(player.x >= this.enemyLocData.enemySpawnLoc[enemyLocIndex].x && this.enemyLocData.enemySpawnLoc[enemyLocIndex].x != lastEnemyX) {
                shurikenmanArray.push(new Enemyshurikenman(enemyLocIndex, game, player.x + 500, player.y));
                lastEnemyX = this.enemyLocData.enemySpawnLoc[enemyLocIndex].x;
                enemyLocIndex++;
            }
        }
    } else if(attackButton.isDown) { //attackbutton (aka f) is pushed down, if not pushed down, player stops
        if(movingRight) {
            player.animations.play('attackR');
        } else {
            player.animations.play('attackL');
        }
        if(game.physics.arcade.collide(this.hitbox,door)){
           dhealth-5;
           }
    } else {
        //  Stand still
        player.animations.stop();
        if(movingRight) {
            player.frame = 0;
        } else {
            player.frame = 5;
        }
        player.body.velocity.x = 0;
    }

    //note: removing player.body.touching.down allows player to jump, but means player can jump when alongside walls
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && hitPlatform && player.body.onFloor()) {
        player.body.velocity.y = -700;
        hitPlatform = false;
    }
    //playerHealth.text = "Sam HP: " + pHealth; //player health is updated with current health
    
    var tutorial_done = false
    if(game.physics.arcade.collide(hitbox,door)) {
        door.kill();
        open = game.add.sprite(2229, game.world.height-437, 'open_door');
        open.scale.setTo(.23,.23);
        game.physics.enable(open, Phaser.Physics.ARCADE);
        open.body.immovable = true;
    } 
    if(game.physics.arcade.overlap(player, open)){
           var tutorial_done = true
    } // Overlap with player and door
    //change once tutorial is completed
    if(tutorial_done){
        game.state.start('state1')
        
    }
    
    //scan through every currently spawned enemy
    for(var i = 0; i < shurikenmanArray.length; i++) {
        shurikenmanArray[i].move(player.x); //updates movement tree and does bulk of work
        if(attackButton.isDown) { //if player is attacking, you'll need to check if enemy is being hit
            if(game.physics.arcade.overlap(shurikenmanArray[i].shurikenman, hitbox)) { // Overlap with sword and player 2)) {
                if(shurikenmanArray[i].attacked()) {
                    shurikenmanArray[i].shurikenman.kill(); //if attacked returns true, means enemy is dead and therefore 'killed' (made invisible/stuck)
                    //note: bug is currently happening where enemy attacks remain
                }
            }
            
        }
        //player i frames are out       ... and enemy's sword hitbox overlaps with player           ...and shurikenman has finished attack
        if(playerVulnerable && game.physics.arcade.overlap(shurikenmanArray[i].enemyHitbox, player) && shurikenmanArray[i].finishedAttack()) {
            pHealth -= 5; //remove 5 from player's health
            playerVulnerable = false; //give player i frames
        }
    }
    
    //if player has no health, go to game over state
    if(pHealth <= 0) {
        game.state.start('state2');
    }
    hitbox.debug = true;
}

//note: some functions are small, but are as functions with the idea that more will be added to them later

//just for debugging purposes
function r4() {
    game.debug.body(swordHitbox);
    //game.debug.spriteBounds(this.hitbox.swordHitbox);
    for(var i = 0; i < shurikenmanArray.length; i++) {
        game.debug.body(shurikenmanArray[i].shurikenman);
    }
}

//player's sword attack animation
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
    player.body.velocity.x = 300;
    player.animations.play('right');
    movingRight = true;
    
    

}

function makePlayerVulnerable() {
    playerVulnerable = true;
}

function createText() {

    playerHealth = game.add.text(38,2, 'Sam HP: 100', { fontSize: '32px', fill: '#fff' });

	playerHealth.font = 'Revalia';
    playerHealth.fixedToCamera=true;
    
    instructions = game.add.text(38,38, 'use arrow keys to move, up key to jump, f key to attack', {fontSize: '22px', fill:'#fff'});
    
    instructions.font = 'Permanent Marker';


}