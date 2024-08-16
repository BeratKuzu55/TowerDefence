class EnemyBlue extends Enemy{
    constructor(){
        super(enemyImageArray[2] , 1.2 , "blue");
        this.enemy_blue_fire_array = [ new Fire(this , fireImageSourceArray[5])]
        this.enemy_blue_fire_count = 3 * level;
    }


    fire(){
        const enemyBlueFire = new Fire(this , fireImageSourceArray[5] , false);
        this.enemy_blue_fire_array.push(enemyBlueFire);

    }

    handleEnemyBlueFire(){
        for(var i = 0; i<this.enemy_blue_fire_array.length; i++){
            this.enemy_blue_fire_array[i].draw();
            this.enemy_blue_fire_array[i].update();
        }
    }
}

window.EnemyBlue = EnemyBlue;