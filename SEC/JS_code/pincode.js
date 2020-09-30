var pin;
var marge = 50;
var ruis,code,nr;

function preload() {
    nr = floor(random(0,10));
    pinPlaatje = loadImage("images/pins/pin_"+nr+".png");
}

function setup() {
    canvas = createCanvas(1000,400);
    colorMode(RGB,255,255,255,1);
    textFont("Monospace");
    textAlign(CENTER,CENTER);
    fill('black');
    noStroke();
    // twee witten leveren samen een difference zwart als background aan op Z + W = Z minder logisch
    // DIFFERENCE zonder background beter
    // ADD zonder background white werkt ook Z+W=W is logisch want 0+1=1
    // MULTIPLY met of zonder back
    blendMode(DIFFERENCE);
    textSize(40);
    genereerRuis();
    // noLoop();
    pinPlaatje.loadPixels();
    canvas.parent('processing');
}

function draw() {
    clear();
    translate(marge,marge);
    tekenRuis(ruis);
    translate(mouseX - marge,mouseY - marge);
    tekenRuis(code);
}

function genereerRuis() {
    // 450 x 300
    ruis = [];
    code = [];
    
    var tint;
    var verschil = true;
    for (var r = 0;r < 300; r+=5) {
        for (var k = 0; k < 450; k+=5) {
            if (round(random(0,1)) == 0) {tint = 0;} else {tint = 255;}
            code.push(tint);
            pixelKleur = pinPlaatje.get(k+2,r+2);
            if (pixelKleur[0] == 0) {
                ruis.push(tint);
            }
            else {
                if (tint == 0) {tint = 255;} else {tint = 0;}
                ruis.push(tint);
            }                       
        }
    }
}

function tekenRuis(lijst) {
    // 450 x 300
    var rnr = 0;
    for (var r = 0;r < 300; r+=5) {
        for (var k = 0; k < 450; k+=5) {
            fill(lijst[rnr]);
            rect(k,r,5,5);
            rnr++;
        }
    }
}


function verwerkInvoer(f) {
    if (f == 1) {}
    if (f == 2) {}
    if (f == 3) {}
}

function keyPressed() {
  if (keyCode == 83) {
    saveCanvas('afbeelding', 'png');
  }
}