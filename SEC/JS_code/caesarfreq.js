var caesarA = 'sxoxgxgmpbgmbz fttkm gxzxgmbxgahgwxkwsxlxgsxoxgmbz. pttkwx okbxgw, hgsx unbm bl oxbebz uxzktoxg. hi sbcg okhxzlm phkw bd hoxk mbxg cttk okbczxetmxg. fbllvabxg uxg bd wtg pxe whhw. wttkhf oxkmxe bd cx fbcg zxaxbf. zt bg hgsx lmtw gttk axm lmxkkxuhl. tvamxk wx fnsbxddhxixe tewttk lmttg xxg tfxkbdttglx xbd xg xxg vtgtwxlx ihinebxk. mnllxgbg ebzm xxg dblm fxm zhnw uxzktoxg xg xxg dttkm gttk xxg mpxxwx unbm otg wx khhyhoxkote.';
var caesarB = 'sxwpnwb fjanw fn--vjja jjamrpn sxwpnwb. ju inp rt qnc inuo. fn irsw wd ennu frsina, bcjttnarp frsb irsw fn, knqjuen kjerwt, mrn vju pnfxamnw rb. fjc qnkknw fn ju wrnc fruunw xytwjyynw. fn ixdmnw qdw fnu nnwb ujcnw irnw qxn qnc vxnbc. fn, mjc fjanw frs. juun jwmnan vnwblqnw fjanw "in". "in", mrn wrncb bwjycnw nw wrncb ijpnw. "fjc?" inr kjerwt, "pxm? sn yajjc xena pxm? qdw fjavn ncnw rb qdw pxm." xy nwtnun "pxnrn tnanub" wj fnam rnmnannw mxxa xwb enajlqc.';
var caesarC = 'op azdevzpedvzpedtpc azpede op azdevzped xpe azdevzpedpyazped.';
var caesarD = 'no qvknno mkwzsxqryenob kxxoh grscuizbynemoxd rkn nkkb zbynemdlogkusxq fyyb jstx ckxngsmrpybwevo lst no qiwxkcdsoumvel yxnkxuc jyxnkqczvsmrd.';
var sleutel = 0;
var cijferTekst = '';
var cijferLijst = [];
var klareTekst = '';
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
    verwerkInvoer();
}

function keyReleased() {
    if (keyCode == 39 || keyCode == 38) {
        sleutel++;
        verwerkInvoer();
    }
    if (keyCode == 37 || keyCode == 40) {
        sleutel--;
        verwerkInvoer();
    }    
  return false;
}

function tekstInvullen(t) {
	var tekstvak = document.getElementById('cijfertekst');
    if (t == 'caesarA') {cijferTekst = caesarA;}
    if (t == 'caesarB') {cijferTekst = caesarB;}
    if (t == 'caesarC') {cijferTekst = caesarC;}
    if (t == 'caesarD') {cijferTekst = caesarD;}
    if (t == 'reset') {cijferTekst = '';}
    tekstvak.value = cijferTekst;
    sleutel = 0;
    verwerkInvoer();
}

function verwerkInvoer() {
    cijferTekst = document.getElementById('cijfertekst').value;
    tekstNaarLijst(cijferTekst);
    ontcijfer(cijferTekst);
    bepaalFrequentiePercentage(frequentieKlareTekst);
    toonGrafiek();
    document.getElementById('uitvoerklaretekst').innerHTML = klareTekst;
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
    text("sleutel: "+sleutel,10,40);
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
        text(String.fromCharCode(verschoven),l*35 + 4,390);
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