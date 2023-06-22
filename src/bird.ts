import rbdImg from "/sprites/redbird-downflap.png"
import rbuImg from "/sprites/redbird-upflap.png"
import rbmImg from "/sprites/redbird-midflap.png"
import bbdImg from "/sprites/bluebird-downflap.png"
import bbuImg from "/sprites/bluebird-upflap.png"
import bbmImg from "/sprites/bluebird-midflap.png"
import ybmImg from "/sprites/yellowbird-midflap.png"
import ybdImg from "/sprites/yellowbird-downflap.png"
import ybuImg from "/sprites/yellowbird-upflap.png"

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
const radInt = Math.floor(Math.random() * 3)
const randbird = birdarr[radInt]
const rad = Math.PI / 180

export default class Bird {
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

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.ctx = ctx
    this.x = canvas.width * 0.22
    this.y = canvas.height / 2
    this.vy = 0
    this.width = 35
    this.height = 35
    this.gravity = 2
    this.frameX = 0
    this.angle = 0
    if (radInt === 0) {
      this.birdColor = "red"
    } else if (radInt === 1) {
      this.birdColor = "blue"
    } else {
      this.birdColor = "yellow"
    }
  }
  // Update the position of Bird
  update() {
    if (this.y >= this.canvas.height * 0.85 - this.height) {
      this.y = this.canvas.height * 0.85 - this.height
      this.vy = 0
    } else if (this.y < 5) {
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
      this.angle += 7
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
      if (this.angle <= -45) this.angle = -45
      this.frameX++
      if (this.frameX >= 3) this.frameX = 0
    }
  }
  flap() {
    this.vy = -20
    this.angle = 0
  }
}
