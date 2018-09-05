function Game(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.context = this.canvas.getContext("2d");
  this.fps = 60;

  this.reset();
}

Game.prototype.start = function() {
  this.interval = setInterval(
    function() {
      this.clearAll();
      this.drawAll();
      this.detectAll();
      this.moveAll();
    }.bind(this),
    1000 / 60
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
};

Game.prototype.drawAll = function() {
  this.context.fillStyle = "green";
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.stage.draw();
  this.boss.draw();
  this.player.draw();
};

Game.prototype.clearAll = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.moveAll = function() {
  this.boss.move();
};

Game.prototype.detectAll = function(){
  this.collidesLifeCord();
  this.collidesPlayer();
  this.destroysBoss();
};


Game.prototype.collidesLifeCord = function(){
  if (this.player.lifeCord){
    if (elementsIntersect(this.boss,this.player.lifeCord)){
      if (confirm("You crashed! New game?")){
        return this.reset();
      };
    };
  };
};

Game.prototype.collidesPlayer = function(){
  if (this.player.createMode){
    if (elementsIntersect(this.boss,this.player)){
      if (confirm("You have been destroyed! New game?")){
        return this.reset();
      };
    }
  }
}

Game.prototype.destroysBoss = function(){
  if (this.calculateAreaLeft() <= 20){
    if (confirm("You won! New game?")){
      return this.reset();
    };
  }
}


Game.prototype.calculateAreaLeft = function(){
  var acc = 0;
  this.stage.cutouts.forEach(function(element){
    acc += (element.width * element.height);
  });
  return 100 - (acc/this.stage.originalArea*100)
}



function calculateArea(element){
  return ;
}
