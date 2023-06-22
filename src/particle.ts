const particleArr: Particle[] = []

class Particle {
  x: number
  y: number
  size: number
  speedx: number
  speedy: number
  hue: number
  birdColor: string
  ctx: CanvasRenderingContext2D

  constructor(
    x: number,
    y: number,
    birdColor: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x
    this.y = y
    this.size = Math.random() * 7 + 3
    this.speedx = 5
    this.speedy = Math.random() - 0.5
    this.birdColor = birdColor
    this.ctx = ctx
    if (birdColor === "red") {
      this.hue = 23
    } else if (birdColor === "blue") {
      this.hue = 185
    } else {
      this.hue = 48
    }
  }
  update() {
    this.x -= this.speedx
    this.y += this.speedy
  }
  draw() {
    this.ctx.fillStyle = `hsl(${this.hue},100%,50%)`
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    this.ctx.fill()
  }
}

export default function handleParticles(
  x: number,
  y: number,
  birdColor: string,
  ctx: CanvasRenderingContext2D
) {
  particleArr.unshift(new Particle(x, y, birdColor, ctx))
  for (let i = 0; particleArr.length > i; i++) {
    particleArr[i].hue += 1
    particleArr[i].draw()
    particleArr[i].update()
    if (particleArr[i].hue >= 49 && birdColor === "red") {
      particleArr[i].hue = 23
    }
    if (particleArr[i].hue >= 230 && birdColor === "blue") {
      particleArr[i].hue = 185
    }
    if (particleArr[i].hue >= 75 && birdColor === "yellow") {
      particleArr[i].hue = 48
    }
  }
  if (particleArr.length >= 200) {
    for (let i = 0; i < 25; i++) {
      particleArr.pop()
    }
  }
}
