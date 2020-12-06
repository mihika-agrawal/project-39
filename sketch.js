
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground,ground1;
var spawnBanana,spawnObstacles;
var score,survivalTime=0;
var gamestate, PLAY=1,END=0;
var monkey_stop;
var backgroundImg;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImg= loadImage("1.jpg");
}



function setup() {
   createCanvas(800,400);
 
  ground = createSprite(400,410,800,20);
 // ground.velocityX=-4;
 //ground.x = ground.width /2;
  //ground1=createSprite(350,380,80,20);
  //ground1.velocityX=-4;
  
 monkey=createSprite(380,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  foodGroup=createGroup();
  obstaclesGroup=createGroup();
  
  
 
 gamestate=1;
  
}


function draw() {
  background(backgroundImg)
  monkey.collide(ground);
  
  if(gamestate===PLAY){
  textSize=20;
  fill("black");
 // survivalTime=Math.ceil(getFrameRate()/60);
  text("Survival Time: "+survivalTime,360,100);
 text("Press space to jump and collect bananas!",290,50)
 text("Help monkey collect 24 bananas and avoid obstacles!",270,75)
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
  
  if(ground.x<200){
    ground.x=ground.width/2;
  }
  
  spawnBanana();
  spawnObstacles();
  
  if (monkey.isTouching(foodGroup)){
     foodGroup.destroyEach();
     survivalTime++;
}
  if(monkey.isTouching(obstaclesGroup) || survivalTime==24){
    gamestate= END;
  }
 }
  if ( gamestate===END){
    fill("black");
    textSize=20;
    text("Game Over",380,200);
    text ("Press R To Restart", 360,220);
    ground.velocityX=0;
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    survivalTime=0;
 }
  if (keyDown("r") && gamestate===END){
    gamestate= PLAY;
    
  }
  
    
  
  drawSprites()
}
function spawnBanana(){
  if(frameCount%100===0){
    banana=createSprite(800,200,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4
    banana.y=Math.round(random(120,200));
    banana.lifetime=500;
    foodGroup.add(banana);
  }
  
}
function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(800,380,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-4;
    obstacle.collide(ground);
   obstacle.lifetime=500;
   obstaclesGroup.add(obstacle);
  }
  
}






