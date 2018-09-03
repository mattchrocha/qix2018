function Boss(game, stage, x, y) {
  this.game = game;
  this.stage = stage;
  this.cutouts = stage.cutouts;

  this.x = x;
  this.y = y;

  this.r = 5;

  this.vx = 10;
  this.vy = 4;

  this.width = 50;
  this.height = 50;

  this.top = this.y;
  this.bottom = this.y + this.height;
  this.left = this.x;
  this.right = this.x + this.width;
}

Boss.prototype.updateObjectLimits = function() {
  this.top = this.y;
  this.bottom = this.y + this.height;
  this.left = this.x;
  this.right = this.x + this.width;
};

Boss.prototype.draw = function() {
  this.game.context.fillStyle = "red";
  this.game.context.fillRect(this.x, this.y, this.width, this.height);
};





Boss.prototype.move = function() {
  this.x += this.vx;
  this.y += this.vy;
  this.updateObjectLimits();

  // Bounce inside the whole stage
  if (
    this.right + this.vx > this.stage.right ||
    this.left + this.vx < this.stage.left 
  ) {
    this.vx *= -1;
  }
  if (
    this.bottom + this.vy > this.stage.bottom ||
    this.top + this.vy < this.stage.top
  ) {
    this.vy *= -1;
  }

  // Bounce with cutouts
  for (var i = 0; i < this.cutouts.length; i++) {
    checkCutoutsAndBounce(this, this.cutouts[i]);
  };
};

function checkCutoutsAndBounce(self, cutout){
  if (
    self.right + self.vx > cutout.left &&
    self.bottom + self.vy > cutout.top &&
    self.top + self.vy < cutout.bottom &&
    self.left + self.vx < cutout.right
  ){
    self.vx *= -1;
  }
  if (
    self.bottom + self.vy > cutout.top &&
    self.right + self.vx > cutout.left &&
    self.left + self.vx < cutout.right &&
    self.top + self.vy < cutout.bottom
  ){
    self.vy *= -1;
  }
};