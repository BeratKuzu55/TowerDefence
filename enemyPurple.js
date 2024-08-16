class EnemyPurple extends Enemy{

    constructor(level_count){
        super(enemyImageArray[0] , 1 , "purple");
    
        this.jumping_TopBoundary = 105;
        this.counter = 0;
        this.jumpable_Area = canvas.offsetLeft + canvas.width - player.x;
        this.jumping_Count =  Math.ceil((level * 4));
        this.jumping_Gap = ((this.jumpable_Area / this.jumping_Count) + 1);
        console.log("canvas width - canvas x" , canvas , this.jumpable_Area , this.jumping_Count);
        this.jumping_coordinates = [];
        for(var i = 1; i <= this.jumping_Count; i++){
            this.jumping_coordinates.push(Math.ceil(canvas.offsetLeft + canvas.width - i*this.jumping_Gap));
        }

    }

    jump(){
        this.counter += 5;
        if(this.counter >= this.jumping_TopBoundary){
            this.y += 3;
        }else {
            this.y -= 3;
        }
    }
    

    handleJumping(){
        for(var i = 0; i < this.jumping_coordinates.length; i++){
            
            if(this.x <= this.jumping_coordinates[i] && this.x >= this.jumping_coordinates[i] - 39){
                this.jump();
            }
            
        }
        if(this.counter >= this.jumping_TopBoundary && this.y > player.y){
            this.counter = 0;
        }
    }
}

windows.EnemyPurple = EnemyPurple;