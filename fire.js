class Fire{
    constructor(character , _fireImage , direction){
        this.fireImage = new Image();
        this.fireImage.src = _fireImage;
        this.x = character.x + 64;
        this.y = character.y;
        this.radius = 25;
        this.speed = 5;
        this.color = "";
        this.distance;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 321;
        this.spriteHeight = 137;
        this.direction = direction;
    }

    update(){
        if(this.direction){
            this.x += this.speed;
        }
        else {
            this.x -= this.speed;
        }
         
    }

    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.radius , 0 , Math.PI *2);
        //ctx.fill();
        ctx.closePath();
        ctx.stroke();
        if(this.direction){
            ctx.drawImage( this.fireImage, this.frameX * this.spriteWidth 
                , this.frameX * this.spriteHeight , this.spriteWidth , this.spriteHeight ,
                this.x - 80 , this.y - 23, this.spriteWidth , this.spriteHeight);
        }
        else {
            ctx.drawImage( this.fireImage, this.frameX * this.spriteWidth 
                , this.frameY * this.spriteHeight , this.spriteWidth , this.spriteHeight ,
                this.x - 25 , this.y - 30, this.spriteWidth , this.spriteHeight);
        }
        
    }
}

window.Fire = Fire;