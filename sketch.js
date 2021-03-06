//Assigning global variable
var PLAY = 1;
var end = 0;
var gamestate = 1;
var gameOver;
var knife, knifeImg;
var fruit, FruitGroup, fruit1, fruit2, fruit3, fruit4;
var enemyGroup, enemy1, enemy2;
var score;

function preload(){
//Loading all images
  knifeImg=loadImage("knife.png");
  fruit1 =loadImage("fruit1.png");
  fruit2 =loadImage("fruit2.png");
  fruit3 =loadImage("fruit3.png");
  fruit4 =loadImage("fruit4.png");
  enemy1 =loadImage("alien1.png");
  enemy2 = loadImage("alien2.png");
  gameOver = loadImage("gameover.png");
  
  gameOverSound = loadSound("gameover.mp3");
  slashingSound = loadSound("knifeSwoosh.mp3");
}

function setup(){
//Creating canvas
  createCanvas(600, 600);
//Creating Sword
  knife = createSprite(150, 300, 10, 10);
  knife.addImage("knife", knifeImg);
  knife.addImage("gameOver", gameOver);
  knife.scale=0.5;
//Creating the enemy and fruit group
  EnemyGroup = createGroup();
  FruitGroup = createGroup();
//Creating the score
  score = 0;
}

function draw(){
//Creating the background
  background(rgb(69, 177, 252));
//Displaying text
  fill("white");
  text("Score :"+score, 300, 40);
//Gamestate play  
  if (gamestate === PLAY){
    knife.y = World.mouseY;
    knife.x = World.mouseX; 
    
    if (knife.isTouching(FruitGroup)){
      FruitGroup.destroyEach();
      score = score+5;
      slashingSound.play();
    }
      
    if(knife.isTouching(EnemyGroup)){
      gamestate = end;
      gameOverSound.play();
    } 
    createFruitGroup();
    createEnemyGroup();
  }
  
  

//Gamestate end
  if (gamestate === end){
    FruitGroup.setVelocityXEach(0);
    EnemyGroup.setVelocityXEach(0);
    FruitGroup.setLifetimeEach(-1);
    EnemyGroup.setLifetimeEach(-1);
    knife.changeImage("gameOver");
    knife.x=300;
    knife.y=300;
    knife.scale=2;
    EnemyGroup.destroyEach();
  }
 
//Displaying sprites
  drawSprites();
}

//The fruit group
function createFruitGroup(){
  
  if (frameCount % 60 === 0){
    var fruit = createSprite(600,random(1,600),100,40);
    var side = Math.round(random(1,2));
    if (side===1){
    fruit.x=0;
    fruit.velocityX=(10+score/4);
    }
    else {
    fruit.x=600;
    fruit.velocityX=-(10+score/4);
    }
    
    fruit.scale = 0.2;
    var rand = Math.round(random(1,4));
    
    switch(rand) {
      case 1: fruit.addImage(fruit1);
      break;
      case 2: fruit.addImage(fruit2);
      break;
      case 3: fruit.addImage(fruit3);
      break;
      case 4: fruit.addImage(fruit4);
      break;
      default: break;
    }
    
    FruitGroup.add(fruit);
  }
}

//The enemy group
function createEnemyGroup(){
  
  if (frameCount % 150 === 0){
    var enemy = createSprite(600,random(1,600),100,40);
    var side = Math.round(random(1,2));
    if (side===1){
    enemy.x=0;
    enemy.velocityX=(12+score/10);
    }
    else {
    enemy.x=600;
    enemy.velocityX=-(7+score/10);
    }
    
    var rand = Math.round(random(1,2));
    
    switch(rand) {
      case 1: enemy.addImage(enemy1);
      break;
      case 2: enemy.addImage(enemy2);
      break;       
      default: break;
    }
    
    EnemyGroup.add(enemy);
  }
}
