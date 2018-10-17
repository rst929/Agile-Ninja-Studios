var st1 = {
    preload: p1,
    create: c1,
    update: u1
}

function p1() {
    game.load.audio('sumoMusic', ['assets/audio/boss fight music.ogg', 'assets/audio/boss fight music.mp3']);
    game.load.image('castle', 'assets/castle.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('sam', 'assets/player.png', 110, 110);
    game.load.image('stone', 'assets/stone.png')
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
    game.load.spritesheet('sumo', 'assets/sumo.png', 110, 110);
    game.load.image('wave', 'assets/Wave smash.png')
}

var image; //background
var attackButton; // F to attack
var playerHealth; //keeps track of total player health
var bossHealth; //keeps track of total boss health
var sumoMusic; //boss music

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
    
    // The player and its settings
    player = game.add.sprite(250, game.world.height - 250, 'sam');
    sumo = game.add.sprite(game.world.width - 200, game.world.height - 450, 'sumo');
    sumo.scale.setTo(3,3);
    
    //sword hitbox creation
    hitbox = game.add.group();
    hitbox.enableBody = true;
    player.addChild(hitbox);
    var swordHitbox = hitbox.create(0, 0, null);
    swordHitbox.body.setSize(30, 20, player.width/3, 0);
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(sumo);
    game.physics.arcade.enable(swordHitbox);
    
    //  Player physics properties
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
    player.body.setSize(15, 40, 0, 100);

    //sumo physics properties
    sumo.body.bounce.y = 0.2;
    sumo.body.gravity.y = 1000;
    sumo.body.collideWorldBounds = true;
    sumo.body.setSize(70, 100, 30, 0);
    
    //wave properties 
    wave = game.add.sprite(sumo.x -190, sumo.y, 'wave');
    wave.scale.setTo(.8, .8);
    game.physics.arcade.enable(wave);
    wave.body.setSize(50, 200, 115, 100);
    wave.kill();
    
    //  animations
    player.animations.add('left', [0, 1], 10, true);
    player.animations.add('right', [0, 1], 10, true);
    player.animations.add('attack', [2, 3, 4], 10, true);
    sumo.animations.add('attack', [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 1, 0], 20, false);
    
    cursors = game.input.keyboard.createCursorKeys();
    attackButton = game.input.keyboard.addKey(Phaser.Keyboard.F);
    attackButton.onDown.add(swordAttack)
    playerHealth = game.add.text(38, 2, 'Your Health: 100', { fontSize: '32px', fill: '#fff' });
    playerHealth.font = 'Revalia';
    bossHealth = game.add.text(570,2, 'Boss Health: 100', { fontSize: '32px', fill: '#fff' });
    bossHealth.font = 'Revalia';
    game.time.events.loop(Phaser.Timer.SECOND * 3, sumoAttack, this);
    game.time.events.loop(Phaser.Timer.SECOND * 1, makeSumoVulnerable, this);
    game.time.events.loop(Phaser.Timer.SECOND * 1, makePlayerVulnerable, this);
    
    //sumoMusic = game.add.audio('sumoMusic');
    //sumoMusic.play();
    
    game.camera.follow(player);

}

var pHealth = 100; //player health
var bHealth = 100; //boss / sumo health
var playerVulnerable = true; //if player is vulnerable (out of 'i frames')
var sumoVulnerable = true; // if sumo is vulnerable (out of 'i frames')

function u1() {
    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms); //collide with platform (i.e. ground) check
    var hitPlatform2 = game.physics.arcade.collide(sumo, platforms); //collide with platform (i.e. ground) check
    var swordHit = game.physics.arcade.overlap(sumo, hitbox); // Overlap with sword and player 2
    var runIntoSumo = game.physics.arcade.overlap(player, sumo); // Overlap with player and sumo
    
    //movement tree for player
    if (cursors.left.isDown) {
        movePLeft();
    } else if (cursors.right.isDown) {
        movePRight();
    } else if(attackButton.isDown) {
        player.animations.play('attack');
        if(swordHit && sumoVulnerable) { //hitbox check for sumo boss to take away health
            bHealth -= 5;
            sumoVulnerable = false; 
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
    bossHealth.text = "Boss: " + bHealth;
    
    //if wave is alive, send it to the left offscreen and check if it hits player
    if(wave.alive) {
        wave.x -= 7;
        if(wave.x < -150) {
            wave.kill();
        } else {
            if(game.physics.arcade.overlap(player, wave) && playerVulnerable) {
                pDamage(25);
                playerVulnerable = false;
            }
        }
    }
    
    //if player runs into sumo, damage him
    if(runIntoSumo) {
        if(playerVulnerable) {
            pDamage(10);
            playerVulnerable = false;
        }
    }
    
    //check for winning/defeat conditions
    if(bHealth <= 0) { // victory
        game.state.start('state3');
    } else if(pHealth <= 0) { // defeat
        game.state.start('state2');
    }
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