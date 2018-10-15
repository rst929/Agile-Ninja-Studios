var st_lev1 = {
    preload: p1,
    create: c1,
    update: u1,
    render: r1
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
    game.load.image('open_door', 'assets/open_door.png');

    game.load.tilemap('castle_map','assets/tilemap/castle.json',null, Phaser.Tilemap.TILED_JSON);
    game.load.image('stone_tile', 'assets/tilemap/stone_tile2.png');
    game.load.image('castle_tile', 'assets/tilemap/castle_background_v2.png');
    
    game.load.spritesheet('swordsman', 'assets/green_enemy.png', 285, 325);
    this.load.text('enemySpawnLoc', 'assets/EnemySpawn.json');
}

EnemySwordsman = function(index, game, x, y) {

    this.swordsman = game.add.sprite(x, y, 'swordsman');
    this.swordsman.anchor.setTo(.5, .5);
    this.swordsman.scale.setTo(.45,.45);
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(this.swordsman);
    
//    //create timer
//    var attackTimer;
//    attackTimer = game.time.create(false);
//    attackTimer.loop(2000 + game.rnd.integerInRange(100, 200), console.log(2000 + game.rnd.integerInRange(100, 200)), this);
    
    this.swordsman.body.bounce.y = 0.2;
    this.swordsman.body.gravity.y = 1000;
    this.swordsman.body.collideWorldBounds = true;
    //this.swordsman.body.setSize(15, 40, 0, 100);
    
    //animations
    this.swordsman.animations.add('left', [8, 9], 3, true);
    this.swordsman.animations.add('right', [6, 7], 3, true);
    var attackL = this.swordsman.animations.add('attackL', [0, 1, 2, 2, 1, 0], 10, false);
    var attackR = this.swordsman.animations.add('attackR', [3, 4, 5, 5, 4, 3], 10, false);
    
    
    this.stand = function() {
        this.swordsman.frame = 8;
    };
    
    
    var canAttack = false;
    var lookingL = false;
    var lookingR = false;
    var extraDist = game.rnd.integerInRange(0, 10);
    var velocity = game.rnd.integerInRange(200 , 300);
    
    this.canAttack = function() {
        canAttack = true;
    };
    
    game.time.events.loop(Phaser.Timer.SECOND * (1 +  game.rnd.integerInRange(1, 2)), this.canAttack, this);
    
    this.move = function(pX) {
        console.log(canAttack);
        if(pX + 100 + extraDist <= this.swordsman.x) { //go left
            this.swordsman.body.velocity.x = -velocity;
            this.swordsman.animations.play('left');
            lookingL = true;
            lookingR = false;
//            attackTimer.stop(false);
            
        } else if (pX - extraDist >= this.swordsman.x) { //go right
            this.swordsman.body.velocity.x = velocity;
            this.swordsman.animations.play('right');
            lookingL = false;
            lookingR = true;
//            attackTimer.stop(false);
        } else if(lookingL) {
            this.swordsman.body.velocity.x = 0;
            if(canAttack) {
                this.swordsman.play('attackL');
                canAttack = false;
            }
            
        } else if(lookingR) {
            this.swordsman.body.velocity.x = 0;
            if(canAttack) {
                this.swordsman.play('attackR');
                canAttack = false;
            }
        } else {
            this.swordsman.body.velocity.x = 0;
            this.swordsman.frame = 8;
        }
    }
    
    //if swordsman is dead
    this.die = function() {
        //isDead = true;
        //swordsman.animations.play('dead');
        //swordsman.animations.currentAnim.onComplete.destroy();
        swordsman.destroy();
    };
    //if()
}

var image; //background
var attackButton; // F to attack
var playerHealth; //keeps track of total player health
var bossHealth; //keeps track of total boss health
var sumoMusic; //boss music
var instructions; //game instructions'
var stone_platforms;
//var background;

var map;
var stone_platforms;
var background;


function c1() {
    
    //game.world.setBounds(0, 0, 2400, 416);
    //  Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //creating map
    map = game.add.tilemap('castle_map');
    map.addTilesetImage('stone_tile2','stone_tile')
    map.addTilesetImage('castle_background','castle_tile');
    
    //layers
    background = map.createLayer('Background');
    stone_platforms = map.createLayer('Platforms');
    //map.setTileIndexCallback(26, loggedVal, this);
    
    map.setCollisionBetween(1, 300, true, 'Platforms');    
    map.width=game.width;
    map.height=game.height+100;
    background.resizeWorld();
    stone_platforms.resizeWorld();
    stone_platforms.debug = true;
    
    // The player and its settings
    player = game.add.sprite(350, game.world.height - 500, 'sam');
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
    playerHealth.fixedToCamera=true;
    
    sumoMusic = game.add.audio('sumoMusic');
    sumoMusic.play();
    
    instructions = game.add.text(17,55, 'use arrow keys to move, up key to jump, f key to attack', {fontSize: '25px', fill:'#fff'});
    //camerma moves
    
    game.camera.follow(player);
    
    //setting up JSON file to be read
    this.enemyLocData = JSON.parse(this.game.cache.getText('enemySpawnLoc'));
    //add door
    door = game.add.sprite(2100, game.world.height-380, 'closed_door');
    door.scale.setTo(.3, .3);
    game.physics.enable(door, Phaser.Physics.ARCADE);
    door.body.immobile = true;
}

var pHealth = 100; //player health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')
var enemyLocIndex = 0;
var swordsmanArray = [];
var hitPlatform = false;

function u1() {
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, stone_platforms, function(){hitPlatform = true}); //collide with platform (i.e. ground) check
    console.log(hitPlatform);
    game.physics.arcade.TILE_BIAS = 40;
    game.physics.arcade.collide(player, stone_platforms);
    
    //game.physics.arcade.collide(player, map);
    
    //movement tree for player
    if (cursors.left.isDown) {
        movePLeft();
        //player.body.velocity.x = -150;

    } else if (cursors.right.isDown) {
        movePRight();
        //player.body.velocity.x = 150;

        if(this.enemyLocData.enemySpawnLoc[enemyLocIndex].x != -1) { //spawning enemies, check for array bounds
            if(player.x == this.enemyLocData.enemySpawnLoc[enemyLocIndex].x) {
                swordsmanArray.push(new EnemySwordsman(enemyLocIndex, game, player.x + 20, player.y));
                //swordsman.stand();f
                enemyLocIndex++;
            }
        }
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

    //note: removing player.body.touching.down allows player to jump, but means player can jump when alongside walls
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && hitPlatform && player.body.onFloor()) {
        player.body.velocity.y = -700;
        hitPlatform = false;
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

function r1() {
    game.debug.body(stone_platforms);
    game.debug.body(player);
    
}
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