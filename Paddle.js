const SPEED = .02;

export default class Paddle{
   constructor(paddleEle){
    this.paddleEle = paddleEle;
    this.reset();
   } 
   get position(){
    return parseFloat(getComputedStyle(this.paddleEle).getPropertyValue('--position'))
   }
   set position(value){
    this.paddleEle.style.setProperty('--position', value)
   }
   rect(){
    return this.paddleEle.getBoundingClientRect() 
   }
   reset(){
    this.position = 50;
   }
   update(delta, ballHeight){
    this.position += SPEED * delta * (ballHeight - this.position)
   }

}