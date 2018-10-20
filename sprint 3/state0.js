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
    game.load.image('samFindingSword', 'assets/sam_finding_sword.png');
    game.load.image('surprisesam1', 'assets/surprisesam1.png');
    game.load.image('surprisesam2', 'assets/surprisesam2.png');
    game.load.image('surprisesam3', 'assets/surprisesam3.png');
    
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
var atkTimer;
var canChange = true;

function c0() {
    
    /*atkTimer = game.time.create(true)
    atkTimer.add(1200, function () 
        {
            skipButtonActive();
            console.log("timer is running")
        }, this);
    */
    
    
    game.stage.backgroundColor = "#000000";
    skipButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //dialogue skip button
    
    imageArray = ["goonsEmpty", "oneGoon", "goonLtalking_SL", "goonLtalking", "goonRtalking_SL", "goonRtalking", "bartend_sam", "bartend", "blackPic", "samFindingSword", "surprisesam1", "surprisesam2", "surprisesam3"];
    
    //parse file
    image = game.add.sprite(100, 0, 'blackPic');
    image.width = game.width - 225;
    image.height = game.height;
    game.physics.enable(image, Phaser.Physics.ARCADE);
    
    
    this.levelData = JSON.parse(this.game.cache.getText('barText'));
    style = { font: "bold 32px Arial", fill: "#fff", align: 'left', wordWrap: true, wordWrapWidth: 500 }; // text for dialogue
    
    // game.time.events.loop(Phaser.Timer.SECOND * 1.5, skipButtonActive, this);
    
    dialogue = game.add.text(110, 10, this.levelData.blackBackgroundText[index].text, style);
}

function u0() {
    if(skipButton.isDown && canChange){
        canChange = false;
        if(active && this.levelData.blackBackgroundText.length > index + 1) {
            index++;
            //active = false;
            displayBackground(this.levelData.blackBackgroundText[index].type);
            dialogue = game.add.text(110, 10, this.levelData.blackBackgroundText[index].text, style);
        } else if(active && this.levelData.goonDialogue.length > index2 + 1) {
            if(this.levelData.goonDialogue[index2].color == 1) { //black
                style = { font: "bold 20px Arial", fill: "#000", align: 'left', wordWrap: true, wordWrapWidth: 420 }; // text for dialogue
            } else if(this.levelData.goonDialogue[index2].color == 0) { //white
                style = { font: "bold 20px Arial", fill: "#fff", align: 'left', wordWrap: true, wordWrapWidth: 420 }; // text for dialogue
            }
            index2++;
            //active = false;
            displayBackground(this.levelData.goonDialogue[index2].type);
            dialogue = game.add.text(180, 50, this.levelData.goonDialogue[index2].text, style);
            scene1 = false;
        } else if(active) {
            game.state.start('state_tutorial')
        }
        
        game.input.keyboard.onUpCallback = function(){
            canChange = true
        }
        
        /*
        //active = false
        atkTimer.start();
        atkTimer.loop();
        */
        console.log('active: ' + active);
        console.log('canChange: ' + canChange);
        
        
    }
    
}  

function increaseIndex() {
    index += 1;
}

function skipButtonActive() {
    active = true;
}

function displayBackground(name) {
    image = game.add.sprite(100, 0, imageArray[name]);
    image.width = game.width - 225;
    image.height = game.height;
    game.physics.enable(image, Phaser.Physics.ARCADE);
}
