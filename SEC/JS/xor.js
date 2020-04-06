var foto;
var pixelKleur;
var rood,groen,blauw;
var marge = 25;
var kader = 300;
var grensZW = 210;

function preload() {
  foto1 = loadImage("images/koe.jpg");          // 100
  foto2 = loadImage("images/frankmiller.png");  // 110
  foto3 = loadImage("images/bos.png");          // 210
  // bron Frank Miller: http://www.cs.columbia.edu/~CS4HS/talks/FrankMillerOneTimePad.pdf
}


/*
met knoppen foto selecteren
met slider sensitivity
met functie onload teken plaatjes
dat moet dus inclusief verwerken oorpronkelijke plaatje
onload kan één van de plaatjes zijn. Of niks dat je echt moet klikken
Of knoppen and, or, xor? Nee, vergelijken is wel nuttig



*/

function setup() {
    canvas = createCanvas(1000,3*marge + 2* kader);
    colorMode(RGB,255,255,255,1);
    fill(255);
    textFont("Monospace");
    textSize(40);
    canvas.parent('processing');
    frameRate(10);
    foto = foto3;
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
    noLoop();
}

function draw() {
    var gemkleur,fbit,sleutel;
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
            
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
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
    fill(255);
    var t1 = 1;
    var t2 = 0;
    var andt = t1 & t2;
    var ort = t1 ^ t2;
    // text("andt:"+andt+" ort:"+ort,500,50);
    //text(" 0:"+pixelKleur[0]+" 1:"+pixelKleur[1]+" 2:"+pixelKleur[2]+" 0:"+pixelKleur[3],500,50);
}