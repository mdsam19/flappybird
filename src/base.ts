import baseImg from "./assets/sprites/base.png"

const base = new Image()
base.src = baseImg

export class Base {
  x: number
  y: number
  width: number
  height: number
  baseSpeed: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.x = 0
    this.y = canvas.height * 0.85
    this.width = canvas.width * 2
    this.height = canvas.height * 0.3
    this.canvas = canvas
    this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
    this.baseSpeed = 10
  }

  update() {
    this.x -= this.baseSpeed
    if (this.x <= -this.canvas.width) this.x = 0
  }

  draw() {
    this.ctx.drawImage(base, this.x, this.y, this.width, this.height)
  }
}
export type BaseType = Base
