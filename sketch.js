var bgImg, bg;
var player, player_running;
var ground;

var bananaGroup, bananaImg;
var obstaclesGroup, obstaclesImg;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var gameOver; 
var score = 0;

function preload(){
  bgImg = loadImage("jungle.jpg");
  playerRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  obstaclesImg = loadImage("stone.png"); 
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  bg=createSprite(0,0,800,400);
  bg.addImage(bgImg);
  bg.scale = 1.5;
  bg.x = bg.width/2;
  bg.velocityX = -4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",playerRunning);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x = ground.width/2;
  ground.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() { 
  background(0);
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 550,50);
  
  if(gameState === PLAY){
  
    if(bg.x<100){
     bg.x = bg.width/2;
    }
  
    if(bananaGroup.isTouching(player)){
      bananaGroup.destroyEach();
      player.scale += 0.05
      score = score + 2;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();  
 
    if(obstaclesGroup.isTouching(player)){ 
         gameState = END;
    }
  }
    else if(gameState === END){

    bg.velocityX = 0;
    player.visible = false;
    
    bananaGroup.destroyEach();
    obstaclesGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over", 300,220);
  }
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -4; 
    
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -(4 + 2*score/100); 
    obstacle.addImage(obstaclesImg);
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}