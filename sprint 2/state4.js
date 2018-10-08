var st4 = {
    preload: p4,
    create: c4,
    update: u4
}

function p4() {
    game.load.audio('sumoMusic', ['assets/audio/boss fight music.ogg', 'assets/audio/boss fight music.mp3']);
    game.load.image('castle', 'assets/castle.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('sam', 'assets/player.png', 110, 110);
    game.load.image('stone', 'assets/stone.png')
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
    game.load.spritesheet('sumo', 'assets/sumo.png', 110, 110);
    game.load.image('closed_door', 'assets/closed_door.png');
    game.load.image('open_door', 'assets/open_door.png');
    game.load.image('wave', 'assets/Wave smash.png')
}

var image; //background
var attackButton; // F to attack
var playerHealth; //keeps track of total player health
var bossHealth; //keeps track of total boss health
var sumoMusic; //boss music
var instructions; //game instructions'


function c4() {
    //  Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    image = game.add.sprite(0, 0, 'castle'); // first visible bkgd
    image.width = game.width;
    image.height = game.height + 100;
    game.physics.enable(image, Phaser.Physics.ARCADE); 
    
    
    // create platform for ground
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 25, 'ground');
    ground.scale.setTo(2, 2); //make ground right size
    
    stone = game.add.sprite(0, game.world.height - 290, 'stone');
    stone.width = game.width;
    stone.height = 300;
    game.physics.enable(stone, Phaser.Physics.ARCADE);

    //  Make ground stable
    ground.body.immovable = true;
    
    // The player and its settings
    player = game.add.sprite(250, game.world.height - 250, 'sam');
    //the door
    door = game.add.sprite(500, game.world.height -390, 'closed_door');
    door.scale.setTo(.4,.4);
    game.physics.enable(door, Phaser.Physics.ARCADE);
    door.body.immovable = true;
    //sword hitbox creation
    hitbox = game.add.group();
    hitbox.enableBody = true;
    player.addChild(hitbox);
    var swordHitbox = hitbox.create(0, 0, null);
    swordHitbox.body.setSize(30, 20, player.width/3, 0);
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    //game.physics.arcade.enable(door);
    game.physics.arcade.enable(swordHitbox);
    


    
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
    playerHealth = game.add.text(16, 16, 'Your Health: 100', { fontSize: '32px', fill: '#000' });

    
    sumoMusic = game.add.audio('sumoMusic');
    sumoMusic.play();
    
    //instructions
    instructions = game.add.text(50,200, 'use arrow keys to move, up key to jump, f key to attack', {fontSize: '25px', fill:'#fff'});

}

var pHealth = 100; //player health
var dHealth = 10;
function u4() {
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms); //collide with platform (i.e. ground) check
    var hitPlatform2 = game.physics.arcade.collide(door, platforms); //collide with platform (i.e. ground) check
    var swordHit = game.physics.arcade.overlap(door, hitbox); // Overlap with sword and player 2
    var runIntoDoor = game.physics.arcade.overlap(player, door); // Overlap with player and door
    //movement tree for player
    if (cursors.left.isDown) {
        movePLeft();
    } else if (cursors.right.isDown) {
        movePRight();
    } else if(attackButton.isDown) {
        player.animations.play('attack');
        if(swordHit) { 
           dHealth-=5;
        }
        
    } else {
        //  Stand still
        player.animations.stop();
        player.frame = 0;
        player.body.velocity.x = 0;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -700;
    }
    playerHealth.text = "Sam: " + pHealth;
    
    if(dHealth <= 0) { // victory
        door.kill();
        open = game.add.sprite(500, game.world.height -390, 'open_door');
        open.scale.setTo(.4,.4);
        game.physics.enable(open, Phaser.Physics.ARCADE);
        open.body.immovable = true;
    } 
    
    
  
    
    
}

//note: some functions are small, but are as functions with the idea that more will be added to them later
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
}

function movePRight() {
    player.body.velocity.x = 300;
    player.animations.play('right');
}


function sumoAttack() {
    sumo.animations.play('attack');
    sumo.animations.currentAnim.onComplete.add(waveSpawn)
}

function waveSpawn() {
    wave.reset(sumo.x - 50, sumo.y + 90);
}

function pDamage(amount) {
    pHealth -= amount;
}

function makeSumoVulnerable() {
    sumoVulnerable = true;
}

function makePlayerVulnerable() {
    playerVulnerable = true;
}