var st_lev1 = {
    preload: p1,
    create: c1,
    update: u1,
    render: r1
}

var stateVar = 1

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

function p1() {
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
    game.load.spritesheet('shurikenThrower', 'assets/blue_enemy.png', 500, 315);
    game.load.spritesheet('shuriken', 'assets/shuriken.png', 500, 315);
    this.load.text('enemySpawnLoc', 'assets/EnemySpawn.json');
}

EnemySwordsman = function(index, game, x, y) {
    
    //initializing body of enemy swordsman
    this.swordsman = game.add.sprite(x, y, 'swordsman');
    this.swordsman.anchor.setTo(.5, .5);
    this.swordsman.scale.setTo(1,1);
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(this.swordsman);
        
    //gravity of swordsman
    this.swordsman.body.bounce.y = 0.2;
    this.swordsman.body.gravity.y = 1000;
    this.swordsman.body.collideWorldBounds = true;
    
    //creates the hitbox for image of the swordsman
    this.swordsman.body.setSize(30, 75, 95, 40); //need to fix sprite going left
    
    //animations
    this.swordsman.animations.add('left', [0, 1], 3, true);
    this.swordsman.animations.add('right', [5, 6], 3, true);
    this.attackL = this.swordsman.animations.add('attackL', [2, 3, 4, 4, 3, 2], 10, false); // false because you dont' want animation to repeat constantly
    this.attackR = this.swordsman.animations.add('attackR', [7, 8, 9, 9, 8, 7], 10, false);
    
    //
    this.enemyHitbox = game.add.group();
    this.enemyHitbox.enableBody = true;
    this.swordsman.addChild(this.enemyHitbox);
    this.enemySwordHitbox = this.enemyHitbox.create(0, 0, null);
    this.enemySwordHitbox.body.setSize(50, 75, -75, -20);
    
    //him standing and doing nothing
    this.stand = function() {
        this.swordsman.frame = 8;
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
        game.physics.arcade.collide(this.swordsman, stone_platforms);
        if(pX + 100 + this.extraDist <= this.swordsman.x) { //go left. Note: extra dist used to make characters not overlap completely with each other
            this.swordsman.body.velocity.x = -velocity;
            this.swordsman.animations.play('left');
            this.lookingL = true; //enemy is looking L (important for later in movement tree)
            this.lookingR = false; 
            this.enemySwordHitbox.body.setSize(50, 75, -75, -20);
            
        } else if (pX - this.extraDist >= this.swordsman.x) { //go right
            this.swordsman.body.velocity.x = velocity;
            this.swordsman.animations.play('right');
            this.lookingL = false; 
            this.lookingR = true; //enemy is looking R (important for later in movement tree)
            this.enemySwordHitbox.body.setSize(50, 75, 25, -20);
        } else if(this.lookingL) { 
            this.swordsman.body.velocity.x = 0;
            if(this.canAttack) { //if player is looking left and can attack (and by default via if statements), is not moving
                this.leftAttack = this.swordsman.play('attackL');
                this.leftAttack.onComplete.add(this.hasAttacked, this);
                this.canAttack = false;
            }
        } else if(this.lookingR) {
            this.swordsman.body.velocity.x = 0;
            if(this.canAttack) { //if player is looking left and can attack (and by default via if statements), is not moving
                this.rightAttack = this.swordsman.play('attackR');
                this.rightAttack.onComplete.add(this.hasAttacked, this);
                this.canAttack = false;
            }
        } else {
            this.swordsman.body.velocity.x = 0;
            this.swordsman.frame = 8;
        }
    };
    
    //if swordsman is dead
    this.die = function() {
        console.log("should be dead");
        this.swordsman.kill();
    };
}

