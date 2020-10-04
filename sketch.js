var PLAY = 1;
var END = 0;
var gameState = PLAY;
var death;
var space, spaceImage;
var spaceShip, spaceShipImage;
var alien, alien1, alien2, alien3, alien4, alien5, alien6, alien7;
var alienGroup, bulletGroup;
var bullet, bulletImage;
var gameOver,restart,restartImage, gameOverImage;
var score;

function preload() {
  spaceImage = loadImage("C space.jpg");
  spaceShipImage = loadImage("A my space ship.png");
  alien1 = loadImage("B alien.png");
  alien2 = loadImage("B alien1.png");
  alien3 = loadImage("B alien2.png");
  alien4 = loadImage("B alien3.png");
  alien5 = loadImage("B alien4.png");
  alien6 = loadImage("B alien5.png");
  alien7 = loadImage("B alien6.png");
  bulletImage = loadImage("D bullet.png");
  gameOverImage = loadImage("transparentHit(1).png");
  restartImage = loadImage("transparentHit.png");

}

function setup() {
createCanvas(600, 500);
  
  space = createSprite(300,250,10,10);
  space.addImage("space", spaceImage);
  space.scale = 0.3;

  death = createSprite(300,415,600,5);               
  death.shapeColor=("red");  

  spaceShip = createSprite(500,468,10,10);
  spaceShip.addImage("spaceship", spaceShipImage);
  spaceShip.scale = 0.23;
      
  gameOver = createSprite(290,200,10,10);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.scale = 0.35;
  
  restart = createSprite(290,280,10,10);
  restart.addImage("restart", restartImage);
  restart.scale = 0.37;
  
  alienGroup = new Group ();
  bulletGroup = new Group ();
  
  score = 0;
  
}

function draw() { 
  
  background("skyBlue");

  if (gameState===PLAY) {
    gameOver.visible = false; 
    restart.visible = false; 
 
    if(keyDown("space")){
     moveBullet();
    }
    
    spaceShip.x = World.mouseX;
    spawnAlien();
    
    if(alienGroup.isTouching(bulletGroup)) {
      alienGroup.destroyEach();
      bulletGroup.destroyEach();
      score = score+1;

    }
    
    if(alienGroup.isTouching(death)){
      gameState = END;
      
    }
    
   } else if (gameState===END) {
     gameOver.visible = true; 
     restart.visible = true; 
   
     alienGroup.setLifetimeEach(-1);
     alienGroup.setVelocityYEach(0);
     
     bulletGroup.setLifetimeEach(-1);
     bulletGroup.setVelocityYEach(0);
     
     if(mousePressedOver(restart)) {
       reset();

     }
     
  }

  drawSprites();
  
  fill("lime");
  textSize(30);
  text("Score: "+score, 220,50);
  
}

function reset() {
  gameState = PLAY;  
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  alienGroup.destroyEach();
  bulletGroup.destroyEach();

}

function moveBullet() {
  bullet = createSprite(500,420,10,10);
  bullet.addImage("bullet", bulletImage);
  bullet.scale = 0.1;
  bullet.velocityY = -(5+score/8);
  bullet.lifetime = 145;
  bullet.x = World.mouseX;
  bulletGroup.add(bullet);
  
}

function spawnAlien() {
  if(World.frameCount%50===0) {
    alien = createSprite(200,10,10,10);
    alien.scale = 0.3;
    
     sk = Math.round(random(1,7));
      if(sk === 1) {
        alien.addImage(alien1);
        
      } else if(sk === 2) {
        alien.addImage(alien2);
        
      } else if(sk === 3) {
        alien.addImage(alien3);
        
      } else if(sk === 4) {
        alien.addImage(alien4);
        
      } else if(sk === 5) {
        alien.addImage(alien5);
        
      } else if(sk === 6) {
        alien.addImage(alien6);
        
      } else if(sk === 7) {
        alien.addImage(alien7);
        
      }  
      
    alien.x = Math.round(random(10,590))
    alien.velocityY = (6+score/3);
    alien.lifetime = 80;
     
    alienGroup.add(alien);
    }
}


