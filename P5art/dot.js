function preload() {
  foto = loadImage("dotsourceP.jpg");
}

function setup() {
    canvas = createCanvas(256,256);
    canvas.parent('processing');
    colorMode(RGB,255,255,255,1);
    noStroke();
    noLoop();
    foto.loadPixels();
}

/* testsettings
var D = 50;
var N = 10;
var rndF = 5;
var dotSpreiding = 3;
var maxAlfa = 10;
// einde testsettings
*/
var D = 12;
var N = 3;
var rndF = 5;
var dotSpreiding = 5;
var maxAlfa = 10;
var modulus = 5;

function draw() {
    background(245);
    foto.resize(256,256);
    toonFoto(modulus,true);
    /*
    fill(255,0,255,0.01*maxAlfa/N);
    translate(width/2,height/2);
    samengesteldeDot(N,dotSpreiding,false);
    */
    //background(foto);
}

function toonFoto(onderlingeAfstand,bronTonen) {
    var trial = 256;
    for (var k = 0;k < foto.width;k++) {
        for (var r = 0;r < foto.height;r++) {
            if (k % onderlingeAfstand == 0 && r % onderlingeAfstand == 0) {
                push();
                pixelKleur = foto.get(k,r);
                fill(pixelKleur[0],pixelKleur[1],pixelKleur[2],0.01*maxAlfa/N);
                translate(k,r);
                samengesteldeDot(N,dotSpreiding);
                if (bronTonen) {
                    stroke(pixelKleur);
                    point(0,0);
                }
                pop();
            }
        }
    }
}

function samengesteldeDot(diepte,spreiding) {
    for (var d=0;d<diepte;d++) {
        push();
        var v = spreiding;
        translate(random(-v,v),random(-v,v));
        tekenDot(D,N,rndF);
        pop();
    }
}

function tekenDot(diameter,aantalLagen,inperking,percentageVulling) {
    for (var n=0;n<aantalLagen;n++) {
        push();
        translate(random(-diameter/inperking,diameter/inperking),random(-diameter/inperking,diameter/inperking));
        ellipse(0,0,diameter);
        pop();
    }
}