//This is the enemy shuriken thrower himself. Does not include shuriken object! Check out Shuriken for that
EnemyShurikenThrower = function(index, game, x, y) {
    this.enemyShurikenArray = []; //the array of shurikens that this specific enemy has thrown and are active
    
    //initializing body of enemy swordsman
    this.shurikenThrower = game.add.sprite(x, y, 'shurikenThrower');
    this.shurikenThrower.anchor.setTo(.5, .5); //to fix camera/spawn movement
    this.shurikenThrower.scale.setTo(.33,.33);
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(this.shurikenThrower);
        
    //gravity of shurikenThrower
    this.shurikenThrower.body.bounce.y = 0.2;
    this.shurikenThrower.body.gravity.y = 1000;
    this.shurikenThrower.body.collideWorldBounds = true;
    
    //creates the hitbox for image of the shurikenThrower
    this.shurikenThrower.body.setSize(100, 200, 220, 100); //need to fix sprite going left
    
    //animations
    this.shurikenThrower.animations.add('left', [0, 1], 3, true); //doesn't really use, but may want later
    this.shurikenThrower.animations.add('right', [5, 6], 3, true); //doesn't really use, but may want later
    this.attackL_beginning = this.shurikenThrower.animations.add('attackL', [2, 3, 4, 4, 3, 2], 10, false); // false because you dont' want animation to repeat constantly
    this.attackR = this.shurikenThrower.animations.add('attackR', [7, 8, 9, 9, 8, 7], 10, false);
    
    
    //him standing and doing nothing
    this.stand = function() {
        this.shurikenThrower.frame = 8;
    };
    
    // use this marker to signify global variable
    this.canAttackAgain = true; //signifies timer is reset so enemy can attack
    this.vulnerable = true; //signifies invulnerability timer enmey reset
    this.lookingL = false;
    this.lookingR = false;
    this.extraDist = game.rnd.integerInRange(0, 20); // signifies extra distance enemy has away from player before attacking (to look right)
    velocity = game.rnd.integerInRange(200 , 300); // how fast they're moving
    this.doneAttacking = false; // after animation is complete
    this.hitCount = 2; // however many hits enemy has
    this.inRange = false;
    
    this.canAttack = function() {
        this.canAttackAgain = true; //change name from something different
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
        game.physics.arcade.collide(this.shurikenThrower, stone_platforms);
        if(pX + this.extraDist <= this.shurikenThrower.x) { //go left. Note: extra dist used to make characters not overlap completely with each other
            lookingL = true;
            lookingR = false;
        } else if(pX - this.extraDist >= this.shurikenThrower.x) {
            lookingL = false;
            lookingR = true;
        }
        
        if(lookingL && pX + 350 >= this.shurikenThrower.x && this.canAttackAgain) {
            this.shurikenThrower.animations.play("attackL");
            this.enemyShurikenArray.push(new Shuriken(game, this.shurikenThrower.x, this.shurikenThrower.y, lookingL));
            this.shurikenThrower.animations.play("attackL");
            this.canAttackAgain = false;
        } else if(lookingR && (pX - this.shurikenThrower.x <= 350 && pX - this.shurikenThrower.x >= 0) && this.canAttackAgain) {
            this.shurikenThrower.animations.play("attackR");
            this.enemyShurikenArray.push(new Shuriken(game, this.shurikenThrower.x, this.shurikenThrower.y, lookingL));
            this.canAttackAgain = false;

        }
        for(var i = 0; i < this.enemyShurikenArray.length; i++) {
            this.enemyShurikenArray[i].updateShuriken();
            if(this.enemyShurikenArray[i].checkForDespawn()) {
                this.enemyShurikenArray.splice(i, 1);
            }
        }
    };
    
    //if shurikenThrower is dead
    this.die = function() {
        console.log("should be dead");
        this.shurikenThrower.kill();
    };
    
    this.checkForOverlap = function(player) {
        overlap = false;
        for(var i = 0; i < this.enemyShurikenArray.length; i++) {
            if(game.physics.arcade.overlap(this.enemyShurikenArray[i], player)) {
                overlap = true;
            }
        }
        return overlap;
    }
}

//SHURIKEN CLASS
Shuriken = function(game, x, y, goLeft) {
    this.shuriken = game.add.sprite(x, y, 'shuriken');
    game.physics.arcade.enable(this.shuriken);
    this.shuriken.anchor.setTo(.5, .5);
    this.leftShuriken = this.shuriken.animations.add('LeftShuriken', [4,5,6,7], 15, true);
    this.rightShuriken = this.shuriken.animations.add('RightShuriken', [0,1,2,3], 15, true);
    this.shuriken.scale.setTo(.3, .3);
    this.shuriken.body.setSize(50, 50, 130, 130);
    this.updateShuriken = function() {
        if(goLeft) {
            this.shuriken.animations.play("LeftShuriken");
            this.shuriken.body.velocity.x = -300;
            this.shuriken.body.setSize(50, 50, 130, 130);
        } else {
            this.shuriken.animations.play('RightShuriken');
            this.shuriken.body.velocity.x = 300;
            this.shuriken.body.setSize(50, 50, 320, 130);
        }
    }
    
    this.checkForDespawn = function() {
        if(this.shuriken.x < game.camera.x) {
            this.shuriken.destroy();
            return true;
        }
        if(game.physics.arcade.collide(this.shuriken, stone_platforms)){
            this.shuriken.destroy();
            console.log('shuriken collided with platform');
            return true;
        }
        return false;
    }
}

var image; //background
var attackButton; // F to attack
var throwButton;// D to throw
var playerHealth; //keeps track of total player health
var bossHealth; //keeps track of total boss health
//var sumoMusic; //boss music
var instructions; //game instructions'
var stone_platforms;
var map;
var stone_platforms;
var background;
var hitbox;

