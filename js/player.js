function Player(game, stage, boss, x, y){
  this.game = game;
  this.stage = stage;
  this.cutouts = stage.cutouts;
  this.boss = boss;

  this.x = x;
  this.y = y;

  this.r = 10;

  this.v = 8;

  this.vx = 0;
  this.vy = 0;
  this.speed = 1;

  this.acc = 0;

  this.createMode = false;
  this.newCutoutX = [];
  this.newCutoutY = [];

  this.lifeCord = null;

  this.rgb = "232, 244, 65";

  this.offset = 1;
  this.offsetSpeed = 1;

  this.setListeners();
}
var keysDown = {}
var UP_KEY = 38;
var DOWN_KEY = 40;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var SPACE_BAR = 32;

Player.prototype.updateObjectBoundaries = function() {
  this.tl = [this.x-this.r, this.y-this.r];
  this.tr = [this.x+this.r, this.y-this.r];
  this.bl = [this.x-this.r, this.y+this.r];
  this.br = [this.x+this.r, this.y+this.r];
  this.topNew = [this.tl, this.tr];
  this.rightNew = [this.tr, this.br];
  this.bottomNew = [this.bl, this.br];
  this.leftNew = [this.tl, this.bl];
  this.boundaries = [this.topNew,this.rightNew,this.bottomNew,this.leftNew];
};

Player.prototype.draw = function () {
  if (this.lifeCord){
    this.stage.move()
    this.lifeCord.draw()
  };
  if (!this.lifeCord && !this.game.lose){
    this.game.context.beginPath();
    this.game.context.lineWidth = 3;
    this.game.context.strokeStyle = "#f4cd41";
    this.game.context.lineCap="round";
    this.game.context.arc(this.x, this.y, this.r+9, 0, Math.PI * 2);
    this.game.context.setLineDash([1, 6]);
    this.game.context.lineDashOffset = this.offset;
    this.game.context.stroke();
    this.game.context.closePath();
    this.offset -= this.offsetSpeed;
  }
  this.game.context.beginPath();
  this.game.context.fillStyle = "#e8f441";
  this.game.context.lineWidth = 0;
  this.game.context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  this.game.context.fill();
  this.game.context.strokeStyle = "rgba(255, 255, 255, 0)";
  this.game.context.stroke();
  this.game.context.closePath();
  this.updateObjectBoundaries();
};

Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === SPACE_BAR && !this.game.lose && !this.game.win){
      this.createMode = !this.createMode;
      this.createCutout();
      this.createLifeCord();
      console.log("Create mode: "+ this.createMode)
    }
    keysDown[event.keyCode] = true;
    // if (!this.createMode){
    //   keysDown[event.keyCode] = true;
    //   this.moveInBoundaries(event);
    // } else if (this.createMode){
    //   keysDown[event.keyCode] = true;
    //   this.move(event);
      // this.moveOutAndCreate(event);

  }.bind(this);

  document.onkeyup = function(event) {
    delete keysDown[event.keyCode];
    this.clearVelocity(event);
  }.bind(this);
};

