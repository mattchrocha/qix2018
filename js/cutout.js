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

  this.updateObjectBoundaries();
};

Cutout.prototype.draw = function(){
  this.game.context.fillStyle = "#4253f4";
  this.game.context.fillRect(this.x, this.y, this.width, this.height);
}

Cutout.prototype.updateObjectBoundaries = function() {
  this.tl = [this.x, this.y];
  this.tr = [this.x, this.y + this.width];
  this.bl = [this.x + this.height, this.y];
  this.br = [this.x + this.width, this.y + this.height];
  this.topNew = [this.tl, this.tr];
  this.rightNew = [this.tr, this.br];
  this.bottomNew = [this.br, this.bl];
  this.leftNew = [this.bl, this.tr];
  this.boundaries = [this.topNew,this.rightNew,this.bottomNew,this.leftNew];
};

