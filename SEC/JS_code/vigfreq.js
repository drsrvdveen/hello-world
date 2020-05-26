var tekst1 = 'Aan mijn geliefde';
var tekst2 = 'Kees Torn is een Nederlandse tekstschrijver en cabaretier. Torn groeide op in Maassluis. Na zijn middelbare school studeerde hij twee jaar piano aan het conservatorium. Omdat hij met plezier tekende, bezocht Kees Torn enkele jaren de Rotterdamse Academie voor Beeldende Kunsten, waar hij door studiegenote Gerrie Hondius uitgedaagd werd om cabaretteksten te schrijven voor een gezamenlijk programma.';
var tekst3 = 'Vraag: waar laat ik Klaas de kaas aanpakken?';
var algoritme;

var sl1Poly = "abc";
var sl2Poly = "aalscholververzamelaar";
var sl3Poly = "polyalfabetische";
var sl1 = 2;
var sl2 = 13;
var sl3 = 4;
var sleutelReeks = [];
var sleutelLijst = [];

var cijferTekst = '';
var cijferLijst = [];
var klareTekst = '';
var klareTekstPoly;
var klareLijst = [];

var code = [];
var nwcode = [];

var frequentiesNederlands = [7.49,1.58,1.24,5.93,18.91,0.81,3.40,2.38,6.50,1.46,2.25,3.57,2.21,10.03,6.06,1.57,0.01,6.41,3.73,6.79,1.99,2.85,1.52,0.04, 0.035,1.39];
var frequentieKlareTekst = [];
var frequentiePercentage = [];

function setup() {
    canvas = createCanvas(1000,450);
    colorMode(RGB,255,255,255,1);
    fill(0);
    textFont("Monospace");
    canvas.parent('processing');
    frameRate(10);
    sleutel = sl1;
    sleutelPoly = sl1Poly;
    verwerkInvoer('poly');
}

function keyReleased() {
    if (algoritme == 'mono') {
        if (keyCode == 39 || keyCode == 38) {
            sleutel++;
            verwerkInvoer('mono');
        }
        if (keyCode == 37 || keyCode == 40) {
            sleutel--;
            verwerkInvoer('mono');
        }
    }  
  return false;
}

function tekstInvullen(t) {

    if (t == 'tekst1') {cijferTekst = tekst1; sleutel = sl1; sleutelPoly = sl1Poly;}
    if (t == 'tekst2') {cijferTekst = tekst2; sleutel = sl2; sleutelPoly = sl2Poly;}
    if (t == 'tekst3') {cijferTekst = tekst3; sleutel = sl3; sleutelPoly = sl3Poly;}
    if (t == 'reset') {cijferTekst = '';}
    var tekstvak = document.getElementById('klaretekst');
    tekstvak.value = cijferTekst;
    verwerkInvoer(algoritme);
}

function verwerkInvoer(a) {
    klareTekst = document.getElementById('klaretekst').value;
    tekstNaarLijst(klareTekst);    
    algoritme = a;
    if (a == 'mono') {
        vercijfer(klareTekst);
        document.getElementById('uitvoercijfertekst').innerHTML = cijferTekst;
    }
    else {
        klareTekstPoly = stripTekens(klareTekst);
        klareLijst = tekstNaarLijstPoly(klareTekstPoly);
        sleutelReeks = maakSleutelReeks(klareLijst);
        cijferLijst = vercijferPoly(klareLijst,sleutelReeks);
        cijferTekst = lijstNaarTekstPoly(cijferLijst);
        var brokTekst;
        brokTekst = hakTekst(cijferTekst);
        document.getElementById('uitvoercijfertekst').innerHTML = brokTekst;
    }
    
    bepaalFrequentiePercentage(frequentieKlareTekst);
    toonGrafiek();
    
}

function hakTekst(input) {
    var reeks = '';
    var split = 15;
    for (var n = 0;n < input.length;n++) {
        reeks += input.charAt(n);  
        if ((n + 1) % split == 0) {
            reeks += ' ';
        }          
    }
    return reeks;
}

function stripTekens(input) {
    var reeks = '';
    var r = 0;
    input = input.toUpperCase();
    for (var n = 0;n < input.length;n++) {
        code[n] = input.charCodeAt(n);  
        if (code[n] >= 65 && code[n] <= 90) {
            reeks += input.charAt(n);
        }          
    }
    reeks = reeks.toLowerCase();
    return reeks;
}

function maakSleutelReeks(input) {
    var reeks = [];
    sleutelLijst = tekstNaarLijstPoly(sleutelPoly);
    for (var i = 0; i < input.length;i++) {
        reeks[i] = sleutelLijst[i % sleutelLijst.length];
    }
    return reeks;
}

