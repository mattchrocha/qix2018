function Player(game, stage, x, y){
  this.game = game;
  this.stage = stage;
  this.cutouts = stage.cutouts;
  
  this.x = x;
  this.y = y;

  this.r = 10;

  this.v = 40;

  this.vx = 0;
  this.vy = 0;
  this.speed = 20;

  this.acc = 0;

  this.createMode = false;

  this.setListeners();
}

var UP_KEY = 38;
var DOWN_KEY = 40;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var SPACE_BAR = 32;

Player.prototype.draw = function () {
  this.game.context.beginPath();
  this.game.context.fillStyle = "blue";
  this.game.context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  this.game.context.fill();
  this.game.context.closePath();
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === SPACE_BAR){
      this.createMode = !this.createMode;
      console.log("Create mode: "+ this.createMode)
    } else if (!this.createMode){
      this.moveInBoundaries(event);
    } else if (this.createMode){
      this.move(event);
      // this.moveOutAndCreate(event);
    }
  }.bind(this);

  document.onkeyup = function(event) {
    this.clearVelocity(event);
  }.bind(this);
};



Player.prototype.moveInBoundaries = function(event){
  this.moveOnStageBoundaries(event);
  for (var i = 0; i < this.cutouts.length; i++){
    if (isPlayerInCutout(this, this.cutouts[i])){
      this.moveOnCutoutBoundaries(event, this.cutouts[i]);
      for (var j = 0; j < this.cutouts.length; j++){
        if (this.cutouts[j] !== this.cutouts[i]){
          if (
            isPlayerInCutout(this, this.cutouts[i]) === true &&
            isPlayerInCutout(this, this.cutouts[i]) === isPlayerInCutout(this, this.cutouts[j])
          ){
            this.moveOnOverlapingCutouts(event, this.cutouts[i], this.cutouts[j]);
          };
        };
      };  
    };
  };
}

