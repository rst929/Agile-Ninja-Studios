var st1 = {
    preload: p1,
    create: c1,
    update: u1,
    render: r1
}

//textbox code
var textNotCreated1 = true;
var msgBox;
this.boxGone1 = false;

//textbox code
function createText() {

    playerHealth = game.add.text(38,2, '', { fontSize: '32px', fill: '#fff' });

	playerHealth.font = 'Revalia';
    playerHealth.fixedToCamera=true;
    
    textNotCreated1 = false;
}

//textbox code
showMessageBox_1boss = function(text, w = 475, h = 150, x = 33, y = 40) {
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
            this.boxGone1 = false
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
        text1.wordWrapWidth = w * .76;
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

function p1() {
    game.load.audio('moan', 'assets/audio/pain.mp3');
    game.load.audio('sumoMusic', ['assets/audio/boss fight music.ogg', 'assets/audio/boss fight music.mp3']);
    game.load.image('castle', 'assets/castle.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('sam', 'assets/player_new3.png', 1100, 1100); //fixed version, need scale down
    game.load.image('stone', 'assets/stone.png')
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
    game.load.spritesheet('sumo', 'assets/sumo.png', 110, 110);
    game.load.image('wave', 'assets/Wave smash.png')
    game.load.image('healthbar', 'assets/Healthbars.png');
    game.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.image("boxBack", "assets/textboxnew.png");
    game.load.image("closeButton", "assets/xbutton.png")
    game.load.image('headshot', 'assets/playerHeadshot.png')
}

var image; //background
var attackButton; // F to attack
var playerHealth; //keeps track of total player health
var bossHealth; //keeps track of total boss health
var sumoMusic; //boss music
var moan;
var pFlinchToL;
var pFlinchToR;
var pFlinchToLD;
var sumoHitboxes;
var sumoInnerHitbox;

function c1() {
    
    game.world.setBounds(0, 0, 800, 416);

    //  Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    image = game.add.sprite(0, 0, 'castle'); // first visible bkgd
    image.width = game.width;
    image.height = game.height+20;
    game.physics.enable(image, Phaser.Physics.ARCADE); 
    
    
    // create platform for ground
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2); //make ground right size
    
    stone = game.add.sprite(0, game.world.height - 290, 'stone');
    stone.width = game.width;
    stone.height = 300;
    game.physics.enable(stone, Phaser.Physics.ARCADE);

    //  Make ground stable
    ground.body.immovable = true;
    
    sumo = game.add.sprite(game.world.width - 300, game.world.height - 450, 'sumo');
    sumo.scale.setTo(3,3);
    
    // The player and its settings
    player = game.add.sprite(250, game.world.height - 250, 'sam');
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
    game.physics.arcade.enable(sumo);
    game.physics.arcade.enable(swordHitbox);
    
    //  Player physics properties
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 1100;
    player.body.collideWorldBounds = true;
    player.body.setSize(300, 600, 350, 350);

    //sumo physics properties
    sumo.body.bounce.y = 0.2;
    sumo.body.gravity.y = 1000;
    sumo.body.collideWorldBounds = true;
    sumo.body.setSize(50, 75, 45, 24);
    
    sumoHitboxes = game.add.group();
    sumoHitboxes.enableBody = true;
    sumo.addChild(sumoHitboxes);
    sumoInnerHitbox = sumoHitboxes.create(0, 0, null); // creating the hitbox itself
    sumoInnerHitbox.body.setSize(100, 200, 185, 100); //hitbox parameters for sword (adjust these to work with sam's sprite)
    game.physics.arcade.enable(sumoInnerHitbox); //so can be used for overlap
    
    //wave properties 
    wave = game.add.sprite(sumo.x, sumo.y, 'wave');
    wave.scale.setTo(.8, .8);
    game.physics.arcade.enable(wave);
    wave.body.setSize(50, 200, 115, 100);
    wave.kill();
    
    //  animations, true 
    player.animations.add('left', [5, 6], 10, true);
    player.animations.add('attackL', [7, 8, 9], 10, true);
    player.animations.add('right', [0, 1], 10, true);
    player.animations.add('attackR', [2, 3, 4], 10, true);
    pFlinchToL = player.animations.add('pFlinchToL', [20, 21, 22, 23, 23, 23, 22, 21, 20], 15, false);
    pFlinchToR = player.animations.add('pFlinchToR', [24, 25, 26, 27, 27, 27, 26, 25, 24], 15, false);
    pFlinchToLD = player.animations.add('pFlinchToLD', [20, 21, 22, 23, 23, 23, 22, 21, 20, 28, 29, 30, 31, 32, 32, 33, 33, 34, 34, 33, 33, 32, 32, 33, 33, 34, 34, 33, 33, 32, 32, 33, 33, 34, 34, 33, 33, 32, 32, 33, 33, 34, 34], 15, false);
    pFlinchToRD = player.animations.add('pFlinchToRD', [24, 25, 26, 27, 27, 27, 26, 25, 24, 35, 36, 37, 38, 39, 39, 40, 40, 41, 41, 40, 40, 39, 39, 40, 40, 41, 41, 40, 40, 39, 39, 40, 40, 41, 41, 40, 40, 39, 39, 40, 40, 41, 41], 15, false);
    
    sumo.animations.add('attack', [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 1, 0], 20, false);
    
    cursors = game.input.keyboard.createCursorKeys();
    attackButton = game.input.keyboard.addKey(Phaser.Keyboard.F);
    attackButton.onDown.add(swordAttack)
    playerHealth = game.add.text(38, 2, '', { fontSize: '32px', fill: '#fff' });
    playerHealth.font = 'Revalia';
    bossHealth = game.add.text(500,2, '', { fontSize: '32px', fill: '#fff' });
    bossHealth.font = 'Revalia';
    game.time.events.loop(Phaser.Timer.SECOND * 3, sumoAttack, this);
    game.time.events.loop(Phaser.Timer.SECOND * 1, makeSumoVulnerable, this);
    game.time.events.loop(Phaser.Timer.SECOND * 1, makePlayerVulnerable, this);
    
    //sumoMusic = game.add.audio('sumoMusic');
    //sumoMusic.play();
    //player healthbar
    var bmd = game.add.bitmapData(200,40);
             bmd.ctx.beginPath();
             bmd.ctx.rect(0,0,180,30);
             bmd.ctx.fillStyle = '#FF0000';
             bmd.ctx.fill();

             healthBar = game.add.sprite(38,2,bmd);
             bossHealth = game.add.sprite(500,2,bmd);
    
    healthBar.width=(pHealth/100)*200
    healthBar.fixedToCamera=true;
    healthbarformat=game.add.sprite(38,2,"healthbar");
    healthbarformat.height=healthBar.height-3;
    healthbarformat.width=182;
    healthbarformat.fixedToCamera=true;
    game.camera.follow(player);
    //boss healthbar
    bossHealth.width = (bHealth/100)*200
    bossHealth.fixedToCamera=true;
    bossformat=game.add.sprite(500,2,"healthbar");
    bossformat.height=bossHealth.height-3;
    bossformat.width=182;
    bossformat.fixedToCamera=true;
    textNotCreated1 = true;
    msgBox1 = new showMessageBox_1boss("HOLY SHITAKE MUSHROOM, HE'S HUGE! Why did they have the sumo block the door?!? (press spacebar)");
}

var pHealth = 100; //player health
var bHealth = 100; //boss / sumo health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')
var sumoVulnerable = true; // if sumo is vulnerable (out of 'i frames')
var movingRight=true;

function u1() {
    if (pHealth>100){
        pHealth=100;
        healthBar.width=200*(pHealth/100);
    }
    if (pHealth<0){
        pHealth=0;
        healthBar.width=200*(pHealth/100);
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
    
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms); //collide with platform (i.e. ground) check
    var hitPlatform2 = game.physics.arcade.collide(sumo, platforms); //collide with platform (i.e. ground) check
    var swordHit = game.physics.arcade.overlap(sumo, hitbox); // Overlap with sword and player 2
    var runIntoSumo = game.physics.arcade.overlap(player, sumoHitboxes); // Overlap with player and sumo
    moan = game.add.audio('moan');
    
    //movement tree for player
    if(pFlinchToL.isPlaying || pFlinchToLD.isPlaying) {
        if(player.frame != 32 || player.frame != 33 || player.frame != 34) {
            player.body.velocity.x = -100;
        } else {
            player.body.velocity.x = 0;
        }
    } else  {
        if (cursors.left.isDown) {
            movePLeft();
            //swordHitbox.body.setSize(40, 60, 0, 20); //hitbox parameters for sword (adjust these to work with sam's sprite)
        } else if (cursors.right.isDown) {
            movePRight();
            //swordHitbox.body.setSize(40, 60, 55, 20); //hitbox parameters for sword (adjust these to work with sam's sprite)
        } else if(attackButton.isDown) {
            if(movingRight){
                player.animations.play("attackR");
            }else if (movingRight==false){
                player.animations.play("attackL");
            }
            if(swordHit && sumoVulnerable) { //hitbox check for sumo boss to take away health
                bHealth -= 5;
                bossHealth.width = (bHealth/100)*200
                sumoVulnerable = false; 
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

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -700;
    }
    //playerHealth.text = "Sam HP: " + pHealth;
    //bossHealth.text = "Boss HP: " + bHealth;
    
    //if wave is alive, send it to the left offscreen and check if it hits player
    if(wave.alive) {
        wave.x -= 7;
        if(wave.x < -150) {
            wave.kill();
        } else {
            if(game.physics.arcade.overlap(player, wave) && playerVulnerable && !pFlinchToL.isPlaying && !pFlinchToLD.isPlaying) {
                pDamage(25);
                if(pHealth <= 0) {
                    player.animations.play("pFlinchToLD");
                } else {
                    player.animations.play("pFlinchToL");
                }
                moan.play();
                playerVulnerable = false;
            }
        }
    }
    
    //if player runs into sumo, damage him
    if(runIntoSumo) {
        if(playerVulnerable && !pFlinchToL.isPlaying) {
            pDamage(3);
            if(pHealth <= 0) {
                player.animations.play("pFlinchToLD");
            } else {
                player.animations.play("pFlinchToL");
            }
            moan.play();
            playerVulnerable = false;
        }
    }
    
    //check for winning/defeat conditions
    if(bHealth <= 0) { // victory
        game.state.start('state3');
    } else if(pHealth <= 0 && !pFlinchToLD.isPlaying) { // defeat
        game.state.start('state2');
    }
}

function r1() {
//    game.debug.body(sumoInnerHitbox);
//    game.debug.body(sumo);
}


//note: some functions are small now, but idea is that they'll grow with the game
function deathScene() {
    game.state.start('state1');
}

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

function sumoAttack() {
    sumo.animations.play('attack');
    sumo.animations.currentAnim.onComplete.add(waveSpawn)
}

function waveSpawn() {
    wave.reset(sumo.x, sumo.y + 90);
}

function pDamage(amount) {
    pHealth -= amount;
    healthBar.width = (pHealth/100)*200;
}

function makeSumoVulnerable() {
    sumoVulnerable = true;
}

function makePlayerVulnerable() {
    playerVulnerable = true;
}