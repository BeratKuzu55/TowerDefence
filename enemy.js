class Enemy {
    constructor(_enemyImage, speed, enemy_type, _healt) {
        this.enemyImage = new Image();
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
        this.enemyType = enemy_type;
        this.healt = _healt;
        this.isDestroyed = false;
    }

    update() {
        if (!this.isDestroyed) {
            this.x -= this.speed * (level);
            //console.log(this.x);
            if (this.isDestroed) {
                this.destroy();
                player.point = 100;
            }

            if (this.x <= tower.x && !this.isExplosed) {
                this.explose(this.enemyType);
            }
        }
    }

    draw() {

        if (!this.isDestroyed) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.drawImage(this.enemyImage, this.frameX * this.spriteWidth
                , this.frameX * this.spriteHeight, this.spriteWidth, this.spriteHeight,
                this.x - 65, this.y - 50, this.spriteWidth, this.spriteHeight);
            /*let opacity = 0.4;
            ctx.globalAlpha = opacity;*/
        }
    }

    destroy() {
        this.isDestroyed = true;
    }

    explose(enemy_type) {
        switch (enemy_type) {
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