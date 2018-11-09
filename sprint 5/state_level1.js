var st_lev1 = {
    preload: p1,
    create: c1,
    update: u1,
    render: r1
}

var stateVar = 1
//textbox code
var textNotCreated2 = true;
var msgBox;
this.boxGone2 = false;

//textbox code
function createText() {

    playerHealth = game.add.text(38,2, 'Sam HP: 100', { fontSize: '32px', fill: '#fff' });

	playerHealth.font = 'Revalia';
    playerHealth.fixedToCamera=true;
    
    instructions = game.add.text(38,38, 'use arrow keys to move, up key to jump, f key to attack', {fontSize: '22px', fill:'#fff'});
    instructions2 = game.add.text(38,62, 'use d key to throw shuriken when you have them', {fontSize: '22px', fill:'#fff'});
    instructions2.font = 'Permanent Marker';
    instructions.font = 'Permanent Marker';
    
    textNotCreated2 = false;
}

//textbox code
showMessageBox = function(text, w = 475, h = 150, x = 33, y = 40) {
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
            this.boxGone2 = false
        }
    
        
        //make a group to hold all the elements
        var msgBox = game.add.group();
        //make the back of the message box
        var back = game.add.sprite(0, 0, "boxBack");
        //make the close button
        var closeButton = game.add.sprite(0, 0, "closeButton");
        //make a text field
        var text1 = game.add.text(0, 0, text, {fill:'#000', fontSize:'22px'});
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
        //
        
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
        
        //set the close button
        //in the center horizontally
        //and near the bottom of the box vertically
        closeButton.x = msgBox.x + 40;
        closeButton.y = msgBox.y - 155;
        
        //
        //set the text in the middle of the message box
        text1.x = msgBox.x;
        text1.y = msgBox.y-10;
        //make a state reference to the messsage box
        this.msgBox = msgBox;
    }


