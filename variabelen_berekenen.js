var tekstGrootte = 18;
var kolomGrootte = 0;
var kolomStap = 330;
var rijenPerKolom = 20;
var perfecteUitkomstenMeenemen = true;

var beginx = 10;
var eindx = 20;
var stapx = 0.1;

var beginy = 45;
var eindy = 75;
var stapy = 1;

var decimalen = 10;
var verschil = 1;
var minimumVerschilWaarde = 200;
var f,z,fAfgerond,zAfgerond;
var tekst = "AAN";

function setup() {
    canvas = createCanvas(1000,450);
    background('silver');
    fill(0);
    textFont("Monospace");
    canvas.parent('processing');
    noLoop();
}

function draw() {
    translate(20,1.5*tekstGrootte);
    if (!perfecteUitkomstenMeenemen) {
        tekst="UIT";
    }
    textSize(tekstGrootte+5);
    text("x=["+beginx+","+eindx+","+stapx+"]"+" | y=["+beginy+","+eindy+","+stapy+"]"+" | "+decimalen+" decimalen | minimumv > "+minimumVerschilWaarde+" | exact? "+tekst,0,0);
    textSize(tekstGrootte);
    translate(0,2.5*tekstGrootte);
    var test;
    var rij = 0;
    for (var x=beginx;x<=eindx;x+=stapx) {
        x = round(x*pow(10,decimalen))/pow(10,decimalen);
        for (var y=beginy;y<=eindy;y+=stapy) {
            y = round(y*pow(10,decimalen))/pow(10,decimalen);
            // **********************
            // f = lenzenFormule(x,y);
            f = gravitatieEnergie(x,y);
            // **********************
            fAfgerond = round(f*pow(10,decimalen))/pow(10,decimalen);
            z = terugBrengen(f,decimalen);
            zAfgerond = round(z);
            test = bepaalVerschil(z,zAfgerond);
            if (test > verschil && test> minimumVerschilWaarde) {
                verschil = bepaalVerschil(z,zAfgerond);
                if (perfecteUitkomstenMeenemen) {
                    fill('indianred');
                }
                text("x="+x+" y="+y+" z="+fAfgerond+" v="+verschil,kolomGrootte,rij*tekstGrootte);
                fill(0);
                rij++;
            }
            else if (bepaalVerschil(z,zAfgerond) == 0 && perfecteUitkomstenMeenemen) {
                text("x="+x+" y="+y+" z="+fAfgerond+" exact",kolomGrootte,rij*tekstGrootte);
                rij++;
            }
            if (rij == rijenPerKolom) {
                rij = 0;
                kolomGrootte += kolomStap;
            }
        }
    }
}

function gravitatieEnergie(M,r) {
    var f = 66743015 * M / r;
    return f;
}

function snelheidKinetisch(E,m) {
    var f = sqrt(2*E/m);
    return f;
}

function lenzenFormule(b,v) {
    var f = b*v/(b+v);
    return f;
}

function terugBrengen(x,dec) {
    if (x < 1) {
        while (x < 1) {
            x*=10;
        }
    }
    if (x >= 1) {
        while (x > 1) {
            x/=10;
        }
        x*=10;
    }
    x = round(x*pow(10,dec))/pow(10,dec);
    return x;
}

function bepaalVerschil(x,xaf) {
    var dif = x-xaf;
    if (dif < 0) {
        dif*=-1;
    }
    if (dif != 0) {
        dif = round(1/dif);
    }
    return dif;
}