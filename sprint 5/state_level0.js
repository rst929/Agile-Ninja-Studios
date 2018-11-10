var st_lev0 = {
    preload: p_0,
    create: c_0,
    update: u_0,
    render: r_0
}


function p_0() {
    game.load.audio('moan', 'assets/audio/pain.mp3');
    game.load.audio('sumoMusic', ['assets/audio/boss fight music.ogg', 'assets/audio/boss fight music.mp3']);
    game.load.image('castle', 'assets/castle_background_v2.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('sam', 'assets/player_new3.png', 1100, 1100); //fixed version, need scale down
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
    game.load.image('spikes_tile', 'assets/tilemap/spikes3.png');
    //game.load.spritesheet('dog', 'assets/Doggo.png', 375, 375);

	game.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    //this.load.text('enemySpawnLoc', 'assets/EnemySpawn0.json');

    game.load.image("boxBack", "assets/blankbox.png");
    game.load.image("closeButton", "assets/xbutton.png")
    console.log("state_level0");

}
        
        
    
//x, y = spawn points
//goingL = which way the doggo should point
//xBounds = how far the dog can run
//Doggo = function(game, x, y, goingL, xBoundL, xBoundR) {
//    this.doggo = game.add.sprite(x, y, 'dog');
//    this.doggo.scale.setTo(.35, .35);
//    this.doggo.anchor.setTo(.5, .5);
//    game.physics.enable(this.doggo, Phaser.Physics.ARCADE);
//    
//    //gravity of doggo
//    this.doggo.body.bounce.y = 0.2;
//    this.doggo.body.gravity.y = 1000;
//    this.doggo.body.collideWorldBounds = true;    
//    
//    //doggo animations
//    this.pantL = this.doggo.animations.add("pantL",[0, 1], 4, true);
//    this.pantR = this.doggo.animations.add("pantR",[10, 11], 4, true);
//    this.runL = this.doggo.animations.add("runL", [5, 6, 7, 8, 9], 15, true);
//    this.runR = this.doggo.animations.add("runR", [15, 16, 17, 18, 19], 15, true);
//    this.transformL = this.doggo.animations.add("transformL", [0, 2, 3, 4], 15, false);
//    this.reformL = this.doggo.animations.add("reformL", [4, 3, 2, 0], 15, false);
//    this.transformR = this.doggo.animations.add("transformR", [10, 12, 13, 14], 15, false);
//    this.reformR = this.doggo.animations.add("reformR", [14, 13, 12, 10], 15, false);
//    this.returnToRestL = this.doggo.animations.add("returnToRestL", [9, 8, 7, 6, 5, 4], 15, false);
//    this.returnToRestR = this.doggo.animations.add("returnToRestR", [19, 18, 17, 16, 15, 14], 15, false);
//    
//    //transferring passed in left and right bounds
//    this.xBoundL = xBoundL;
//    this.xBoundR = xBoundR;
//    this.hasTranformed = false;
//    
//    //ledge checker is a hitbox of the dog that is for the purposes of edge detection. Not affiliated with doggo's damage output
//    this.ledgeChecker = game.add.group();
//    this.ledgeChecker.enableBody = true;
//    this.doggo.addChild(this.ledgeChecker);
//    this.doggoLedgeChecker = this.ledgeChecker.create(0, 0, null);
//    this.doggo.body.setSize(150, 90, 100, 160);
//    this.doggoLedgeChecker.body.setSize(5, 50, -60, -100);
//    game.physics.arcade.enable(this.ledgeChecker);
//    
//    //tiemr stuff
//    this.timer = game.time.create();
//    // Create a delayed event 1m and 30s from now
//    this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);
//    this.timerCanRun = true;
//    
//    //this.doggoLedgeChecker.body.collideWorldBounds = true;   
//    //game.physics.enable(this.doggoLedgeChecker, Phaser.Physics.ARCADE);
//    this.hitPlatform = false;
//    
//    this.movingL = goingL;
//    
//    this.pant = function() {
//        if(this.movingL) {
//            this.doggo.animations.play("transformL");
//        } else {
//            this.doggo.animations.play("transformR");
//        }
//    }
//    
//    this.transformed = function() {
//        this.hasTransformed = !this.hasTransformed;
//    }
//    
//    //transforming animation
//    this.transform = function() {
//        if(!this.hasTransformed) {
//            if(this.movingL) {
//                this.doggo.animations.play("transformL");
//                this.transformL.onComplete.add(this.transformed, this);
//            } else {
//                this.doggo.animations.play("transformR");
//                this.transformR.onComplete.add(this.transformed, this);
//            }
//            return false; //the animation finished
//        } else {
//            return true;
//        }
//        
//    }
//    
//    //to be used instead of move new when debugged
//    this.move = function() {
//        //console.log(game.physics.arcade.overlap(this.ledgeChecker, platforms));
//        //console.log(game.physics.arcade.overlap(this.doggoLedgeChecker, stone_platforms));
//        //console.log((this.doggoLedgeChecker.body.onFloor() || this.doggoLedgeChecker.body.touching.down));
//        //console.log(this.doggoLedgeChecker.body.touching.down);
//        //console.log(game.physics.arcade.overlap(this.doggo.ledgeChecker, player));
//        this.hitPlatform = false;
//        game.physics.arcade.overlap(this.doggoLedgeChecker, stone_platforms, function(){this.hitPlatform = true});
//        console.log(this.hitPlatform);
//        if(this.movingL && this.hitPlatform) { //if going 
//            //console.log("am repeating this")
//            this.doggo.animations.play("runL");
//            this.doggo.body.velocity.x = -300;
//            this.doggoLedgeChecker.body.setSize(5, 50, -60, -100);
//        } else if(!this.movingL && this.hitPlatform) {
//            this.doggo.animations.play("runR");
//            this.doggo.body.velocity.x = 300;
//            this.doggoLedgeChecker.body.setSize(5, 50, 100, -100);
//        } else {
//            this.movingL = !this.movingL;
//            //console.log("here");
//            if(this.movingL) {
//                this.doggoLedgeChecker.body.setSize(5, 50, -20, 0);
//            } else {
//                this.doggoLedgeChecker.body.setSize(5, 50, 100, 0);
//            }
//        }
//    }
//    
//    this.endTimer = function() {
//        this.timer.stop();
//        this.timer.destroy();
//        this.timer = game.time.create();
//        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);
//    }
//    
//    this.moveNew = function() {
//        if(this.movingL && this.doggo.body.x > this.xBoundL) { //if going 
//            this.doggo.animations.play("runL");
//            this.doggo.body.velocity.x = -300;
//        } else if(!this.movingL && this.doggo.body.x < this.xBoundR) {
//            this.doggo.animations.play("runR");
//            this.doggo.body.velocity.x = 300;
//        } else {
//            if(this.timerCanRun) {
//                this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 1, this.endTimer, this);
//                this.timer.start();
//                this.timerCanRun = false;
//            }
//            if(this.timer.running) {
//                this.doggo.body.velocity.x = 0;
//                this.doggo.animations.stop();
//                if(this.movingL) {
//                    console.log("playingR");
//                    this.doggo.animations.play("returnToRestR");
//                } else {
//                    console.log("playingL");
//                    this.doggo.animations.play("returnToRestL");
//                }
//                
//            } else {
//                this.movingL = !this.movingL;
//                this.timerCanRun = true;
//                console.log("here boi");
//            }
//            //console.log("here");
//        }
//    }
//    
//    this.reform = function() {
//        this.doggo.body.velocity.x = 0;
//        if(this.hasTransformed) {
//            if(this.movingL) {
//                this.doggo.animations.play("reformL");
//                this.reformL.onComplete.add(this.transformed, this);
//            } else {
//                this.doggo.animations.play("reformR");
//                this.reformR.onComplete.add(this.transformed, this);
//            }
//            return false;
//        } else {
//            return true;
//        }
//    }
//    
//    this.leftBound = function() {
//        return this.xBoundL;
//    }
//    this.rightBound = function() {
//        return this.xBoundR;
//    }
//    
//    this.update = function() {
//        game.physics.arcade.collide(this.doggo, stone_platforms);
//        //console.log(game.physics.arcade.overlap(this.doggoLedgeChecker, stone_platforms) + " check1 "); //true ch1 false ch2
//        //console.log(game.physics.arcade.overlap(this.doggo.doggoLedgeChecker, stone_platforms) + " check2");
//    }
//}

var image; //background
var attackButton; // F to attack
var playerHealth; //keeps track of total player health
var bossHealth; //keeps track of total boss health
//var sumoMusic; //boss music
var instructions; //game instructions'
var tutorial_done;
var lastEnemyX = 0; //not necessary now, but to be used later on to possibly deal with kill attack bug
var moan;
var pFlinchToL, pFlinchToR;

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
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 1100
    player.body.collideWorldBounds = true;
    player.body.setSize(200,500, 350, 450);
    
    //animations
    player.animations.add('left', [5, 6], 10, true);
    player.animations.add('attackL', [7, 8, 9], 10, true);
    player.animations.add('right', [0, 1], 10, true);
    player.animations.add('attackR', [2, 3, 4], 10, true);
    pFlinchToL = player.animations.add('pFlinchToL', [20, 21, 22, 23, 23, 23, 22, 21, 20], 15, false);
    pFlinchToR = player.animations.add('pFlinchToR', [24, 25, 26, 27, 27, 27, 26, 25, 24], 15, false);
    
    cursors = game.input.keyboard.createCursorKeys();
    attackButton = game.input.keyboard.addKey(Phaser.Keyboard.F);
    attackButton.onDown.add(swordAttack)

    
    //sumoMusic = game.add.audio('sumoMusic');
    //sumoMusic.play();
    

    game.camera.follow(player);

//    this.enemyLocData = JSON.parse(this.game.cache.getText('enemySpawnLoc'));
    moan = game.add.audio('moan');
    game.time.events.loop(Phaser.Timer.SECOND * .5, makePlayerVulnerable, this);
    
    // STARFOX TEST CODE STARTS HERE: https://phasergames.com/adding-message-box-phaser-games/
    //create a test button to launch the message box
    
    /*var buttonTest= game.add.sprite(game.width/2,game.height/2,"boxBack");
    buttonTest.anchor.set(0.5,0.5);
    buttonTest.inputEnabled=true;
    testMessageBox();
    */
    
    
    
}

