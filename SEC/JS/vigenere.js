var slA = "kalfje";
slA = "ysaikeh";
var slB = "pyromanen";
var vigA = "derapenzijngaar";
vigA = "dinsdag";
//vigA = "bananen";
var vigB = "komalshetluidt";

var sleutel = slA;

var sleutelLijst = [];
var sleutelReeks = [];

var cijferTekst = '';
var cijferLijst = [];

var klareTekst = vigA;
var klareLijst = [];

var code = [];
var nwcode = [];

var muisKolom;
var muisRij;
var alleenSleutelletters = false;
var alleenKlareletters = false;

function setup() {
    canvas = createCanvas(1000,452);
    colorMode(RGB,255,255,255,1);
    fill(0);
    noStroke();
    textFont("Monospace");
    textSize(24);
    textAlign(TOP,TOP);
    canvas.parent('processing');
    frameRate(50);
    verwerk();
}

function draw() {
    tekenVierkant();
}

function verwerk() {
    klareLijst = tekstNaarLijst(klareTekst);
    sleutelReeks = maakSleutelReeks(klareLijst);
    cijferLijst = vercijfer(klareLijst,sleutelReeks);
    cijferTekst = lijstNaarTekst(cijferLijst);
    background('silver');
    text("De sleutel is: "+sleutel,480,20);
    text("De klare tekst luidt:\n"+klareTekst,480,50);
    tekenLijst(480,126,sleutelReeks);
    tekenLijst(480,160,klareLijst);
    tekenLijst(480,194,cijferLijst);
    text("De cijfertekst luidt:\n"+cijferTekst.toUpperCase(),480,250);
}

function tekstInvullen(t) {
    if (t == 'vigA') {klareTekst = vigA;}
    if (t == 'vigB') {klareTekst = vigB;}
    if (t == 'slA') {sleutel = slA;}
    if (t == 'slB') {sleutel = slB;}
    verwerk();
}

function lfilter(f) {
    if (f == 's') {
        if (alleenSleutelletters) {
            alleenSleutelletters = false;
        }
        else {
            alleenSleutelletters = true;
        }
    }
    if (f == 'k') {
        if (alleenKlareletters) {
            alleenKlareletters = false;
        }
        else {
            alleenKlareletters = true;
        }
    }    
}

function maakSleutelReeks(input) {
    var reeks = [];
    sleutelLijst = tekstNaarLijst(sleutel);
    for (var i = 0; i < input.length;i++) {
        reeks[i] = sleutelLijst[i % sleutelLijst.length];
    }
    return reeks;
}

function vercijfer(input,k) {
    var lijst = [];
    var verschuiving;
    for (var i = 0;i < input.length;i++) {
        lijst[i] = input[i].charCodeAt(0);
        verschuiving = k[i].charCodeAt(0);
        lijst[i] = String.fromCharCode((lijst[i] + verschuiving - 2*(65+32)) % 26 + (65+32));
    }
    return lijst;
}

function tekstNaarLijst(input) {
    var lijst = [];
    for (var n = 0;n < input.length;n++) {
        lijst[n] = input.charAt(n);
    }
    return lijst;
}

function lijstNaarTekst(input) {
    var tekst = "";
    for (var l = 0;l < input.length;l++) {
        tekst += input[l];
    }
    return tekst;
}

function tekenLijst(x,y,input) {
    var grootte = 34;
    var offset = 3;
    push();
    textSize(14);
    textAlign(CENTER,CENTER);    
    translate(x,y);
    for (var e = 0;e < input.length;e++) {
        stroke(127);
        strokeWeight(2);
        fill(255);
        rect(e*grootte,0,grootte,grootte);
        noStroke();
        fill(0);
        text(input[e].toLowerCase(),e*grootte + offset,0,grootte,grootte);
    }
    pop();
}

function tekenVierkant() {
    push();
    textSize(14);
    fill(255);
    textAlign(CENTER,CENTER);
    var grootte = 17;
    var offset = 3;
    muisKolom = 26;
    muisKolom = floor((mouseX - offset) / grootte);
    muisRij = 26;
    muisRij = floor((mouseY - offset) / grootte);
    translate(5,5);
    for (var k = 0;k < 26; k++) {
        for (var r = 0;r < 26; r++) {
            fill(255);
            if (r == 0 || k == 0) {
                fill('slategray');
            }            
            if ((muisRij == r || muisKolom == k) && !(muisRij == r && muisKolom == k)) {
                fill('orange');
            }
            stroke(127);
            strokeWeight(2);
            rect(k*grootte,r*grootte,grootte,grootte);
            fill(127);
                if (r == 0 || k == 0 || (alleenKlareletters && !klareLijst.includes(String.fromCharCode(65 + 32 + k))) || (alleenSleutelletters && !sleutelLijst.includes(String.fromCharCode(65 + 32 + r)))) {
                fill(255);
            }               
            noStroke();
            var x = String.fromCharCode(65 + (k + r) % 26);
            text(x.toLowerCase(),k*grootte + offset,r*grootte,grootte,grootte);
        }
    }
    pop();
}