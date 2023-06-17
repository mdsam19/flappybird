import "./style.css"

const canvas = <HTMLCanvasElement>document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
canvas.width = 400
canvas.height = 650

/*let spaceKeyPressed = false
let screenTouched = false
let angle = 0
let frame = 0
let score = 0
let gameSpeed = 2*/

function animate() {
  ctx?.clearRect(0, 0, canvas.width, canvas.height)
  ctx?.fillRect(10, 10, 30, 30)
  requestAnimationFrame(animate)
}
animate()

window.addEventListener("keydown", function (e: KeyboardEvent) {
  if (e.code === "Space") return
})

window.addEventListener("keyup", function (e: KeyboardEvent) {
  if (e.code === "Space") return
})

window.addEventListener("touchstart", function (e: TouchEvent) {
  if (e.targetTouches.length === 1) return
})

window.addEventListener("touchend", function (e: TouchEvent) {
  if (e.targetTouches.length === 0) return
})
