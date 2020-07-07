/*
var C = 720;
var W = 720;
var H = W / 2;

function setup() {
    canvas = createCanvas(1000,450);
    strokeWeight(20);
    stroke(W);
    fill(0);
    frameRate(30);

    // canvas.parent('processing');
}

function draw() {
    background(W,0,0,1);
    translate(H,H);
    C++;
    x = cos(C*0.02) + 1;
    y = sin(C*0.03) + 1;
    for (var i = 0;i < 4;i++) {
        rect(0,0,H*x,H*y);
        copy(0,0,W,W,0,0,H,H);
        rotate(PI/2);
    }    
}
*/

// https://tweet-processing-player.glitch.me/

setup=_=>createCanvas(C=W=720,W)+strokeWeight(20)+stroke(W)+fill(0)+frameRate(30)
draw=_=>{background(W,0,0,1)+translate(H=W/2,H)
C++,x=cos(C*.02)+1,y=sin(C*.03)+1
for(i=0;i<4;i++)rect(0,0,H*x,H*y)+copy(0,0,W,W,0,0,H,H)+rotate(PI/2)}