var st_lev0 = {
    preload: p_0,
    create: c_0,
    update: u_0,
    render: r_0
}

var varState = 0;
    
//textbox code
var textNotCreated1 = true;
this.boxGone1 = false;

//textbox code
function createText() {

    playerHealth = game.add.text(38,2, '', { fontSize: '32px', fill: '#fff' });

	playerHealth.font = 'Revalia';
    playerHealth.fixedToCamera=true;
    
    instructions = game.add.text(38,38, 'use arrow keys to move, up key to jump, f key to attack', {fontSize: '22px', fill:'#fff'});
    instructions2 = game.add.text(38,62, 'use d key to throw shuriken when you have them', {fontSize: '22px', fill:'#fff'});
    instructions2.font = 'Permanent Marker';
    instructions.font = 'Permanent Marker';
    
    textNotCreated1 = false;
}


//textbox code
showMessageBox0 = function(text, w = 475, h = 150, x = 33, y = 40) {
    	//just in case the message box already exists
    	//destroy it
        if (this.msgBox) {
            this.msgBox.destroy();
        }
    
        spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
    
        this.checkForDespawn = function() {
            return spaceBar.isDown
        }
        
        this.hideBox = function() {
    	   //destroy the box when the button is pressed
            this.msgBox.destroy();
            this.boxGone = false
        }
    
        
        //make a group to hold all the elements
        var msgBox = game.add.group();
    
        //make the back of the message box    
        var back = game.add.sprite(0, 0, "boxBack");
        //make the close button
        var closeButton = game.add.sprite(0, 0, "closeButton");
        //make a text field
        text1 = game.add.text(0, 0, text, {fill:'#000', fontSize:'21px'});
        
        text1.font = 'Inconsolata';
        //set the textfeild to wrap if the text is too long
        text1.wordWrap = true;
        //make the width of the wrap 90% of the width 
        //of the message box
        text1.wordWrapWidth = w * .78;
        //
        //
        //set the width and height passed
        //in the parameters
        back.width = w;
        back.height = h;
        //
        //
        //
    
        //add the elements to the group
        msgBox.add(back);
        msgBox.add(closeButton);
        msgBox.add(text1);
        profile = game.add.sprite(0,0,'headshot');
        msgBox.add(profile);
        profile.scale.setTo(.14,.14);
        
        closeButton.scale.setTo(.05,.05);
        //enable the button for input
        closeButton.inputEnabled = true;
        //add a listener to destroy the box when the button is pressed
        closeButton.events.onInputDown.add(this.hideBox, this);
        //
        //
        //set the message box in the center of the screen
        //msgBox.x = game.width / 2 - msgBox.width / 2;
        //msgBox.y = game.height / 2 - msgBox.height / 2
        msgBox.x = x
        msgBox.y = y
        
        profile.x = msgBox.x + 2;
        profile.y = msgBox.y - 7;
    
        //set the close button
        //in the center horizontally
        //and near the bottom of the box vertically
        closeButton.x = msgBox.x + 40;
        closeButton.y = msgBox.y - 155;
        
        //
        //set the text in the middle of the message box
        text1.x = msgBox.x+58;
        text1.y = msgBox.y-10;
        //make a state reference to the messsage box
        this.msgBox = msgBox;
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
    game.load.image('healthbar', 'assets/Healthbars.png');
   
    //new tile
    game.load.tilemap('castle_map','assets/tilemap/tilemap8_spikes.json',null, Phaser.Tilemap.TILED_JSON);
    game.load.image('purple_tile', 'assets/tilemap/stonetilepurple.png')
    
    
    game.load.image('stone_tile', 'assets/tilemap/stone_tile2.png');
    game.load.image('castle_tile', 'assets/tilemap/castle_background_v2.png');
    game.load.image('spikes_tile', 'assets/tilemap/spikes3.png');

	
    //this.load.text('enemySpawnLoc', 'assets/EnemySpawn0.json');

    //textbox code
    game.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.image("boxBack", "assets/textboxnew.png");
    game.load.image("closeButton", "assets/xbutton.png")
    game.load.image('headshot', 'assets/playerHeadshot.png')
    console.log("state_level0");

}

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
var msgBox;

