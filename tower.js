class Tower{
    constructor(){
        this.x = 100;
        this.y = 350;
        this.radius = 60;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.width = 1;
        this.height = 1;
        this.spriteWidth = 256;
        this.spriteHeight = 158;

        this.health = 1000;
    }

    update(){

    }

    draw(){
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.radius , 0 , Math.PI * 2);
        ctx.fill();
        ctx.drawImage(TowerImage , this.frameX * this.spriteWidth 
            , this.frameX * this.spriteHeight , this.spriteWidth , this.spriteHeight ,
            this.x - 100, this.y - 85, this.spriteWidth , this.spriteHeight);
    }
}

window.Tower = Tower;