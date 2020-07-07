// https://twitter.com/SnowEsamosc/status/1279391702277484549
var t,y;

function setup() {
    canvas = createCanvas(500,500);
    noStroke();
    t = 0;
}
function draw() {
    clear();
    for (y = -t / 15 % 5; y < 500; y += 5) {
        fill(-1,128*(1+cos(y)));
        circle(250+y/3*cos(y/5)+50*sin(y/60), y, 9);
    }
    t++;
}