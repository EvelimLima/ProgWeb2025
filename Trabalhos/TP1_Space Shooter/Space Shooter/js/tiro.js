import { space } from "./space.js";

export class Tiro{
    constructor(x, y){
        this.element = document.createElement("img")
        this.element.className = "tiro"
        this.element.src = "assets/png/laserRed.png"
        this.element.style.position = "absolute"
        this.element.style.left = `${x}px`
        this.element.style.top = `${y}px`

        this.speed = 5
        space.element.appendChild(this.element)
    }

    move(){
        this.element.style.top = `${parseFloat(this.element.style.top) - this.speed}px`
    }

    foradaTela(){
        return parseFloat(this.element.style.top) < -20
    }

    destroi(){
        this.element.remove() 
    }

    getRect(){
        return this.element.getBoundingClientRect()
    }
}