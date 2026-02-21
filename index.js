const btMain = document.getElementById('btMain')
const cont = document.getElementById('cont')

const contHelps = document.getElementById('contHelps')
const petsGacha = document.getElementById('petsGacha')

let conteo = 0
let click  = 1
let autoClick = 0

pets = [
    'A_d_o.jpg', 'Biyu.jpg', 
    'dokja.jpg', 'ishmael.jpg', 
    'jongdok.jpg', 'jonghyuk.jpg', 
    'oguri.jpg', 'uma_meme.jpg', 
    'uma_pat.jpg']

btMain.addEventListener('click', ()=>{
    conteo += click
    cont.textContent = conteo

    if (conteo >= 10){
        multiplicador()
    } if (conteo >= 50) {
        autoClicker()
    } if (conteo >= 100) {
        gachaPets()
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
            btMulti.remove()
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
            btAuto.remove()
        } else {
            alert('Necesitas 50 puntos para el autoclick')
        }
    })
}

function activateClock(){
    setInterval(()=>{
        conteo += click
        cont.textContent = conteo
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
            tirarGacha()
            btGacha.remove()
        } else {
            alert('Necesitas minimo 100 puntos')
        }
    })

}

function tirarGacha(){
    const indRandom = Math.floor(Math.random()*pets.length)
    const imageSelect = pets[indRandom]

    const newPet = document.createElement('img')

    newPet.src = "images/" + imageSelect
    newPet.className = 'img-gacha'

    petsGacha.appendChild(newPet)
}