function c_0() {
    textNotCreated1 = true;
    //  Physics
    game.world.setBounds(0, 0, 800, 416);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    image = game.add.sprite(0, 0,'castle'); // first visible bkgd
    image.width = game.width;
    image.height = game.height + 100;
    game.physics.enable(image, Phaser.Physics.ARCADE); 
    
    //creating map
    map = game.add.tilemap('castle_map');
    
    //new tile
    map.addTilesetImage('stonetilepurple', 'purple_tile')
    
    map.addTilesetImage('stone_tile2','stone_tile')
    map.addTilesetImage('castle_background','castle_tile');
    map.addTilesetImage('spikes3','spikes_tile');
    
    
    //layers
    background = map.createLayer('Background');
    stone_platforms = map.createLayer('Platforms');
    spikes_layer = map.createLayer('Spikes');
    
    
    map.setCollisionBetween(1, 300, true, 'Platforms'); //basically tells what possible positions in the json file to check for
    map.setCollisionBetween(235,255,true, 'Spikes')
    
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
    
    var bmd = game.add.bitmapData(200,40);
             bmd.ctx.beginPath();
             bmd.ctx.rect(0,0,180,30);
             bmd.ctx.fillStyle = '#FFFFFF';
             bmd.ctx.fill();

             healthBar = game.add.sprite(38,2,bmd);
    healthBar.width=(pHealth/100)*200
    healthBar.fixedToCamera=true;
    healthbarformat=game.add.sprite(38,2,"healthbar");
    healthbarformat.height=healthBar.height-3;
    healthbarformat.width=182;
    healthbarformat.fixedToCamera=true;
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
    

    msgBox1 = new showMessageBox0("What are those, spikes?!? I thought having to jump to platforms was hard enough! (press spacebar)");
    
    
}

var pHealth = 100; //player health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')
var dHealth = 5; //player health
var movingRight=true;
var hitPlatform = false; //if sam has hit platform
this.jumpingAllowed = true;
var hitSpikes = false;
//var enemyLocIndex = 0; //index variable for keeping track of enemy json file (which enemy that needs to spawn)
var enemiesSpawned = false;
var map;
var stone_platforms;
var background;
var spikes_layer;



function u_0() {
    if(pHealth>=75){
        healthBar.tint=0x00FF00
    }
    if(pHealth>25 && pHealth<75){
        healthBar.tint=0xFFDB01
    }
    if(pHealth<=25){
        healthBar.tint=0xFF0000
    }
    if (pHealth>100){
        pHealth=100;
        healthBar.width=200*(pHealth/100);
    }
    if (pHealth<0){
        pHealth=0;
        healthBar.width=200*(pHealth/100);
    }
    
        
    game.physics.arcade.collide(player, stone_platforms, function(){hitPlatform = true}); //collide with platform (i.e. ground) check
    game.physics.arcade.collide(player, spikes_layer, function(){
        hitSpikes = true; 
        pHealth = pHealth - 50;
        healthBar.width = (pHealth/100)*200;
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
        //playerHealth.text = "Sam HP: " + pHealth;
    
        if (cursors.up.isDown && hitPlatform && player.body.onFloor()) {
            player.body.velocity.y = -700;
            hitPlatform = false;
        }
    }
    
    

    
    
    //start on initial bar scene INSERT THIS CODE FOR LOGIC ON CHANGING FROM CUTSCENE, DOOR
    var tutorial_done = false

    //if player has no health, go to game over state
    if(pHealth <= 0) {
        game.state.start('state2');
    }
    
    if(door.x - player.x <= 190) { // victory
        door.kill();
        open = game.add.sprite(2239, game.world.height -437, 'open_door');
        open.scale.setTo(.23,.23);
        game.physics.enable(open, Phaser.Physics.ARCADE);
        open.body.immovable = true;
    } 
    if(game.physics.arcade.overlap(player, open)){
           var tutorial_done = true
    } // Overlap with player and door
    
    //change once tutorial is completed
    if(tutorial_done){
        tutorial_done=false;
        //cheat code: start boss fight
        game.state.start('state_level1');
        //game.state.start('state_level1')
    }

    //textbox code
    if (this.boxGone1){
        //console.log("Creating text in u_0")
        //console.log(textNotCreated1)
        //console.log(textNotCreated1);
        if (textNotCreated1){
            createText();
            textNotCreated1 = false;
            
            console.log("Text created in update")
        }
    }
    
    //TEXTBOXCODE
    if (msgBox1.checkForDespawn()){
        msgBox1.hideBox()
        this.boxGone1 = true;
        console.log(this.boxGone1);
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