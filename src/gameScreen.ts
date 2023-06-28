import { BirdType } from "./bird"

const rad = Math.PI / 180
let i = 0
let angel = rad * i

export function handleStart(canvas: HTMLCanvasElement, bird: BirdType) {
  const ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
  ctx.fillStyle = "white"
  ctx.strokeStyle = "black"
  ctx.lineWidth=8
  ctx.fillText("Flappy Bird", 40, 300 + Math.sin(angel) * 10)
  ctx.lineWidth = 2
  ctx.strokeText("Flappy Bird", 40, 300 + Math.sin(angel) * 10)
  bird.drawStartScreenBird(i)
  i += 22
  angel = rad * i
  if (i > 360) i = 0
}
