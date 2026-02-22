// ------------------------------------------

const slider = document.getElementById('volume');
const etiquetaValor = document.getElementById('valorVolume');

// Escuchamos el evento 'input', que se activa mientras arrastras la barra
slider.addEventListener('input', (event) => {
    const nuevoVolumen = event.target.value;
    
    // 1. Actualizamos el texto en pantalla
    etiquetaValor.textContent = `${nuevoVolumen}%`;
    
    // 2. Enviamos el comando al Iframe de YouTube
    ajustarVolumen(nuevoVolumen);
});

function ajustarVolumen(nivel) {
    const iframe = document.getElementById('musicBack');
    if (iframe) {
        const mensaje = JSON.stringify({
            event: 'command',
            func: 'setVolume',
            args: [nivel]
        });
        iframe.contentWindow.postMessage(mensaje, '*');
    }
}

// ------------------------------------------

const btMain = document.getElementById('btMain')
const contMain = document.getElementById('div-bt-main')
const cont = document.getElementById('cont')
const autoCl = document.getElementById('autoclicks')
const clicksCont = document.getElementById('clicks')

const contHelps = document.getElementById('contHelps')
const petsGacha = document.getElementById('petsGacha')

const musicBack = document.getElementById('musicBack')

let conteo = 0
let click  = 1
let autoClick = 0
let musicInit = false


const pets = [
    'A_d_o.jpg', 'Biyu.jpg', 
    'dokja.jpg', 'ishmael.jpg', 
    'jongdok.jpg', 'jonghyuk.jpg', 
    'oguri.jpg', 'uma_meme.jpg', 
    'uma_pat.jpg', 'ishma.jpg',
    'miku_box.jpg', 'miku_bwaa.jpg',
    'miku_cat.jpg', 'miku.jpg',
    'teto_cat.jpg', 'teto_drink.jpg',
    'teto.jpg', 'vash.jpg',
    'angela.gif', 'dok_phone.gif',
    'jong_w.gif', 'orv-biyoo.gif'
]

const historialPets = {}
pets.forEach(pet => {
    historialPets[pet] = 0
})

btMain.addEventListener('click', ()=>{

    if (!musicInit) {
        musicBack.src += "&autoplay=1"
        musicInit = true
    }
    
    conteo += click
    cont.textContent = conteo
    clicksCont.textContent = click
    autoCl.textContent = autoClick

    if (conteo >= 10){
        multiplicador()
    } if (conteo >= 50) {
        autoClicker()
    } if (conteo >= 100) {
        gachaPets()
    } if (conteo >= 1000) {
        contMain.classList.add('activateLight')
    }
})

function multiplicador(){
    if (document.getElementById('Multi')) return

    btMulti = document.createElement('button')
    btMulti.className = 'btn'
    btMulti.id = 'Multi'
    btMulti.textContent = 'Multiplicador'
    contHelps.appendChild(btMulti)

    btMulti.addEventListener('click', ()=>{
        if (conteo >= 10){
            conteo -=10
            click = click+1

            cont.textContent = conteo
            clicksCont.textContent = click
            // btMulti.remove()
        } else {
            alert('No tienes suficientes puntos')
        }
        
    })
}

function autoClicker(){
    if (document.getElementById('btAuto')) return

    const btAuto = document.createElement('button')
    btAuto.id = 'btAuto'
    btAuto.className = 'btn'
    btAuto.textContent = 'Auto click'
    contHelps.appendChild(btAuto)

    btAuto.addEventListener('click', ()=>{
        if (conteo >= 50){
            conteo -=50
            activateClock()
            autoClick += 1
            cont.textContent = conteo
            autoCl.textContent = autoClick
            // btAuto.remove()
        } else {
            alert('Necesitas 50 puntos para el autoclick')
        }
    })
}

function activateClock(){
    setInterval(()=>{
        conteo += 1
        cont.textContent = conteo
        autoCl.textContent = autoClick
    }, 5000)
}

function gachaPets(){
    if (document.getElementById('btGacha')) return

    const btGacha = document.createElement('button')
    btGacha.id = 'btGacha'
    btGacha.className = 'btn'
    btGacha.textContent = 'Gachapon'
    contHelps.appendChild(btGacha)

    btGacha.addEventListener('click', ()=>{
        if (conteo >= 100) {
            conteo -= 100
            tirarGacha()
            cont.textContent = conteo
            // btGacha.remove()
        } else {
            alert('Necesitas minimo 100 puntos')
        }
    })

}

function tirarGacha(){
    const prob = pets.map(pet => {
        const apariciones = historialPets[pet] || 0
        return 1 / (apariciones + 1)
    })

    const totalProb = prob.reduce((a, b) => a + b, 0)

    let indRandom = Math.random() * totalProb
    let indice = 0
    
    for (let i = 0; i < pets.length; i++){
        if (indRandom < prob[i]) {
            indice = i
            break
        }
        indRandom -= prob[i]
    }

    const imageSelect = pets[indice]
    historialPets[imageSelect]++

    const newPet = document.createElement('img')

    newPet.src = "images/" + imageSelect
    newPet.className = 'img-gacha'

    petsGacha.appendChild(newPet)
}

