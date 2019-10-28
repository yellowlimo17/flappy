var cnvs = document.getElementById("canvas");
var contx = cnvs.getContext('2d');

//Vaiables
var bat = {
    imageUp: new Image(),
    imageDown: new Image(),
    velocity: 0,
    velocityJump: -15,
    velocityMax: -3,
    x: 10,
    y: 150,
    batUp: true,
    scale: 1, 
    rotation: 0
};

var bg = {
    far1: new Image(),
    far1x: 0,
    middle1: new Image(),
    middle1x: 0,
    close1: new Image(),
    close1x: 0,
    far2: new Image(),
    far2x: 512,
    middle2: new Image(),
    middle2x: 512,
    close2: new Image(),
    close2x: 512
}

var ground = {
    one: new Image(),
    onex: 0,
    two: new Image(),
    twox: 512
};

var pipeNorth = new Image();
var pipeSouth = new Image();

var gap = 90;
var constant;
var gravity = 1.5;
var score = 0;
var gameInProgress = true;


var fly = new Audio();
var scor = new Audio();

var pipe = [];

pipe[0] = {
    x:cnvs.width,
    y:0
};

InstantiateVariables();

function InstantiateVariables()
{
    var pipe = [];

    pipe[0] = {
        x:cnvs.width,
        y:0
    };

    bat.velocity = 0;
    bat.x = 10;
    bat.y = 150;

    var score = 0;
}

//Load Images
bat.imageUp.src = "images/batUp.png";
bat.imageDown.src = "images/batDown.png";

bg.far1.src = "images/bgFar.png";
bg.middle1.src = "images/bgMiddle.png";
bg.close1.src = "images/bgClose.png";
bg.far2.src = "images/bgFar.png";
bg.middle2.src = "images/bgMiddle.png";
bg.close2.src = "images/bgClose.png";

ground.one.src = "images/ground.png";
ground.two.src = "images/ground.png";

pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// Load Audio Files
fly.src = "audio/fly.mp3";
scor.src = "audio/score.wav";


//Key Listener and Event
document.addEventListener("keydown", moveUp);
function moveUp(){
    if(gameInProgress){
        bat.velocity = bat.velocityJump;
        fly.currentTime = 0;
        fly.play(); 
    }
    else {
        gameInProgress = true;
        GameLoop();
        bat.velocity = bat.velocityJump;
        fly.currentTime = 0;
        fly.play(); 
    }
}

//CallGame();
GameLoop();

function CallGame(){
    if(!gameInProgress)
    {
        InstantiateVariables();
    }
    else{
        GameLoop();
    }
}

function GameLoop(){
    // while(gameInProgress)
    // {
        Update();
        Draw(); 
        //if(!gameInProgress) break;
    //}
    //CallGame();
    requestAnimationFrame(GameLoop);
}


function Update(){
    UpdateBG();
    UpdateFG();
    UpdateBatRotation();
    UpdateBatAnimation();
    UpdatePipes();
    UpdateCollision();
    UpdateBat();
}

function Draw(){
    DrawBG();
    DrawPipes();
    DrawBat();
    DrawFG();
    DrawScore();
}

//Update Functions
function UpdateBG(){
    bg.far1x -= .2;
    bg.far2x -= .2;
    bg.middle1x -= .4;
    bg.middle2x -= .4;
    bg.close1x --;
    bg.close2x --;
    if(bg.far1x <= -512) bg.far1x = 511;
    if(bg.far2x <= -512) bg.far2x = 511;
    if(bg.middle1x <= -512) bg.middle1x = 511;
    if(bg.middle2x <= -512) bg.middle2x = 511;
    if(bg.close1x <= -512) bg.close1x = 511;
    if(bg.close2x <= -512) bg.close2x = 511;
}

function UpdateFG(){
    ground.onex--;
    ground.twox--;
    if(ground.onex <= -512) ground.onex = 511;
    if(ground.twox <= -512) ground.twox = 511;
}

function UpdateBatRotation(){
    
}

function UpdateBatAnimation(){
    if(bat.velocity < 0) batUp = false;
    else batUp = true;
    bat
}

function UpdatePipes(){
    for(var i = 0; i< pipe.length; i++)
    {
        constant = pipeNorth.height + gap;
        pipe[i].x--;

        if(pipe[i].x==100)
        {
            pipe.push({
                x : cnvs.width,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                });
        }

        if(pipe[i].x == 5)
        {
            score++;
            scor.play();
        }
    }
}

function UpdateCollision(){
    for(var i = 0; i< pipe.length; i++)
    {
        //Checks For Fail Status
        if( bat.x + 40 >= pipe[i].x && bat.x <= pipe[i].x + pipeNorth.width && (bat.y <= pipe[i].y + pipeNorth.height || bat.y + 40 >= pipe[i].y+constant) || bat.y + 40 >=  cnvs.height - ground.one.height){
                //gameInProgress = false;
                location.reload();
        }
    }
}

function UpdateBat(){
    bat.velocity *= .7;
    bat.y += bat.velocity;
    bat.y += gravity;
}

function DrawScore(){
    contx.fillStyle = "#000";
    contx.font = "20px Veranda";
    contx.fillText("Score: " + score, 10, cnvs.height - 20);
}


//Draw Functions
function DrawBG(){
    contx.drawImage(bg.far1, bg.far1x, 0);
    contx.drawImage(bg.far2, bg.far2x, 0);
    contx.drawImage(bg.middle1, bg.middle1x, 0);
    contx.drawImage(bg.middle2, bg.middle2x, 0);
    contx.drawImage(bg.close1, bg.close1x, 0);
    contx.drawImage(bg.close2, bg.close2x, 0);
}

function DrawPipes(){
    for(var i = 0; i < pipe.length; i++)
    {
        constant = pipeNorth.height + gap;
        contx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        contx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
    }
}

function DrawBat(){
    // if(bat.batUp) drawSprite(bat.imageUp, bat.scale, bat.rotation);
    // else drawSprite(bat.imageDown, bat.scale, bat.rotation);
    contx.drawImage(bat.imageUp, bat.x, bat.y);
}

function DrawFG(){
    contx.drawImage(ground.one, ground.onex, cnvs.height - ground.one.height);
    contx.drawImage(ground.two, ground.twox, cnvs.height - ground.two.height);
}








//Useability Functions

//x and y are the top corner of the image
function drawSprite(image, x, y, scale, rotation){
    contx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    contx.rotate(rotation);
    contx.drawImage(image, -image.width / 2, -image.height / 2);
} 

