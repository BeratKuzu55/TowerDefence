//import Player from "./player";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 550;

let gameFrame = 0;
let gameSpeed = 1;
let GameOver = false;
var level = 1;

/*  
window.addEventListener('keydown',this.check,false);

function check(e) {
    alert(e.keyCode);
}
*/

// Tower 

const TowerImage = new Image();
const TowerImageArray = [
    "images/tower/tower1updated.png" , 
    "images/Tower/tower2.png",
    "images/tower/tower1updated.png" ,
    "images/tower/tower1updated.png" ,
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
const tower = new Tower();

ctx.font = "40px War-Heroes";


function handleText(){
    ctx.fillStyle = "#D59100";
    ctx.fillText(`Tower:${tower.health.toString()}` , 20 , 50);
    ctx.fillText(`Level:${level}` , canvas.width/2 - 50 , 50);
    ctx.fillText(`Fire: ****` , 20 , 100);
}

function handleTower(){
    tower.update();
    tower.draw();
}

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
       this.point = 0;
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
    "images/Fire/fireballredopposit2.png" , 
    "images/Fire/fireballblueSingle.png"
];

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
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        if(this.direction){
            ctx.drawImage( this.fireImage, this.frameX * this.spriteWidth 
                , this.frameX * this.spriteHeight , this.spriteWidth , this.spriteHeight ,
                this.x - 80 , this.y - 23, this.spriteWidth , this.spriteHeight);
        }
        else {
            ctx.drawImage( this.fireImage, this.frameX * this.spriteWidth 
                , this.frameX * this.spriteHeight , this.spriteWidth , this.spriteHeight ,
                this.x - 25 , this.y - 30, this.spriteWidth , this.spriteHeight);
        }
        
    }
}

const fire1 = new Fire(player , fireImageSourceArray[4] ,true);

const fireArray = [new Fire(player , fireImageSourceArray[4] , true)];
var create_fire = false;
window.addEventListener("keydown" , function(event){
    console.log("keydown has worked");
    if(event.key == "w"){
        console.log("W was pressed");
        if(player.fire_count != 0){
            console.log("merhaba");
            create_fire = true;
            const fire2 = new Fire(player , fireImageSourceArray[4] , true);
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

//const enemy = new Enemy();

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

class EnemyYellow extends Enemy{
    constructor(){
        super(enemyImageArray[1] , 1.5 , "yellow");
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
        super(enemyImageArray[2] , 2 , "blue");
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

//const EnemyPurple1 = new EnemyPurple(level);
const EnemyPink1 = new EnemyYellow();
const EnemyBlue1 = new EnemyBlue();
EnemyBlue1.fire();



// background 
const backgroundArray = [
    "images/background/game_background_1.png" , 
    "images/background/game_background_4.png"
]

const backgroundImage = new Image();
function handleBackground(){
    if(true){
        backgroundImage.src = backgroundArray[1];
        ctx.drawImage(backgroundImage , 0 , 0 , canvas.width , canvas.height);
    }
}

var enemyPurpleArray = [new EnemyPurple(level)];

var is_created_level_enemies = false;

function create_level_enemies(){
    if(level == 1){

        if(gameFrame % (200 + 30*level) == 0 && !is_created_level_enemies && gameFrame != 0){
            console.log("create_level_enemies");
            enemyPurpleArray.push(new EnemyPurple(level));
        }
        
        if(enemyPurpleArray.length == level * 5){
            is_created_level_enemies = true;
        }
    }

    
    for(var i = 0; i<enemyPurpleArray.length; i++){
        enemyPurpleArray[i].draw();
        enemyPurpleArray[i].update();
        enemyPurpleArray[i].handleJumping();
    }
}

function handleEnemy(){
    EnemyPink1.draw();
    EnemyPink1.update();
    EnemyPink1.beDisappear();
    EnemyBlue1.draw();
    EnemyBlue1.update();
}


function animate(){
    ctx.clearRect(0 , 0 , canvas.width , canvas.height);
    handleBackground();
    handlePlayer();
    handleTower();
    handleFire();
    handleEnemy();
    create_level_enemies();
    EnemyBlue1.handleEnemyBlueFire();
    handleText();
    gameFrame++;
    requestAnimationFrame(animate); /* 
    fps e göre çalışır 
    60 fps de saniyede 60 kere  */
}

animate();