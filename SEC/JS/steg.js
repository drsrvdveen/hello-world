var foto;
var pixelKleur;
var schaal = 50;
var marge = 50;
var rood = [];
var groen = [];
var blauw = [];

function preload() {
  foto = loadImage("images/bmp1.bmp");
  //foto = loadImage("images/koe.jpg");
}

function setup() {
    canvas = createCanvas(1000,450);
    colorMode(RGB,255,255,255,1);
    textFont("Monospace");
    canvas.parent('processing');
    verwerkFoto();
}

function draw() {
    background('lime');
    image(foto,marge,marge,foto.width*schaal,foto.height*schaal);
    tekenBronUitPixels();
    toonPixelGegevens();
}

function toonPixelGegevens() {
    var k = constrain(floor((mouseX - marge) / schaal),0,foto.width -1);
    var r = constrain(floor((mouseY - marge) / schaal),0,foto.height -1);
    var p = k + r*foto.width;
    push();
    noStroke();
    fill(0);
    text("ORIGINEEL: k:"+k+" r:"+r+" p:"+p,marge,marge / 2);
    fill(rood[p],groen[p],blauw[p]);
    rect(4.5*marge,marge / 4,schaal / 3,schaal / 3);
    translate(marge+schaal*foto.width,0);
    fill(0);
    text("AANGEPAST: k:"+k+" r:"+r+" p:"+p,marge,marge / 2);
    fill(rood[p],groen[p],blauw[p]);
    rect(4.5*marge,marge / 4,schaal / 3,schaal / 3);  
    translate(2*marge+schaal*foto.width,marge / 2);

    fill('yellow');
    rect(0,marge / 2,schaal*8,schaal*7);
    fill(0);
    textSize(24);
    textAlign(LEFT,TOP);
    text("rood : "+rood[p]+"\ngroen: "+groen[p]+"\nblauw: "+blauw[p],marge/2,marge,schaal*8,schaal*7);
    text(dec2bin(rood[p])+"\n"+dec2bin(groen[p])+"\n"+dec2bin(blauw[p]),schaal*4,marge,schaal*8,schaal*7);
    pop();
}

function dec2bin(number){
    var binary = "";
    var temp = number; 
    while(temp > 0){
        if(temp % 2 == 0){
            binary = "0" + binary;
        }
        else {
            binary = "1" + binary;
        }
        temp = Math.floor(temp / 2);
    }
    while (binary.length < 8) {
        binary = "0" + binary;
    }
    return binary;
}


function tekenBronUitPixels() {
    push();
    noStroke();
    var p = 0;
    // translate(2*marge + 4*schaal,marge);
    translate(marge,marge);
    for (var r = 0;r < foto.height;r++) {
        for (var k = 0;k < foto.width;k++) {        
            fill(rood[p],groen[p],blauw[p]);
            rect(k*schaal,r*schaal,schaal,schaal);
            p++;
        }
    }
    pop();
}

function verwerkFoto() {
    push();
    for (var r = 0;r < foto.height;r++) {
        for (var k = 0;k < foto.width;k++) { 
            pixelKleur = foto.get(k,r);
            rood.push(pixelKleur[0]);
            groen.push(pixelKleur[1]);
            blauw.push(pixelKleur[2]);
        }
    }
    pop();
}
