const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Visual layout
const background = new Image();
const pipeUp = new Image();
const pipeDown = new Image();
const bird = new Image();
const birdAngry = new Image();
const ground = new Image();


background.src = 'assets/img/background.jpg';
pipeUp.src = 'assets/img/flappy-bird-pipe-up.png';
pipeDown.src = 'assets/img/flappy-bird-pipe-down.png';
bird.src = 'assets/img/flappy-bird-smiley.png';
birdAngry.src = 'assets/img/flappy-bird-angry.png';
ground.src = 'assets/img/mountains.png';



// Bird's position
const gap = 90;
let xPos = 100;
let yPos = canvas.height / 2;
let acceleration = 1;

let gravitation = .01;
const jump = 35;
let gameOver = false;
let score = 0;

// Pipe's Array;
let pipes = [];
pipes[0] = {
    x: 490,
    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
};

// Bird's position Up
document.addEventListener('keydown', (e) => {
    if(e.code === 'Space' && yPos > 0 + bird.height / 2 && !gameOver){ 
        yPos -= jump;
        gravitation = .05;
    }
});

function drawGame(){
    if(gameOver) {
        return;
    }

    context.drawImage(background, 0, 0);
    context.drawImage(ground, 0, canvas.height - ground.height + 60);  

    for(let pipe of pipes){
        context.drawImage(pipeUp, pipe.x, pipe.y);
        context.drawImage(pipeDown, pipe.x, pipe.y + pipeUp.height + gap);
        

        // Moving the pipe to the left
        pipe.x -= acceleration;

        // Adding a new pipe
        if(pipe.x === 400){ 
            pipes.push({ // adding next pipe
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
            });
        }

        // Score
        if(pipe.x === 75){
            ++score;
        }


        // Checking the collision with ground and pipes
        if(
            yPos + bird.height >= (canvas.height - 60) ||
            xPos + bird.width >= pipe.x && xPos <= pipe.x + pipeUp.width && 
            (yPos <= pipe.y + pipeUp.height || yPos + bird.height >= pipe.y + pipeUp.height + gap)
        ) {
            console.log('Collision with ground or pipes detected! Reloading...');
            bird.src = birdAngry.src;
            gameOver = true;
            gameOverAnimation();
            return;
        }
    }

    context.drawImage(bird, xPos, yPos);
    context.drawImage(ground, 0, canvas.height - ground.height + 60);   

    yPos += gravitation;
    gravitation = Math.min(gravitation + 0.05, 2); 

    context.fillStyle = "#000";
    context.font = "24px Verdana";
    context.fillText(`Score: ${score}`, 5, 25);

    requestAnimationFrame(drawGame);
}

ground.onload = drawGame;

function gameOverAnimation(){
    context.clearRect(0,0, canvas.width, canvas.height);
    context.drawImage(background, 0, 0);

    for(let pipe of pipes){
        context.drawImage(pipeUp, pipe.x, pipe.y);
        context.drawImage(pipeDown, pipe.x, pipe.y + pipeUp.height + gap);
    }
    
    context.drawImage(ground, 0, canvas.height - ground.height + 60);
    context.drawImage(bird, xPos, yPos++);
    context.fillStyle = "#000";
    context.font = "24px Verdana";
    context.fillText(`Score: ${score}`, 5, 25);
    requestAnimationFrame(gameOverAnimation);
}