var pHealth = 100; //player health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')
var dHealth = 5; //player health
var movingRight=true;
var hitPlatform = false; //if sam has hit platform
this.jumpingAllowed = true;
var hitSpikes = false;
var doggoArray = [];
//var enemyLocIndex = 0; //index variable for keeping track of enemy json file (which enemy that needs to spawn)
var enemiesSpawned = false;
var map;
var stone_platforms;
var background;
var spikes_layer;



function u_0() {
    
    game.physics.arcade.collide(player, stone_platforms, function(){hitPlatform = true}); //collide with platform (i.e. ground) check
    game.physics.arcade.collide(player, spikes_layer, function(){
        hitSpikes = true; 
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
    if(pFlinchToL.isPlaying) {
        player.body.velocity.x = -100;
    } else if (pFlinchToR.isPlaying) {
        player.body.velocity.x = 100;
    } else {
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
        playerHealth.text = "Sam HP: " + pHealth;
    
        if (cursors.up.isDown && hitPlatform && player.body.onFloor()) {
            player.body.velocity.y = -700;
            hitPlatform = false;
        }
    }
    
    
//    //reading data for enemy spawn points
//    if(this.enemyLocData.enemySpawnLoc[enemyLocIndex].x != -1) { //spawning enemies, check for array bounds
//        if(player.x >= this.enemyLocData.enemySpawnLoc[enemyLocIndex].x - 500 && this.enemyLocData.enemySpawnLoc[enemyLocIndex].x != lastEnemyX) {
//            //once player walks a certain distance before the enemy spawn, enemy spawns
//            if(this.enemyLocData.enemySpawnLoc[enemyLocIndex].type == 2) {
//                enemiesSpawned = true;
//                doggoArray.push(new Doggo(game, this.enemyLocData.enemySpawnLoc[enemyLocIndex].x, this.enemyLocData.enemySpawnLoc[enemyLocIndex].y, this.enemyLocData.enemySpawnLoc[enemyLocIndex].directionIsL, this.enemyLocData.enemySpawnLoc[enemyLocIndex].xBoundL, this.enemyLocData.enemySpawnLoc[enemyLocIndex].xBoundR));
//            }
//            lastEnemyX = this.enemyLocData.enemySpawnLoc[enemyLocIndex].x;
//            enemyLocIndex++;
//        }
//    }
    
//    //run checks for doggo
//    for(var i = 0; i < doggoArray.length; i++) {
////        console.log("new check: " + game.physics.arcade.overlap(doggoArray[i].doggoLedgeChecker, stone_platforms));
//        doggoArray[i].update();
//        if(player.x > doggoArray[i].leftBound() && player.x < doggoArray[i].rightBound()) {//&& player.body.onFloor()) { //if player in bounds of doggo and touching platform
//            if(doggoArray[i].transform()) { //if dog has transformed, move
//                doggoArray[i].moveNew();
//                //console.log(game.physics.arcade.overlap(doggoArray[i].doggoLedgeChecker, stone_platforms));
//            }
//        } else if(player.x < doggoArray[i].leftBound() || player.x > doggoArray[i].rightBound()) { //player is out of bounds, so change back
//            doggoArray[i].reform();
//        }
//        
//        if(playerVulnerable && game.physics.arcade.overlap(doggoArray[i].doggo, player)) {
//            moan.play();
//            pHealth -= 5; //remove 5 from player's health
//            playerVulnerable = false; //give player i frames
//            if(!pFlinchToR.isPlaying && !pFlinchToL.isPlaying) {
//                if(doggoArray[i].movingL) {
//                    player.animations.play("pFlinchToL");
//                } else {
//                    player.animations.play("pFlinchToR");
//                }
//            }
//        }
//        
//    }
    
    
    
    //start on initial bar scene INSERT THIS CODE FOR LOGIC ON CHANGING FROM CUTSCENE, DOOR
    var tutorial_done = false

    //if player has no health, go to game over state
    if(pHealth <= 0) {
        game.state.start('state2');
    }
    
    if(dHealth <= 0) { // victory
        door.kill();
        open = game.add.sprite(2239, game.world.height -437, 'open_door');
        open.scale.setTo(.23,.23);
        game.physics.enable(open, Phaser.Physics.ARCADE);
        open.body.immovable = true;
    } 
    if(game.physics.arcade.overlap(player, open)){
           var tutorial_done = true
    } // Overlap with player and door
    
    //spawn doggo
    
    
    //change once tutorial is completed
    if(tutorial_done){
        tutorial_done=false;
        game.state.start('state_level1')
    }

}

function r_0() {
    //game.debug.body(player);
//    for(var i = 0; i < doggoArray.length; i++) {
//        game.debug.body(doggoArray[i].doggo);
//        game.debug.body(doggoArray[i].doggoLedgeChecker);  
//    }
//    game.debug.body(stone_platforms);
    //game.debug.body(map);
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

function makePlayerVulnerable() {
    playerVulnerable = true;
}