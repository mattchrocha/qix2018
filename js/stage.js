function Stage(game) {
  this.game = game;
  
  this.x = 40;
  this.y = 40;
  this.width = 920;
  this.height = 540;

  this.top = this.y;
  this.bottom = this.y + this.height;
  this.left = this.x;
  this.right = this.x + this.width;
};

Stage.prototype.draw = function () {
  this.game.context.fillStyle = 'yellow';
  this.game.context.fillRect(this.x, this.y, this.width, this.height);
};