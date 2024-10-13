const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// Visual layout
const bird = new Image();
const background = new Image();
const front = new Image();
const pipeUp = new Image();
const pipeDown = new Image ();

bird.src = 'assets/img/flappy-bird-smiley.png';
background.src = 'assets/img/background.jpg';
front.src = 'assets/img/mountains.png';
pipeUp.src = 'assets/img/flappy-bird-pipe-up.png';
pipeDown.src = 'assets/img/flappy-bird-pipe-down.png';

// Bird's position
const gap = 80;
let x = 20;
let y = canvas.height/2;
const gravitation = 1;
const jump = 30;

// Pipe's Array;
let pipes = [];
pipes[0] = {
    x: canvas.width,
    y: 0,
};

// Bird's position Up
document.addEventListener('keypress', (e) => {
    if(e.keyCode == 32 && y > 0 + bird.height / 2){ 
        y -= jump;
    }
});

function drawGame(){
    context.drawImage(background, 0, 0);

    for(let pipe of pipes){
        context.drawImage(pipeUp, pipe.x, pipe.y);
        context.drawImage(pipeDown, pipe.x, pipe.y + pipeUp.height + gap);

        // Animation movement on X
        --pipe.x;
        if(pipe.x == 480){ 
            pipes.push({ // adding next pipe
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height - pipeUp.height),
            });
        }
        
    };


    context.drawImage(front, 0, canvas.height - front.height + gap);
    context.drawImage(bird, x, y);

    y += gravitation;

    requestAnimationFrame(drawGame);
}

front.onload = drawGame;

