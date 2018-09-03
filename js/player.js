function Player(game, stage, x, y){
  this.game = game;
  this.stage = stage;
  this.cutouts = stage.cutouts;
  
  this.x = x;
  this.y = y;

  this.r = 10;

  this.v = 40;

  this.acc = 0;

  this.name = "player!!"
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
    this.moveOnStageBoundaries(event);
    for (var i = 0; i < this.cutouts.length; i++){
      if (isPlayerInCutout(this, this.cutouts[i])){
        this.moveOnCutoutBoundaries(event, this.cutouts[i]);
        
      }
    }


  }.bind(this);
};

function isPlayerInCutout(self, cutout){
  if (
    self.x - self.v < cutout.right &&
    self.x + self.v > cutout.left &&
    self.y + self.v > cutout.top &&
    self.y - self.v < cutout.bottom 
  ){
    return true
  }
};

Player.prototype.canMoveX = function () {
  if (
    this.y == this.stage.top &&
    this.x >= this.stage.left &&
    this.x <= this.stage.right
  ) {
    return true;
  } else if (
    this.y == this.stage.bottom &&
    this.x >= this.stage.left &&
    this.x <= this.stage.right
  ) {
    return true;
  }
};

Player.prototype.canMoveY = function () {
  if (
    this.x == this.stage.left &&
    this.y >= this.stage.top &&
    this.y <= this.stage.bottom
  ) {
    return true;
  } else if (
    this.x == this.stage.right &&
    this.y >= this.stage.top &&
    this.y <= this.stage.bottom
  ) {
    return true;
  }
};

// Player.prototype.canMoveInsideCutoutX = function () {
//   if (
//     this
//   )
// }

Player.prototype.moveOnStageBoundaries = function (event) {
  if (event.keyCode === UP_KEY) {
    if (this.canMoveY()) {
      if (this.y - this.v < this.stage.top){
        this.y = this.stage.top;
      } else {
        this.y -= this.v;
      };
    };
  } else if (event.keyCode === RIGHT_KEY) {
    if (this.canMoveX()){
      if (this.x + this.v > this.stage.right){
        this.x = this.stage.right;
      } else {
        this.x += this.v;
      }
    }
  } else if (event.keyCode === DOWN_KEY){
    if (this.canMoveY()) {
      if (this.y + this.v > this.stage.bottom){
        this.y = this.stage.bottom;
      } else {
        this.y += this.v;
      };
    };
  } else if (event.keyCode === LEFT_KEY) {
    if (this.canMoveX()){
      if (this.x - this.v < this.stage.left){
        this.x = this.stage.left;
      } else {
        this.x -= this.v;
      }
    }
  };
};

Player.prototype.moveOnCutoutBoundaries = function (event, cutout) {
  if (event.keyCode === UP_KEY) {
    if (cutout.left == this.stage.left && this.x == cutout.left) {
      this.y = cutout.bottom;
    } else if (cutout.right == this.stage.right && this.x == cutout.right) {
      this.y = cutout.bottom;
    } else {
      if (this.x == cutout.left || this.x == cutout.right) {
        if (this.y - this.v < cutout.top) {
          this.y = cutout.top;
        } else {
          this.y -= this.v;
        };
      };
    }
  } else if (event.keyCode === RIGHT_KEY) {
    if (cutout.bottom == this.stage.bottom && this.y == cutout.bottom) {
      this.x = cutout.left;
    } else if (cutout.top == this.stage.top && this.y == cutout.top) {
      this.x = cutout.left;
    } else {
      if (this.y == cutout.top || this.y == cutout.bottom) {
        if (this.x + this.v > cutout.right){
          this.x = cutout.right;
        } else {
          this.x += this.v;
        };
      };
    }
  } else if (event.keyCode === DOWN_KEY){
    if (cutout.left == this.stage.left && this.x == cutout.left) {
      this.y = cutout.top;
    } else if (cutout.right == this.stage.right && this.x == cutout.right) {
      console.log("entra en 2")
      this.x = cutout.top;
    } else {
      console.log("entra en 3")
      if (this.x == cutout.left || this.x == cutout.right) {
        if (this.y + this.v > cutout.bottom){
          this.y = cutout.bottom;
        } else {
          this.y += this.v;
        };
      };
    };
    
  } else if (event.keyCode === LEFT_KEY) {
    if (cutout.bottom == this.stage.bottom && this.y == cutout.bottom) {
      this.x = cutout.right;
    } else if (cutout.top == this.stage.top && this.y == cutout.top) {
      this.x = cutout.right;
    } else {
      if (this.y == cutout.top || this.y == cutout.bottom) {
        if (this.x - this.v < cutout.left){
          this.x = cutout.left;
        } else {
          this.x -= this.v;
        };
      };
    }
  };
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


