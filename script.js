const hero = document.querySelector('.hero')
const dino = document.querySelector('.dino')

const start = document.querySelector('.start')
const gameOver = document.querySelector('.game-over')

audioStart = new Audio('./src/audio/audio_theme.mp3')
audioGameOver = new Audio('./src/audio/audio_gameover.mp3')


const startGame = () => {
  dino.classList.add('dino-animation')
  start.style.display = 'none'

  // audio
  audioStart.play()
}

const restartGame = () => {
  gameOver.style.display = 'none'
  dino.style.left = ''
  dino.style.right = '0'
  hero.src = './img/hero-lose.png'
  hero.style.width = '150px'
  hero.style.bottom = '0'

  setTimeout(() => {
    hero.style.display = 'block'; // Exibe o herói após um pequeno atraso
  }, 100); // Ajuste o tempo conforme necessário

  start.style.display = 'none'

  audioGameOver.pause()
  audioGameOver.currentTime = 0;

  audioStart.play()
  audioStart.currentTime = 0;
}
// const restartGame = () => {
//   gameOver.style.display = 'none'
//   dino.style.left = ''
//   dino.style.right = '0'
//   hero.src = './img/imagens/hero.png'
//   hero.style.width = '150px'
//   hero.style.bottom = '0'

//   start.style.display = 'none'

//   audioGameOver.pause()
//   audioGameOver.currentTime = 0;

//   audioStart.play()
//   audioStart.currentTime = 0;

// }

const jump = () => {
  hero.classList.add('jump')

  setTimeout(() => {
    hero.classList.remove('jump')
  }, 800)
}

let intervalId = null; // variável para armazenar o intervalo

const loop = () => {
  intervalId = setInterval(() => {
    const dinoPosition = dino.offsetLeft
    const heroPosition = parseInt(window
      .getComputedStyle(hero)
      .bottom.replace('px', ' '), 10)

    if (dinoPosition <= 120 && dinoPosition > 0 && heroPosition < 80) {
      dino.classList.remove('dino-animation')
      dino.style.left = `${dinoPosition}px`

      hero.classList.remove('jump')
      hero.style.bottom = `${heroPosition}px`

      hero.src = './src/img/game-over.png'
      hero.style.width = '80px'
      hero.style.marginLeft = '50px'
      
      
      function stopAudioStart() {
        audioStart.pause()
      }
      stopAudioStart()
      
      audioGameOver.play()
      
      function stopAudio() {
        audioGameOver.pause()
      }
      setTimeout(stopAudio, 7000)
      
      gameOver.style.display = 'flex'
      
      clearInterval(intervalId)
    }
  }, 10)
}

loop()

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ') {
    jump()
  }
})

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump() 
  }
})

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === 'Enter') {
    startGame()
  }
})
