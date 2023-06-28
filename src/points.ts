import { BirdType } from "./bird"
import { pipeArrType } from "./obstacles"
import point0 from "./assets/sprites/0.png"
import point1 from "./assets/sprites/1.png"
import point2 from "./assets/sprites/2.png"
import point3 from "./assets/sprites/3.png"
import point4 from "./assets/sprites/4.png"
import point5 from "./assets/sprites/5.png"
import point6 from "./assets/sprites/6.png"
import point7 from "./assets/sprites/7.png"
import point8 from "./assets/sprites/8.png"
import point9 from "./assets/sprites/9.png"
import pointaudio from './assets/audio/point.wav'

const pointwav = new Audio()
pointwav.src = pointaudio
const pt0 = new Image()
const pt1 = new Image()
const pt2 = new Image()
const pt3 = new Image()
const pt4 = new Image()
const pt5 = new Image()
const pt6 = new Image()
const pt7 = new Image()
const pt8 = new Image()
const pt9 = new Image()
pt0.src = point0
pt1.src = point1
pt2.src = point2
pt3.src = point3
pt4.src = point4
pt5.src = point5
pt6.src = point6
pt7.src = point7
pt8.src = point8
pt9.src = point9

const points = [pt0, pt1, pt2, pt3, pt4, pt5, pt6, pt7, pt8, pt9]
let point = 0

export function handlePoints(
  bird: BirdType,
  pipeArr: pipeArrType,
  canvas: HTMLCanvasElement
) {
  const height = 35
  const width = 35
  const gap = 30
  const ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
  for (let i = 0; pipeArr.length > i; i++) {
    if (pipeArr[i].x + pipeArr[i].width < bird.x && !pipeArr[i].isCrossed) {
      pointwav.play()
      point += 1
      pipeArr[i].isCrossed = true
    }
  }
  for (let i = 0; point.toString().length > i; i++) {
    const strPoint = point.toString()
    ctx.drawImage(
      points[parseInt(strPoint[i])],
      canvas.width / 2 - width + i * gap,
      15,
      width,
      height
    )
  }
  return point
}
export function resetPoints(){
  point=0
}
