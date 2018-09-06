function Explosion(game,stage,player,x0,y0,r){
  this.game = game;
  this.stage = stage;
  this.player = player;

  this.x0 = x0;
  this.y0 = y0;

  this.r = r;
  this.v = 2;

  this.vx1 = -this.v;
  this.vy1 = -this.v;
  this.vx2 = 0;
  this.vy2 = -this.v;
  this.vx3 = this.v;
  this.vy3 = -this.v;
  this.vx4 = -this.v;
  this.vy4 = 0;
  this.vx5 = this.v;
  this.vy5 = 0;
  this.vx6 = -this.v;
  this.vy6 = this.v;
  this.vx7 = 0;
  this.vy7 = this.v;
  this.vx8 = this.v;
  this.vy8 = this.v;

  this.f = 0.97;

  this.a = 0.99;

  this.createParticles();
}

Explosion.prototype.createParticles = function(){
  this.particle1 = new Particle(this.game,this.r,this.x0,this.y0,this.vx1,this.vy1,this.f,this.a);
  this.particle2 = new Particle(this.game,this.r,this.x0,this.y0,this.vx2,this.vy2,this.f,this.a);
  this.particle3 = new Particle(this.game,this.r,this.x0,this.y0,this.vx3,this.vy3,this.f,this.a);
  this.particle4 = new Particle(this.game,this.r,this.x0,this.y0,this.vx4,this.vy4,this.f,this.a);
  this.particle5 = new Particle(this.game,this.r,this.x0,this.y0,this.vx5,this.vy5,this.f,this.a);
  this.particle6 = new Particle(this.game,this.r,this.x0,this.y0,this.vx6,this.vy6,this.f,this.a);
  this.particle7 = new Particle(this.game,this.r,this.x0,this.y0,this.vx7,this.vy7,this.f,this.a);
  this.particle8 = new Particle(this.game,this.r,this.x0,this.y0,this.vx8,this.vy8,this.f,this.a);
}

Explosion.prototype.drawParticles = function() {
  this.particle1.draw();
  this.particle2.draw();
  this.particle3.draw();
  this.particle4.draw();
  this.particle5.draw();
  this.particle6.draw();
  this.particle7.draw();
  this.particle8.draw();
};

Explosion.prototype.moveParticles = function() {
  this.particle1.move();
  this.particle2.move();
  this.particle3.move();
  this.particle4.move();
  this.particle5.move();
  this.particle6.move();
  this.particle7.move();
  this.particle8.move();
};

function Particle(game,r,x0,y0,vx,vy,f,a){
  this.game = game;
  this.x = x0;
  this.y = y0;
  this.vx = vx;
  this.vy = vy;
  this.r = r;
  this.f = f;
  this.a = a;
  this.currentAlpha = 1;
}

Particle.prototype.draw = function(){
  this.game.context.globalCompositeOperation = this.currentAlpha;
  this.game.context.beginPath();
  this.game.context.fillStyle = "#e8f441";
  this.game.context.lineWidth = 0;
  this.game.context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  this.game.context.fill();
  this.game.context.closePath();
  this.game.context.globalCompositeOperation = 1;
}

Particle.prototype.move = function(){
  this.x += this.vx;
  this.y += this.vy;
  this.vx *= this.f;
  this.vy *= this.f;
  this.currentAlpha *= this.a;
}