function Boss(game, stage, cutout, x, y) {
  this.game = game;
  this.stage = stage;
  this.cutout = cutout;

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
    console.log("bounce canvas X");
    this.vx *= -1;
  }
  if (
    this.bottom + this.vy > this.stage.bottom ||
    this.top + this.vy < this.stage.top
  ) {
    console.log("bounce canvas Y");
    this.vy *= -1;
  }

  // Bounce the cutouts
  if (
    this.right + this.vx > this.cutout.left &&
    this.bottom + this.vy > this.cutout.top &&
    this.top + this.vy < this.cutout.bottom &&
    this.left + this.vx < this.cutout.right
  ){
    console.log("bounce cutout X");
    this.vx *= -1;
  }
  if (
    this.bottom + this.vy > this.cutout.top &&
    this.right + this.vx > this.cutout.left &&
    this.left + this.vx < this.cutout.right &&
    this.top + this.vy < this.cutout.bottom
  ){
    console.log("bounce cutout Y");
    this.vy *= -1;
  }
};
