function Cutout(game) {
  this.game = game;
  
  this.x = 400;
  this.y = 200;
  this.width = 350;
  this.height = 250;

  this.top = this.y;
  this.bottom = this.y + this.height;
  this.left = this.x;
  this.right = this.x + this.width;
};

Cutout.prototype.draw = function(){
  this.game.context.fillStyle = "black";
  this.game.context.fillRect(this.x, this.y, this.width, this.height);
}

