//Draw Images to Canvas Contunially
var cnvs = document.getElementById("canvas");
var contx = cnvs.getContext('2d');

//Load Images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

bird.scale = 150;


//Variables
var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0



//Audio Files
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";



//on key down
document.addEventListener("keydown", moveUp);
function moveUp(){
    bY -= 25;
    fly.play();
}

var pipe = [];

pipe[0] = {
    x:cnvs.width,
    y:0
};

function draw()
{

    contx.drawImage(bg,0,0);

   



    //Pipe Update
    for(var i = 0; i< pipe.length; i++)
    {
        constant = pipeNorth.height + gap;
        contx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        contx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        pipe[i].x--;
        if(pipe[i].x==125)
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

        //GAME OVER CONDITIONS
        // if(bX + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cnvs.height - fg.height){
        //     location.reload();
        // }

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cnvs.height - fg.height){
            location.reload(); // reload the page
        }

    }

contx.drawImage(fg, 0, cnvs.height - fg.height);

    contx.drawImage(bird, bX, bY);

    contx.fillStyle = "#000";
    contx.font = "20px Veranda";
    contx.fillText("Score: " + score, 10, cnvs.height - 20);


    bY += gravity;

    


    //This loops the draw function infinitally
    requestAnimationFrame(draw);
}

draw();