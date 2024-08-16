class EnemyYellow extends Enemy{
    constructor(){
        super(enemyImageArray[1] , 1.1 , "yellow");
        this.TimetoDisappear = false;
        this.gameframeTemp = 0;
        this.ghostTime = 80;
        // gameFrame % 50 == 0 buna benzer bi yol kullanılarak zamana dayalı görünmezlik katılabilir.

    }

    
    beDisappear(){
        if(gameFrame % 180 == 0 && gameFrame != 0){
            this.gameframeTemp = gameFrame;
            this.TimetoDisappear = true;
            this.enemyImage.src = enemyImageArray[3]; 
        }
       // console.log(this.gameframeTemp)
        if(gameFrame - this.gameframeTemp > this.ghostTime && this.TimetoDisappear == true){
            this.TimetoDisappear = false;
            this.enemyImage.src = enemyImageArray[1]; 
        }
    
    }


}

window.EnemyYellow = EnemyYellow;