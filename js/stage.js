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

  this.cutout1 = new Cutout(this.game, 200, 300, 200, 300);
  this.cutout2 = new Cutout(this.game, 600, 200, 200, 100);
  this.cutouts = [ this.cutout1, this.cutout2 ];
};

Stage.prototype.draw = function () {
  this.game.context.fillStyle = 'yellow';
  this.game.context.fillRect(this.x, this.y, this.width, this.height);
  this.cutouts.forEach(function(element){
    element.draw();
  });
};

Stage.prototype.addCutout = function (x, y, w, h){
  this.cutouts.push(new Cutout(this.game, x, y, w, h))
};