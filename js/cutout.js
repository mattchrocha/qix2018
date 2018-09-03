function Cutout(game, x, y, width, height) {
  this.game = game;
  
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.top = this.y;
  this.bottom = this.y + this.height;
  this.left = this.x;
  this.right = this.x + this.width;
};

Cutout.prototype.draw = function(){
  this.game.context.fillStyle = "black";
  this.game.context.fillRect(this.x, this.y, this.width, this.height);
}

