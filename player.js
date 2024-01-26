export default class Player{
    constructor(){
       this.x = 250;
       this.y = 350;
       this.radius = 35;
       this.frame = 0;
       this.frameX = 0;
       this.frameY = 0;
       this.spriteWidth = 128;
       this.spriteHeight = 128;
    }

    draw(){
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.radius , 0 , Math.PI * 2);
        ctx.fill();
        ctx.drawImage(playerImage , this.frameX * this.spriteWidth 
            , this.frameX * this.spriteHeight , this.spriteWidth , this.spriteHeight ,
            this.x - 50 , this.y - 95, this.spriteWidth , this.spriteHeight);
    }

    update(){

    }
}


