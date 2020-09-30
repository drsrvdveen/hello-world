var klas = 'A5';
if (klas == 'A4') {var maxR = 4; var maxK = 5 - 1;}
if (klas == 'A5') {var maxR = 3; var maxK = 2 - 1;}
if (klas == 'A6') {var maxR = 3; var maxK = 3 - 1;}
if (klas == 'H4') {var maxR = 4; var maxK = 5 - 1;}
if (klas == 'H5') {var maxR = 5; var maxK = 2 - 1;}

function preload() {
    foto = loadImage("PNG"+klas+".png");
}

var pixelKleur;
var x,y,margeX,margeY;
var noX,noY;
var b = 300;
var h = 450;
var tijd = 0;
var fase = 0;

function setup() {
    // foto straks 300 x 450
    canvas = createCanvas(600,450);
    canvas.parent('processing');
    fill('white');
    noStroke();
    foto.loadPixels();
    // vindt object linksboven
    var stopper = false
    for (var k = 50;k < 100;k++) {
        for (var r = 380;r < 450;r++) {
            if (foto.get(k,r)[3] !=0 ) {
                stopper = true;
                break;
            }
        }
        if (stopper) {
            x = k;
            y = r;
            break;
        }
    }
    for (var k = x+b+10;k < x+2*b;k++) {
        if (foto.get(k,r)[3] !=0 ) {
            margeX = k - b - x;
            break;
        }
    }
    frameRate(2);
}

function keyPressed() {
    if (fase == 0) {fase = 1};
    if (fase == 1) {fase = 2; tijd = 0;};
    if (tijd > 2) {fase = 0;}
}

function draw() {
    background('white');
    if (tijd > 10 && fase == 2) {
        fase = 0;
        tijd = 0;
    }
    if (fase == 0) {
        noY = floor(random(0,maxR));
        if (noY == maxR - 1) {var max = maxK;} else {var max = 6;}
        noX = floor(random(0,max));
        fase++;
        console.log('leerling ['+noY+','+noX+']');
    }
    image(foto,0,0,b,h,x+noX*(b+margeX),y+noY*(h+margeX+20),b,h);
    image(foto,b,0,b,50,x+noX*(b+margeX),y+noY*(h+margeX+20)+h+10,b,50);
    if (fase == 1) {
        rect(b,0,b,50);
    }
    tijd++;
}