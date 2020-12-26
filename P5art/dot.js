function setup() {
    canvas = createCanvas(1000,450);
    canvas.parent('processing');
    colorMode(RGB,255,255,255,1);
    noStroke();
    noLoop();
}

var D = 200;
var R = D/2;
var N = 200;
var rndF = 5;


function draw() {
    background(250);
    fill(255,0,255,1/N);
    translate(width/2,height/2);
    for (var n=0;n<N;n++) {
        push();
        translate(random(-D/rndF,D/rndF),random(-D/rndF,D/rndF));
        ellipse(0,0,D);
        pop();
    }
}
