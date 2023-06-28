import bgImgDay from "./assets/sprites/background-day.png"
import bgImgNight from "./assets/sprites/background-night.png"
const bgd = new Image()
bgd.src = bgImgDay
const bgn = new Image()
bgn.src = bgImgNight
const bg = [bgd, bgn]

export default class Background {
  x1: number
  y1: number
  x2: number
  y2: number
  width: number
  height: number
  bgSpeed: number
  randInt: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.x1 = 0
    this.y1 = -canvas.height * 0.15
    this.x2 = canvas.width
    this.y2 = -canvas.height * 0.15
    this.width = canvas.width
    this.height = canvas.height
    this.canvas = canvas
    this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
    this.bgSpeed = 5
    this.randInt = Math.floor(Math.random() * 2)
  }

  update() {
    this.x1 -= this.bgSpeed
    this.x2 -= this.bgSpeed
    if (this.x1 <= -this.canvas.width) {
      this.x1 = 0
      this.x2 = this.canvas.width
    }
  }

  draw() {
    this.ctx.drawImage(
      bg[this.randInt],
      this.x1,
      this.y1,
      this.width,
      this.height
    )
    this.ctx.drawImage(
      bg[this.randInt],
      this.x2,
      this.y2,
      this.width,
      this.height
    )
  }
}
