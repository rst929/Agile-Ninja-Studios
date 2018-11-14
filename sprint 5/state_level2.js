var st_lev2 = {
    preload: p2,
    create: c2,
    update: u2,
    render: r2
}

var stateVar = 2
//textbox code
var textNotCreated1 = true;
var msgBox;
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
showMessageBox2 = function(text, w = 475, h = 150, x = 33, y = 40) {
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

function p2() {
    //game.load.audio('sumoMusic', ['assets/audio/boss fight music.ogg', 'assets/audio/boss fight music.mp3']);
    game.load.audio('moan', 'assets/audio/pain.mp3');
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
    game.load.image('closed_door', 'assets/closed_door.png');
    game.load.image('open_door', 'assets/open_door.png');
    game.load.spritesheet('heart', 'assets/heart.png', 135/3, 90);
    game.load.tilemap('castle_map','assets/tilemap/tilemap8_dog.json',null, Phaser.Tilemap.TILED_JSON);
    game.load.image('purple_tile', 'assets/tilemap/stonetilepurple.png')
    game.load.image('stone_tile', 'assets/tilemap/stone_tile2.png');
    game.load.image('castle_tile', 'assets/tilemap/castle_background_v2.png');
    game.load.image('spikes_tile', 'assets/tilemap/spikes3.png')
    
    game.load.image('healthbar', 'assets/Healthbars.png');
    //game.load.spritesheet('swordsman', 'assets/green_enemy_fix2.png', 213, 116); //fixed version
    game.load.spritesheet('swordsman', 'assets/green_enemy_fix2.png', 639/3, 692/6); //fixed version
    game.load.spritesheet('shurikenThrower', 'assets/blue_enemy2.png', 500, 315);
    game.load.spritesheet('shuriken', 'assets/shuriken.png', 500, 315);
    game.load.spritesheet('shurikenDrop', 'assets/shuriken_drop.png', 180/3, 120);
    this.load.text('enemySpawnLoc0', 'assets/EnemySpawn0.json');
    game.load.spritesheet('dog', 'assets/Doggo.png', 375, 375);
    console.log("state_level2");
    
        //textbox code
    game.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.image("boxBack", "assets/textboxnew.png");
    game.load.image("closeButton", "assets/xbutton.png")
    game.load.image('headshot', 'assets/playerHeadshot.png')


}
Doggo = function(game, x, y, goingL, xBoundL, xBoundR) {
    this.doggo = game.add.sprite(x, y, 'dog');
    this.doggo.scale.setTo(.35, .35);
    this.doggo.anchor.setTo(.5, .5);
    game.physics.enable(this.doggo, Phaser.Physics.ARCADE);
    
    //gravity of doggo
    this.doggo.body.bounce.y = 0.2;
    this.doggo.body.gravity.y = 1000;
    this.doggo.body.collideWorldBounds = true;    
    
    //doggo animations
    this.pantL = this.doggo.animations.add("pantL",[0, 1], 4, true);
    this.pantR = this.doggo.animations.add("pantR",[10, 11], 4, true);
    this.runL = this.doggo.animations.add("runL", [5, 6, 7, 8, 9], 15, true);
    this.runR = this.doggo.animations.add("runR", [15, 16, 17, 18, 19], 15, true);
    this.transformL = this.doggo.animations.add("transformL", [0, 2, 3, 4], 15, false);
    this.reformL = this.doggo.animations.add("reformL", [4, 3, 2, 0], 15, false);
    this.transformR = this.doggo.animations.add("transformR", [10, 12, 13, 14], 15, false);
    this.reformR = this.doggo.animations.add("reformR", [14, 13, 12, 10], 15, false);
    this.returnToRestL = this.doggo.animations.add("returnToRestL", [9, 8, 7, 6, 5, 4], 15, false);
    this.returnToRestR = this.doggo.animations.add("returnToRestR", [19, 18, 17, 16, 15, 14], 15, false);
    
    //transferring passed in left and right bounds
    this.xBoundL = xBoundL;
    this.xBoundR = xBoundR;
    this.hasTranformed = false;
    
    //ledge checker is a hitbox of the dog that is for the purposes of edge detection. Not affiliated with doggo's damage output
    this.ledgeChecker = game.add.group();
    this.ledgeChecker.enableBody = true;
    this.doggo.addChild(this.ledgeChecker);
    this.doggoLedgeChecker = this.ledgeChecker.create(0, 0, null);
    this.doggo.body.setSize(150, 90, 100, 160);
    this.doggoLedgeChecker.body.setSize(5, 50, -60, -100);
    game.physics.arcade.enable(this.ledgeChecker);
    
    //tiemr stuff
    this.timer = game.time.create();
    // Create a delayed event 1m and 30s from now
    this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);
    this.timerCanRun = true;
    
    //this.doggoLedgeChecker.body.collideWorldBounds = true;   
    //game.physics.enable(this.doggoLedgeChecker, Phaser.Physics.ARCADE);
    this.hitPlatform = false;
    
    this.movingL = goingL;
    
    this.pant = function() {
        if(this.movingL) {
            this.doggo.animations.play("transformL");
        } else {
            this.doggo.animations.play("transformR");
        }
    }
    
    this.transformed = function() {
        this.hasTransformed = !this.hasTransformed;
    }
    
    //transforming animation
    this.transform = function() {
        if(!this.hasTransformed) {
            if(this.movingL) {
                this.doggo.animations.play("transformL");
                this.transformL.onComplete.add(this.transformed, this);
            } else {
                this.doggo.animations.play("transformR");
                this.transformR.onComplete.add(this.transformed, this);
            }
            return false; //the animation finished
        } else {
            return true;
        }
        
    }
    
    //to be used instead of move new when debugged
    this.move = function() {
        //console.log(game.physics.arcade.overlap(this.ledgeChecker, platforms));
        //console.log(game.physics.arcade.overlap(this.doggoLedgeChecker, stone_platforms));
        //console.log((this.doggoLedgeChecker.body.onFloor() || this.doggoLedgeChecker.body.touching.down));
        //console.log(this.doggoLedgeChecker.body.touching.down);
        //console.log(game.physics.arcade.overlap(this.doggo.ledgeChecker, player));
        this.hitPlatform = false;
        game.physics.arcade.overlap(this.doggoLedgeChecker, stone_platforms, function(){this.hitPlatform = true});
        if(this.movingL && this.hitPlatform) { //if going 
            //console.log("am repeating this")
            this.doggo.animations.play("runL");
            this.doggo.body.velocity.x = -300;
            this.doggoLedgeChecker.body.setSize(5, 50, -60, -100);
        } else if(!this.movingL && this.hitPlatform) {
            this.doggo.animations.play("runR");
            this.doggo.body.velocity.x = 300;
            this.doggoLedgeChecker.body.setSize(5, 50, 100, -100);
        } else {
            this.movingL = !this.movingL;
            //console.log("here");
            if(this.movingL) {
                this.doggoLedgeChecker.body.setSize(5, 50, -20, 0);
            } else {
                this.doggoLedgeChecker.body.setSize(5, 50, 100, 0);
            }
        }
    }
    
    this.endTimer = function() {
        this.timer.stop();
        this.timer.destroy();
        this.timer = game.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);
    }
    
    this.moveNew = function() {
        if(this.movingL && this.doggo.body.x > this.xBoundL) { //if going 
            this.doggo.animations.play("runL");
            this.doggo.body.velocity.x = -300;
        } else if(!this.movingL && this.doggo.body.x < this.xBoundR) {
            this.doggo.animations.play("runR");
            this.doggo.body.velocity.x = 300;
        } else {
            if(this.timerCanRun) {
                this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 1, this.endTimer, this);
                this.timer.start();
                this.timerCanRun = false;
            }
            if(this.timer.running) {
                this.doggo.body.velocity.x = 0;
                this.doggo.animations.stop();
                if(this.movingL) {
                    this.doggo.animations.play("returnToRestR");
                } else {
                    this.doggo.animations.play("returnToRestL");
                }
                
            } else {
                this.movingL = !this.movingL;
                this.timerCanRun = true;
            }
            //console.log("here");
        }
    }
    
    this.reform = function() {
        this.doggo.body.velocity.x = 0;
        if(this.hasTransformed) {
            if(this.movingL) {
                this.doggo.animations.play("reformL");
                this.reformL.onComplete.add(this.transformed, this);
            } else {
                this.doggo.animations.play("reformR");
                this.reformR.onComplete.add(this.transformed, this);
            }
            return false;
        } else {
            return true;
        }
    }
    
    this.leftBound = function() {
        return this.xBoundL;
    }
    this.rightBound = function() {
        return this.xBoundR;
    }
    
    this.update = function() {
        game.physics.arcade.collide(this.doggo, stone_platforms);
        //console.log(game.physics.arcade.overlap(this.doggoLedgeChecker, stone_platforms) + " check1 "); //true ch1 false ch2
        //console.log(game.physics.arcade.overlap(this.doggo.doggoLedgeChecker, stone_platforms) + " check2");
    }
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

