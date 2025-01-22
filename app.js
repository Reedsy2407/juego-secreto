//Variables
let numeroMaximo = 10;
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let maximoIntentos = 0;


//Cambiar el texto segun se necesite
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        //Si el usuario acierta
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1 ? 'intento' : 'intentos')}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //Si el usuario no acierta
        limpiarCaja(); // Limpia el input para el siguiente intento

        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }

        intentos++; // Incrementa los intentos
        if (intentos > maximoIntentos) {
            //Si el usuario excede el limite de intentos
            asignarTextoElemento('p', `Llegaste al número máximo de ${maximoIntentos} intentos`);
            deshabilitarBotonIntentar(); // Desactiva el botón de intentos
        }
    }

    if (listaNumerosSorteados.length === numeroMaximo) {
        //Si ya se han generado todos los números posibles
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        deshabilitarBotonIntentar();
    }
}

//Limpiar el input
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    if (listaNumerosSorteados.length === numeroMaximo) {
        //Todos los números han sido sorteados
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        deshabilitarBotonIntentar();
        return null;
    }

    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1; // Genera un número del 1 al 10
    while (listaNumerosSorteados.includes(numeroGenerado)) {
        //Evita repetir números ya sorteados
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    }

    listaNumerosSorteados.push(numeroGenerado); // Agrega el número al array
    console.log('Número generado:', numeroGenerado);
    console.log('Números sorteados:', listaNumerosSorteados);

    return numeroGenerado;
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del Número Secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto(); // Genera el número secreto inicial
    intentos = 1; // Reinicia el contador
    maximoIntentos = 3; // Define el máximo de intentos permitidos

    document.getElementById('intentar').removeAttribute('disabled'); // Habilita el botón intentar
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // Deshabilita el botón de Nuevo Juego
}

function reiniciarJuego() {
    if (listaNumerosSorteados.length === numeroMaximo || intentos > maximoIntentos) {
        //Si todos los números han sido sorteados o si se alcanzaron los intentos máximos
        location.reload();
    } else {
        limpiarCaja(); // Limpia el input
        condicionesIniciales(); // Reestablece las condiciones iniciales
    }
}

//Desactiva el botón de Intentar y activa el botón de Nuevo Juego
function deshabilitarBotonIntentar() {
    document.getElementById('intentar').setAttribute('disabled', 'true');
    document.getElementById('reiniciar').removeAttribute('disabled');
}

//Llama a las condiciones inciales al cargar el script
condicionesIniciales();
