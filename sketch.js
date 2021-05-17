var PLAY = 1;
var END = 0;
var gameState = PLAY;
var flamingo, fImg;
//var FGimg, FgGroup;
var backP, backImg;
var rock, leopard, obstacleGroup;
var balloonGroup;
var rockImg, leopardImg;
var score = 0;
var restart, restartI, oops, oopsI;

function preload(){
  fImg = loadImage("download.png");
  backImg = loadImage("jungle Img.jpg");
  rockImg = loadImage("rock.png");
  bombImg = loadImage("bomb.png");
  balloonImg = loadImage("balloon.png");
  //FGimg = loadImage("floatingG.png");
  restartI = loadImage("replayB.png");
  oopsI = loadImage("oops.png");
}

function setup(){
  createCanvas(600,400);

  backP = createSprite(0,200,10,10);
  backP.addImage("back", backImg);
  backP.scale = 4;
  backP.x = backP.width /2;
  backP.velocityX = -2;

  flamingo = createSprite(50,300,10,10);
  flamingo.addImage("fl", fImg);
  flamingo.scale = 0.8;

  //200,350
  restart = createSprite(300,300,10,10);
  restart.addImage("re", restartI);
  restart.scale = 0.2;
  restart.visible = false;

  oops = createSprite(300, 100, 10, 10);
  oops.addImage("op", oopsI);
  oops.scale = 0.9;
  oops.visible = false;

  obstacleGroup = new Group();
  balloonGroup = new Group();
  //FgGroup = new Group();

  edges = createEdgeSprites();
}

function draw(){
  background(0);

  drawSprites();

  if(gameState === PLAY){

    //if(FgGroup.isTouching(flamingo)){
      //flamingo.velocityY = 0;
    //}

    flamingo.visible = true;

    //if(FgGroup.isTouching(flamingo)){
      //flamingo.collide(FgGroup);
    //}

    backP.velocityX = -2;

    if(balloonGroup.isTouching(flamingo)){
      score = score + 1;
    }

    if (backP.x < 0){
      backP.x = backP.width/2;
    }

    //232.2 
    if(keyDown('space') && flamingo.y === 232.2){
      flamingo.velocityY = -16;
    }else
    if(keyDown('space') && flamingo.y === 361.6){
      flamingo.velocityY = -16;
    }
   
    flamingo.velocityY = flamingo.velocityY + 0.6;

    flamingo.collide(edges[3]);

    if(balloonGroup.isTouching(flamingo)){
      balloonGroup.destroyEach();
    }

    textSize(20);
    fill("white");
    textStyle(BOLD);
    text("SCORE : " + score , 470, 20);

    if(obstacleGroup.isTouching(flamingo)){
      gameState = END;
    }
  }
  else if(gameState === END){

    flamingo.velocityY = 0;

    flamingo.visible = false;

    obstacleGroup.setLifetimeEach(0);
    balloonGroup.setLifetimeEach(0);
    //FgGroup.setLifetimeEach(0);

    obstacleGroup.setVelocityXEach(0);
    balloonGroup.setVelocityXEach(0);
    //FgGroup.setVelocityXEach(0);

    backP.velocityX = 0;

    oops.visible = true;
    restart.visible = true;

    textSize(30);
    textStyle(BOLD);
    fill("yellow");
    text("Final Score : " + score, 200,250);

    console.log(gameState);
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  obstacle();
  balloons();
  //floatingGround();

  console.log(flamingo.y);
}


function reset(){
  gameState = PLAY;

  oops.visible = false;
  restart.visible = false;

  obstacleGroup.destroyEach();
  balloonGroup.destroyEach();
  //FgGroup.destroyEach();

  score = 0;
}

function obstacle(){

  if (frameCount % 200 === 0) {
    var rand = Math.round(random(1,2));
    obstacles = createSprite(630,385,10,10);
        switch(rand){
            case 1: obstacles.addImage(rockImg);
            break;
            case 2: obstacles.addImage(bombImg);
            break;
            default: break;
        }
    obstacles.scale = 0.6;
    obstacles.velocityX = -3;
    
    obstacles.lifetime = 400;
    
    obstacleGroup.add(obstacles);
  }
}

function balloons(){

    if (World.frameCount % 270 === 0) {
      var balloon = createSprite(630,10,10,10);
      balloon.y = random(100,237);
      balloon.addImage("balloonz", balloonImg);
      balloon.scale = 0.5;
      balloon.velocityX = -3;
      
      balloon.lifetime = 400;
      
      balloon.depth = flamingo.depth;
      flamingo.depth = flamingo.depth + 1;
      
      balloonGroup.add(balloon);

    }
  
  }

//function floatingGround(){

  //if (World.frameCount % 250 === 0) {
    //var FG = createSprite(630,280,10,4);
    //FG.y = random(200,250);
    //FG.scale = random(0.2,0.6);
    //FG.addImage("FGz", FGimg);
    //FG.scale = 0.2;
    //FG.velocityX = -3;
    
    //FG.lifetime = 400;
    
    //FgGroup.add(FG);
  //}
//}
