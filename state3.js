var st3 = {
    preload: p3,
    create: c3,
    update: u3
}


function p3() {
    game.load.image('leavingCastle1', 'assets/VictoryCutscenePics/leavingCastle1.png');
    game.load.image('leavingCastle2', 'assets/VictoryCutscenePics/leavingCastle2.png');
    game.load.image('leavingCastle3', 'assets/VictoryCutscenePics/leavingCastle3.png');
    game.load.image('Victory', 'assets/VictoryCutscenePics/Victory.png');
    game.load.image('Credits', 'assets/end_credits2a.png')
    this.load.text('vicSceneJSON', 'assets/VictoryCutscenePics/VicCutsceneImageOrder.json');
}

var win;
var imageArray2;
var nextButton;
var canChange = true;
var index = 0;
var textNotCreated_victory = true;
var timeText_victory;

function c3() {
    sumoMusic.mute = true;
    game.stage.backgroundColor = '#000000'
//    var style = { font: "bold 40px Algerian", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
//    win = game.add.text(265, 150, 'VICTORY', style);
    
    imageArray2 = ["leavingCastle1", "leavingCastle2", "leavingCastle3", "Victory", "Credits"];
    this.vicData = JSON.parse(this.game.cache.getText('vicSceneJSON'));
    nextButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //dialogue skip button
    displayBackground2(this.vicData.VicScene[0].type)
}

function u3() {
    if(nextButton.isDown && canChange){ 
        canChange = false;
        if(this.vicData.VicScene.length > index + 1) {
            index++;
            displayBackground2(this.vicData.VicScene[index].type);
        }
        game.input.keyboard.onUpCallback = function(){
            canChange = true
        }
    }
    
}

function createText_victory(){
    timeText_victory = game.add.text(276,286, seconds_stboss.toFixed(1) + ' s', { fontSize: '50px', fill: '#000' })
    timeText_victory.font = 'Revalia';
    textNotCreated_victory = false;
}


function displayBackground2(name) {
    image = game.add.sprite(0, 0, imageArray2[name]);
    image.width = game.width;
    image.height = game.height;
    console.log(name)
    if (name == 10 || name == 11 || name ==12){
       image.height = image.height*1.15;
        image.y = image.y - 20;
        //image.scale.setTo()
    }
    
    //NOTE TO RANDY be sure to change to number greater than three when image added
    if(name == 3 && textNotCreated_victory){
        createText_victory();
        textNotCreated_victory = false;   
    }
    
    /*if(name == 4){
        image.width = game.width-225
    }*/
    
    
//    game.physics.enable(image, Phaser.Physics.ARCADE);
//    instructions = game.add.sprite(360,345,'Skip and Continue');
//    game.physics.enable(instructions, Phaser.Physics.ARCADE);

}