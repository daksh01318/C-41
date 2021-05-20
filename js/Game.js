class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1=createSprite(100,200);
    car1.addImage('car1',car1_img)

    car2=createSprite(300,200);
    car2.addImage('car2',car2_img)

    car3=createSprite(500,200);
    car3.addImage('car3',car3_img)

    car4=createSprite(700,200);
    car4.addImage('car4',car4_img)

    cars=[car1,car2,car3,car4] 
  }

  play(){
    form.hide();

    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);38


     //index of the array 
     var index=0;
     var x=200;
     var y;
      for(var plr in allPlayers){
        index=index+1;
        x=200+(index*200)+allPlayers[plr].xPos;
        y=displayHeight-allPlayers[plr].distance;
        cars[index-1].x=x;
        cars[index-1].y=y;
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+75);
        if(index===player.index){
            cars[index-1].shapeColor="black";
            camera.position.x=displayWidth/2;
            camera.position.y=cars[index-1].y;
        }
        else{
          cars[index-1].shapeColor="orange";
        }
      }
    }

    if(player.distance<2000){
    if(keyIsDown(38)&& player.index !== null){
      yvel+=0.9;
      if(keyIsDown(37)){
        xvel-=0.2;
      }
      if (keyIsDown(39)) {
        xvel+=0.2;
        }
      }
      else if(keyIsDown(38) && yvel>0 && player.index!==null){
        yvel-=0.1;
        xvel*=0.9;
      }
      else{
        yvel*=0.985;
        xvel*=0.985;
      }
    }
    //move the car 
    player.distance+=yvel;
    yvel*=0.985;
    player.xPos+=xvel;
    xvel*=0.985;
    player.update();



    drawSprites();
  }
}