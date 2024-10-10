let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let bird = new Image();
let background = new Image();
let front = new Image();
let pipeUp = new Image();
let pipeDown = new Image ();

const gap = 50;

bird.src = 'assets/img/flappy-bird-smiley.png';
background.src = 'assets/img/background.jpg';
front.src = 'assets/img/mountains.png';
pipeUp.src = 'assets/img/flappy-bird-pipe-up.png';
pipeDown.src = 'assets/img/flappy-bird-pipe-down.png';



function drawGame(){
    context.drawImage(background, 0, 0);
    context.drawImage(pipeUp, canvas.width/4, 0);
    context.drawImage(pipeDown, canvas.width/4, pipeUp.height + gap);
    context.drawImage(front, 0, canvas.height - front.height + 80);
    context.drawImage(bird, 20, canvas.height/2);

}

front.onload = drawGame;
