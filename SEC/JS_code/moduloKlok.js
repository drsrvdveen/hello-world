function setup() {
    frameRate(10);
    tekenKlok();
    noLoop();
}

var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;
// var sleutel = 0;

function drawFace(ctx, radius) {
  var grad;
  ctx.arc(0, 0, radius*0.88, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.01;
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function tekenKlok(){
    ctx.fillStyle = "silver";
    ctx.fillRect(-200, -200, 400, 400);
    drawFace(ctx, radius);
    drawNumbers(ctx, radius, 26,sleutel);
    drawNumbers(ctx, radius*1.2, 26,0);

    ctx.lineWidth = radius*0.02;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    var hoek = 2*Math.PI*sleutel / 26;
    ctx.rotate(hoek);
    ctx.lineTo(0,-radius*0.7);
    ctx.stroke();
    ctx.rotate(-hoek);
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
    if (schuif == 0) {
        ctx.fillStyle = "dodgerblue";
        ctx.font = radius*0.15*(32/p) + "px monospace";
    }
    else {
        ctx.fillStyle = "black";
        ctx.font = radius*0.15*(22/p) + "px monospace";
    }
	ctx.fillText(alfabet[schuif].toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.8);
    ctx.rotate(-ang);
  }
}