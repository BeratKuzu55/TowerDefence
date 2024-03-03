//import Player from "./player";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 550;

let gameFrame = 0;
ctx.font = "50px Georgia";
let gameSpeed = 1;
let GameOver = false;
var level = 1;

/*  
window.addEventListener('keydown',this.check,false);

function check(e) {
    alert(e.keyCode);
}
*/
//Player
const playerImage = new Image();
playerImage.src = "images/character/Player.png";
class Player{
    constructor(){
       this.x = 250;
       this.y = 350;
       this.radius = 35;
       this.frame = 0;
       this.frameX = 0;
       this.frameY = 0;
       this.spriteWidth = 128;
       this.spriteHeight = 128;

       this.fire_count = 5;
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
const player = new Player();
function handlePlayer(){
    player.update();
    player.draw();
}

// Fire 
const fireImageSourceArray = [
    "images/Fire/fireballblue.png" ,
    "images/Fire/fireballpink.png" ,
    "images/Fire/fireballred.png" ,
    "images/Fire/fireballredopposit.png",
    "images/Fire/fireballredopposit2.png"  
];

class Fire{
    constructor(character , _fireImage){
        this.fireImage = new Image();
        this.fireImage.src = _fireImage;
        this.x = character.x + 128;
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
    }

    update(){
        this.x += this.speed; 
    }

    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.radius , 0 , Math.PI *2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        ctx.drawImage( this.fireImage, this.frameX * this.spriteWidth 
            , this.frameX * this.spriteHeight , this.spriteWidth , this.spriteHeight ,
            this.x - 80 , this.y - 23, this.spriteWidth , this.spriteHeight);
    }
}

const fire1 = new Fire(player , fireImageSourceArray[4]);

const fireArray = [new Fire(player , fireImageSourceArray[4])];
var create_fire = false;
window.addEventListener("keydown" , function(event){
    console.log("keydown has worked");
    if(event.key == "w"){
        console.log("W was pressed");
        if(player.fire_count != 0){
            console.log("merhaba");
            create_fire = true;
            const fire2 = new Fire(player , fireImageSourceArray[4]);
            fireArray.push(fire2);
            player.fire_count --;
         }   
    }
});


canvas.addEventListener("click" , function(event){
    
        console.log("canvas was clicked");
    
});



function handleFire(){
    if(create_fire){
        for(var i = 0; i<fireArray.length; i++){
            fireArray[i].draw();
            fireArray[i].update();
            
            if(fireArray[i].x > 900){
                fireArray.splice(i , 1);
            }
        }
    }
   
}
// Enemy 

const enemyImageArray = [
    "images/character/enemy1updated.png" , 
    "images/character/enemy2updated.png" , 
    "images/character/enemy3updated.png",
    "images/character/enemy2changedOpacity.png"
]

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

//const enemy = new Enemy();

class EnemyPurple extends Enemy{

    constructor(){
        super(enemyImageArray[0] , 1);
    
        this.jumping_TopBoundary = 105;
        this.counter = 0;
        this.jumpable_Area = canvas.offsetLeft + canvas.width - player.x;
        this.jumping_Count =  Math.ceil(Math.random() * (level + 4));
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
            this.y += 5;
        }else {
            this.y -= 5;
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

class EnemyPink extends Enemy{
    constructor(){
        super(enemyImageArray[1] , 1.5);
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

class EnemyBlue extends Enemy{
    constructor(){
        super(enemyImageArray[2] , 2);
        this.enemy_blue_fire_array = [ new Fire(this , fireImageSourceArray[2])]
    }


    fire(){
        const enemyBlueFire = new Fire(this , fireImageSourceArray[2]);
        this.enemy_blue_fire_array.push(enemyBlueFire);
    }
}

const EnemyPurple1 = new EnemyPurple();
const EnemyPink1 = new EnemyPink();
const EnemyBlue1 = new EnemyBlue();

function handleEnemy(){
    EnemyPurple1.draw();
    EnemyPurple1.update();
    EnemyPurple1.handleJumping();
    EnemyPink1.draw();
    EnemyPink1.update();
    EnemyPink1.beDisappear();
    EnemyBlue1.draw();
    EnemyBlue1.update();
}

// Tower 

const TowerImage = new Image();
const TowerImageArray = [
    "images/tower/tower1updated.png" , 
    "images/Tower/tower2.png"
];
TowerImage.src = TowerImageArray[level - 1];
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

const tower = new Tower();

function handleTower(){
    tower.update();
    tower.draw();
}
// background 
const backgroundArray = [
    "images/background/game_background_1.png" , 
    "images/background/game_background_4.png"
]

const backgroundImage = new Image();
function handleBackground(){
    if(level == 1){
        backgroundImage.src = backgroundArray[level - 1];
        ctx.drawImage(backgroundImage , 0 , 0 , canvas.width , canvas.height);
    }
}

function animate(){
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    handleBackground();
    handlePlayer();
    handleTower();
    handleFire();
    handleEnemy();
    gameFrame++;
    requestAnimationFrame(animate); /* 
    fps e göre çalışır 
    60 fps de saniyede 60 kere  */
}

animate();