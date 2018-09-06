var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d')


function degToRad(angle){
  return (angle*2*Math.PI)/360;
}

function Car(x,y){
  this.x = x;
  this.y = y;
  this.angle = Math.PI;
  this.angularSpeed = 0;
  this.speed = 0;
  this.acc = 0;
  this.img = new Image();
  this.ratio = 900/490;
  this.carSize = 50;
  this.img.src = "https://i.pinimg.com/originals/9c/4e/6c/9c4e6cdc5ea03c911967c82f1ea80956.png"
}

Car.prototype.update = function(delta){
  
  this.angle += this.angularSpeed;
  this.speed += this.acc;
  this.speed *= 0.95;
  this.x += this.speed * Math.cos(this.angle);
  this.y += this.speed * Math.sin(this.angle);
}

Car.prototype.draw = function(ctx){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  ctx.drawImage(this.img,
                -this.carSize*this.ratio/2,
                -this.carSize/2, 
                this.carSize*this.ratio,this.carSize);
  ctx.restore();
}

Car.prototype.turnAngleSpeed = function(aS){
  if(this.angularSpeed < degToRad(10) && this.angularSpeed > -degToRad(10)){
    this.angularSpeed += degToRad(aS);
  }
}

Car.prototype.handleKeyDown = function(key){
  console.log(key);
  switch(key){
    case 38: // Up
     this.acc = -0.5;
     break;
    case 40: // down
     this.acc = 0.5;
     break; 
    case 37: // left
     this.turnAngleSpeed(-1);
     break; 
    case 39: // right
     this.turnAngleSpeed(1);
     break; 
  }
}

Car.prototype.handleKeyUp = function(key){
   switch(key){
    case 38: // Up
     this.acc = 0;
     break;
    case 40: // down
     this.acc = 0;
     break; 
    case 37: // left
     this.angularSpeed = 0;
     break; 
    case 39: // right
     this.angularSpeed = 0;
     break; 
  }
}

document.onkeydown = function(e){
  car.handleKeyDown(e.keyCode);
  car2.handleKeyDown(e.keyCode);
}

document.onkeyup = function(e){
  car.handleKeyUp(e.keyCode);  
  car2.handleKeyUp(e.keyCode);
}


var car = new Car(100,100);
var car2 = new Car(200,200);

// Render Loop
var lastTime = 0;
function update(time){
  var delta = time-lastTime;
  lastTime = time;
  ctx.clearRect(0,0,canvas.width, canvas.height);
  car.update(delta);
  car.draw(ctx);
  car2.update(delta);
  car2.draw(ctx);
  window.requestAnimationFrame(update);
}


window.requestAnimationFrame(update);