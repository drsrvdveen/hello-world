var x = 1200/2;
var y = 500/2;
var x1 = 30;
var y1 = 30;
var r = 3;

function setup() {
  var canvas = createCanvas(1200, 500);
  canvas.parent('sketch-holder');
  background(255, 255,255);
}

function draw() {
    if (mouseIsPressed) {
    if (mouseButton === LEFT) {
        noStroke();
        fill( random(255), random(255), random(255));
  ellipse(x, y, r*2, r*2);
  
  x = x+x1*random(-1,1);
  y = y+y1*random(-1,1);
    }
  
    if (mouseButton === RIGHT) {
      noStroke();
        fill(random(0,255));
  ellipse(x, y, r*2, r*2);
  
  x = x+x1*random(-1,1);
  y = y+y1*random(-1,1);
    }
  
  if (x > width - r ) {
    x = 0+r;
  }
if ( x < r) {
    x = width-r;
  }

  if (y > height - r ) {
    y = 0+r;
  }

 if ( y < r) {
    y = height-r;
  }
}
}
function keyPressed() {
  if (keyCode == UP_ARROW) r = r+ 5;
  if (keyCode == DOWN_ARROW) r =r+ 5;
}
