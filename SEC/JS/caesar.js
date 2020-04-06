var caesarA = 'privegegevens mogen niet gelekt. heel nederland hoeft immers niet te weten met wie, waarom en hoe u graag wilt daten? dat is gewoon een kwestie van respect. dus heb ik schuldgevoelens en berouw als ik weer heb gegluurd naar boer zoekt vrouw. wim meyles';
var caesarB = 'Toen Caesar binnenkwam, stonden alle senatoren op als teken van respect. Enkele mannen gingen achter de stoel van Caesar staan terwijl de rest naar hem toeliep. Cimber trok met beide handen de mantel van Caesars rug waarbij Caesar uitriep: vanwaar dit geweld, waarna Casca zijn dolk trok en Caesar in de nek probeerde te steken. Caesar kon zich echter nog net omdraaien, zodat hij alleen een ondiepe snee opliep.';
var caesarC = 'Liesje leerde Lotje lopen langs de Lange Lindenlaan.';
var sleutel = 0;
var cijferTekst = '';
var cijferLijst = [];
var klareTekst = '';
var klareLijst = [];

var code = [];
var nwcode = [];

function keyReleased() {
    if (keyCode == 39 || keyCode == 38) {
        sleutel++;
    }
    if (keyCode == 37 || keyCode == 40) {
        sleutel--;
    }
    
    verwerkInvoer();
    tekenKlok();
  return false;
}

function tekstInvullen(t) {
	var tekstvak = document.getElementById('cijfertekst');
    if (t == 'caesarA') {cijferTekst = caesarA;}
    if (t == 'caesarB') {cijferTekst = caesarB;}
    if (t == 'caesarC') {cijferTekst = caesarC;}
    if (t == 'reset') {cijferTekst = '';}
    tekstvak.value = cijferTekst;
    sleutel = 0;
    verwerkInvoer();
}

function verwerkInvoer() {
    cijferTekst = document.getElementById('cijfertekst').value;
    tekstNaarLijst(cijferTekst);
    vercijfer(cijferTekst);
    document.getElementById('uitvoerklaretekst').innerHTML = klareTekst;
}

function tekstNaarLijst(input) {
    for (var n = 0;n < input.length;n++) {
        cijferLijst[n] = input.charAt(n);
    }
}

function vercijfer(input) {
    klareTekst = '';
    input = input.toUpperCase();
    for (var n = 0;n < input.length;n++) {
        code[n] = input.charCodeAt(n);
        if (code[n] >= 65 && code[n] <= 90) {
            nwcode[n] = code[n] + sleutel % 26;
            if (nwcode[n] < 65) {nwcode[n] = nwcode[n] + 26;}
            if (nwcode[n] > 90) {nwcode[n] = nwcode[n] - 26;}
        }
        else {
            nwcode[n] = code[n];
        }
        klareLijst[n] = String.fromCharCode(nwcode[n]);
        klareTekst += klareLijst[n];
    }
    klareTekst = klareTekst.toLowerCase();
}