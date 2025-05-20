import { FPS } from "./config.js";
import { space } from "./space.js";
import { ship } from "./ship.js";
import { createRandomEnemyShip, moveEnemyShips,
        createRandomBigAsteroid, moveBigAsteroids,
        createRandomSmallAsteroid, moveSmallAsteroids,
        createRandomFlyingSaucer, moveFlyingSaucers
        } from "./enemyShip.js";
import { maiorDificuldade } from "./enemyShip.js";
import { Tiro } from "./tiro.js";
import { enemyShips, bigAsteroids, smallAsteroids, flyingSaucers } from "./enemyShip.js";

const tiros = []

// Estado do jogo
let score = 0;
let lives = 3;
let isRunning = false;
let isPaused = false;
const scoreDisplay = document.getElementById("score");
 
// Inicialização do HUD. regra 1 ok. 
function initHud() { 
    const livesElement = document.getElementById("lives");
    livesElement.innerHTML = '';
    
    for (let i = 0; i < lives; i++) {
        const lifeIcon = document.createElement('div');
        lifeIcon.className = 'life-icon';
        livesElement.appendChild(lifeIcon);
    }
    
    updateScore(0); // Atualiza o score inicial
}

// Atualiza a pontuação
function updateScore(points) { // regra 1 ok. 
    score += points;
    scoreDisplay.textContent = String(score).padStart(6, "0"); 
}

function checkColisoes() { // regra 7
    tiros.forEach((tiro, i) => {
        const tiroRect = tiro.getRect()

        const checkGroup = (group, points) => {
            for (let j = 0; j < group.length; j++) {
                const enemyRect = group[j].element.getBoundingClientRect();
                if(isColliding(tiroRect, enemyRect)){
                    group[j].element.remove();
                    group.splice(j, 1);
                    tiros[i].destroi();
                    tiros.splice(i, 1);
                    updateScore(points);
                    break;
                }
            }
        }

        checkGroup(bigAsteroids, 10)
        checkGroup(flyingSaucers, 20)
        checkGroup(enemyShips, 50)
        checkGroup(smallAsteroids, 100)

    })
}

function isColliding(rect1, rect2) { 
    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}

function detectarColisaoNave() {
    const shipReact = ship.element.getBoundingClientRect()

    const checkGroup = (group) => {
        for (let i = 0; i < group.length; i++){
            const enemyRect = group[i].element.getBoundingClientRect()
            if (isColliding(shipReact, enemyRect)) {
                group[i].element.remove()
                group.splice(i, 1)
                danosNave()
                break
            }
        }
    }

    checkGroup(enemyShips)
    checkGroup(bigAsteroids)
    checkGroup(smallAsteroids)
    checkGroup(flyingSaucers)
}

let danos = false

function danosNave(){
    if (danos) return

    lives--

    updateLives()
    danos = true
    ship.element.src = "assets/png/playerDamaged.png"

    setTimeout(() => {
        ship.element.src = ship.getCurentSprit()
        danos = false
    }, 5000 )

    if (lives <= 0) {
        endGame()     
    }
}

function updateLives(){
    const livesElement =  document.getElementById("lives")

    livesElement.innerHTML = ' '
    for (let i = 0; i < lives; i++) {
        const lifeIcon = document.createElement('div')
        lifeIcon.className = 'life-icon'
        livesElement.appendChild(lifeIcon)
    }
}

function endGame() { // regra 9
    isRunning = false;
    document.getElementById("game-over").classList.remove("hidden");
    document.getElementById("final-score").textContent = `Score: ${score}`;
}

function resetGame() {
        score = 0;
        lives = 3;
        updateScore(0);
        updateLives();

        const elementsToRemove = [
            ...enemyShips,
            ...bigAsteroids,
            ...smallAsteroids,
            ...flyingSaucers,
        ]

        elementsToRemove.forEach(e => e.element.remove())
        enemyShips.length = 0;
        bigAsteroids.length = 0;
        smallAsteroids.length = 0;
        flyingSaucers.length = 0;

        tiros.forEach(tiro => tiro.destroi());
        tiros.length = 0;

        ship.element.src = ship.getCurentSprit()
        ship.resetReposition()

        document.getElementById("game-over").classList.add("hidden");
        
        isRunning = true;
}


// Controles do jogo
window.addEventListener("keydown", (e) => {  
    if (e.key === "ArrowLeft") ship.changeDirection(-1);
    if (e.key === "ArrowRight") ship.changeDirection(+1);
    
    if (e.key === " ") { 
            if (!isRunning) { // regra 2 ok
            isRunning = true;
        } else { // tiro
            const shipReact = ship.element.getBoundingClientRect()
            const spaceReact = space.element.getBoundingClientRect()
            const x = shipReact.left + shipReact.width / 2 - spaceReact.left - 5
            const y = shipReact.top - spaceReact.top 
            tiros.push(new Tiro(x, y))
        }
    }

    if (e.key === "p") { // regra 2 ok
            isPaused = !isPaused;
        }

});

// Loop principal do jogo
function run() {
    if (!isRunning || isPaused) return;
    
    space.move();
    ship.move();

    createRandomEnemyShip();
    moveEnemyShips();

    createRandomBigAsteroid();
    moveBigAsteroids();

    createRandomSmallAsteroid();
    moveSmallAsteroids();

    createRandomFlyingSaucer();
    moveFlyingSaucers();

    tiros.forEach((tiro, index) => {
        tiro.move();
        if (tiro.foradaTela()) {
            tiro.destroi();
            tiros.splice(index, 1);
        }
    });

    checkColisoes();
    detectarColisaoNave();

}

// Inicialização
function init() {
    initHud();
    setInterval(run, 1000 / FPS);
    setInterval(maiorDificuldade, 60000); 
    document.getElementById("restart-button").addEventListener("click", resetGame); // regra 9 ainda
  
}

init();