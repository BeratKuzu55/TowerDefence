class Enemy{
    constructor(_enemyImage , speed , enemy_type){
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
        this.isExplosed = false;
        this.isDestroed = false;
        this.enemyType = enemy_type;
    
    }

    update(){
        this.x -= this.speed;
        //console.log(this.x);
        if(this.isDestroed){
            this.destroy();
            player.point = 100;
        }
        
        if(this.x <= tower.x && !this.isExplosed){
            this.explose(this.enemyType);
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

    destroy(enemyArray , enemy_type)
    {
        switch (enemy_type){
            case "purple":
                player.point += 150;
            case "yellow":
                player.point += 250;
            case "blue":
                player.point += 500;
                
        }
    }

    explose(enemy_type){
        switch (enemy_type){
            case "purple":
                tower.health -= 350;
                this.isExplosed = true;
                break;
            case "yellow":
                tower.health -= 500;
                this.isExplosed = true;
                break;
            case "blue":
                tower.health -= 1000;
                this.isExplosed = true;
                break;
            
                
        }
    }

}

window.Enemy = Enemy;