function p1() {
    //game.load.audio('sumoMusic', ['assets/audio/boss fight music.ogg', 'assets/audio/boss fight music.mp3']);
    game.load.audio('moan', 'assets/audio/pain.mp3');
    game.load.image('castle', 'assets/castle_background_v2.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('sam', 'assets/player_new2.png', 1100, 1100); //fixed version, need scale down
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

	game.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
    //game.load.spritesheet('swordsman', 'assets/green_enemy_fix2.png', 213, 116); //fixed version
    game.load.spritesheet('swordsman', 'assets/green_enemy_fix2.png', 639/3, 692/6); //fixed version
    game.load.spritesheet('shurikenThrower', 'assets/blue_enemy2.png', 500, 315);
    game.load.spritesheet('shuriken', 'assets/shuriken.png', 500, 315);
    game.load.spritesheet('shurikenDrop', 'assets/shuriken_drop.png', 180/3, 120);
    this.load.text('enemySpawnLoc', 'assets/EnemySpawn.json');
    
    //textbox code
    game.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.image("boxBack", "assets/textboxnew.png");
    game.load.image("closeButton", "assets/xbutton.png")
    
    console.log("state_level1");

}


EnemySwordsman = function(index, game, x, y, dropType) {
    
    //initializing body of enemy swordsman
    this.swordsman = game.add.sprite(x, y, 'swordsman');
    this.swordsman.anchor.setTo(.5, .5);
//    this.swordsman.scale.setTo(.4,.4);
    this.swordsman.scale.setTo(1,1);
    this.swordsman.autoCull = true;
    
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
    this.attackL1 = this.swordsman.animations.add('attackL1', [2, 3, 4], 10, false); // false because you dont' want animation to repeat constantly
    this.attackL2 = this.swordsman.animations.add('attackL2', [4, 3, 2], 10, false); // false because you dont' want animation to repeat constantly
    this.attackR1 = this.swordsman.animations.add('attackR1', [7, 8, 9], 10, false);
    this.attackR2 = this.swordsman.animations.add('attackR2', [9, 8, 7], 10, false);
    this.flinchToR = this.swordsman.animations.add('flinchToR', [10, 11, 12, 13, 13, 13, 12, 11, 10], 15, false);
    this.flinchToL = this.swordsman.animations.add('flinchToL', [14, 15, 16, 17, 17, 17, 16, 15, 14], 15, false);
    
    //create hitbox for enemy's sword. enemySwordHitbox is a child of enemyHitbox (children meaning in case you want to create multiple hitboxes)
    this.enemyHitbox = game.add.group();
    this.enemyHitbox.enableBody = true;
    this.swordsman.addChild(this.enemyHitbox);
    this.enemySwordHitbox = this.enemyHitbox.create(0, 0, null);
    this.enemySwordHitbox.body.setSize(50, 75, -75, -20);
    this.jumpingAllowed = true;
    
    //him standing and doing nothing
    this.stand = function() {
        this.swordsman.frame = 8;
    };
    
    this.myType = function() {
        return dropType;
    }
    
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
    this.attacked = function(pMovingRight) {
        if(this.vulnerable) {
            this.hitCount--;
            //play animation
            if(pMovingRight) {
                this.swordsman.animations.play('flinchToR');
            } else {
                this.swordsman.animations.play('flinchToL');
            }
            this.vulnerable = false;
        }
        return Boolean(this.hitCount <= 0); //boolean() function pointless
    };
    
    //signifies enemy has attacked, which helps let phaser know not to call the attack again too fast
    this.hasAttacked = function() {
        this.doneAttacking = true;
        if(this.lookingL) {
            this.swordsman.animations.play('attackL2');
        } else {
            this.swordsman.animations.play('attackR2');

        }
    };
    
    this.canJump = function() {
        this.jumpingAllowed = true;
    }
    
    this.movingR = function() {
        return this.lookingR;
    }
    
    game.time.events.loop(Phaser.Timer.SECOND * (1.5 +  game.rnd.integerInRange(1, 2)), this.canAttack, this); //how fast enemy animation should
    game.time.events.loop(Phaser.Timer.SECOND * .5, this.vulnerable, this); // i frames
    game.time.events.loop(Phaser.Timer.SECOND * (1.5 +  game.rnd.integerInRange(1, 2)), this.canJump, this);
    //movement tree for enemy
    this.move = function(pX, pY) { //pX = player.x position
        //game.debug.body(this.enemySwordHitbox);
        game.physics.arcade.collide(this.swordsman, stone_platforms);
        this.doneAttacking = false;
        if(this.flinchToR.isPlaying) {
            this.swordsman.body.velocity.x = 100;
        } else if(this.flinchToL.isPlaying) {
            this.swordsman.body.velocity.x = -100;
        } else { //move as normal
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
                    this.leftAttack = this.swordsman.play('attackL1');
                    this.leftAttack.onComplete.add(this.hasAttacked, this);
                    this.canAttack = false;
                }
            } else if(this.lookingR) {
                this.swordsman.body.velocity.x = 0;
                if(this.canAttack) { //if player is looking left and can attack (and by default via if statements), is not moving
                    this.rightAttack = this.swordsman.play('attackR1');
                    this.rightAttack.onComplete.add(this.hasAttacked, this);
                    this.canAttack = false;
                }
            } else {
                this.swordsman.body.velocity.x = 0;
                this.swordsman.frame = 8;
            }

            if(this.swordsman.y - pY > 200 && this.swordsman.body.onFloor() && this.jumpingAllowed) {
                this.swordsman.body.velocity.y = -700;
                this.jumpingAllowed = false;

            }
        }
    };
    
    //if swordsman is dead
    this.die = function() {
        console.log("should be dead");
        this.swordsman.kill();
    };
}

