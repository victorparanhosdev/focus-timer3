const Botao = {
  minutos: document.querySelector('.minutos'),
  segundos: document.querySelector('.segundos'),
  play: document.querySelector('.btn-play'),
  stop: document.querySelector('.btn-stop'),
  mais: document.querySelector('.btn-over'),
  menos: document.querySelector('.btn-under'),
  floresta: document.querySelector('.floresta'),
  chuva: document.querySelector('.chuva'),
  cafeteria: document.querySelector('.cafeteria'),
  lareira: document.querySelector('.lareira'),
  corpo: document.querySelector('body'),
  buttonPressAudio: new Audio(
    'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true'
  ),
  AlarmeAudio: new Audio(
    'https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true'
  ),
  luz: document.querySelector('.luz'),
  escuro: document.querySelector('.escuro'),
  rangeFloresta: document.querySelector('#input-flor'),
  rangeChuva: document.querySelector('#input-chuva'),
  rangeCafeteria: document.querySelector('#input-cafeteria'),
  rangeLareira: document.querySelector('#input-lareira')
}

Botao.luz.addEventListener('click', () => {
  Botao.corpo.classList.add('escuro')
})

Botao.escuro.addEventListener('click', () => {
  Botao.corpo.classList.remove('escuro')
})

function updateDisplay(
  min = Botao.minutos.textContent,
  seg = Botao.segundos.textContent
) {
  Botao.minutos.textContent = String(min).padStart(2, '0')
  Botao.segundos.textContent = String(seg).padStart(2, '0')
}

const Sound = {
  floresta: new Audio('./files/Floresta.wav'),
  chuva: new Audio('./files/Chuva.wav'),
  cafeteria: new Audio('./files/Cafeteria.wav'),
  lareira: new Audio('./files/Lareira.mp3')
}

let resetTimer

function countDown() {
  if (Botao.segundos.textContent < 0) {
    updateDisplay(Number(Botao.minutos.textContent) - 1)
    Botao.segundos.textContent = 59
  }
  if (Botao.minutos.textContent < 0) {
    Botao.AlarmeAudio.play()
    clearTimeout(resetTimer)
    Botao.minutos.textContent = '00'
    Botao.segundos.textContent = '00'
    verificarSeBotaoStopfoiPressionado = true
    return
  }

  resetTimer = setTimeout(() => {
    updateDisplay(
      Botao.minutos.textContent,
      Number(Botao.segundos.textContent) - 1
    )
    countDown()
  }, 1000)
}

let verificarSeBotaoStopfoiPressionado = true

Botao.play.addEventListener('click', () => {
  let verificarSeEstaZerado =
    Botao.segundos.textContent != 0 || Botao.minutos.textContent != 0

  if (verificarSeEstaZerado && verificarSeBotaoStopfoiPressionado) {
    Botao.buttonPressAudio.play()
    countDown()
    verificarSeBotaoStopfoiPressionado = false
  }
})
Botao.stop.addEventListener('click', () => {
  Botao.buttonPressAudio.play()
  clearTimeout(resetTimer)
  verificarSeBotaoStopfoiPressionado = true
})

Botao.mais.addEventListener('click', () => {
  Botao.buttonPressAudio.play()
  updateDisplay(
    (Botao.minutos.textContent = Number(Botao.minutos.textContent) + 5)
  )
})
Botao.menos.addEventListener('click', () => {
  if (Botao.minutos.textContent >= 5) {
    Botao.buttonPressAudio.play()
    updateDisplay(
      (Botao.minutos.textContent = Number(Botao.minutos.textContent) - 5)
    )
  }
})

const SoundOff = (som1, som2, som3) => {
  som1.pause()
  som2.pause()
  som3.pause()
}

Botao.floresta.addEventListener('click', () => {
  Sound.floresta.volume = Botao.rangeFloresta.value / 100
  Sound.floresta.loop = true
  Botao.corpo.classList.add('floresta')
  Sound.floresta.play()
  SoundOff(Sound.cafeteria, Sound.chuva, Sound.lareira)
  Botao.corpo.classList.remove('chuva')
  Botao.corpo.classList.remove('lareira')
  Botao.corpo.classList.remove('cafeteria')
})

Botao.chuva.addEventListener('click', () => {
  Sound.chuva.volume = Botao.rangeChuva.value / 100
  Sound.chuva.loop = true
  Botao.corpo.classList.remove('floresta')
  Botao.corpo.classList.remove('lareira')
  Botao.corpo.classList.remove('cafeteria')
  Botao.corpo.classList.add('chuva')
  SoundOff(Sound.cafeteria, Sound.floresta, Sound.lareira)
  Sound.chuva.play()

})

Botao.cafeteria.addEventListener('click', () => {
  Sound.cafeteria.volume = Botao.rangeCafeteria.value / 100
  Botao.corpo.classList.remove('floresta')
  Botao.corpo.classList.remove('chuva')
  Botao.corpo.classList.remove('lareira')
  Botao.corpo.classList.add('cafeteria')
  SoundOff(Sound.floresta, Sound.chuva, Sound.lareira)
  Sound.cafeteria.play()
  Sound.cafeteria.loop = true
})

Botao.lareira.addEventListener('click', () => {
  Sound.lareira.volume = Botao.rangeLareira.value / 100
  Botao.corpo.classList.remove('floresta')
  Botao.corpo.classList.remove('chuva')
  Botao.corpo.classList.remove('cafeteria')
  Botao.corpo.classList.add('lareira')
  SoundOff(Sound.cafeteria, Sound.chuva, Sound.floresta)
  Sound.lareira.play()
  Sound.lareira.loop = true
  
})

