var caesarA = 'ABC TEST!?';
var sleutel = 0;
var cijferTekst = '';
var cijferLijst = [];
var klareTekst = '';
var klareLijst = [];

var code = [];
var nwcode = [];

function setup() {
    canvas = createCanvas(1000,450);
    fill(0);
    textFont("Monospace");
    canvas.parent('processing');
    frameRate(10);
}

function draw() {
    background('silver');
    text("cijfertekst: "+cijferTekst.toUpperCase(),50,50);
    text("klare tekst: "+klareTekst.toLowerCase()+" (sleutel = "+sleutel+")",50,100);
}

function keyTyped() {
  if (keyCode == 79) {
      sleutel--;
  }
  if (keyCode == 80) {
      sleutel++;
  }  
  tekstNaarLijst(cijferTekst);
  ontcijfer(cijferTekst);
}

function tekstInvullen(t) {
	tekstvak = document.getElementById('cijfertekst');
    if (t == 'caesarA') {
        cijferTekst = caesarA;
    }
    tekstNaarLijst(cijferTekst);
    ontcijfer(cijferTekst);
    tekstvak.value = caesarA;
}

function tekstNaarLijst(input) {
    for (var n = 0;n < input.length;n++) {
        cijferLijst[n] = input.charAt(n);
    }
}

function ontcijfer(input) {
    klareTekst = '';
    for (var n = 0;n < input.length;n++) {
        code[n] = input.charCodeAt(n);
        if (code[n] >= 65 && code[n] <= 90) {
            nwcode[n] = code[n] - sleutel % 26;
            if (nwcode[n] < 65) {nwcode[n] = nwcode[n] + 26;}
            if (nwcode[n] > 90) {nwcode[n] = nwcode[n] - 26;}
        }
        else {
            nwcode[n] = code[n];
        }
        klareLijst[n] = String.fromCharCode(nwcode[n]);
        klareTekst += klareLijst[n];
    }
}