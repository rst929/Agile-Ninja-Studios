var st_tut = {
    preload: p_tut,
    create: c_tut,
    update: u_tut,
    render: r_tut
}

//textbox code
var msgBox;
var textNotCreated = true;
//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia', 'Teko', 'Permanent Marker', 'Lato', 'Inconsolata']
    }
};

//textbox code
createText = function() {
    
    console.log("Text instructions, health created");

    playerHealth = game.add.text(38,2, '', { fontSize: '32px', fill: '#fff' });

	playerHealth.font = 'Revalia';
    playerHealth.fixedToCamera=true;
    
    instructions = game.add.text(38,38, 'use arrow keys to move, up key to jump, f key to attack', {fontSize: '22px', fill:'#fff'});
    instructions2 = game.add.text(38,62, 'use d key to throw shuriken when you have them', {fontSize: '22px', fill:'#fff'});
    instructions2.font = 'Permanent Marker';
    instructions.font = 'Permanent Marker';
    
    textNotCreated = false;
}

function p_tut() {
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
    game.load.image('healthbar', 'assets/Healthbars.png');
    game.load.image('closed_door', 'assets/closed_door.png');
    game.load.image('headshot', 'assets/playerHeadshot.png')
    
	game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    //textbox code
    game.load.image("boxBack", "assets/textboxnew.png");
    game.load.image("closeButton", "assets/xbutton.png")
}

var image; //background
var attackButton; // F to attack
var playerHealth; //keeps track of total player health
var bossHealth; //keeps track of total boss health
var sumoMusic; //boss music
var instructions; //game instructions'
var tutorial_done=false;


//textbox code
showMessageBox_tut = function(text, w = 475, h = 150, x = 33, y = 0) {
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
        text1.wordWrapWidth = w * .8;
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

//textbox code
var msgBox;
var healthBar;
this.boxGone = false;

function c_tut() {
    textNotCreated = true;
    //game.state.restart(true,true);
    
    //  Physics
    game.world.setBounds(0, 0, 800, 416);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    image = game.add.sprite(0, 0,'castle'); // first visible bkgd
    image.width = game.width;
    image.height = game.height + 100;
    game.physics.enable(image, Phaser.Physics.ARCADE); 
    
    
    // create platform for ground
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 25, 'ground');
    ground.scale.setTo(2, 2); //make ground right size
    
    var stone1 = platforms.create(-20, game.world.height - 200, 'stone_flat');
    stone1.width = game.world.width/2;
    
    var stone2 = platforms.create(500, game.world.height - 325, 'stone_flat');
    stone2.width = game.world.width/2;
    
    stone = game.add.sprite(0, game.world.height - 290, 'stone');
    stone.width = game.width;
    stone.height = 300;
    stone.height = 300;
    game.physics.enable(stone, Phaser.Physics.ARCADE);

    //  Make ground stable
    ground.body.immovable = true;
    stone1.body.immovable = true;
    stone2.body.immovable = true;
    
    door = game.add.sprite(660, game.world.height-470, 'closed_door');
    door.scale.setTo(.23, .23);
    
    game.physics.enable(door, Phaser.Physics.ARCADE);
    door.body.immobile = true;
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
    player.body.gravity.y = 1100;
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

    
    sumoMusic = game.add.audio('sumoMusic');
    sumoMusic.play();
    
    var bmd = game.add.bitmapData(200,40);
             bmd.ctx.beginPath();
             bmd.ctx.rect(0,0,180,30);
             bmd.ctx.fillStyle = '#008000';
             bmd.ctx.fill();

             healthBar = game.add.sprite(38,2,bmd);
    healthBar.width=(pHealth/100)*200
    healthBar.fixedToCamera=true;
    healthbarformat=game.add.sprite(38,2,"healthbar");
    healthbarformat.height=healthBar.height-3;
    healthbarformat.width=182;
    healthbarformat.fixedToCamera=true;
    game.camera.follow(player);
    
    
    // STARFOX TEST CODE STARTS HERE: https://phasergames.com/adding-message-box-phaser-games/
    //create a test button to launch the message box
    //textbox code
    msgBox1 = new showMessageBox_tut("Alright. Now that I have the Puracebo, I might as well use it to slash that door! (press spacebar)",475,150,25,40);
    

}

var pHealth = 100; //player health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')
var dHealth = 5; //player health
var movingRight=true;

function u_tut() {
    
    
    //textbox code
    if (this.boxGone){
        //console.log(this.boxGone);
        //console.log("Creating text in u_0")
        //console.log(textNotCreated)
        
        if (textNotCreated){
            createText();
            textNotCreated = false;
            console.log("Text created in update")
        }
    }
    
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms); //collide with platform (i.e. ground) check
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

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -700;
    }
    //playerHealth.text = "Sam HP: " + pHealth;
    
    
    //start on initial bar scene INSERT THIS CODE FOR LOGIC ON CHANGING FROM CUTSCENE, DOOR

    var tutorial_done = false

    
    if(dHealth <= 0) { // victory
        door.kill();
        open = game.add.sprite(660, game.world.height -470, 'open_door');
        open.scale.setTo(.23,.23);
        game.physics.enable(open, Phaser.Physics.ARCADE);
        open.body.immovable = true;
    } 
    if(game.physics.arcade.overlap(player, open)){
           var tutorial_done = true
    } // Overlap with player and door
    //change once tutorial is completed
    if(tutorial_done){
        //game.state.remove(game.state.curret);
        tutorial_done=false;
        game.state.start('state_level0')
        //game.state.start('state_level1')
    }
    
    //TEXTBOXCODE
    if (msgBox1.checkForDespawn()){
        msgBox1.hideBox()
        this.boxGone = true;
    }

}

function r_tut() {
    //game.debug.body(player);
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
    player.body.velocity.x = 300;
    player.animations.play('right');
    movingRight = true;
    
    

}