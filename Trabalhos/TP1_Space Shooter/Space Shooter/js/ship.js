//ship.js

import { TAMX } from "./config.js"
import { space } from "./space.js"

const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
]

class Ship {
  constructor() {
    this.speed = 3,
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1
    this.element.src = directions[this.direction]
    this.element.style.bottom = "20px"
    this.element.style.left = `${(TAMX / 2) - 50}px`
    space.element.appendChild(this.element)
  }
  
  changeDirection(giro) { // -1 +1
    if (this.direction + giro >= 0 && this.direction + giro <= 2)
      this.direction = this.direction + giro
    this.element.src = directions[this.direction]
  }

  move() {
  const currentLeft = parseInt(this.element.style.left);
  const shipWidth = this.element.offsetWidth; // Largura da nave

  if (this.direction === 0 && currentLeft > 0) {
    this.element.style.left = `${currentLeft - this.speed}px`;
  }
  if (this.direction === 2 && currentLeft < TAMX - shipWidth) { // corrigir 
    this.element.style.left = `${currentLeft + this.speed}px`;
  }
 }

  getCurrentSprite() {
  const directions = [
      "assets/png/playerLeft.png",
      "assets/png/player.png",
      "assets/png/playerRight.png",
    ]
    return directions[this.direction]
  }

  resetReposition() {
    this.direction = 1
    this.element.src = this.getCurrentSprite()
    const shipWidth = this.element.offsetWidth
    this.element.style.left = `${(TAMX / 2) - 50}px`
    this.element.style.bottom = "20px"
  }
}

export const ship = new Ship()

