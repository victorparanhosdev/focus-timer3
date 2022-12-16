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
  buttonPressAudio: new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true"),
  AlarmeAudio: new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true"),
  luz: document.querySelector('.luz'),
  escuro: document.querySelector('.escuro'),
}

Botao.luz.addEventListener('click', ()=> {
  Botao.corpo.classList.add('escuro')

})

Botao.escuro.addEventListener('click', ()=> {
  Botao.corpo.classList.remove('escuro')
 
})

function updateDisplay(min = Botao.minutos.textContent, seg = Botao.segundos.textContent) {
    Botao.minutos.textContent = String(min).padStart(2, "0")
    Botao.segundos.textContent = String(seg).padStart(2, "0")
}

const Sound = {
  floresta: new Audio("./files/Floresta.wav"),
  chuva: new Audio("./files/Chuva.wav"),
  cafeteria: new Audio("./files/Cafeteria.wav"),
  lareira: new Audio("./files/lareira.wav"),
}

let resetTimer;

function countDown(){

  if(Botao.segundos.textContent < 0){
    updateDisplay(Number(Botao.minutos.textContent)-1)
    Botao.segundos.textContent = 59 
    
  }
  if(Botao.minutos.textContent < 0){
      Botao.AlarmeAudio.play()
      clearTimeout(resetTimer)
      Botao.minutos.textContent = "00"
      Botao.segundos.textContent = "00"
      return
  }
  
  
  resetTimer = setTimeout(()=>{

    updateDisplay(Botao.minutos.textContent, Number(Botao.segundos.textContent)-1)
    countDown()
    
  }, 1000)

 
}

let verificarSeBotaoStopfoiPressionado = true

Botao.play.addEventListener('click', ()=> { 

  let verificarSeEstaZerado = Botao.segundos.textContent != 0 || Botao.minutos.textContent != 0
  
  if(verificarSeEstaZerado && verificarSeBotaoStopfoiPressionado){
    Botao.buttonPressAudio.play()
    countDown()
    verificarSeBotaoStopfoiPressionado = false
  }
  
  
})
Botao.stop.addEventListener('click', ()=> { 
  Botao.buttonPressAudio.play()
  clearTimeout(resetTimer)
  verificarSeBotaoStopfoiPressionado = true

  
})

Botao.mais.addEventListener('click', ()=> { 
  Botao.buttonPressAudio.play()
  updateDisplay(Botao.minutos.textContent = Number(Botao.minutos.textContent) + 5)

  
})
Botao.menos.addEventListener('click', ()=> {

  if(Botao.minutos.textContent >= 5){
    Botao.buttonPressAudio.play()
    updateDisplay(Botao.minutos.textContent = Number(Botao.minutos.textContent) - 5)

  }
  
})


Botao.floresta.addEventListener('click', ()=>{

  //Botao.corpo.classList.add('floresta')
  //Botao.corpo.classList.remove('lareira')
  //Botao.corpo.classList.remove('cafeteria')
  //Botao.corpo.classList.remove('chuva')
  
  Sound.chuva.pause()
  Sound.cafeteria.pause()
  Sound.lareira.pause()
  Sound.floresta.play()
  Sound.floresta.loop = true  


})

Botao.chuva.addEventListener('click', ()=>{

  //Botao.corpo.classList.remove('floresta')
  //Botao.corpo.classList.remove('lareira')
  //Botao.corpo.classList.remove('cafeteria')
  //Botao.corpo.classList.add('chuva')

  Sound.floresta.pause()
  Sound.cafeteria.pause()
  Sound.lareira.pause()
  Sound.chuva.play()
  Sound.chuva.loop = true
})
Botao.cafeteria.addEventListener('click', ()=>{

  //Botao.corpo.classList.remove('floresta')
  //Botao.corpo.classList.remove('chuva')
  //Botao.corpo.classList.remove('lareira')
  //Botao.corpo.classList.add('cafeteria')

  Sound.floresta.pause()
  Sound.chuva.pause()
  Sound.lareira.pause()
  Sound.cafeteria.play()
  
  Sound.cafeteria.loop = true
})
Botao.lareira.addEventListener('click', ()=>{
  //Botao.corpo.classList.remove('floresta')
  //Botao.corpo.classList.remove('chuva')
  //Botao.corpo.classList.remove('cafeteria')
  //Botao.corpo.classList.add('lareira')

  Sound.floresta.pause()
  Sound.chuva.pause()
  Sound.cafeteria.pause()
  Sound.lareira.play()
  Sound.lareira.loop = true

})


