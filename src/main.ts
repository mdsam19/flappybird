import "./style.css"
import { Bird } from "./bird"
import { Base } from "./base"
import { handleParticles, clearParticleArr } from "./particle"
import Background from "./background"
import { handleObstacles, clearpipeArr } from "./obstacles"
import { isCollided, resetCollider } from "./collider"
import { pipeArr } from "./obstacles"
import { handlePoints, resetPoints } from "./points"
import gameOverImg from "./assets/sprites/gameover.png"
import { handleStart } from "./gameScreen"
import message from "./assets/sprites/message.png"
import hitaudio from "./assets/audio/hit.wav"
import dieaudio from "./assets/audio/die.wav"

const hitwav = new Audio()
hitwav.src = hitaudio
const diewav = new Audio()
diewav.src = dieaudio

const canvas = <HTMLCanvasElement>document.querySelector("#canvas")
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const fps = 30
let gameOver = false
let onMainmenu = true
let onSplash = false
let point = 0
let die = false
const bird = new Bird(canvas)
const base = new Base(canvas)
const bg = new Background(canvas)
const GameOver = new Image()
GameOver.src = gameOverImg
const splashImg = new Image()
splashImg.src = message
let prevtime = 0

function animateGame() {
  if (isCollided(bird, pipeArr, base) && !gameOver) {
    gameOver = true
    die = true
    hitwav.play()
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  bg.draw()
  if (!gameOver) {
    bg.update()
  }
  handleObstacles(canvas, gameOver)
  base.draw()
  if (!gameOver) {
    base.update()
  }

  bird.update()
  bird.draw()

  if (!gameOver) {
    handleParticles(bird.x, bird.y + bird.width / 2, bird.birdColor, canvas)
  }
  if (!gameOver) {
    point = handlePoints(bird, pipeArr, canvas)
  }
}

function menuAnimate() {
  ctx.font = "50px Geneva"
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  bg.draw()
  base.draw()
  handleStart(canvas, bird)
  ctx.fillStyle = "red"
  ctx.fillRect(canvas.width * 0.3, canvas.height * 0.6, 120, 50)
  ctx.strokeStyle = "white"
  ctx.lineWidth = 5
  ctx.strokeRect(canvas.width * 0.3, canvas.height * 0.6, 120, 50)
  ctx.fillStyle = "white"
  ctx.font = "44px Geneva"
  ctx.fillText("Play", canvas.width * 0.3 + 15, canvas.height * 0.6 + 40)
}

function splashScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  bg.draw()
  base.draw()
  ctx.drawImage(splashImg, 20, 20, canvas.width * 0.9, canvas.height * 0.8)
  bird.drawstillBird()
}

function gameoverScene() {
  const gameOverWidth = canvas.width * 0.7
  const gameOverHeight = canvas.height * 0.1
  ctx.drawImage(
    GameOver,
    canvas.width * 0.15,
    canvas.height * 0.2 - gameOverHeight,
    gameOverWidth,
    gameOverHeight
  )
  let hiScore = localStorage.getItem("hi-score")
  if (!hiScore) {
    localStorage.setItem("hi-score", `${point}`)
    hiScore = localStorage.getItem("hi-score")
  }
  if (point > parseInt(hiScore!)) {
    localStorage.setItem("hi-score", `${point}`)
    hiScore = localStorage.getItem("hi-score")
  }
  ctx.fillStyle = "white"
  ctx.strokeStyle = "black"
  ctx.lineWidth = 9
  ctx.font = "35px Geneva"
  ctx.strokeText(`Score:${point}`, canvas.width * 0.1, canvas.height * 0.4)
  ctx.fillText(`Score:${point}`, canvas.width * 0.1, canvas.height * 0.4)
  ctx.strokeText(`Hi-Score:${hiScore}`, canvas.width * 0.5, canvas.height * 0.4)
  ctx.fillText(`Hi-Score:${hiScore}`, canvas.width * 0.5, canvas.height * 0.4)
  ctx.fillStyle = "red"
  ctx.fillRect(canvas.width * 0.35, canvas.height * 0.5, 120, 50)
  ctx.strokeStyle = "white"
  ctx.lineWidth = 5
  ctx.strokeRect(canvas.width * 0.35, canvas.height * 0.5, 120, 50)
  ctx.fillStyle = "white"
  ctx.fillText("Menu", canvas.width * 0.35 + 15, canvas.height * 0.5 + 35)
  if (die) {
    diewav.currentTime = 0.4
    diewav.play()
    die = false
  }
}

function gameLoop() {
  const frametime = 1000 / fps
  const elapsed = Date.now() - prevtime
  if (elapsed > frametime) {
    if (onMainmenu) {
      menuAnimate()
      resetPoints()
      resetCollider()
      point = 0
    } else if (onSplash) {
      splashScreen()
    } else if ((!gameOver || bird.y + bird.height < base.y) && !onSplash) {
      animateGame()
    } else if (gameOver && bird.y + bird.height > base.y) {
      gameoverScene()
    }
    prevtime = Date.now()
  }
  requestAnimationFrame(gameLoop)
}

gameLoop()

canvas.addEventListener("touchstart", function (e: TouchEvent) {
  e.preventDefault()
  const xy = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY }
  if (!gameOver && !onMainmenu && !onSplash) {
    bird.flap()
  }
  if (onSplash) {
    onSplash = false
  }
  if (gameOver && bird.y + bird.height > base.y) {
    if (
      xy.x > canvas.width * 0.35 &&
      xy.x < canvas.width * 0.35 + 120 &&
      xy.y > canvas.height * 0.5 &&
      xy.y < canvas.height * 0.5 + 50
    ) {
      onMainmenu = true
      onSplash = false
      gameOver = false
      bird.reset()
      bg.reset()
    }
  }
  if (onMainmenu) {
    if (
      xy.x > canvas.width * 0.3 &&
      xy.x < canvas.width * 0.3 + 120 &&
      xy.y > canvas.height * 0.6 &&
      xy.y < canvas.height * 0.6 + 50
    ) {
      onMainmenu = false
      onSplash = true
      gameOver = false
      clearpipeArr()
      clearParticleArr()
    }
  }
})
