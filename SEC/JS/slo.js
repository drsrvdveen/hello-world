var htmlContent;
htmlContent = document.getElementById('menu').innerHTML;

htmlContent += '<button onclick="window.location.href = \'caesar.html\'">Caesar</button>';
htmlContent += '<button onclick="window.location.href = \'caesarfreq.html\'">Caesar - freq</button>';
htmlContent += '<button onclick="window.location.href = \'vigenere.html\'">Vigen&egrave;re</button>';
htmlContent += '<button onclick="window.location.href = \'vigfreq.html\'">Vigen&egrave;re - freq</button>';
htmlContent += '<button onclick="window.location.href = \'xor.html\'">XOR</button>';
htmlContent += '<button onclick="window.location.href = \'modes.html\'">Blok modus</button>';

document.getElementById("menu").innerHTML = htmlContent;

