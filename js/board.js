function Board(game,message){
  this.game = game;

  this.x = 200;
  this.y = 1000;
  this.width = 600;
  this.height = 420;

  this.vy = 40;

  this.message = message;
}


Board.prototype.draw = function () {

  this.game.context.fillStyle = 'rgba(216, 231, 255, 0.5)';
  this.game.context.strokeStyle = "#003b9b";
  this.game.context.lineWidth = 10;
  this.game.context.fillRect(this.x, this.y, this.width, this.height);
  this.game.context.strokeRect(this.x, this.y, this.width, this.height);


  this.game.context.font = "300 32px Kanit";
  this.game.context.fillStyle = "white";
  this.game.context.textAlign = "center";
  // this.game.context.globalCompositeOperation = "multiply";
  this.game.context.fillText(this.message,this.game.canvas.width/2, this.y+100);
  // this.game.context.globalCompositeOperation = "source-over";
}; 


Board.prototype.move = function (){
  if (this.y > 100){
    this.y -= this.vy;
    this.vy *= 0.96;
  }
}