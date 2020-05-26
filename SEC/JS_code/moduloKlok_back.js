function setup() {
    frameRate(10);
    modulo(34,26);
}

var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;
var sleutel = 3;

function keyReleased() {
    if (keyCode == 39 || keyCode == 38) {
        sleutel++;
    }
    if (keyCode == 37 || keyCode == 40) {
        sleutel--;
    }
    modulo(34,26);
  return false;
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.88, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.01;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius, p, sl) {
  var ang;
  var num;
  var schuif;
  var alfabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  ctx.font = radius*0.15*(22/p) + "px monospace";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 0; num < p; num++){
    ang = num * Math.PI / ((p)/2);
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.8);
    ctx.rotate(-ang);
    schuif = num - sl % 26;
    if (schuif >= 26) {schuif -= 26;}
    if (schuif < 0) {schuif += 26;}
	ctx.fillText(alfabet[schuif].toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.8);
    ctx.rotate(-ang);
  }
}

// bovenstaande code komt van https://www.w3schools.com/graphics/canvas_clock_start.asp

function drawModulo(x, y, p){
  if ( steps == x ) {
    // done
    return;
  } else if ( steps > x) {
    var angle = x * p;
    steps = x;
  } else {
    steps++;
    if ((steps - x) > (3 * p)){
      steps += 1.8*p;
    }
    var angle = steps * p;
    drawFace(ctx, radius);
    drawNumbers(ctx, radius, y,0);
    drawNumbers(ctx, radius*1.2, y,sleutel);
  }
}

function modulo(x, y){
  steps = 0;
  var p = Math.PI/((y)/2);
  if (x < 0) {
    x = -x;
    p = -p;
  }
  if (x/y > 5) {
    x = (x % y) + (5 * y)
  }
  drawModulo(x, y, p);
}

function calculate(){
  var x = document.getElementById("x").value;
  var y = document.getElementById("y").value;
  
  modulo(x, y);
}