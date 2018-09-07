function LifeCord(game, stage, boss, player, x, y){
  this.game = game;
  this.stage = stage;
  this.cutouts = stage.cutouts;
  this.boss = boss;
  this.player = player;

  this.x0 = x;
  this.y0 = y;

  this.updateObjectBoundaries();
}

LifeCord.prototype.updateObjectBoundaries = function() {
  this.boundaries = [[[this.x0, this.y0],[this.player.x, this.player.y]]];
};

LifeCord.prototype.draw = function(){
  this.game.context.beginPath();
  this.game.context.moveTo(this.x0, this.y0);
  this.game.context.lineTo(this.player.x, this.player.y);
  this.game.context.strokeStyle = "#f4cd41";
  this.game.context.lineWidth = 5;
  this.game.context.lineCap="round";
  this.game.context.setLineDash([]);
  this.game.context.stroke();
  this.game.context.closePath();
  this.updateObjectBoundaries();
}



