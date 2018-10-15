var st0 = {
    preload: p0,
    create: c0,
    update: u0
}

function p0() {
    game.load.image('goonsEmpty', 'assets/bar_goons_noDialogue_samLooking.png');
    game.load.image('oneGoon', 'assets/bar_goons_noRightGoon.png');
    game.load.image('goonLtalking_SL', 'assets/bar_goonsL_sam_looking.png');
    game.load.image('goonLtalking', 'assets/bar_goonsL_sam_not_looking.png');
    game.load.image('goonRtalking_SL', 'assets/bar_goonsR_sam_looking.png');
    game.load.image('goonRtalking', 'assets/bar_goonsR_sam_not_looking.png');
    game.load.image('bartend_sam', 'assets/bartendandsam_bar.png');
    game.load.image('bartend', 'assets/bartenderonly_bar.png');
    game.load.image('blackPic', 'assets/A_blank_black_picture.jpg');
    
    this.load.text('barText', 'assets/cutscene1Text.json');
}

var skipButton;
var levelData;
var index = 0; //index for black screen
var index2 = 0; //index for bar dialogue
var dialogue;
var style;
var active = true;
var image;
var imageArray;
var scene1 = true;

function c0() {
    game.stage.backgroundColor = "#4488AA";
    skipButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //dialogue skip button
    
    imageArray = ["goonsEmpty", "oneGoon", "goonLtalking_SL", "goonLtalking", "goonRtalking_SL", "goonRtalking", "bartend_sam", "bartend", "blackPic"];
    
    //parse file
    image = game.add.sprite(0, 0, 'blackPic');
    image.width = game.width;
    image.height = game.height;
    game.physics.enable(image, Phaser.Physics.ARCADE);
    
    
    this.levelData = JSON.parse(this.game.cache.getText('barText'));
    style = { font: "bold 32px Arial", fill: "#fff", align: 'left', wordWrap: true, wordWrapWidth: 650 }; // text for dialogue
    game.time.events.loop(Phaser.Timer.SECOND * 1, skipButtonActive, this);
    
    dialogue = game.add.text(10, 10, this.levelData.blackBackgroundText[index].text, style);
}

function u0() {
    if(skipButton.isDown && active && this.levelData.blackBackgroundText.length > index + 1) {
        index++;
        active = false;
        displayBackground(this.levelData.blackBackgroundText[index].type);
        dialogue = game.add.text(10, 10, this.levelData.blackBackgroundText[index].text, style);
    } else if(skipButton.isDown && active && this.levelData.goonDialogue.length > index2 + 1) {
        style = { font: "bold 30px Arial", fill: "#000", align: 'left', wordWrap: true, wordWrapWidth: 550 }; // text for dialogue
        index2++;
        active = false;
        displayBackground(this.levelData.goonDialogue[index2].type);
        dialogue = game.add.text(100, 50, this.levelData.goonDialogue[index2].text, style);
        scene1 = false;
    } else if(skipButton.isDown && active) {
        game.state.start('state_level1')
    }
}  

function increaseIndex() {
    index += 1;
}

function skipButtonActive() {
    active = true;
}

function displayBackground(name) {
    image = game.add.sprite(0, 0, imageArray[name]);
    image.width = game.width;
    image.height = game.height;
    game.physics.enable(image, Phaser.Physics.ARCADE);
}
