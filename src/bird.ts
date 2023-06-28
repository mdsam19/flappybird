import rbdImg from "./assets/sprites/redbird-downflap.png"
import rbuImg from "./assets/sprites/redbird-upflap.png"
import rbmImg from "./assets/sprites/redbird-midflap.png"
import bbdImg from "./assets/sprites/bluebird-downflap.png"
import bbuImg from "./assets/sprites/bluebird-upflap.png"
import bbmImg from "./assets/sprites/bluebird-midflap.png"
import ybmImg from "./assets/sprites/yellowbird-midflap.png"
import ybdImg from "./assets/sprites/yellowbird-downflap.png"
import ybuImg from "./assets/sprites/yellowbird-upflap.png"
import flapsound from "./assets/audio/wing.wav"

const flapwav = new Audio()
flapwav.src = flapsound
const rbm = new Image()
const rbu = new Image()
const rbd = new Image()
rbd.src = rbdImg
rbu.src = rbuImg
rbm.src = rbmImg
const rb = [rbm, rbd, rbu]
const bbm = new Image()
const bbu = new Image()
const bbd = new Image()
bbd.src = bbdImg
bbu.src = bbuImg
bbm.src = bbmImg
const bb = [bbm, bbd, bbu]
const ybm = new Image()
const ybu = new Image()
const ybd = new Image()
ybd.src = ybdImg
ybu.src = ybuImg
ybm.src = ybmImg
const yb = [ybm, ybd, ybu]
const birdarr = [rb, bb, yb]
let randInt = Math.floor(Math.random() * 3)
let randbird = birdarr[randInt]
const rad = Math.PI / 180
let prev = 0
export class Bird {
  x: number
  y: number
  vy: number
  width: number
  height: number
  gravity: number
  frameX: number
  angle: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  birdColor: string

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d")
    this.x = canvas.width * 0.2
    this.y = canvas.height * 0.25
    this.vy = 0
    this.width = 70
    this.height = 50
    this.gravity = 2
    this.frameX = 0
    this.angle = 0
    if (randInt === 0) {
      this.birdColor = "red"
    } else if (randInt === 1) {
      this.birdColor = "blue"
    } else {
      this.birdColor = "yellow"
    }
  }
  // Update the position of Bird
  update() {
    if (this.y < 5) {
      this.vy = 0
      this.y = 5
    } else {
      this.vy += this.gravity
      this.vy *= 0.95
      this.y += this.vy
    }
  }

  //Draws the Bird
  draw() {
    if (this.vy >= 0) {
      // Bird is falling
      this.ctx.save()
      this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
      this.ctx.rotate(this.angle * rad)
      this.angle += 10
      this.ctx.drawImage(
        randbird[0],
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      )
      this.ctx.restore()
      if (this.angle >= 90) this.angle = 90
    } else if (this.vy < 0) {
      // Bird is rising
      this.ctx.save()
      this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
      this.ctx.rotate(this.angle * rad)
      this.ctx.drawImage(
        randbird[this.frameX],
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      )
      this.angle -= 7
      this.ctx.restore()
      if (this.angle <= -60) this.angle = -60
      this.frameX++
      if (this.frameX > 2) this.frameX = 0
    }
  }
  flap() {
    this.vy = -18
    this.angle = 0
    if(!flapwav.ended){
      flapwav.pause()
      flapwav.currentTime = 0
    }
    flapwav.play()
  }
  drawStartScreenBird(Angle: number) {
    this.ctx.drawImage(
      randbird[this.frameX],
      300,
      260 + Math.sin(rad * Angle) * 10,
      this.width,
      this.height
    )
    if (Date.now() - prev > 80) {
      this.frameX++
      prev = Date.now()
    }
    if (this.frameX > 2) this.frameX = 0
  }
  drawstillBird() {
    this.ctx.drawImage(randbird[0], this.x, this.y, this.width, this.height)
  }
  reset() {
    this.x = this.canvas.width * 0.2
    this.y = this.canvas.height * 0.25
    this.vy = 0
    this.width = 70
    this.height = 50
    this.gravity = 2
    this.frameX = 0
    this.angle = 0
    randInt = Math.floor(Math.random() * 3)
    randbird = birdarr[randInt]
    if (randInt === 0) {
      this.birdColor = "red"
    } else if (randInt === 1) {
      this.birdColor = "blue"
    } else {
      this.birdColor = "yellow"
    }
  }
}
export type BirdType = Bird
