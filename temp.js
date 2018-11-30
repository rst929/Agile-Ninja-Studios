 var temp = {
    create: c4,
    update: u4
}
MyObject = function(value) {
	this.value = value; //passed in value
	this.magicNumber = 4; //local value initialized/declared

	this.valueChecker = function() {
        //return boolean
		return this.value == this.magicNumber;
	}
}

//just make the space bar tied to a boolean
var someKeyPress;
function c4() {
	someKeyPress = game.input.keyboard.addKey(Phaser.Keyboard.A);
}

var someObjects = [];
//... later on in the program, presuming key already coded
function u4() {
	//add a new MyObject to array someObjects
	if(someKeyPress.isDown) {
		someObjects.push(new MyObject(4));
	}

    //run through MyObject(s) added to someObjects, and see if any match number
	for(var i = 0; i < someObjects.length; i++) {
		console.log(someObjects[i].valueChecker())
	}
}