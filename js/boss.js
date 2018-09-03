function Boss(game, x, y) {
  this.game = game;

  this.x = x;
  this.y = y;

  this.r = 5;

  this.vx = 10;
  this.vy = 4;

  this.bossWidth = 50;
  this.bossHeight = 50;
};

Boss.prototype.draw = function () {
  this.game.context.fillStyle = "red";
  this.game.context.fillRect(this.x, this.y, this.bossWidth, this.bossHeight);
}

Boss.prototype.move = function () {
  this.x += this.vx;
  this.y += this.vy;
  if (this.x + this.bossWidth + this.vx > this.game.canvas.width || this.x + this.vx < 0){
    this.vx *= -1;
  }
  if (this.y + this.bossHeight + this.vy > this.game.canvas.height || this.y + this.vy < 0){
    this.vy *= -1;
  }
}