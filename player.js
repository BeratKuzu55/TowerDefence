class Player{
    constructor(){
       this.x = 250;
       this.y = 350;
       this.radius = 35;
       this.frame = 0;
       this.frameX = 0; // 7 tane kare var yani bu değer max 6 olabilir.
       this.frameY = 0;
       this.spriteWidth = 128;
       this.spriteHeight = 128;

       this.fire_count = 5;
       this.point = 0;
    }

    draw(willAnimationRun){

        if(willAnimationRun){

            if(gameFrame % 6 == 0){
                if(this.frameX < 6){
                    this.frameX++;
                }
                else {
                    this.frameX = 0;
                    playerFireAnimationRun = false;
                }
            }

        }

        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.radius , 0 , Math.PI * 2);
        //ctx.fill();
        ctx.drawImage(playerImage , this.frameX * this.spriteWidth 
            , this.frameY * this.spriteHeight , this.spriteWidth , this.spriteHeight ,
            this.x - 50 , this.y - 95, this.spriteWidth , this.spriteHeight);
    }

    update(){
        
    }
}

window.Player = Player;

