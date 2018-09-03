function Game(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.context = this.canvas.getContext('2d');
  this.fps = 60;

  this.reset();
};

Game.prototype.start = function () {
  this.interval = setInterval(function() {
    this.clearAll();
    this.drawAll();
    this.moveAll();
  }.bind(this), 1000 / this.fps);
}


Game.prototype.reset = function() {
  // this.background = new Background(this);
  // this.player = new Player(this);
  // this.framesCounter = 0;
  // this.obstacles = [];
  // this.score = 0;
  this.boss = new Boss(this, 0, 0);
};

Game.prototype.drawAll = function() {
  this.context.fillStyle='green';
  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.boss.draw();
}

Game.prototype.clearAll = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.moveAll = function() {
  this.boss.move();
}