//enemyShip.js

import { 
  TAMX, 
  PROB_ENEMY_SHIP,
  PROB_BIG_ASTEROID,
  PROB_SMALL_ASTEROID,
  PROB_FLYING_SAUCER 
} from "./config.js"
import { space } from "./space.js"

export {enemyShips, bigAsteroids, smallAsteroids, flyingSaucers}

let speedMultiplicador = 1.1
export const maiorDificuldade = () => {
  speedMultiplicador *= 1.1 // aumentar em 10%
  console.log(`Dificuldade aumentada: ${speedMultiplicador.toFixed(2)}`)
}

function randomSpeed(min, max){
  return Math.random() * (max - min) + min
}

class EnemyShip {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "enemy-ship"
    this.element.src = "assets/png/enemyShip.png"
    this.element.style.top = "-20px"
    this.element.style.left = `${parseInt(Math.random() * TAMX)}px`
    this.speed = randomSpeed(1, 3) * speedMultiplicador // entre 1 e 3 pixels por frame
    space.element.appendChild(this.element)
  }
  move() {
    this.element.style.top = `${parseInt(this.element.style.top) + this.speed}px`

  }
}


class BigAsteroid { // asteroide grande que não é asteroide e sim meteoro :) 
  // constructor() {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "big-asteroid"
    this.element.src = "assets/png/meteorBig.png"
    // this.element.src = "assets/png/asteroidBig.png"
    this.element.style.top = "-20px"
    this.element.style.left = `${parseInt(Math.random() * TAMX)}px`
    this.speed = randomSpeed(0.8, 2) * speedMultiplicador
    space.element.appendChild(this.element)
  }
  move() {
    this.element.style.top = `${parseFloat(this.element.style.top) + this.speed}px`

  }
}

class SmallAsteroid { // asteroide pequeno
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "small-asteroid"
    this.element.src = "assets/png/meteorSmall.png"
    // this.element.src = "assets/png/asteroidSmall.png"
    this.element.style.top = "-20px"
    this.element.style.left = `${parseInt(Math.random() * TAMX)}px`
    this.speed = randomSpeed(1.5, 3) * speedMultiplicador
    space.element.appendChild(this.element)
  }
  move() {
    this.element.style.top = `${parseFloat(this.element.style.top) + this.speed}px`

  }
}

class FlyingSaucer { // disco voador
  // constructor() {
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "flying-saucer"
    this.element.src = "assets/png/enemyUFO.png"
    // this.element.src = "assets/png/flyingSaucer.png"
    this.element.style.top = "-20px"
    this.element.style.left = `${parseInt(Math.random() * TAMX)}px`
    this.speed = randomSpeed(1, 2.5) * speedMultiplicador
    space.element.appendChild(this.element)
  }
  move() {
    this.element.style.top = `${parseFloat(this.element.style.top) + this.speed}px`

  }
}


const smallAsteroids = []
const bigAsteroids = []
const flyingSaucers = []
const enemyShips = []


export const createRandomEnemyShip = () => { 
  if (Math.random() < PROB_ENEMY_SHIP) enemyShips.push(new EnemyShip())
}

export const moveEnemyShips = () => { // mover as naves inimigas
  enemyShips.forEach(e => e.move())
}


export const createRandomBigAsteroid = () => { 
  if (Math.random() < PROB_BIG_ASTEROID) bigAsteroids.push(new BigAsteroid())
}

export const moveBigAsteroids = () => { // mover os asteroides grandes
  // const bigAsteroids = []
  bigAsteroids.forEach(e => e.move())
}

export const createRandomSmallAsteroid = () => {
  if (Math.random() < PROB_SMALL_ASTEROID) smallAsteroids.push(new SmallAsteroid())
}

export const moveSmallAsteroids = () => { // mover os asteroides pequenos
  // const smallAsteroids = []
  smallAsteroids.forEach(e => e.move())
} 

export const createRandomFlyingSaucer = () => {
  if (Math.random() < PROB_FLYING_SAUCER) flyingSaucers.push(new FlyingSaucer())
}

export const moveFlyingSaucers = () => { // mover os discos voadores
  // const flyingSaucers = []
  flyingSaucers.forEach(e => e.move())
}


//---------------------------------------------------------------------------------------------------------