HeartDrop = function(game, name, x, y, time) {
    this.drop = game.add.sprite(x, y, name);
    this.drop.scale.setTo(.5, .5);
    game.physics.enable(this.drop, Phaser.Physics.ARCADE);
    this.drop.body.bounce.y = 0.2;
    this.drop.body.gravity.y = 1000;
    this.drop.body.collideWorldBounds = true;
    this.drop.animations.add('heartfloating', [0, 1, 2, 3, 3, 2, 1, 0], 7, true);
    this.drop.animations.play('heartfloating');
    
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
var pFlinchToL, pFlinchToR;
var pFlinchToLD, pFlinchToRD;
var tutorial_done=false;
var doggoArray = [];

function c2() {
    
    //sumoMusic.mute = true;

    game.world.setBounds(0, 0, 2400, 416);
    //  Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //creating map
    map = game.add.tilemap('castle_map');
    map.addTilesetImage('stonetilepurple', 'purple_tile')
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
    spikes_layer.resizeWorld()
    
    //add door
    door = game.add.sprite(4600, game.world.height-437, 'closed_door');
    //door = game.add.sprite(4538, game.world.height-437, 'closed_door');
    door.scale.setTo(.23, .23);
    game.physics.enable(door, Phaser.Physics.ARCADE);
    door.body.immobile = true;
    // The player and its settings
    player = game.add.sprite(50, game.world.height-130, 'sam');
    player.scale.setTo(.09,.09) //FIX SCALE HERE
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    
    platforms = game.add.group();
    platforms.enableBody = true;
    spikes = game.add.group();
    spikes.enableBody = true;
    
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
    pFlinchToLD = player.animations.add('pFlinchToLD', [20, 21, 22, 23, 23, 23, 22, 21, 20, 28, 29, 30, 31, 32, 32, 33, 33, 34, 34, 33, 33, 32, 32, 33, 33, 34, 34, 33, 33, 32, 32, 33, 33, 34, 34, 33, 33, 32, 32, 33, 33, 34, 34], 15, false);
    pFlinchToRD = player.animations.add('pFlinchToRD', [24, 25, 26, 27, 27, 27, 26, 25, 24, 35, 36, 37, 38, 39, 39, 40, 40, 41, 41, 40, 40, 39, 39, 40, 40, 41, 41, 40, 40, 39, 39, 40, 40, 41, 41, 40, 40, 39, 39, 40, 40, 41, 41], 15, false);
    
    cursors = game.input.keyboard.createCursorKeys();
    attackButton = game.input.keyboard.addKey(Phaser.Keyboard.F);
    attackButton.onDown.add(swordAttack)
    throwButton = game.input.keyboard.addKey(Phaser.Keyboard.D);
    var bmd = game.add.bitmapData(200,40);
             bmd.ctx.beginPath();
             bmd.ctx.rect(0,0,180,30);
             bmd.ctx.fillStyle = '#FF0000';
             bmd.ctx.fill();

             healthBar = game.add.sprite(38,2,bmd);
    healthBar.width=(pHealth/100)*200
    healthBar.fixedToCamera=true;
    healthbarformat=game.add.sprite(38,2,"healthbar");
    healthbarformat.height=healthBar.height-3;
    healthbarformat.width=182;
    healthbarformat.fixedToCamera=true;

    //camera moves
    game.camera.follow(player);
    
    //setting up JSON file to besh read
    this.enemyLocData2 = JSON.parse(this.game.cache.getText('enemySpawnLoc0'));
    game.time.events.loop(Phaser.Timer.SECOND * .5, makePlayerVulnerable, this);
    stateVar = 2
    
    
    swordsmanArray = [];
    shurikenThrowerArray = [];
    
    textNotCreated1 = true;
    msgBox1 = new showMessageBox2("Wait... is that barking, or am I drunk? People, fine, but I could never hurt a dog! (press spacebar)");
}

var pHealth = 100; //player health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')
var enemyLocIndex2 = 0; //index variable for keeping track of enemy json file (which enemy that needs to spawn)
//var swordsmanArray = []; //array that starts out empty here, but later holds all the enemy objects. I.e. 
//var shurikenThrowerArray = []; //array that starts out empty here, but later holds all the enemy objects. I.e. 
var itemDropArray = []
var hitPlatform = false; //if sam has hit platform
var lastEnemyX = 0; //not necessary now, but to be used later on to possibly deal with kill attack bug
var movingRight = true; //if sam is looking right, is true. Looking left = false
var playerShurikens = [];
var playerShurikenTotal = 0; //how many shurikens sam is holding
var canThrow = true;
var mustStay = false; //whether camera is fixed or not
var moan;
var hitSpikes = false;


function u2() {
    if (pHealth>100){
        pHealth=100;
        healthBar.width=200(pHealth/100);
    }
    if (pHealth<0){
        pHealth=0;
        healthBar.width=200(pHealth/100);
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

    
    /*
    if (this.boxGone){
        createText()
    }
    */
    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, stone_platforms, function(){hitPlatform = true}); //collide with platform (i.e. ground) check
    game.physics.arcade.collide(player, spikes_layer, function(){
        hitSpikes = true; 
        pHealth = pHealth - 50;
        healthBar.width = (pHealth/100)*200;
    }); //collide with platform (i.e. ground) check
    game.physics.arcade.TILE_BIAS = 40;
    game.physics.arcade.collide(player, stone_platforms);
    game.physics.arcade.collide(player, spikes_layer);
    
//    game.physics.arcade.collide(drop, stone_platforms, function(){hitPlatform=true});
//    if (game.physics.arcade.collide(player,drop)){
//        playerShurikenTotal=playerShurikenTotal+10;
//        drop.kill();
//    }
    
    //add the sound effect 
    moan=game.add.audio('moan');
    //movement tree for player
    if(pFlinchToL.isPlaying || pFlinchToLD.isPlaying) {
        if(player.frame != 32 || player.frame != 33 || player.frame != 34) {
            player.body.velocity.x = -100;
        } else {
            player.body.velocity.x = 0;
        }
    } else if (pFlinchToR.isPlaying || pFlinchToRD.isPlaying) {
        if(player.frame != 39 || player.frame != 40 || player.frame != 41) {
            player.body.velocity.x = 100;
        } else {
            player.body.velocity.x = 0;
        }
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
    if(this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].x != -1) { //spawning enemies, check for array bounds
        if(player.x >= this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].x - 500 && this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].x != lastEnemyX) {
            //once player walks a certain distance before the enemy spawn, enemy spawns
            if(this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].type == 0) {
                swordsmanArray.push(new EnemySwordsman(enemyLocIndex2, game, this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].x, this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].y, this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].drop));
            } else if(this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].type == 1) {
                shurikenThrowerArray.push(new EnemyShurikenThrower(enemyLocIndex2, game, this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].x, this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].y, this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].drop));
            } else if(this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].type == 2) {
                enemiesSpawned = true;
                doggoArray.push(new Doggo(game, this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].x, this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].y, this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].directionIsL, this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].xBoundL, this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].xBoundR));
            }
            lastEnemyX = this.enemyLocData2.enemySpawnLoc[enemyLocIndex2].x;
            enemyLocIndex2++;
        }
    }
    
    //update player's shurikens
    for(var i = 0; i < playerShurikens.length; i++) {
        playerShurikens[i].updateShuriken();
        if(playerShurikens[i].checkForDespawn()) {
            playerShurikens.splice(i, 1);
        }
    }
    //release flag-key for player's shurikens, so that they don't shoot rapid fire
    if(!throwButton.isDown) {
        canThrow = true;
    }
    
    if (cursors.up.isDown && hitSpikes){
        player.body.velocity.y = 0;
        player.body.velocity.x = 0;
    }

    //note: removing player.body.touching.down allows player to jump, but means player can jump when alongside walls
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && hitPlatform && player.body.onFloor()) {
        player.body.velocity.y = -700;
        hitPlatform = false;
    }
    playerHealth.text = "                        | Shurikens: " + playerShurikenTotal; //player health is updated with current health and weapon left

    
    var tutorial_done = false;
    if(door.x - player.x <= 160) {
        door.kill();
        open = game.add.sprite(4538, game.world.height-437, 'open_door');
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
        game.state.start('state1')
        
    }
    var onScreenEnemy = false;
    //scan through every currently spawned enemy
    for(var i = 0; i < swordsmanArray.length; i++) {
        if(swordsmanArray[i].swordsman.inCamera && swordsmanArray[i].swordsman.x < game.camera.x + 300) {
           onScreenEnemy = true;
        }
        //player i frames are out       ... and enemy's sword hitbox overlaps with player           ...and swordsman has finished attack
        if(playerVulnerable && game.physics.arcade.overlap(swordsmanArray[i].enemyHitbox, player) && swordsmanArray[i].finishedAttack() && !pFlinchToR.isPlaying && !pFlinchToL.isPlaying && !pFlinchToRD.isPlaying && !pFlinchToLD.isPlaying) {
            if(swordsmanArray[i].movingR()) {
                if(pHealth <= 0) {
                    player.animations.play("pFlinchToRD");
                } else {
                    player.animations.play("pFlinchToR");
                }
            } else {
                if(pHealth <= 0) {
                    player.animations.play("pFlinchToLD");
                } else {
                    player.animations.play("pFlinchToL");
                }
            }
        }
        if(playerVulnerable && game.physics.arcade.overlap(swordsmanArray[i].enemyHitbox, player) && swordsmanArray[i].finishedAttack()) {
            moan.play();
            pHealth -= 5; //remove 5 from player's health
            healthBar.width = (pHealth/100)*200;
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
                    if(swordsmanArray[i].myType() == 2) {
                        itemDropArray.push(new HeartDrop(game, "heart", swordsmanArray[i].swordsman.x, swordsmanArray[i].swordsman.y, 10));
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
                    if(swordsmanArray[i].myType() == 2) {
                        itemDropArray.push(new HeartDrop(game, "heart", swordsmanArray[i].swordsman.x, swordsmanArray[i].swordsman.y, 10));
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
            if(game.physics.arcade.overlap(shurikenThrowerArray[i].enemyShurikenArray[j].shuriken, player) && playerVulnerable && !pFlinchToRD.isPlaying && !pFlinchToLD.isPlaying && !pFlinchToR.isPlaying && !pFlinchToL.isPlaying) {
                moan.play();
                if(shurikenThrowerArray[i].movingR()) {
                    if(pHealth <= 0) {
                        player.animations.play("pFlinchToRD");
                    } else {
                        player.animations.play("pFlinchToR");
                    }
                } else {
                    if(pHealth <= 0) {
                        player.animations.play("pFlinchToLD");
                    } else {
                        player.animations.play("pFlinchToL");
                    }
                }
                pHealth -= 10;
                healthBar.width = (pHealth/100)*200;
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
    if(pHealth <= 0 && !pFlinchToLD.isPlaying && !pFlinchToRD.isPlaying) {
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
            if(itemDropArray[i].myType() == "heart") {
                pHealth += 10;
                healthBar.width= (pHealth/100)*200;
            }
            itemDropArray[i].drop.destroy();
            itemDropArray.splice(i, 1);
        }
    }
    
        //run checks for doggo
    for(var i = 0; i < doggoArray.length; i++) {
//        console.log("new check: " + game.physics.arcade.overlap(doggoArray[i].doggoLedgeChecker, stone_platforms));
        doggoArray[i].update();
        if(player.x > doggoArray[i].leftBound() && player.x < doggoArray[i].rightBound()) {//&& player.body.onFloor()) { //if player in bounds of doggo and touching platform
            if(doggoArray[i].transform()) { //if dog has transformed, move
                doggoArray[i].moveNew();
                //console.log(game.physics.arcade.overlap(doggoArray[i].doggoLedgeChecker, stone_platforms));
            }
        } else if(player.x < doggoArray[i].leftBound() || player.x > doggoArray[i].rightBound()) { //player is out of bounds, so change back
            doggoArray[i].reform();
        }
        
        if(playerVulnerable && game.physics.arcade.overlap(doggoArray[i].doggo, player)) {
            moan.play();
            pHealth -= 5; //remove 5 from player's health
            healthBar.width = (pHealth/100)*200;
            playerVulnerable = false; //give player i frames
            if(!pFlinchToR.isPlaying && !pFlinchToL.isPlaying && !pFlinchToRD.isPlaying && !pFlinchToLD.isPlaying) {
                if(doggoArray[i].movingL) {
                    player.animations.play("pFlinchToL");
                } else {
                    player.animations.play("pFlinchToR");
                }
            }
        }
        
    }
    
}

//note: some functions are small, but are as functions with the idea that more will be added to them later

//just for debugging purposes. Comment out before submitting, but do not delete now!
function r2() {
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

function createText() {

    playerHealth = game.add.text(38,2, 'Sam HP: 100', { fontSize: '32px', fill: '#fff' });

	playerHealth.font = 'Revalia';
    playerHealth.fixedToCamera=true;
    
    instructions = game.add.text(38,38, 'use arrow keys to move, up key to jump, f key to attack', {fontSize: '22px', fill:'#fff'});
    instructions2 = game.add.text(38,62, 'use d key to throw shuriken when you have them', {fontSize: '22px', fill:'#fff'});
    instructions2.font = 'Permanent Marker';
    instruction3 = game.add.text(38, 92, 'f to open door', {fontSize: "22px", fill:"#fff"});
    instruction3.font= 'Permanent Marker';
    instructions.font = 'Permanent Marker';
}