function c1() {
    
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
    //add shuriken drop
    drop=game.add.sprite(500, game.world.height-400,"shuriken");
    drop.scale.setTo(.5, .5);
    game.physics.enable(drop, Phaser.Physics.ARCADE);
    //drop.body.bounce.y = 0.2;
   // drop.body.gravity.y = 1000;
    //drop.body.collideWorldBounds = true;
    drop.body.setSize(50, 50, 130, 130);
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
    throwButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
    
//    Testing camear stuff
//    cameraButtonTest = game.input.keyboard.addKey(Phaser.Keyboard.P);
//    cameraButtonTest.onDown.add(turnCameraOff);
    //throwButton.onDown.add(throwshuriken)
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
    stateVar = 2
    
}

var pHealth = 100; //player health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')
var enemyLocIndex = 0; //index variable for keeping track of enemy json file (which enemy that needs to spawn)
var swordsmanArray = []; //array that starts out empty here, but later holds all the enemy objects. I.e. 
var shurikenThrowerArray = []; //array that starts out empty here, but later holds all the enemy objects. I.e. 
var hitPlatform = false; //if sam has hit platform
var lastEnemyX = 0; //not necessary now, but to be used later on to possibly deal with kill attack bug
var movingRight = true; //if sam is looking right, is true. Looking left = false
var playerShurikens = [];
var playerShurikenTotal = 0; //how many shurikens sam is holding
var canThrow = true;