// if(!this.player.createMode){
//   this.player.moveInBoundaries();
// } else if (this.player.createMode){
//   this.player.move(event);


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
  if (/*event.keyCode === UP_KEY*/UP_KEY in keysDown) {
    if (this.canMoveY()) {
      if (this.y - this.v < this.stage.top){
        this.y = this.stage.top;
      } else {
        this.y -= this.v;
      };
    };
  } else if (/*event.keyCode === */RIGHT_KEY in keysDown) {
    if (this.canMoveX()){
      if (this.x + this.v > this.stage.right){
        this.x = this.stage.right;
      } else {
        this.x += this.v;
      }
    }
  } else if (/*event.keyCode === */DOWN_KEY in keysDown){
    if (this.canMoveY()) {
      if (this.y + this.v > this.stage.bottom){
        this.y = this.stage.bottom;
      } else {
        this.y += this.v;
      };
    };
  } else if (/*event.keyCode === */LEFT_KEY in keysDown) {
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
  if (UP_KEY in keysDown) {
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
  } else if (/*event.keyCode === */RIGHT_KEY in keysDown) {
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
  } else if (/*event.keyCode === */DOWN_KEY in keysDown){
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
    
  } else if (/*event.keyCode === */LEFT_KEY in keysDown) {
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
  if (UP_KEY in keysDown) {
    if (checkCutoutsLeftRightHigherBottom(this, cutout1, cutout2)){
      this.y = cutout2.bottom;
    } else if (checkCutoutsLeftRightLowerBottom(this, cutout1, cutout2)){
      this.y = cutout1.bottom;
    }
  } else if (/*event.keyCode ===*/ RIGHT_KEY in keysDown) {
    if (checkCutoutsTopBottomHigherLeft(this, cutout1, cutout2)){
      this.x = cutout1.left;
    } else if (checkCutoutsTopBottomLowerLeft(this, cutout1, cutout2)){
      this.x = cutout2.left;
    }
  } else if (/*event.keyCode ===*/ DOWN_KEY in keysDown) {
    if (checkCutoutsLeftRightHigherTop(this, cutout1, cutout2)){
      this.y = cutout1.top;
    } else if (checkCutoutsLeftRightLowerTop(this, cutout1, cutout2)){
      this.y = cutout2.top;
    }
  } else if (/*event.keyCode ===*/ LEFT_KEY in keysDown) {
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
      // if (this.vy > -this.speed){
      //   this.vy--
      // }
      this.y -= this.v;
      break;
    case DOWN_KEY: // down
      // if (this.vy < this.speed){
      //   this.vy++
      // }
      this.y += this.v;
      break;
    case LEFT_KEY: // left
      // if (this.vx > -this.speed){
      //   this.vx--
      // }
      this.x -= this.v;
      break;
    case RIGHT_KEY: // right
      // if (this.vx < this.speed){
      //   this.vx++
      // }
      this.x += this.v;
      break;
  }
  // this.y += this.vy;
  // this.x += this.vx;
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

Player.prototype.createCutout = function (){
  if (this.createMode){
    this.newCutoutX.push(this.x);
    this.newCutoutY.push(this.y);
  } else if (!this.createMode){
    this.newCutoutX.push(this.x);
    this.newCutoutY.push(this.y);
    this.pushCutout(this.newCutoutX, this.newCutoutY);
    this.newCutoutX = [];
    this.newCutoutY = [];
  }
}

Player.prototype.pushCutout = function (coordX, coordY){
  if (coordX[0] !== coordX[1] && coordY[0] !== coordY[1]){
    function compare ( a, b ){ return a - b; };
    coordX.sort(compare);
    coordY.sort(compare);
    this.stage.addCutout(coordX[0], coordY[0], coordX[1]-coordX[0], coordY[1]-coordY[0]);
    // console.log(this.stage.cutouts);
    // console.log("Area left: " + this.game.calculateAreaLeft())
  } else {
    console.log("works")
    this.x = coordX[0]
    this.y = coordY[0]
  }
}

Player.prototype.createLifeCord = function (){
  if (this.createMode){
    this.lifeCord = new LifeCord(this.game, this.stage, this.boss, this, this.x, this.y);
  } else if (!this.createMode){
    this.lifeCord = null;
  };
}



Player.prototype.newMovement = function (event) {
  if (UP_KEY in keysDown) {
    if (this.y - this.v < this.stage.top) {
      this.y = this.stage.top;
    } else {
      this.y -= this.v;
    };
  }
  if (RIGHT_KEY in keysDown) {
    if (this.x + this.v > this.stage.right) {
      this.x = this.stage.right;
    } else {
      this.x += this.v;
    }
  }
  if (DOWN_KEY in keysDown) {
    if (this.y + this.v > this.stage.bottom) {
      this.y = this.stage.bottom;
    } else {
      this.y += this.v;
    };
  }
  if (LEFT_KEY in keysDown) {
    if (this.x - this.v < this.stage.left) {
      this.x = this.stage.left;
    } else {
      this.x -= this.v;
    }
  };
};