//This is the enemy shuriken thrower himself. Does not include shuriken object! Check out Shuriken for that
EnemyShurikenThrower = function(index, game, x, y, dropType) {
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
    this.shurikenThrower.autoCull = true;
    
    //creates the hitbox for image of the shurikenThrower
    this.shurikenThrower.body.setSize(100, 200, 220, 100); //need to fix sprite going left
    
    //animations
    this.shurikenThrower.animations.add('left', [0, 1], 3, true); //doesn't really use, but may want later
    this.shurikenThrower.animations.add('right', [5, 6], 3, true); //doesn't really use, but may want later
    this.attackL_beginning = this.shurikenThrower.animations.add('attackL_beginning', [2, 3, 4], 10, false); // false because you dont' want animation to repeat constantly
    this.attackL_end = this.shurikenThrower.animations.add('attackL_end', [4, 4, 4, 4, 3, 2], 10, false); // false because you dont' want animation to repeat constantly
    this.attackR_beginning = this.shurikenThrower.animations.add('attackR_beginning', [7, 8, 9], 10, false);
    this.attackR_end = this.shurikenThrower.animations.add('attackR_end', [9, 9, 9, 9, 8, 7], 10, false);
    this.flinchToR = this.shurikenThrower.animations.add('flinchToR', [10, 11, 12, 13, 13, 13, 12, 11, 10], 15, false);
    this.flinchToL = this.shurikenThrower.animations.add('flinchToL', [14, 15, 16, 17, 17, 17, 16, 15, 14], 15, false);
    
    
    //him standing and doing nothing
    this.stand = function() {
        this.shurikenThrower.frame = 8;
    };
    
    // use this marker to signify global variable
    this.canAttackAgain = true; //signifies timer is reset so enemy can attack
    this.vulnerable = true; //signifies invulnerability timer enmey reset
    this.lookingL = false; //signifies that character is looking Left
    this.lookingR = false; //signifies that character is looking right, note: can use only one boolean but I did this so it is easier to read
    this.extraDist = game.rnd.integerInRange(0, 20); // signifies extra distance enemy has away from player before attacking (to look right)
    velocity = game.rnd.integerInRange(200 , 300); // how fast they're moving
    this.doneAttacking = false; // after animation is complete
    this.hitCount = 2; // however many hits enemy has before dying
    
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
    this.attacked = function(pMovingRight) {
        if(this.vulnerable) {
            this.hitCount--;
            //play animation
            if(pMovingRight) {
                this.shurikenThrower.animations.play('flinchToR');
            } else {
                this.shurikenThrower.animations.play('flinchToL');
            }
            this.vulnerable = false;
        }
        return Boolean(this.hitCount <= 0); //boolean() function pointless
    };
    
    this.hasAttacked = function() {
        this.doneAttacking = true;
    };
    
        
    this.movingR = function() {
        return this.lookingR;
    }
    
    this.myType = function() {
        return dropType;
    }
    // 
    game.time.events.loop(Phaser.Timer.SECOND * (1.5 +  game.rnd.integerInRange(1, 2)), this.canAttack, this); //how fast enemy animation should
    game.time.events.loop(Phaser.Timer.SECOND * .5, this.vulnerable, this); // i frames
    
    this.addShuriken = function() {
        this.enemyShurikenArray.push(new Shuriken(game, this.shurikenThrower.x, this.shurikenThrower.y, this.lookingL));
        if(this.lookingL) {
            this.shurikenThrower.animations.play("attackL_end");
        } else {
            this.shurikenThrower.animations.play("attackR_end");
        }
    }
    
    //movement tree for enemy
    this.move = function(pX) { //pX = player.x position
        game.physics.arcade.collide(this.shurikenThrower, stone_platforms);
        if(this.flinchToR.isPlaying) {
            this.shurikenThrower.body.velocity.x = 100;
        } else if(this.flinchToL.isPlaying) {
            this.shurikenThrower.body.velocity.x = -100;
        } else {
            if(pX + this.extraDist <= this.shurikenThrower.x) { //go left. Note: extra dist used to make characters not overlap completely with each other
                this.lookingL = true;
                this.lookingR = false;
            } else if(pX - this.extraDist >= this.shurikenThrower.x) {
                this.lookingL = false;
                this.lookingR = true;
            }

            if(this.lookingL && pX + 350 >= this.shurikenThrower.x && this.canAttackAgain) {
                this.throwingShurikenL = this.shurikenThrower.animations.play("attackL_beginning");
                this.throwingShurikenL.onComplete.add(this.addShuriken, this);
//                this.enemyShurikenArray.push(new Shuriken(game, this.shurikenThrower.x, this.shurikenThrower.y, this.lookingL));
//                this.shurikenThrower.animations.play("attackL");
                this.canAttackAgain = false;
            } else if(this.lookingR && (pX - this.shurikenThrower.x <= 350 && pX - this.shurikenThrower.x >= 0) && this.canAttackAgain) {
                this.throwingShurikenR = this.shurikenThrower.animations.play("attackR_beginning");
                this.throwingShurikenR.onComplete.add(this.addShuriken, this);
//                this.enemyShurikenArray.push(new Shuriken(game, this.shurikenThrower.x, this.shurikenThrower.y, this.lookingL));
                this.canAttackAgain = false;
            } else if(!this.attackL_beginning.isPlaying && !this.attackR_beginning.isPlaying && !this.attackL_end.isPlaying && !this.attackR_end.isPlaying) {
                this.shurikenThrower.body.velocity.x = 0;
                if(this.lookingL) {
                    this.shurikenThrower.frame = 0;
                } else {
                    this.shurikenThrower.frame = 5;
                }
            }
        }
        for(var i = 0; i < this.enemyShurikenArray.length; i++) {
            if(this.enemyShurikenArray[i].checkForDespawn()) {
                this.enemyShurikenArray.splice(i, 1);
            } else {
                this.enemyShurikenArray[i].updateShuriken();
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

ItemDrop = function(game, name, x, y, time) {
    this.drop = game.add.sprite(x, y, name);
    this.drop.scale.setTo(.5, .5);
    game.physics.enable(this.drop, Phaser.Physics.ARCADE);
    this.drop.body.bounce.y = 0.2;
    this.drop.body.gravity.y = 1000;
    this.drop.body.collideWorldBounds = true;
    this.drop.animations.add('floating', [0, 1, 2, 3, 3, 2, 1, 0], 7, true);
    this.drop.animations.play('floating');
    
    this.despawnFromTime = function() {
        
    }
    
    this.myType = function() {
        return name;
    }
    
    this.update = function () {
        game.physics.arcade.collide(this.drop, stone_platforms, function(){hitPlatform=true});
    }
}

//SHURIKEN CLASS, USE THIS FOR ALL SHURIKENS IN GENERAL (Both sam and enemy)
Shuriken = function(game, x, y, goLeft) {
    
    //set up shuriken
    this.shuriken = game.add.sprite(x, y, 'shuriken');
    game.physics.arcade.enable(this.shuriken);
    this.shuriken.anchor.setTo(.5, .5);
    this.leftShuriken = this.shuriken.animations.add('LeftShuriken', [4,5,6,7], 15, true);
    this.rightShuriken = this.shuriken.animations.add('RightShuriken', [0,1,2,3], 15, true);
    this.shuriken.scale.setTo(.3, .3);
    this.shuriken.body.setSize(50, 50, 130, 130);
    
    //this is what promotes the shuriken to go to the left or right depending on how it was destined to go when created
    this.updateShuriken = function() {
        if(goLeft) {
            this.shuriken.animations.play("LeftShuriken");
            this.shuriken.body.velocity.x = -500;
            this.shuriken.body.setSize(50, 50, 130, 130);
        } else {
            this.shuriken.animations.play('RightShuriken');
            this.shuriken.body.velocity.x = 500;
            this.shuriken.body.setSize(50, 50, 320, 130);
        }
    }
    
    //despawns off screen
    //returns true when destroyed based on rules, false when not destroyed
    this.checkForDespawn = function() {
        if(this.shuriken.x < game.camera.x || this.shuriken.x > game.camera.x + game.camera.width) {
            this.shuriken.destroy();
            return true;
        }
        if(game.physics.arcade.collide(this.shuriken, stone_platforms)){
            this.shuriken.destroy();
            return true;
        }
        
        return false; //false when shuriken not destroyed
    }
}

var image; //background
var attackButton; // F to attack
var throwButton;// D to throw
var playerHealth; //keeps track of total player health
var bossHealth; //keeps track of total boss health
//var sumoMusic; //boss music
var instructions; //game instructions'
var instructions2;
var stone_platforms;
var map;
var background;
var hitbox;
var pShurikenThrowAnimation;
var pFlinchToL;
var pFlinchToR;
var tutorial_done=false;
var moan;

function c1() {
    textNotCreated2 = true;

    //sumoMusic.mute = true;

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
    player = game.add.sprite(50, game.world.height-130, 'sam');
    player.scale.setTo(.09,.09) //FIX SCALE HERE
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    
    //  Player physics properties
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 1100;
    player.body.collideWorldBounds = true;
    player.body.setSize(300, 600, 350, 350);
    
    //add shuriken drop
//    drop=game.add.sprite(400, game.world.height-280,"shurikendrop");
//    drop.scale.setTo(.2, .2);
//    game.physics.enable(drop, Phaser.Physics.ARCADE);
    
    player.autoCull = true; //tells phaser that you want to check game frame whether or not the player is inside camera bounds
    
//    drop.body.bounce.y = 0.2;
//    drop.body.gravity.y = 1000;
//    drop.body.collideWorldBounds = true;
//    drop.body.setSize(270, 230,0,0);
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
    pShurikenThrowAnimationL = player.animations.add('pShurikenThrowAnimationL', [10, 11, 12, 13, 14, 13, 12, 11], 10, false);
    pShurikenThrowAnimationR = player.animations.add('pShurikenThrowAnimationR', [15, 16, 17, 18, 19, 18, 17, 16], 10, false);
    pFlinchToL = player.animations.add('pFlinchToL', [20, 21, 22, 23, 23, 23, 22, 21, 20], 15, false);
    pFlinchToR = player.animations.add('pFlinchToR', [24, 25, 26, 27, 27, 27, 26, 25, 24], 15, false);
    
    cursors = game.input.keyboard.createCursorKeys();
    attackButton = game.input.keyboard.addKey(Phaser.Keyboard.F);
    attackButton.onDown.add(swordAttack)
    throwButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
    
    //camera moves
    game.camera.follow(player);
    
    //setting up JSON file to be read
    this.enemyLocData = JSON.parse(this.game.cache.getText('enemySpawnLoc'));
    game.time.events.loop(Phaser.Timer.SECOND * .5, makePlayerVulnerable, this);
    stateVar = 2
    moan = game.add.audio('moan');

    msgBox1 = new showMessageBox("Alright. Now that I have the Puracebo, I might as well use it to slash that door! (press spacebar)");
    
}

var pHealth = 100; //player health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')
var enemyLocIndex = 0; //index variable for keeping track of enemy json file (which enemy that needs to spawn)
var swordsmanArray = []; //array that starts out empty here, but later holds all the enemy objects. I.e. 
var shurikenThrowerArray = []; //array that starts out empty here, but later holds all the enemy objects. I.e. 
var itemDropArray = []
var hitPlatform = false; //if sam has hit platform
var lastEnemyX = 0; //not necessary now, but to be used later on to possibly deal with kill attack bug
var movingRight = true; //if sam is looking right, is true. Looking left = false
var playerShurikens = [];
var playerShurikenTotal = 0; //how many shurikens sam is holding
var canThrow = true;
var mustStay = false; //whether camera is fixed or not

function u1() {
    
    //textbox code
    if (this.boxGone2){
        //console.log("Creating text in u_0")
        //console.log(textNotCreated2)
        //console.log(textNotCreated2);
        if (textNotCreated2){
            createText();
            textNotCreated2 = false;
            
            console.log("Text created in update")
        }
    }
    
    //TEXTBOXCODE
    
    if (msgBox1.checkForDespawn()){
        msgBox1.hideBox()
        this.boxGone2 = true;
        console.log(this.boxGone2);
    }

    
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, stone_platforms, function(){hitPlatform = true}); //collide with platform (i.e. ground) check
    game.physics.arcade.TILE_BIAS = 40;
    game.physics.arcade.collide(player, stone_platforms);
    
//    game.physics.arcade.collide(drop, stone_platforms, function(){hitPlatform=true});
//    if (game.physics.arcade.collide(player,drop)){
//        playerShurikenTotal=playerShurikenTotal+10;
//        drop.kill();
//    }
    
    //add the sound effect 
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
                //shuriken throw animation
                if(movingRight) {
                    player.animations.play('pShurikenThrowAnimationR');
                } else {
                    player.animations.play('pShurikenThrowAnimationL');
                }
                playerShurikens.push(new Shuriken(game, player.x + 50, player.y + 50, !movingRight));
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
    }
    
    //reading data for enemy spawn points
    if(this.enemyLocData.enemySpawnLoc[enemyLocIndex].x != -1) { //spawning enemies, check for array bounds
        if(player.x >= this.enemyLocData.enemySpawnLoc[enemyLocIndex].x - 500 && this.enemyLocData.enemySpawnLoc[enemyLocIndex].x != lastEnemyX) {
            //once player walks a certain distance before the enemy spawn, enemy spawns
            if(this.enemyLocData.enemySpawnLoc[enemyLocIndex].type == 0) {
                swordsmanArray.push(new EnemySwordsman(enemyLocIndex, game, this.enemyLocData.enemySpawnLoc[enemyLocIndex].x, this.enemyLocData.enemySpawnLoc[enemyLocIndex].y, this.enemyLocData.enemySpawnLoc[enemyLocIndex].drop));
            } else if(this.enemyLocData.enemySpawnLoc[enemyLocIndex].type == 1) {
                shurikenThrowerArray.push(new EnemyShurikenThrower(enemyLocIndex, game, this.enemyLocData.enemySpawnLoc[enemyLocIndex].x, this.enemyLocData.enemySpawnLoc[enemyLocIndex].y, this.enemyLocData.enemySpawnLoc[enemyLocIndex].drop));
            }
            lastEnemyX = this.enemyLocData.enemySpawnLoc[enemyLocIndex].x;
            enemyLocIndex++;
        }
    }
    
    //update player's shurikens
    for(var i = 0; i < playerShurikens.length; i++) {
        if(playerShurikens[i].checkForDespawn()) {
            playerShurikens.splice(i, 1);
        } else {
            playerShurikens[i].updateShuriken();
        }
    }
    //release flag-key for player's shurikens, so that they don't shoot rapid fire
    if(!throwButton.isDown) {
        canThrow = true;
    }

    //note: removing player.body.touching.down allows player to jump, but means player can jump when alongside walls
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && hitPlatform && player.body.onFloor()) {
        player.body.velocity.y = -700;
        hitPlatform = false;
    }
    playerHealth.text = "Sam HP: " + pHealth + " | Shurikens: " + playerShurikenTotal; //player health is updated with current health and weapon left
    
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
        tutorial_done=false;
        game.state.start('state_level2')
        
    }
    var onScreenEnemy = false;
    //scan through every currently spawned enemy
    for(var i = 0; i < swordsmanArray.length; i++) {
        if(swordsmanArray[i].swordsman.inCamera && swordsmanArray[i].swordsman.x < game.camera.x + 300) {
           onScreenEnemy = true;
        }
        //player i frames are out       ... and enemy's sword hitbox overlaps with player           ...and swordsman has finished attack
        if(playerVulnerable && game.physics.arcade.overlap(swordsmanArray[i].enemyHitbox, player) && swordsmanArray[i].finishedAttack() && !pFlinchToR.isPlaying && !pFlinchToL.isPlaying) {
            if(swordsmanArray[i].movingR()) {
                player.animations.play("pFlinchToR");
            } else {
                player.animations.play("pFlinchToL");
            }
        }
        if(playerVulnerable && game.physics.arcade.overlap(swordsmanArray[i].enemyHitbox, player) && swordsmanArray[i].finishedAttack()) {
            moan.play();
            pHealth -= 5; //remove 5 from player's health
            playerVulnerable = false; //give player i frames
        }
        
        //swordsman death check if attackbutton is pressed
        swordsmanArray[i].move(player.x, player.y); //updates movement tree and does bulk of work
        if(attackButton.isDown) { //if player is attacking, you'll need to check if enemy is being hit
            if(game.physics.arcade.overlap(swordsmanArray[i].swordsman, hitbox)) { // Overlap with sword and player 2)) 
                if(swordsmanArray[i].attacked(movingRight)) {
                    if(swordsmanArray[i].myType() == 1) {
                        itemDropArray.push(new ItemDrop(game, "shurikenDrop", swordsmanArray[i].swordsman.x, swordsmanArray[i].swordsman.y, 10));
                    }
                    swordsmanArray[i].swordsman.destroy(); //if attacked returns true, means enemy is dead and therefore 'destroyed'
                    swordsmanArray.splice(i, 1);
                    if(swordsmanArray.length == 0) {
                        break;
                    }
                }
            }
            
        }
        
        //swordsman death check by shurikens
        for(var j = 0; j < playerShurikens.length; j++) {
            if(game.physics.arcade.overlap(swordsmanArray[i].swordsman, playerShurikens[j].shuriken)) {
                playerShurikens[j].shuriken.destroy(); //if attacked returns true, means enemy is dead and therefore 'destroyed'
                playerShurikens.splice(j, 1);
                if(swordsmanArray[i].attacked(movingRight)) {
                    if(swordsmanArray[i].myType() == 1) {
                        itemDropArray.push(new ItemDrop(game, "shurikenDrop", swordsmanArray[i].swordsman.x, swordsmanArray[i].swordsman.y, 10));
                    }
                    swordsmanArray[i].swordsman.destroy(); //if attacked returns true, means enemy is dead and therefore 'destroyed'
                    swordsmanArray.splice(i, 1);
                    break;
                }
            }
        }
        
    }
    
    //cycle through shuriken throwers
    for(var i = 0; i < shurikenThrowerArray.length; i++) {
        //if shuriken thrower is on screen a certain distance to left, don't let player advance
        if(shurikenThrowerArray[i].shurikenThrower.inCamera && shurikenThrowerArray[i].shurikenThrower.x < game.camera.x + 300) {
            onScreenEnemy = true;
        }
        
        shurikenThrowerArray[i].move(player.x); //updates movement tree and does bulk of work
        for(var j = 0; j < shurikenThrowerArray[i].enemyShurikenArray.length; j++) {
            if(game.physics.arcade.overlap(shurikenThrowerArray[i].enemyShurikenArray[j].shuriken, player) && playerVulnerable) {
                moan.play();
                console.log(shurikenThrowerArray[i].movingR());
                if(shurikenThrowerArray[i].movingR()) {
                    player.animations.play("pFlinchToR");
                } else {
                    player.animations.play("pFlinchToL");
                }
                pHealth -= 10;
                playerVulnerable = false;
                
            }
        }
        
        if(attackButton.isDown) { //if player is attacking, you'll need to check if enemy is being hit
            if(game.physics.arcade.overlap(shurikenThrowerArray[i].shurikenThrower, hitbox)) { // Overlap with sword and player 2)) {
                if(shurikenThrowerArray[i].attacked(movingRight)) {
                    if(shurikenThrowerArray[i].myType() == 1) {
                        itemDropArray.push(new ItemDrop(game, "shurikenDrop", shurikenThrowerArray[i].shurikenThrower.x, shurikenThrowerArray[i].shurikenThrower.y, 10));
                    }
                    shurikenThrowerArray[i].shurikenThrower.destroy(); //if attacked returns true, means enemy is dead and therefore 'destroyed'
                    shurikenThrowerArray.splice(i, 1);
                    if(shurikenThrowerArray.length == 0) {
                        break;
                    }
                }
            }
            
        }
        
        
        //player i frames are out       ... and enemy's sword hitbox overlaps with player           ...and swordsman has finished attack
        for(var j = 0; j < playerShurikens.length; j++) {
            if(game.physics.arcade.overlap(shurikenThrowerArray[i].shurikenThrower, playerShurikens[j].shuriken)) {
                playerShurikens[j].shuriken.destroy(); //if attacked returns true, means enemy is dead and therefore 'destroyed'
                playerShurikens.splice(j, 1);
                if(shurikenThrowerArray[i].attacked(movingRight)) {
                    if(shurikenThrowerArray[i].myType() == 1) {
                        itemDropArray.push(new ItemDrop(game, "shurikenDrop", shurikenThrowerArray[i].shurikenThrower.x, shurikenThrowerArray[i].shurikenThrower.y, 10));
                    }
                    shurikenThrowerArray[i].shurikenThrower.destroy(); //if attacked returns true, means enemy is dead and therefore 'destroyed'
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
    
    //Camera controls
    //if 2 or more people, the camera freezes on the people
    if(shurikenThrowerArray.length + swordsmanArray.length >= 2 && !mustStay) {
        var positionX = game.camera.x;
        var positionY = game.camera.y;
        game.camera.reset();
        game.camera.setPosition(positionX, positionY);
        mustStay = true;
    }
    if(!onScreenEnemy) { //if there are no on screen enemies, camera does not need to move
        mustStay = false;
        game.camera.follow(player, .04, .04);
    }
    
    for(var i = 0; i < itemDropArray.length; i++) {
        itemDropArray[i].update();
        if(game.physics.arcade.overlap(player, itemDropArray[i].drop)) {
            if(itemDropArray[i].myType() == "shurikenDrop") {
                playerShurikenTotal += 3;
            }
            itemDropArray[i].drop.destroy();
            itemDropArray.splice(i, 1);
        }
    }
}

//note: some functions are small, but are as functions with the idea that more will be added to them later

//just for debugging purposes. Comment out before submitting, but do not delete now!
function r1() {
//    //game.debug.body(swordHitbox);
//    //game.debug.spriteBounds(this.hitbox.swordHitbox);
//    for(var i = 0; i < swordsmanArray.length; i++) {
//        //game.debug.body(swordsmanArray[i].swordsman);
//    }
//    for(var i = 0; i < shurikenThrowerArray.length; i++) {
//        //game.debug.body(shurikenThrowerArray[i].shurikenThrower);
//        for(var j = 0; j < shurikenThrowerArray[i].enemyShurikenArray.length; j++) {
//            //game.debug.body(shurikenThrowerArray[i].enemyShurikenArray[j].shuriken);
//        }
//    }
    //game.debug.body(drop);
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
