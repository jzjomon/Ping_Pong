import Ball  from "./Ball.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.querySelector('#ball'));
const playerPaddle = new Paddle(document.querySelector('#player-paddle'))
const computerPaddle = new Paddle(document.querySelector('#computer-paddle'))
const playerScoreEle  = document.getElementById('player-score');
const computerScoreEle = document.getElementById('computer-score')

let lastTime;
const update = (time) => {
    if(lastTime != null){
        const delta = time - lastTime;
        ball.update(delta,[playerPaddle.rect(), computerPaddle.rect()])  
        computerPaddle.update(delta, ball.y)
        const hue =  parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'))
        document.documentElement.style.setProperty("--hue",hue +  delta * 0.01)
        if(isLose()){
           handleLose()
        }
    }
    lastTime = time;
    window.requestAnimationFrame(update)
}
const handleLose = () => {
    const rect = ball.rect();
    if(rect.right >= window.innerWidth){
        playerScoreEle.textContent = parseInt(playerScoreEle.textContent) + 1;
    }else{
        computerScoreEle.textContent = parseInt(computerScoreEle.textContent) + 1;
    }
    ball.reset() 
    computerPaddle.reset()
}
const isLose = () => {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}
document.addEventListener('mousemove', e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})
window.requestAnimationFrame(update)