function Stage(game) {
  this.game = game;

  this.x = 40;
  this.y = 40;
  this.width = 920;
  this.height = 540;

  this.originalArea = this.width * this.height;
  this.currentArea = this.originalArea;

  this.top = this.y;
  this.bottom = this.y + this.height;
  this.left = this.x;
  this.right = this.x + this.width;

  // this.cutout1 = new Cutout(this.game, 200, 300, 200, 280);
  // this.cutout2 = new Cutout(this.game, 600, 40, 200, 100);
  // this.cutout3 = new Cutout(this.game, 500, 200, 460, 100);
  // this.cutout4 = new Cutout(this.game, 40, 150, 200, 100);
  // this.cutout5 = new Cutout(this.game, 650, 140, 80, 20);
  // this.cutout6 = new Cutout(this.game, 800, 40, 80, 20);
  // this.cutout7 = new Cutout(this.game, 250, 220, 230, 120);
  this.cutouts = []
  // this.cutouts = [this.cutout1, this.cutout2, this.cutout3, this.cutout4 , this.cutout5, this.cutout6, this.cutout7];
  this.tl = [this.x, this.y];
  this.tr = [this.x + this.width, this.y];
  this.bl = [this.x, this.y + this.height];
  this.br = [this.x + this.width, this.y + this.height];
  this.topNew = [this.tl, this.tr];
  this.rightNew = [this.tr, this.br];
  this.bottomNew = [this.br, this.bl];
  this.leftNew = [this.bl, this.tl];
  this.boundaries = [this.topNew,this.rightNew,this.bottomNew,this.leftNew];
  // this.updateObjectBoundaries();

  

  this.gradRadio = 100;
  this.gradVel = 5;
};

// Stage.prototype.updateObjectBoundaries = function() {
//   this.tl = [this.x, this.y];
//   this.tr = [this.x + this.width, this.y];
//   this.bl = [this.x, this.y + this.height];
//   this.br = [this.x + this.width, this.y + this.height];
//   this.topNew = [this.tl, this.tr];
//   this.rightNew = [this.tr, this.br];
//   this.bottomNew = [this.br, this.bl];
//   this.leftNew = [this.bl, this.tl];
//   this.boundaries = [this.topNew,this.rightNew,this.bottomNew,this.leftNew];
// };

Stage.prototype.draw = function () {
  this.gradient = this.game.context.createRadialGradient(this.game.canvas.width/2,this.game.canvas.height/2,this.gradRadio,this.game.canvas.width/2,this.game.canvas.height/2,400);
  this.gradient.addColorStop(1,"rgb(91, 154, 255)");
  this.gradient.addColorStop(0.2,"rgb(173, 205, 255)");
  this.gradient.addColorStop(0,"rgb(184, 210, 252)");
  this.game.context.fillStyle = /*'#5b9aff'*/ this.gradient;
  this.game.context.fillRect(this.x, this.y, this.width, this.height);
  this.cutouts.forEach(function(element){
    element.draw();
  });
};

Stage.prototype.addCutout = function (x, y, w, h){
  this.cutouts.push(new Cutout(this.game, x, y, w, h))
};

Stage.prototype.reduceStage = function (arrayOfLines){
  this.boundaries.forEach(function(element, index){

  });
}

Stage.prototype.move = function(){
  this.gradRadio += this.gradVel;
  if (this.gradRadio > 200){
    this.gradVel *= -1;
  } else if (this.gradRadio < 100){
    this.gradVel *= -1;
  }
  
}



