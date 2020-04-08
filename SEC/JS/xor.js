var foto;
var pixelKleur;
var rood,groen,blauw;
var marge = 25;
var kader = 300;
var grensZW;

function preload() {
  foto1 = loadImage("images/koe.jpg");
  foto2 = loadImage("images/frankmiller.png");
  foto3 = loadImage("images/bos.png");
  // bron Frank Miller: http://www.cs.columbia.edu/~CS4HS/talks/FrankMillerOneTimePad.pdf
  foto = foto3;
}

function setup() {
    canvas = createCanvas(1000,3*marge + 2* kader);
    colorMode(RGB,255,255,255,1);
    textFont("Monospace");
    textAlign(CENTER,CENTER);
    canvas.parent('processing');
    verwerkInvoer(1);
}

function verwerkInvoer(f) {
    if (f == 1) {foto = foto1; grensZW = 100;}
    if (f == 2) {foto = foto2; grensZW = 110;}
    if (f == 3) {foto = foto3; grensZW = 210;}
    laadFoto();
    toonFoto();
}

function laadFoto() {
    breedte = foto.width;
    hoogte = foto.height;
    if (breedte > hoogte) {
        hoogte = hoogte * kader / breedte;
        breedte = kader;
    }
    else {
        breedte = breedte * kader / hoogte;
        hoogte = kader;
    }
    foto.resize(breedte,hoogte);
    foto.loadPixels();
}

function toonFoto() {
    var gemkleur,fbit,sleutel;
    push();
    background('silver');
    for (var k = 0;k < foto.width;k++) {
        for (var r = 0;r < foto.height;r++) {
            pixelKleur = foto.get(k,r);
            stroke(pixelKleur);
            gemKleur = round((pixelKleur[0] + pixelKleur[1] + pixelKleur[2])/3);
            fbit = 0;
            if (gemKleur > grensZW) {
                fbit = 1;
            }
            stroke(255*fbit);
            // getransformeerde foto
            point(marge+k,marge+r);
            // randomsleutel
            sleutel = round(random(0,1));
            stroke(255*sleutel);
            point(2*marge+kader+k,marge+r);
            // AND
            stroke((fbit & sleutel)*255);
            point(marge+k,2*marge+kader+r);
            // OR
            stroke((fbit | sleutel)*255);
            point(2*marge+kader+k,2*marge+kader+r);
            // XOR
            stroke((fbit ^ sleutel)*255);
            point(3*marge+2*kader+k,2*marge+kader+r);
        }
    }
    noStroke();
    textSize(30);
    translate(marge + 0.25*kader,0.1*kader);
    fill(192,192,192,.75);
    rect(0,0,0.5*kader,1.5*marge);
    fill('indianred');
    text(' BRON',0,0,0.5*kader,1.5*marge);

    translate(marge + kader,0);
    fill(192,192,192,.75);
    rect(0,0,0.5*kader,1.5*marge);
    fill('indianred');
    text(' SLEUTEL',0,0,0.5*kader,1.5*marge);

    translate(-(marge + kader),marge + kader);
    fill(192,192,192,.75);
    rect(0,0,0.5*kader,1.5*marge);
    fill('indianred');
    text(' AND',0,0,0.5*kader,1.5*marge);

    translate(marge + kader,0);
    fill(192,192,192,.75);
    rect(0,0,0.5*kader,1.5*marge);
    fill('indianred');
    text(' OR',0,0,0.5*kader,1.5*marge);    

    translate(marge + kader,0);
    fill(192,192,192,.75);
    rect(0,0,0.5*kader,1.5*marge);
    fill('indianred');
    text(' XOR',0,0,0.5*kader,1.5*marge);     
    pop();
}