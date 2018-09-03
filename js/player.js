function Player(game, stage, x, y){
  this.game = game;
  this.stage = stage;
  
  this.x = x;
  this.y = y;

  this.r = 10;

  this.v = 40;

  this.acc = 0;

  this.setListeners();
}

var UP_KEY = 38;
var DOWN_KEY = 40;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;

Player.prototype.draw = function () {
  this.game.context.beginPath();
  this.game.context.fillStyle = "blue";
  this.game.context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  this.game.context.fill();
  this.game.context.closePath();
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {

    if (event.keyCode === UP_KEY) {
      this.y -= this.v;
    } else if (event.keyCode === RIGHT_KEY) {
      if (this.canMoveX()){
        if (this.x + this.v > this.stage.right){
          this.x = this.stage.right;
        } else {
          this.x += this.v;
        }
      }
    } else if (event.keyCode === DOWN_KEY){
      this.y += this.v;
    } else if (event.keyCode === LEFT_KEY) {
      if (this.canMoveX()){
        if (this.x - this.v < this.stage.left){
          this.x = this.stage.left;
        } else {
          this.x -= this.v;
        }
      }
    };
  }.bind(this);
};

Player.prototype.canMoveX = function () {
  console.log("enters canmoveX function")
  if (
    this.y == this.stage.top &&
    this.x >= this.stage.left &&
    this.x <= this.stage.right
  ) {
    console.log("enters the IF")
    return true
  } 
};

// Player.prototype.setListeners = function() {
//   document.onkeydown = function(event) {
//     if (event.keyCode === UP_KEY) {
//       // this.y -= this.v;
//       this.acc = -0.5;
//     } else if (event.keyCode === RIGHT_KEY) {
//       // this.x += this.v;
//       this.acc = +0.5;
//     } else if (event.keyCode === DOWN_KEY){
//       // this.y += this.v;
//       this.acc = +0.5;
//     } else if (event.keyCode === LEFT_KEY) {
//       // this.x -= this.v;
//       this.acc = -0.5;
//     };
//   }.bind(this);

//   document.onkeyup = function(event) {
//     if (event.keyCode === UP_KEY) {
//       // this.y -= this.v;
//       this.acc = 0;
//     } else if (event.keyCode === RIGHT_KEY) {
//       // this.x += this.v;
//       this.acc = 0;
//     } else if (event.keyCode === DOWN_KEY){
//       // this.y += this.v;
//       this.acc = 0;
//     } else if (event.keyCode === LEFT_KEY) {
//       // this.x -= this.v;
//       this.acc = 0;
//     };
//   }.bind(this);
// };


/*

Car.prototype.handleKeyDown = function(key){
  console.log(key);
  switch(key){
    case 38: // Up
     this.acc = -0.5;
     break;
    case 40: // down
     this.acc = 0.5;
     break; 
    case 37: // left
     this.turnAngleSpeed(-1);
     break; 
    case 39: // right
     this.turnAngleSpeed(1);
     break; 
  }
}

Car.prototype.handleKeyUp = function(key){
   switch(key){
    case 38: // Up
     this.acc = 0;
     break;
    case 40: // down
     this.acc = 0;
     break; 
    case 37: // left
     this.angularSpeed = 0;
     break; 
    case 39: // right
     this.angularSpeed = 0;
     break; 
  }
}

document.onkeydown = function(e){
  car.handleKeyDown(e.keyCode);
  car2.handleKeyDown(e.keyCode);
}

document.onkeyup = function(e){
  car.handleKeyUp(e.keyCode);  
  car2.handleKeyUp(e.keyCode);
} */