function u1() {
//    game.debug.body(player.hitbox);
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, stone_platforms, function(){hitPlatform = true}); //collide with platform (i.e. ground) check
    game.physics.arcade.TILE_BIAS = 40;
    game.physics.arcade.collide(player, stone_platforms);
    //game.physics.arcade.collide(drop, stone_platforms,function(){hitPlatform = true});
    //game.physics.arcade.collide(player, map);
    if (game.physics.arcade.collide(player,drop)){
        playerShurikenTotal=playerShurikenTotal+20;
        drop.kill();
    }
    //movement tree for player
    if (cursors.left.isDown) {
        movePLeft();
        swordHitbox.body.setSize(40, 60, 0, 20); //hitbox parameters for sword (adjust these to work with sam's sprite)
    } else if (cursors.right.isDown) {
        movePRight();
        swordHitbox.body.setSize(40, 60, 55, 20); //hitbox parameters for sword (adjust these to work with sam's sprite)
        if(this.enemyLocData.enemySpawnLoc[enemyLocIndex].x != -1) { //spawning enemies, check for array bounds
            if(player.x >= this.enemyLocData.enemySpawnLoc[enemyLocIndex].x && this.enemyLocData.enemySpawnLoc[enemyLocIndex].x != lastEnemyX) {
                if(this.enemyLocData.enemySpawnLoc[enemyLocIndex].type == 0) {
                    swordsmanArray.push(new EnemySwordsman(enemyLocIndex, game, player.x + 500, player.y));
                } else if(this.enemyLocData.enemySpawnLoc[enemyLocIndex].type == 1) {
                    shurikenThrowerArray.push(new EnemyShurikenThrower(enemyLocIndex, game, player.x + 500, player.y));
                    console.log("Enemy spawned")
                }
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
        //creates shuriken on command
    }else if(throwButton.isDown && canThrow){
        canThrow = false;
        if(playerShurikenTotal > 0){
            playerShurikenTotal--;
            playerShurikens.push(new Shuriken(game, player.x + 50, player.y + 50, !movingRight));
        }
        
    }else {
        //  Stand still
        player.animations.stop();
        if(movingRight) {
            player.frame = 0;
        } else {
            player.frame = 5;
        }
        player.body.velocity.x = 0;
    }
    for(var i = 0; i < playerShurikens.length; i++) {
        playerShurikens[i].updateShuriken();
        if(playerShurikens[i].checkForDespawn()) {
            playerShurikens.splice(i, 1);
        }
    }
    if(!throwButton.isDown) {
        canThrow = true;
    }

    //note: removing player.body.touching.down allows player to jump, but means player can jump when alongside walls
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && hitPlatform && player.body.onFloor()) {
        player.body.velocity.y = -700;
        hitPlatform = false;
    }
    playerHealth.text = "Sam HP: " + pHealth + " | Shurikens: " + playerShurikenTotal; //player health is updated with current health
    
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
    for(var i = 0; i < swordsmanArray.length; i++) {
        //player i frames are out       ... and enemy's sword hitbox overlaps with player           ...and swordsman has finished attack
        if(playerVulnerable && game.physics.arcade.overlap(swordsmanArray[i].enemyHitbox, player) && swordsmanArray[i].finishedAttack()) {
            pHealth -= 5; //remove 5 from player's health
            playerVulnerable = false; //give player i frames
        }
        
        swordsmanArray[i].move(player.x); //updates movement tree and does bulk of work
        if(attackButton.isDown) { //if player is attacking, you'll need to check if enemy is being hit
            if(game.physics.arcade.overlap(swordsmanArray[i].swordsman, hitbox)) { // Overlap with sword and player 2)) 
                if(swordsmanArray[i].attacked()) {
                    swordsmanArray[i].swordsman.destroy(); //if attacked returns true, means enemy is dead and therefore 'killed' (made invisible/stuck)
                    //note: bug is currently happening where enemy attacks remain
                    swordsmanArray.splice(i, 1);
                    if(swordsmanArray.length == 0) {
                        break;
                    }
                }
            }
            
        }
        
        for(var j = 0; j < playerShurikens.length; j++) {
            if(game.physics.arcade.overlap(swordsmanArray[i].swordsman, playerShurikens[j].shuriken)) {
                if(swordsmanArray[i].attacked()) {
                    swordsmanArray[i].swordsman.destroy(); //if attacked returns true, means enemy is dead and therefore 'killed' (made invisible/stuck)
                    //note: bug is currently happening where enemy attacks remain
                    swordsmanArray.splice(i, 1);
                    break;
                }
            }
        }
    }
    
    for(var i = 0; i < shurikenThrowerArray.length; i++) {
        shurikenThrowerArray[i].move(player.x); //updates movement tree and does bulk of work
        for(var j = 0; j < shurikenThrowerArray[i].enemyShurikenArray.length; j++) {
            if(game.physics.arcade.overlap(shurikenThrowerArray[i].enemyShurikenArray[j].shuriken, player) && playerVulnerable) {
                pHealth -= 10;
                playerVulnerable = false;
                
            }
        }
        if(attackButton.isDown) { //if player is attacking, you'll need to check if enemy is being hit
            if(game.physics.arcade.overlap(shurikenThrowerArray[i].shurikenThrower, hitbox)) { // Overlap with sword and player 2)) {
                if(shurikenThrowerArray[i].attacked()) {
                    shurikenThrowerArray[i].shurikenThrower.destroy(); //if attacked returns true, means enemy is dead and therefore 'killed' (made invisible/stuck)
                    //note: bug is currently happening where enemy attacks remain
                    shurikenThrowerArray.splice(i, 1);
                    if(shurikenThrowerArray.length == 0) {
                        break;
                    }
                }
            }
            
        }
        
        
        //player i frames are out       ... and enemy's sword hitbox overlaps with player           ...and swordsman has finished attack

       /*commented out because breaking code if(shurikenThrowerArray[i].checkForOverlap(player)) {
//            pHealth -5;
//            playerVulnerable = false; //give player i frames
        }
        */
        for(var j = 0; j < playerShurikens.length; j++) {
            if(game.physics.arcade.overlap(shurikenThrowerArray[i].shurikenThrower, playerShurikens[j].shuriken)) {
                if(shurikenThrowerArray[i].attacked()) {
                    shurikenThrowerArray[i].shurikenThrower.destroy(); //if attacked returns true, means enemy is dead and therefore 'killed' (made invisible/stuck)
                    //note: bug is currently happening where enemy attacks remain
                    shurikenThrowerArray.splice(i, 1);
                    break;
                }
            }
        }

    }
    
    
    //if player has no health, go to game over state
    if(pHealth <= 0) {
        game.state.start('state2');
    }
    hitbox.debug = true;
    
}

//note: some functions are small, but are as functions with the idea that more will be added to them later

//just for debugging purposes. Comment out before submitting, but do not delete now!
function r1() {
    game.debug.body(swordHitbox);
    //game.debug.spriteBounds(this.hitbox.swordHitbox);
    for(var i = 0; i < swordsmanArray.length; i++) {
        game.debug.body(swordsmanArray[i].swordsman);
    }
    for(var i = 0; i < shurikenThrowerArray.length; i++) {
        game.debug.body(shurikenThrowerArray[i].shurikenThrower);
        for(var j = 0; j < shurikenThrowerArray[i].enemyShurikenArray.length; j++) {
            game.debug.body(shurikenThrowerArray[i].enemyShurikenArray[j].shuriken);
        }
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
    if (stateVar != 1){
      instructions2 = game.add.text(38,62, 'use d key to throw shuriken', {fontSize: '22px', fill:'#fff'});
        instructions2.font = 'Permanent Marker';
    } 
    
    instructions.font = 'Permanent Marker';
    
    


}

//function turnCameraOff() {
//    game.camera.reset();
//}
