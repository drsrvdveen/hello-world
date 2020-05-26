// gecheckt met https://sadale.net/27/online-middle-square-method-generator

class Loper {
    constructor(x,y,kl,l) {
        this.x1 = x;
        this.x2 = x;
        this.y1 = y;
        this.y2 = y;
        this.l = l;
        this.kl = kl;
        this.alfa = 0;
        this.iteratie = 0;
        this.loopInstructie = [];
    }

    updateLoopSchema(lijst) {
        for (var x=0;x<lijst.length;x++) {
            this.loopInstructie.push(lijst[x]);
        }
    }

    loop() {
        this.alfa += 36*this.loopInstructie[this.iteratie];
        this.iteratie++;
        this.x2 = this.x1 + this.l*cos(this.alfa);
        this.y2 = this.y1 + this.l*sin(this.alfa);        
        this.teken();

        this.x1 = this.x2;
        this.y1 = this.y2;
    }

    loopr() {
        this.alfa += random(0,360);
        this.x2 = this.x1 + this.l*cos(this.alfa);
        this.y2 = this.y1 + this.l*sin(this.alfa);
        this.teken();

        this.x1 = this.x2;
        this.y1 = this.y2;
    }

  teken() {
        push();
        stroke(this.kl);
        strokeWeight(1);
        line(this.x1,this.y1,this.x2,this.y2);  
        ellipse(this.x,this.y,this.d);
        pop();
  }
}

class PRG {
    constructor(seed) {
        this.seed = seed;
        this.iteraties = 0;
        this.lijst = [];
        this.loopLijst = [];
        this.tekstReeks = seed+' => kwadraat = '+seed*seed;
    }

    updateLoopSchema(seed) {  
        var seedString = ''+seed;      
        for (var n=0;n<seedString.length;n++) {
            this.loopLijst[n] = seedString.charAt(n);
        }
    }

    bereken() {
        var uitkomst = floor(this.seed*this.seed / 100) / 10000;
        uitkomst = round(10000*(uitkomst - floor(uitkomst)));
        if (uitkomst < 1000) {
            uitkomst = '0'+uitkomst;
        }
        else {
            uitkomst = ''+uitkomst;
        }
        this.lijst.push(uitkomst);
        this.tekstReeks += '\n'+uitkomst+' => kwadraat = '+uitkomst*uitkomst;
        this.seed = uitkomst;
    }

    toon() {
        fill(255);
        rect(25,25,450,450);
        fill(50);
        text(this.tekstReeks,25+10,25+5,450,450);
        if (pseudo.iteratie % 13 == 0 && frameCount > 0) {
            this.tekstReeks = '';
        }
    }
}

var rate;
var zaadje = 2703;

function setup() {
    canvas = createCanvas(975,500);
    colorMode(RGB,255,255,255,1);
    textFont("Monospace");
    textSize(24);
    textAlign(LEFT,TOP);
    angleMode(DEGREES);
    canvas.parent('processing');
    rate = 5;
    frameRate(rate);
    background('silver');
    noStroke();
    rect(25,25,450,450);
    rect(500,25,450,450);
    fill('red');
    ellipse(725,250,10);
    pseudo = new Loper(725,250,'indianred',15);
    randy = new Loper(725,250,'dodgerblue',15);
    generator = new PRG(zaadje);
    generator.updateLoopSchema(zaadje);
    pseudo.updateLoopSchema(generator.loopLijst);
}

function draw() {
    frameRate(rate);
    pseudo.loop();
    randy.loopr();
    if (frameCount % 4 == 0) {
        generator.bereken();
        generator.toon();
        generator.updateLoopSchema(generator.seed);
        pseudo.updateLoopSchema(generator.loopLijst);
    }
    rate = 1 + round(pow(pseudo.iteratie,0.5));
}

function keyReleased() {
    if (keyCode == 39 || keyCode == 38) {
        sleutel++;
    }
    if (keyCode == 37 || keyCode == 40) {
        sleutel--;
    }

  return false;
}

function tekstInvullen(t) {
    if (t == '1213') {zaadje = 1213; setup();}
    if (t == '1214') {zaadje = 1214; setup();}
    if (t == '2500') {zaadje = 2500; setup();}
    if (t == '7056') {zaadje = 7056; setup();}
    if (t == '7524') {zaadje = 7524; setup();}
}