function vercijferPoly(input,k) {
    var lijst = [];
    var flijst = [];
    for (var n = 65;n <= 90; n++) {
        frequentieKlareTekst[n] = 0;
    }
    var verschuiving;
    for (var i = 0;i < input.length;i++) {
        lijst[i] = input[i].charCodeAt(0);
        verschuiving = k[i].charCodeAt(0);
        
        flijst[i] = ((lijst[i] + verschuiving - 2*(65+32)) % 26 + (65));
        lijst[i] = String.fromCharCode((lijst[i] + verschuiving - 2*(65+32)) % 26 + (65 + 32));
        frequentieKlareTekst[flijst[i]]++;
    }
    return lijst;
}

function lijstNaarTekstPoly(input) {
    var tekst = "";
    for (var l = 0;l < input.length;l++) {
        tekst += input[l];
    }
    return tekst;
}

function tekstNaarLijstPoly(input) {
    var lijst = [];
    for (var n = 0;n < input.length;n++) {
        lijst[n] = input.charAt(n);
    }
    return lijst;
}

function bepaalFrequentiePercentage(input) {
    var aantal = 0;
    for (var n = 65;n <= 90; n++) {
        aantal += input[n];
    }
    for (var n = 65;n <= 90; n++) {
        frequentiePercentage[n] = round(10000*frequentieKlareTekst[n] / aantal) / 100;
    }        
}

function toonGrafiek() {
    push();
    textSize(40);
    background('silver');
    fill(255);
    noStroke();
    var actieveSleutel = sleutel;
    if (algoritme == 'poly') {
        actieveSleutel = sleutelPoly;
    }
    text("sleutel: "+actieveSleutel,10,40);
    textSize(20);
    translate(50,50);
    var maxPerc = 18.91; // grootste in NL
    for (var n = 65;n <= 90; n++) {
        if (frequentiePercentage[n] > maxPerc) {maxPerc = frequentiePercentage[n];}
    }
    var schaalFactor = 300 / maxPerc;
    for (var l = 0; l < frequentiesNederlands.length; l++) {
        fill(255,255,255,1);
        rect(l*35 - 5,350 - schaalFactor*frequentiesNederlands[l],20 + 10,schaalFactor*frequentiesNederlands[l]);        
        fill(70,130,180);
        rect(l*35,350 - schaalFactor*frequentiePercentage[l+65],20,schaalFactor*frequentiePercentage[l+65]);
        var verschoven = l + sleutel + 65;
        if (verschoven < 65) {verschoven += 26;}
        if (verschoven > 90) {verschoven -= 26;}
        // text(String.fromCharCode(verschoven),l*35 + 4,390);
        fill(255,255,255,0.4);
        rect(l*35,350 - schaalFactor*frequentiesNederlands[l],20,schaalFactor*frequentiesNederlands[l]);        
        fill(0);
        text(String.fromCharCode(l + 65),l*35 + 4,370);        
    }
    pop();
}

function tekstNaarLijst(input) {
    for (var n = 0;n < input.length;n++) {
        cijferLijst[n] = input.charAt(n);
    }
}

function vercijfer(input) {
    cijferTekst = '';
    for (var n = 65;n <= 90; n++) {
        frequentieKlareTekst[n] = 0;
    }    
    input = input.toUpperCase();
    for (var n = 0;n < input.length;n++) {
        code[n] = input.charCodeAt(n);
        if (code[n] >= 65 && code[n] <= 90) {
            nwcode[n] = code[n] + sleutel % 26;
            if (nwcode[n] < 65) {nwcode[n] = nwcode[n] + 26;}
            if (nwcode[n] > 90) {nwcode[n] = nwcode[n] - 26;}
            frequentieKlareTekst[nwcode[n]]++;
        }
        else {
            nwcode[n] = code[n];
        }
        cijferLijst[n] = String.fromCharCode(nwcode[n]);
        cijferTekst += cijferLijst[n];
    }
    cijferTekst = cijferTekst.toLowerCase();
}

function ontcijfer(input) {
    klareTekst = '';
    for (var n = 65;n <= 90; n++) {
        frequentieKlareTekst[n] = 0;
    }    
    input = input.toUpperCase();
    for (var n = 0;n < input.length;n++) {
        code[n] = input.charCodeAt(n);
        if (code[n] >= 65 && code[n] <= 90) {
            nwcode[n] = code[n] - sleutel % 26;
            if (nwcode[n] < 65) {nwcode[n] = nwcode[n] + 26;}
            if (nwcode[n] > 90) {nwcode[n] = nwcode[n] - 26;}
            frequentieKlareTekst[nwcode[n]]++;
        }
        else {
            nwcode[n] = code[n];
        }
        klareLijst[n] = String.fromCharCode(nwcode[n]);
        klareTekst += klareLijst[n];
    }
    klareTekst = klareTekst.toLowerCase();
}