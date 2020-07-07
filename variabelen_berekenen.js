var tekstGrootte = 18;
var kolomGrootte = 0;
var kolomStap = 330;
var rijenPerKolom = 20;
var perfecteUitkomstenMeenemen = true;

var beginx = 0.10;
var eindx = 0.75;
var stapx = 0.001;

var beginy = 15;
var eindy = 16;
var stapy = 1;

var decimalen = 5;
var verschil = 1;
var minimumVerschilWaarde = 1;
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
            // f = gravitatieEnergie(x,y);
            f = zwaar(x);
            // **********************
            fAfgerond = round(f*pow(10,decimalen))/pow(10,decimalen);
            z = terugBrengen2(f,decimalen);
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

function zwaar(m) {
    var fz = m*9.8;
    return fz;
}

function geluid1(f,v) {
    var lab = v/f;
    return lab;
}

function geluid2(s,v) {
    var t = s/v;
    return t;
}

function geluid3(l) {
    var f = 343 / (4*l);
    return f;
}

function geluid4(x1,x2) {
    var f = (x2/x1);
    var r = f*f;
    return r;
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

function terugBrengen2(x,dec) {
    if (x < 10) {
        while (x < 10) {
            x*=10;
        }
    }
    if (x >= 10) {
        while (x > 10) {
            x/=10;
        }
        x*=10;
    }
    x = round(x*pow(10,dec))/pow(10,dec);
    return x;
}