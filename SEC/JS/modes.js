var foto;
var pixelKleur;
var rood,groen,blauw;
var marge = 25;
var kader = 300;
var grensZW;
var klareTekst = [];
var ECB,CBC;
var blokGrootte = 4;
var sleutel;
var initialisatieVector;

function preload() {
  foto1 = loadImage("images/koe.jpg");
  foto2 = loadImage("images/maan.jpg");
  foto3 = loadImage("images/schaduw.jpg");
}

function keyReleased() {
    if (keyCode == 39 || keyCode == 38) {
        blokGrootte++;
    }
    if ((keyCode == 37 || keyCode == 40) && blokGrootte >= 2) {
        blokGrootte--;
    }
    verwerkInvoer();
    return false;
}

function setup() {
    canvas = createCanvas(1000,3*marge + kader);
    colorMode(RGB,255,255,255,1);
    textFont("Monospace");
    textAlign(CENTER,CENTER);
    canvas.parent('processing');
    verwerkInvoer(1);
}

function verwerkInvoer(f) {
    if (f == 1) {foto = foto1; grensZW = 100; laadFoto();}
    if (f == 2) {foto = foto2; grensZW = 110; laadFoto();}
    if (f == 3) {foto = foto3; grensZW = 100; laadFoto();}
    if (f == 16) {blokGrootte = 16;}
    if (f == 32) {blokGrootte = 32;}
    if (f == 64) {blokGrootte = 64;}
    if (f == 128) {blokGrootte = 128;}
    if (f == 256) {blokGrootte = 256;}
    if (f == 512) {blokGrootte = 512;}
    genereerSleutel();
    genereerECB();
    genereerCBC();
    toonOutput();
}

function genereerSleutel() {
    sleutel = [];
    for (k=0; k < blokGrootte; k++) {
        sleutel.push(round(random(0,1)));
    }
}

function genereerECB() {
    ECB = [];
    for (k=0;k < klareTekst.length; k++) {
        ECB.push(klareTekst[k] ^ (sleutel[k % blokGrootte]));
    }
}

function genereerCBC() {
    var blokPositie,nieuweBit;
    initialisatieVector = [];
    for (k=0; k < blokGrootte; k++) {
        var bit = round(random(0,1));
        initialisatieVector.push(bit);
    }
    CBC = [];
    for (k=0;k < klareTekst.length; k++) {
        blokPositie = k % blokGrootte;
        nieuweBit = klareTekst[k] ^ initialisatieVector[blokPositie];
        CBC.push(nieuweBit);
        initialisatieVector[blokPositie] = nieuweBit;
    }
    // daarna nog ECB-stap
    for (k=0;k < klareTekst.length; k++) {
        CBC[k]=(CBC[k] ^ (sleutel[k % blokGrootte]));
    }
}

function toonFoto(input) {
    var pixel = 0;
    push();
    for (var k = 0;k < foto.width;k++) {
        for (var r = 0;r < foto.height;r++) {
            stroke(255*input[pixel]);
            point(k,r);
            pixel++;
        }
    }
    pop();    
}

function toonOutput() {
    push();
    translate(marge,2*marge);
    background('silver');
    fill('indianred');
    noStroke();
    textSize(30);
    text("De gekozen blokgrootte is "+blokGrootte,canvas.width / 2 - marge,-marge);

    toonFoto(klareTekst);
    translate(foto.width+marge,0);
    toonFoto(ECB);
    translate(foto.width+marge,0);
    toonFoto(CBC);

    translate(-3*marge - 2*foto.width,-marge);
    noStroke();
    translate(marge + 0.25*kader,0.1*kader);
    fill(192,192,192,.75);
    rect(0,0,0.5*kader,1.5*marge);
    fill('indianred');
    text(' BRON',0,0,0.5*kader,1.5*marge);

    translate(marge + kader,0);
    fill(192,192,192,.75);
    rect(0,0,0.5*kader,1.5*marge);
    fill('indianred');
    text(' ECB',0,0,0.5*kader,1.5*marge);

    translate(marge + kader,0);
    fill(192,192,192,.75);
    rect(0,0,0.5*kader,1.5*marge);
    fill('indianred');
    text(' CBC',0,0,0.5*kader,1.5*marge);

    pop();    
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

    var gemkleur,fbit,sleutel;
    klareTekst = [];
    for (var k = 0;k < foto.width;k++) {
        for (var r = 0;r < foto.height;r++) {
            pixelKleur = foto.get(k,r);
            stroke(pixelKleur);
            gemKleur = round((pixelKleur[0] + pixelKleur[1] + pixelKleur[2])/3);
            fbit = 0;
            if (gemKleur > grensZW) {
                fbit = 1;
            }
            klareTekst.push(fbit);
        }
    }
}