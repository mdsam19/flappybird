import "./style.css"
import Bird from "./bird"
import Base from "./base"
import handleParticles from "./particle"
import Background from "./background"

const canvas = <HTMLCanvasElement>document.querySelector("#canvas")
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
canvas.width = 400
canvas.height = 650
const bird = new Bird(canvas, ctx)
const base = new Base(canvas, ctx)
const bg = new Background(canvas,ctx)
const fps = 24
let prevtime = 0

function animate() {
  const elapsed = Date.now() - prevtime
  const frametime = 1000 / fps
  if (elapsed > frametime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bg.draw()
    bg.update()
    base.update()
    base.draw()
    bird.update()
    bird.draw()
    handleParticles(bird.x, bird.y + bird.width / 2, bird.birdColor, ctx)
    prevtime = Date.now()
  }
  requestAnimationFrame(animate)
}
animate()

window.addEventListener("keydown", function (e: KeyboardEvent) {
  if (e.code === "Space") return
})

window.addEventListener("keyup", function (e: KeyboardEvent) {
  if (e.code === "Space") return
})

canvas.addEventListener("touchstart", function () {
  bird.flap()
})