function isPlayerInCutout(self, cutout){
  if (
    self.x - self.v < cutout.right &&
    self.x + self.v > cutout.left &&
    self.y + self.v > cutout.top &&
    self.y - self.v < cutout.bottom 
  ){
    return true
  } else {
    return false
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
      this.y = cutout.top;
    } else {
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

Player.prototype.moveOnOverlapingCutouts = function (event, cutout1, cutout2){
  if (event.keyCode === UP_KEY) {
    if (checkCutoutsLeftRightHigherBottom(this, cutout1, cutout2)){
      this.y = cutout2.bottom;
    } else if (checkCutoutsLeftRightLowerBottom(this, cutout1, cutout2)){
      this.y = cutout1.bottom;
    }
  } else if (event.keyCode === RIGHT_KEY) {
    if (checkCutoutsTopBottomHigherLeft(this, cutout1, cutout2)){
      this.x = cutout1.left;
    } else if (checkCutoutsTopBottomLowerLeft(this, cutout1, cutout2)){
      this.x = cutout2.left;
    }
  } else if (event.keyCode === DOWN_KEY) {
    if (checkCutoutsLeftRightHigherTop(this, cutout1, cutout2)){
      this.y = cutout1.top;
    } else if (checkCutoutsLeftRightLowerTop(this, cutout1, cutout2)){
      this.y = cutout2.top;
    }
  } else if (event.keyCode === LEFT_KEY) {
    if (checkCutoutsTopBottomHigherRight(this, cutout1, cutout2)){
      this.x = cutout2.right;
    } else if (checkCutoutsTopBottomLowerRight(this, cutout1, cutout2)){
      this.x = cutout1.right;
    }
  }
}


function checkCutoutsLeftRightHigherBottom(self, cutout1, cutout2) {
  if (cutout1.bottom > cutout2.bottom) {
    if (
      cutout1.left == cutout2.right &&
      self.x == cutout1.left
    ){
      return true;
    } else if (
      cutout1.right == cutout2.left &&
      self.x == cutout1.right
    ){
      return true;
    }
  }
} // self.y = cutout2.bottom

function checkCutoutsLeftRightLowerBottom(self, cutout1, cutout2) {
  if (cutout1.bottom < cutout2.bottom) {
    if (
      cutout1.left == cutout2.right &&
      self.x == cutout1.left
    ){
      return true;
    } else if (
      cutout1.right == cutout2.left &&
      self.x == cutout1.right
    ){
      return true;
    }
  }
} // self.y = cutout1.bottom

function checkCutoutsTopBottomHigherLeft(self, cutout1, cutout2){
  if (cutout1.left > cutout2.left){
    if (
      cutout1.bottom == cutout2.top &&
      self.y == cutout1.bottom
    ){
      return true;
    } else if (
      cutout1.top == cutout2.bottom &&
      self.y == cutout1.top
    ) {
      return true;
    }
  }
} // self.x = cutout2.left

function checkCutoutsTopBottomLowerLeft(self, cutout1, cutout2){
  if (cutout1.left < cutout2.left){
    if (
      cutout1.bottom == cutout2.top &&
      self.y == cutout1.bottom
    ){
      return true;
    } else if (
      cutout1.top == cutout2.bottom &&
      self.y == cutout1.top
    ){
      return true;
    }
  }
} // self.x = cutout1.left;

function checkCutoutsLeftRightHigherTop(self, cutout1, cutout2) {
  if (cutout1.top > cutout2.top) {
    if (
      cutout1.left == cutout2.right &&
      self.x == cutout1.left
    ){
      return true;
    } else if (
      cutout1.right == cutout2.left &&
      self.x == cutout1.right
    ){
      return true;
    }
  }
} // self.y = cutout1.top

function checkCutoutsLeftRightLowerTop(self, cutout1, cutout2) {
  if (cutout1.top < cutout2.top) {
    if (
      cutout1.left == cutout2.right &&
      self.x == cutout1.left
    ){
      return true;
    } else if (
      cutout1.right == cutout2.left &&
      self.x == cutout1.right
    ){
      return true;
    }
  }
} // self.y = cutout2.top

function checkCutoutsTopBottomHigherRight(self, cutout1, cutout2){
  if (cutout1.right > cutout2.right){
    if (
      cutout1.bottom == cutout2.top &&
      self.y == cutout1.bottom
    ){
      return true;
    } else if (
      cutout1.top == cutout2.bottom &&
      self.y == cutout1.top
    ) {
      return true;
    }
  }
} // self.x = cutout2.right

function checkCutoutsTopBottomLowerRight(self, cutout1, cutout2){
  if (cutout1.right < cutout2.right){
    if (
      cutout1.bottom == cutout2.top &&
      self.y == cutout1.bottom
    ){
      return true;
    } else if (
      cutout1.top == cutout2.bottom &&
      self.y == cutout1.top
    ){
      return true;
    }
  }
} // self.x = cutout1.right;

Player.prototype.moveOutAndCreate = function(event){

}

Player.prototype.move = function (event) {
  switch (event.keyCode) {
    case UP_KEY: // Up
      if (this.vy > -this.speed){
        this.vy--
      }
      // this.y -= this.v;
      break;
    case DOWN_KEY: // down
      if (this.vy < this.speed){
        this.vy++
      }
      // this.y += this.v;
      break;
    case LEFT_KEY: // left
      if (this.vx > -this.speed){
        this.vx--
      }
      // this.x -= this.v;
      break;
    case RIGHT_KEY: // right
      if (this.vx < this.speed){
        this.vx++
      }
      // this.x += this.v;
      break;
  }
  this.y += this.vy;
  this.x += this.vx;
}

Player.prototype.clearVelocity = function(event){
  switch (event.keyCode) {
    case UP_KEY:
    case DOWN_KEY:
    case LEFT_KEY:
    case RIGHT_KEY:
      this.vx = 0;
      this.vy = 0;
      break;
  }
};