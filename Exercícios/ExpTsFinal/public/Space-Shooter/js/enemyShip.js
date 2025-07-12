import { 
  TAMX, 
  PROB_ENEMY_SHIP,
  PROB_BIG_ASTEROID,
  PROB_SMALL_ASTEROID,
  PROB_FLYING_SAUCER, 
  TAMY,
} from "./config.js"
import { space } from "./space.js"

export {enemyShips, bigAsteroids, smallAsteroids, flyingSaucers}

let speedMultiplicador = 1.0
export const maiorDificuldade = () => {
  speedMultiplicador *= 1.1 // aumenta a dificuldade
  //console.log(`Dificuldade aumentada: ${speedMultiplicador.toFixed(2)}`)
  
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

  foraDaTela() {
    return parseFloat(this.element.style.top) > TAMY
  }

}


class BigAsteroid { 
  constructor() {
    this.element = document.createElement("img")
    this.element.className = "big-asteroid"
    this.element.src = "assets/png/meteorBig.png"
    // this.element.src = "assets/png/asteroidBig.png"
    this.element.style.top = "-20px"
    this.element.style.left = `${parseInt(Math.random() * TAMX)}px`
    this.speed = randomSpeed(1, 2) * speedMultiplicador
    space.element.appendChild(this.element)
  }
  move() {
    this.element.style.top = `${parseFloat(this.element.style.top) + this.speed}px`

  }

  foraDaTela() {
    return parseFloat(this.element.style.top) > 900
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

  foraDaTela() {
    return parseFloat(this.element.style.top) > 900
  }

}

class FlyingSaucer { 
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

  foraDaTela() {
    return parseFloat(this.element.style.top) > 900
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
  for (let i = 0; i < enemyShips.length; i++) {
    enemyShips[i].move()
    if (enemyShips[i].foraDaTela()) {
      enemyShips[i].element.remove()
      enemyShips.splice(i, 1)
      i--
    }
  }
}


export const createRandomBigAsteroid = () => { 
  if (Math.random() < PROB_BIG_ASTEROID) bigAsteroids.push(new BigAsteroid())
}

export const moveBigAsteroids = () => { // mover os asteroides grandes
  for (let i = 0; i < bigAsteroids.length; i++) {
    bigAsteroids[i].move()
    if (bigAsteroids[i].foraDaTela()) {
      bigAsteroids[i].element.remove()
      bigAsteroids.splice(i, 1)
      i--
    }
  }
}


export const createRandomSmallAsteroid = () => {
  if (Math.random() < PROB_SMALL_ASTEROID) smallAsteroids.push(new SmallAsteroid())
}

export const moveSmallAsteroids = () => { // mover os asteroides pequenos
  for (let i = 0; i < smallAsteroids.length; i++) {
    smallAsteroids[i].move()
    if (smallAsteroids[i].foraDaTela()) {
      smallAsteroids[i].element.remove()
      smallAsteroids.splice(i, 1)
      i--
    }
  }
} 


export const createRandomFlyingSaucer = () => {
  if (Math.random() < PROB_FLYING_SAUCER) flyingSaucers.push(new FlyingSaucer())
}

export const moveFlyingSaucers = () => { // mover os discos voadores
  for (let i = 0; i < flyingSaucers.length; i++) {
    flyingSaucers[i].move()
    if (flyingSaucers[i].foraDaTela()) {
      flyingSaucers[i].element.remove()
      flyingSaucers.splice(i, 1)
      i--
    }
  }
}

export const resetDificuldade = () => {
  speedMultiplicador = 1.0
  //console.log(`Dificuldade resetada: ${speedMultiplicador.toFixed(2)}`)
}


