function setup() {
    canvas = createCanvas(1000,450);
    background('silver');
    fill(0);
    textFont("Monospace");
    canvas.parent('processing');
}

var x = 1;
var tijdStap = setInterval(function(){ doeStap();}, 1000);

function draw() {       
    
}

function doeStap() {
    rect(100*x,50,50,300);
    if (x < 3) {
        x++;
    }
    else {
        clearInterval(tijdStap);
    }
}