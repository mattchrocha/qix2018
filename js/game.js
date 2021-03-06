function Game(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.context = this.canvas.getContext("2d");
  this.fps = 60;

  this.win = false;
  this.lose = false;
  
  this.pressStart = true;
  this.welcome = new Welcome(this);
  this.instruction1();
  // this.reset();
  this.explosionIntro();
}

Game.prototype.update = function() {
  this.interval = setInterval(
    function() {
      if (this.pressStart){
        this.clearAll();
        this.drawWelcome();
        this.welcome.move();
        if (this.welcome.instruction1){
          this.welcome.drawInstruction1();
          if (this.explosion){
            this.explosion.drawParticles();
            this.explosion.moveParticles();
          }
        }
      } else {
        this.clearAll();
        this.drawAll();
        this.detectAll();
        this.moveAll(keysDown);
      }
    }.bind(this),
    1000 / this.fps
  );
};

Game.prototype.reset = function() {
  // this.background = new Background(this);
  // this.player = new Player(this);
  // this.framesCounter = 0;
  // this.obstacles = [];
  // this.score = 0;
  this.stage = new Stage(this);
  // this.cutout1 = new Cutout(this, 200, 300, 200, 300);
  // this.cutout2 = new Cutout(this, 600, 200, 200, 100);
  // this.cutouts = [ this.cutout1, this.cutout2 ];
  this.boss = new Boss(this, this.stage, 80, 80);
  this.player = new Player(this, this.stage, this.boss, 40, 40);
  this.board = false;
  this.explosion = false;
  this.win = false;
  this.lose = false;
};

Game.prototype.drawAll = function() {
  this.context.fillStyle = "#4253f4";
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.stage.draw();
  this.drawAreaLeft();
  this.boss.draw();
  this.player.draw();
  if (this.explosion){
    this.explosion.drawParticles();
  }
  if (this.board){
    this.board.draw();
  }
};

Game.prototype.clearAll = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.moveAll = function(events) {
  this.boss.move();
  if (this.explosion){
    this.explosion.moveParticles();
  }
  if (this.board){
    this.board.move();
  }
  if (!this.player.createMode){
    this.player.moveInBoundaries(events);
  } else if (this.player.createMode){
    this.player.newMovement(events);
  }
};

Game.prototype.detectAll = function(){
  if (!this.win && !this.lose){
    this.collidesLifeCord();
    this.collidesPlayer();
    this.destroysBoss();
  }
};

Game.prototype.popBoard = function(message){
    window.setTimeout(function(){
      this.board = new Board(this, message);
    }.bind(this),800);
}

Game.prototype.collidesLifeCord = function(){
  if (this.player.lifeCord){
    if (elementsIntersect(this.boss,this.player.lifeCord)){
     this.explodePlayer();
     this.player.createMode = false;
     this.lose = true;
     this.popBoard("Your life supply has been destroyed!")
    };
  };
};

Game.prototype.collidesPlayer = function(){
  if (this.player.createMode){
    if (elementsIntersect(this.boss,this.player)){
      this.explodePlayer();
      this.player.createMode = false;
      this.lose = true;
      this.popBoard("The enemy destroyed your ship!")
    }
  }
}

Game.prototype.destroysBoss = function(){
  if (this.calculateAreaLeft() <= 20){
    this.explodeBoss();
    this.win = true;
    this.popBoard("You destroyed the enemy! Yeah!")
  }
}


Game.prototype.calculateAreaLeft = function(){
  var acc = 0;
  this.stage.cutouts.forEach(function(element){
    acc += (element.width * element.height);
  });
  return 100 - (acc/this.stage.originalArea*100)
}

Game.prototype.drawAreaLeft = function(){
  var areaLeft = this.calculateAreaLeft().toFixed(2).toString();
  if (areaLeft == "100.00"){
    areaLeft = "100"
  }
  this.context.font = "800 100px Kanit";
  this.context.fillStyle = "#f788ef";
  this.context.textAlign = "center";
  this.context.globalCompositeOperation = "multiply";
  this.context.fillText(areaLeft+"%",this.canvas.width/2, this.canvas.height/2+30);
  this.context.globalCompositeOperation = "source-over";
}


Game.prototype.explodePlayer = function (){
  this.player.lifeCord = null;
  this.explosion = new Explosion(this,this.stage,this.player,this.player.x,this.player.y,this.player.r,this.player.rgb);
  this.player.r = 0;
}

Game.prototype.explodeBoss = function (){
  this.player.lifeCord = false;
  this.boss.vx = 0;
  this.boss.vy = 0;
  this.explosion = new Explosion(this,this.stage,this.player,this.boss.x,this.boss.y,this.boss.width,this.boss.rgb);
  this.boss.width = 0;
  this.boss.height = 0;
}

Game.prototype.drawWelcome = function (){
  this.context.fillStyle = "#4253f4";
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.welcome.draw();
}


Game.prototype.instruction1 = function(message){
    window.setTimeout(function(){
      this.welcome.instruction1 = true;
    }.bind(this),2000);
}

Game.prototype.explosionIntro = function (){
  exploIntro = window.setTimeout(function(){
    this.explosion = new Explosion(this,this.stage,this.player,this.canvas.width/2,300,10,"232, 244, 65");
    this.nextExplosion();
    console.log("happens")
  }.bind(this),3000);
}

var exploIntro

Game.prototype.nextExplosion = function (){
  
  exploLoop = window.setTimeout(function(){
    this.explosion = new Explosion(this,this.stage,this.player,this.canvas.width/2,300,10,"232, 244, 65");
    this.nextExplosion();
  }.bind(this),2000);
}

var exploLoop;