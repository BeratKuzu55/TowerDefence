//import Player from "./player";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 550;

let gameFrame = 0;
let gameSpeed = 1;
let GameOver = false;
var level = 1;

let lastTime = 0;
let deltaTime = 0;

let playerFireAnimationRun = false;
/*  
window.addEventListener('keydown',this.check,false);

function check(e) {
    alert(e.keyCode);
}
*/

// Tower 

const TowerImage = new Image();
const TowerImageArray = [
    "images/tower/tower1updated.png",
    "images/Tower/tower2.png",
    "images/tower/tower1updated.png",
    "images/tower/tower1updated.png",
];
TowerImage.src = TowerImageArray[level - 1];

const tower = new Tower();

ctx.font = "40px War-Heroes";


function handleText() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(`Tower:${tower.health.toString()}`, 20, 50);
    ctx.fillText(`Level:${level}`, canvas.width / 2 - 50, 50);
    ctx.fillText(`Fire: ****`, 20, 100);
}

function handleTower() {
    tower.update();
    tower.draw();
}

//Player
const playerImage = new Image();
playerImage.src = "images/character/Player.png";
const player = new Player();
function handlePlayer(willAnimationRun) {
    player.update();
    player.draw(willAnimationRun);
}

// Fire 
const fireImageSourceArray = [
    "images/Fire/fireballblue.png",
    "images/Fire/fireballpink.png",
    "images/Fire/fireballred.png",
    "images/Fire/fireballredopposit.png",
    "images/Fire/fireballredopposit2.png",
    "images/Fire/fireballblueSingle.png"
];

const fire1 = new Fire(player, fireImageSourceArray[4], true);

const fireArray = [new Fire(player, fireImageSourceArray[4], true)];
var create_fire = false;
window.addEventListener("keydown", function (event) {
    console.log("keydown has worked");
    if (event.key == "w") {
        console.log("W was pressed");
        if (player.fire_count != 0) {
            console.log("merhaba");
            create_fire = true;
            const fire2 = new Fire(player, fireImageSourceArray[4], true);
            fireArray.push(fire2);
            player.fire_count--;
            playerFireAnimationRun = true;
        }
    }
});


canvas.addEventListener("click", function (event) {

    console.log("canvas was clicked");

});



function handleFire() {
    if (create_fire) {
        for (var i = 0; i < fireArray.length; i++) {
            fireArray[i].draw();
            fireArray[i].update();

            if (fireArray[i].x > 950) {
                fireArray.splice(i, 1);
            }
        }
    }

}

// Enemy 

const enemyImageArray = [
    "images/character/enemy1updated.png",
    "images/character/enemy2updated.png",
    "images/character/enemy3updated.png",
    "images/character/enemy2changedOpacity.png"
]

var enemyArray = [];
var enemyPurpleArray = [new EnemyPurple(level)];
var enemyYellowArray = [new EnemyYellow()];
var enemyBlueArray= [new EnemyBlue()]
var is_created_level_enemies = false;


//const EnemyPurple1 = new EnemyPurple(level);
const EnemyPink1 = new EnemyYellow();
const EnemyBlue1 = new EnemyBlue();
EnemyBlue1.fire();

function handeEnemyDamage() { 
    handlePurpleEnemyDamage();
}

function handlePurpleEnemyDamage(){
    for(var i = 0; i < enemyPurpleArray.length; i++){
        for(var j= 0; j < fireArray.length; j++){
         if(enemyPurpleArray[i].x - 10 <= fireArray[j].x && enemyPurpleArray[i].x > fireArray[j].x && !fireArray[j].damageOccurred){
            enemyPurpleArray[i].healt = enemyPurpleArray[i].healt - 50;
            console.log("enemy purple healt:" + enemyPurpleArray[i].healt);
            fireArray.slice(j , 1); 
            fireArray[j].damageOccurred = true;

            if(enemyPurpleArray[i].healt <= 0){
                enemyPurpleArray[i].destroy();
            }
         }
        }
     }
}

// background 
const backgroundArray = [
    "images/background/game_background_1.png",
    "images/background/game_background_4.png"
]

const backgroundImage = new Image();
function handleBackground() {
    if (true) {
        backgroundImage.src = backgroundArray[level - 1];
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }
}


function handleEnemy() {
    if (gameFrame % (1000 / Math.ceil(level/3)) == 0 && !is_created_level_enemies && gameFrame > 100) {
        const newEnemyPurple = new EnemyPurple();
        enemyPurpleArray.push(newEnemyPurple);
        enemyArray.push(newEnemyPurple);
    }

    // if (enemyPurpleArray.length == level * 7) {
    //     is_created_level_enemies = true;
    // }

    if(level > 0 && gameFrame % (700 / Math.ceil(level/3)) == 0 && ! is_created_level_enemies && gameFrame > 2650){
        const newEnemeyYellow = new EnemyYellow();
        enemyYellowArray.push(newEnemeyYellow);
        enemyArray.push(newEnemeyYellow)
    }

    if(level > 0 && gameFrame % (800 / Math.ceil(level/3)) == 0 && ! is_created_level_enemies && gameFrame > 150){
        const newEnemyBlue = new EnemyBlue();
        enemyBlueArray.push(newEnemyBlue);
        enemyArray.push(newEnemyBlue);
    }


    for (var i = 0; i < enemyPurpleArray.length; i++) {
        enemyPurpleArray[i].draw();
        enemyPurpleArray[i].update();
        enemyPurpleArray[i].handleJumping();
    }

    for (var i = 0; i < enemyYellowArray.length; i++) {
        enemyYellowArray[i].draw();
        enemyYellowArray[i].update();
        enemyYellowArray[i].beDisappear();

    }

    for (var i = 0; i < enemyBlueArray.length; i++) {
        enemyBlueArray[i].draw();
        enemyBlueArray[i].update();
    }
}


function animate(timeStamp) {

    // deltaTime = timeStamp - lastTime;
    // lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    handlePlayer(playerFireAnimationRun);
    handleTower();
    handleFire();
    handleEnemy();
    handeEnemyDamage();
    EnemyBlue1.handleEnemyBlueFire();
    handleText();
    gameFrame += 1;
    requestAnimationFrame(animate); /* 
    fps e göre çalışır 
    60 fps de saniyede 60 kere  */
}

animate();