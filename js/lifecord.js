function LifeCord(game, stage, boss, player, x, y){
  this.game = game;
  this.stage = stage;
  this.cutouts = stage.cutouts;
  this.boss = boss;
  this.player = player;

  this.x0 = x;
  this.y0 = y;
}

LifeCord.prototype.draw = function(){
  this.game.context.moveTo(this.x0, this.y0);
  this.game.context.lineTo(this.player.x, this.player.y);
  this.game.context.stroke();
}


// intersects(this.boss.)


function intersects(a,b,c,d,p,q,r,s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};