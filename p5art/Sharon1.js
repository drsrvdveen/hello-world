var kleur = "red"; // variabele kleur --> kleur is in eerste instantie rood
var x = 80;  // variable x --> is in eerste instantie 80
var y = 80; // variabele y --> is in eerste instantie 80
    
    
    
    function setup() {
 var canvas = createCanvas(1200, 500);
  canvas.parent('sketch-holder');
  background(255, 255,255);
  cursor(CROSS);
  c = color(0, 0, 0);
}



function draw() {
  
  //als je over het canvas gaat en de muis is ingedrukt dan krijgt de "pen" aldoor random kleuren terwijl je tekend
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
  fill(random(255), random (255), random(255)); 
  }
}
  
  else {
    //als je over het canvas gaat zonder de muis in te drukken is de "pen" in eerste instantie rood en dit kun je veranderen met de toetsen 1 t/m 9  
    fill(kleur);
    noStroke(true)
  }

  //teken cirkel
  ellipse(mouseX, mouseY, x,y)

}


function keyReleased() {
  
  // canvas opslaan en leegmaken
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png'); // opslaan
  if (keyCode == DELETE || keyCode == BACKSPACE) background("white"); // leegmaken
  
  // kleuren veranderen
  if (key == '1') kleur = "red"; 
  if (key == '2') kleur = "blue";
  if (key == '3') kleur = "pink"; 
  if (key == '4') kleur = "lightgreen"; 
  if (key == '5') kleur = "yellow"; 
  if (key == '6') kleur = "orange"; 
  if (key == '7') kleur = "fuchsia"; // als je op 7 klikt wordt de "pen" paars
  if (key == '8') kleur = "grey";
  if (key == '9') kleur = "black";
  
  // als je op 'A' klikt kan je gummen
  if (key == 'a' || key == 'A') kleur = "white";
   
  // "pen" wordt weer begin grote --> klikken op pijltje naar boven
  if (keyCode == UP_ARROW) x = 80; 
  if (keyCode == UP_ARROW) y = 80;
  
  // "pen" wordt kleiner --> klikken op pijltje naar links
  if (keyCode == LEFT_ARROW) x = 50;
  if (keyCode == LEFT_ARROW) y = 50;
  
  // "pen" wordt groter --> klikken op pijltje naar rechts
  if (keyCode == RIGHT_ARROW) x = 100;
  if (keyCode == RIGHT_ARROW) y = 100;
  
}
