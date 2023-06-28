import { BirdType } from "./bird"
import { pipeArrType } from "./obstacles"
import { BaseType } from "./base"

let collided = false

export function isCollided(
  bird: BirdType,
  pipeArr: pipeArrType,
  base: BaseType
) {
  for (let i = 0; i < pipeArr.length; i++) {
    if (
      bird.y + bird.height >= base.y ||
      (pipeArr[i].x <= bird.x + bird.width &&
        pipeArr[i].x + pipeArr[i].width > bird.x &&
        (bird.y <= pipeArr[i].yTop + pipeArr[i].height ||
          bird.y + bird.height >= pipeArr[i].yBottom))
    ) {
      collided = true
      break
    }
  }
  return collided
}

export function resetCollider(){
  collided = false
}
