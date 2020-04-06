var b=0;
var aantal = 15;
var randomplek = 0;
var doorzichtigheid = 150; // doorzichtigheidsniveau rand
var kleur = " ";


function setup() {
  var canvas = createCanvas(1200, 500);
  canvas.parent('sketch-holder');
  background(255, 255,255);
  cursor(CROSS);
  c = color(0, 0, 0);
  
  colorMode(HSB,360,100,100,100); // HSB = kleurencode voor verschillende kleuren --> de x volgt dit kleurenschema
  
  kleur = color(0,0, doorzichtigheid); // kleur van de rand
}

function draw() {
  background("white")
  
  
  translate(width/2,height/2); // begint in het midden

 randomSeed(randomplek);

  stroke(kleur);
  strokeWeight(mouseY / 200); //lijndikte
  
  
  for (var gridY = 0; gridY < aantal; gridY++) {
    for (var gridX = 0; gridX < aantal; gridX++) {
     
   var posX = width / aantal * gridX; // als je naar links of rechts gaat veranderen de figuurtjes van kleur
      
      
      var posY = width / aantal * gridY; // als je omhoog gaat worden de figuurtjes kleiner en als je omlaag gaat worden de figuurtjes groter

      
      // zorgt voor een random plek op het canvas
     var shiftX = random(-mouseX, mouseX) / 15; 
      var shiftY = random(-mouseX, mouseX) / 15;
      
       fill(mouseX*gridY/50,mouseX,mouseY/2,70); // ligt aan je muispositie op de x-as welke kleur de figuurtjes worden, ze volgen de HSB kleurencode

      
  rotate(radians(b)); // laat de figuurtjes draaien
      
  ellipse(posX + shiftX-width/2, posY + shiftY-height/2,mouseY / 15, mouseY / 15); // plek waar het rondje wordt getekend en hoe groot

  rect(posX + shiftX-width/2, posY + shiftY-height/2,mouseY / 15, mouseY / 15); // plek waar het vierkant wordt getekend en hoe groot
      
    }
  }
  
b=b+0.01; // variabele zegt hoe snel ze draaien
  
}
