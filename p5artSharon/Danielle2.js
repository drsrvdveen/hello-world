var c;
var draaien = 0;
var draaisnelheid = 1;
x=75;

function setup() {
  var canvas = createCanvas(1200, 500);
  canvas.parent('sketch-holder');
  background(255, 255,255);
  cursor(CROSS);
  kleur = color(0, 0, 0);
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    translate(mouseX, mouseY);
    rotate(radians(draaien));
    stroke(kleur);
    line(0,0 , x, 100);
    draaien=draaien+ draaisnelheid;
  }

    if (mouseIsPressed && mouseButton == RIGHT) {
    translate(mouseX, mouseY);
    noStroke();
    fill(255,255,255);
    ellipse(0,0 , 50, 50);
  }
  
}
function mousePressed() {
  x = x;
}

function keyPressed() {
  if (keyCode == UP_ARROW) x =x+ 5;
  if (keyCode == DOWN_ARROW) x = x- 5;
  if (keyCode == LEFT_ARROW) draaisnelheid =draaisnelheid -1;
  if (keyCode == RIGHT_ARROW) draaisnelheid =draaisnelheid+ 1;
}

function keyReleased() {
 
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
  if (key == ' ') draaisnelheid =draaisnelheid* -1;
  if (key == '1') kleur = color("Black");
  if (key == '2') kleur = color("Red");
  if (key == '3') kleur = color("Orange");
  if (key == '4') kleur = color("Yellow");
  if (key == '5') kleur = color("Green");
  if (key == '6') kleur = color("Blue");
  if (key == '7') kleur = color("Indigo");
  if (key == '8') kleur = color("Violet");
}
