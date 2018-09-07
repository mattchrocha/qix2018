function Welcome(game){
  this.game = game;

  this.x = 40;
  this.y = 40;
  this.width = 920;
  this.height = 540;

  this.opacity = 0;

  this.scaleX = 0.01;
  this.scaleY = 0.01;

  

  this.setListeners();
}

Welcome.prototype.draw = function () {
  this.game.context.save()
  this.game.context.scale(this.scaleX,this.scaleY)
  this.game.context.fillStyle = 'rgba(216, 231, 255, 0.5)';
  this.game.context.strokeStyle = "#003b9b";
  this.game.context.lineWidth = 10;
  this.game.context.fillRect(this.x, this.y, this.width, this.height);
  this.game.context.strokeRect(this.x, this.y, this.width, this.height);
  

  this.game.context.font = "800 140px Kanit";
  this.game.context.fillStyle = "white";
  this.game.context.textAlign = "center";
  // this.game.context.globalCompositeOperation = "multiply";
  this.game.context.fillText("QIX",this.game.canvas.width/2, this.y+150);
  
  // this.game.context.globalCompositeOperation = "source-over"
  this.game.context.restore()

  
}; 

Welcome.prototype.move = function (){
  if (this.scaleX < 1){
    
    this.scaleX *= 1.1;
    this.scaleY *= 1.1;
  } if (this.scaleX > 1){
    this.scaleX = 1;
    this.scaleY = 1;
  }
}



Welcome.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    if (event.keyCode === SPACE_BAR){
      this.game.pressStart = false;
      clearTimeout(exploLoop);
      clearTimeout(exploIntro);
      this.game.reset();
    }
  }.bind(this);
};


Welcome.prototype.drawInstruction1 = function(){
  
  this.game.context.fillStyle = "rgba(255, 255, 255,"+ this.opacity +")";
  this.game.context.textAlign = "center";
  this.game.context.font = "800 30px Kanit";
  this.game.context.fillText("1",180, this.y+370);
  this.game.context.font = "300 19px Kanit";
  this.game.context.fillText("Move your ship",180, this.y+400);
  this.game.context.fillText("around the boundaries",180, this.y+425);
  this.game.context.fillText("with arrow keys",180, this.y+450);

  this.game.context.font = "800 30px Kanit";
  this.game.context.fillText("2",400, this.y+370);
  this.game.context.font = "300 19px Kanit";
  this.game.context.fillText("Hit space to",400, this.y+400);
  this.game.context.fillText("create shapes and",400, this.y+425);
  this.game.context.fillText("reduce the stage",400, this.y+450);

  this.game.context.font = "800 30px Kanit";
  this.game.context.fillText("3",620, this.y+370);
  this.game.context.font = "300 19px Kanit";
  this.game.context.fillText("Beware the enemy!",620, this.y+400);
  this.game.context.fillText("It can destroy you",620, this.y+425);
  this.game.context.fillText("or your life supply",620, this.y+450);

  this.game.context.font = "800 30px Kanit";
  this.game.context.fillText("4",840, this.y+370);
  this.game.context.font = "300 19px Kanit";
  this.game.context.fillText("Destroy the enemy",840, this.y+400);
  this.game.context.fillText("when the stage",840, this.y+425);
  this.game.context.fillText("is below 20%!",840, this.y+450);
  
  this.game.context.font = "300 22px Kanit";
  this.game.context.textAlign = "center";
  this.game.context.fillText("Press Space to start",this.game.canvas.width/2, this.y+500);

  this.game.context.beginPath();
  this.game.context.fillStyle = "rgba(232, 244, 65,"+this.opacity + ")";
  this.game.context.lineWidth = 0;
  this.game.context.arc(180, 300, 10, 0, Math.PI * 2);
  this.game.context.fill();
  this.game.context.closePath();

  this.game.context.fillStyle = "rgba(244, 67, 232,"+ this.opacity +")";
  this.game.context.fillRect(815, 275, 50, 50);

  
  
  
  


  if (this.opacity < 1){
    this.opacity += 0.01;
  }
}