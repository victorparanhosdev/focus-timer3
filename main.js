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

Botao.play.addEventListener('click', ()=> { 
  Botao.buttonPressAudio.play()
  countDown()
  
})
Botao.stop.addEventListener('click', ()=> { 
  Botao.buttonPressAudio.play()
  clearTimeout(resetTimer)

  
})

Botao.mais.addEventListener('click', ()=> { 
  Botao.buttonPressAudio.play()
  updateDisplay(Botao.minutos.textContent = Number(Botao.minutos.textContent) + 5)

  
})
Botao.menos.addEventListener('click', ()=> {

  if(Botao.minutos.textContent >= 5){
    Botao.buttonPressAudio.play()
    updateDisplay(Botao.minutos.textContent = Number(Botao.minutos.textContent) - 5)

  }else {
    Botao.minutos.textContent = "00"
  }
 
  
})


Botao.floresta.addEventListener('click', ()=>{
  
  Sound.chuva.pause()
  Sound.cafeteria.pause()
  Sound.lareira.pause()
  Sound.floresta.play()
  
})

Botao.chuva.addEventListener('click', ()=>{

  Sound.floresta.pause()
  Sound.cafeteria.pause()
  Sound.lareira.pause()
  Sound.chuva.play()

})

Botao.cafeteria.addEventListener('click', ()=>{

  Sound.floresta.pause()
  Sound.chuva.pause()
  Sound.lareira.pause()
  Sound.cafeteria.play()

})

Botao.lareira.addEventListener('click', ()=>{

  Sound.floresta.pause()
  Sound.chuva.pause()
  Sound.cafeteria.pause()
  Sound.lareira.play()

})
