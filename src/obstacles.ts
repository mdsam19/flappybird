import redpipeTop from "./assets/sprites/pipe-red-top.png"
import redpipeBottom from "./assets/sprites/pipe-red-bottom.png"
import greenpipeTop from "./assets/sprites/pipe-green-top.png"
import greenpipeBottom from "./assets/sprites/pipe-green-bottom.png"

const rpipet = new Image()
const rpipeb = new Image()
const gpipet = new Image()
const gpipeb = new Image()
rpipet.src = redpipeTop
rpipeb.src = redpipeBottom
gpipet.src = greenpipeTop
gpipeb.src = greenpipeBottom

const pipeTop = [gpipet, rpipet]
const pipeBottom = [gpipeb, rpipeb]
let randInt = Math.floor(Math.random() * 2)
export let pipeArr: Obstacle[] = []
const pipeDifference = 130
const timeInterval = 2000
let prevtime = 0

class Obstacle {
  x: number
  yBottom: number
  yTop: number
  speedx: number
  width: number
  height: number
  minHeight: number
  maxHeight: number
  isCrossed: boolean
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.minHeight = canvas.height * 0.15
    this.maxHeight = canvas.height * 0.85 - this.minHeight - pipeDifference
    this.height = canvas.height * 0.85
    this.width = 110
    this.x = canvas.width
    this.yBottom =
      canvas.height * 0.85 -
      (Math.random() * (this.maxHeight - this.minHeight) + this.minHeight)
    this.yTop = this.yBottom - pipeDifference - this.height
    this.ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
    this.speedx = 12
    this.isCrossed = false
  }
  update() {
    this.x -= this.speedx
  }
  drawBottom(pipe: HTMLImageElement[]) {
    this.ctx.drawImage(
      pipe[randInt],
      this.x,
      this.yBottom,
      this.width,
      this.height
    )
  }
  drawTop(pipe: HTMLImageElement[]) {
    this.ctx.drawImage(
      pipe[randInt],
      this.x,
      this.yTop,
      this.width,
      this.height
    )
  }
}

export function handleObstacles(canvas: HTMLCanvasElement, gameOver: boolean) {
  const elapse = Date.now() - prevtime
  if (elapse >= timeInterval) {
    pipeArr.unshift(new Obstacle(canvas))
    prevtime = Date.now()
  }
  for (let i = 0; i < pipeArr.length; i++) {
    if (!gameOver) {
      pipeArr[i].update()
    }
    pipeArr[i].drawBottom(pipeBottom)
    pipeArr[i].drawTop(pipeTop)
    if (pipeArr[i].x < -pipeArr[i].width) pipeArr.pop()
  }
}
export function clearpipeArr() {
  randInt = Math.floor(Math.random() * 2)
  pipeArr = []
}
export type pipeArrType = Obstacle[]
