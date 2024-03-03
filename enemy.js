class Enemy{
    constructor(_enemyImage , speed){
        this.enemyImage =  new Image();
        this.enemyImage.src = _enemyImage;
        this.enemyImage.opacity = 1;
        this.x = canvas.width + 100;
        this.y = player.y;
        this.radius = 35;
        this.speed = speed;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.style;
        this.spriteWidth = 128;
        this.spriteHeight = 103;
        this.isOutOfTheGame = false;
    }

    update(){
        this.x -= this.speed;
        //console.log(this.x);
        if(this.isOutOfTheGame){
            this.destroy();
        }
    }

    draw(){
        /*ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.radius , 0 , Math.PI * 2);
        ctx.fill();*/
        ctx.drawImage(this.enemyImage , this.frameX * this.spriteWidth 
            , this.frameX * this.spriteHeight , this.spriteWidth , this.spriteHeight ,
            this.x - 65, this.y - 50, this.spriteWidth , this.spriteHeight );
            /*let opacity = 0.4;
            ctx.globalAlpha = opacity;*/
    }

    destroy()
    {
        this.destroy();
    }

}