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
console.log(playerImage.width);
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
console.log("playerWidth " + player.width);
function handlePlayer(){
    player.update();
    player.draw();
}
// Fire 

const fireImage = new Image();
const fireImageSourceArray = [
    "images/Fire/fireballblue" ,
    "images/Fire/fireballpink" ,
    "images/Fire/fireballred"
];

class Fire{
    constructor(player){
        this.x = player.x + 128;
        this.y = player.y;
        this.radius = 35;
        this.speed = 5;
        this.color = "";
        this.distance;
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
    }
}


// Enemy 
const enemyImage = new Image();
const enemyImageArray = [
    "images/character/enemy1updated.png" , 
    "images/character/enemy2updated.png" , 
    "images/character/enemy3updated.png"
]

enemyImage.src = enemyImageArray[level - 1];
class Enemy{
    constructor(){
        this.x = canvas.width + 100;
        this.y = player.y;
        this.radius = 35;
        this.speed = 1;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.style;
        this.spriteWidth = 128;
        this.spriteHeight = 103;
    }

    update(){
        this.x -= this.speed;
        console.log(this.x);

        if(false){
            this.destroy();
        }
    }

    draw(){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.radius , 0 , Math.PI * 2);
        ctx.fill();
        ctx.drawImage(enemyImage , this.frameX * this.spriteWidth 
            , this.frameX * this.spriteHeight , this.spriteWidth , this.spriteHeight ,
            this.x - 65, this.y - 50, this.spriteWidth , this.spriteHeight );
    }

}

class EnemyPurple extends Enemy{

    constructor(){
        super();
        this.atlama_Sayisi = 1;
    }

    

    jump(){

    }
}

const enemy = new Enemy();

function handleEnemy(){
    enemy.draw();
    enemy.update();
}

// Tower 

const TowerImage = new Image();
const TowerImageArray = [
    "images/tower/tower1updated.png" , 
    "images/Tower/tower2.png"
];
TowerImage.src = TowerImageArray[level - 1];
console.log( TowerImage.naturalWidth + " " + TowerImage.height);
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
    handleEnemy();
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();