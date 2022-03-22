// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;

// Get the computer paddle element
const computerPaddle = document.querySelector('.computer-paddle');

// left paddle element
const playerPaddle = document.querySelector('.player-paddle');

// Get ball element
const ball = document.querySelector('.ball');

// Get score elements
let playerScore = document.querySelector('#Player-1');
let computerScore = document.querySelector('#Computer');

// Variables to store the ball's x-position, y-position, x-velocity, and y-velocity
let ballXPosition = 50;
let ballYPosition = 50;
let ballXVelocity = 5;
let ballYVelocity = 5;

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 4;

//Variables for player paddle
let playerPaddleYPosition = 0;
let playerPaddleYVelocity = 25;

// Player score counter variables
playerScoreCount = 0;
computerScoreCount = 0;

//Event listener for player up and down movement
document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowUp') {
       if (playerPaddleYPosition >= 1){
           playerPaddleYPosition = playerPaddleYPosition- playerPaddleYVelocity;
        }
    } else if (e.key == 'ArrowDown') {
        if (playerPaddleYPosition <= 380){
        playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity;
    }
    }
})

// Update the pong world
function update() {

    // Apply the y-position for player paddle 
    playerPaddle.style.top = `${playerPaddleYPosition}px`;

    // Update the computer paddle's position
    if (ballYPosition >= 0 && ballYPosition <= 400){
        computerPaddleYPosition = ballYPosition;
    } 
    
    // Apply the y-position 
    computerPaddle.style.top = `${computerPaddleYPosition}px`;
    computerPaddle.style.bottom = `${computerPaddleYPosition + 100}px`;
    
    // Update the ball's x-position 
    ballXPosition = ballXPosition + ballXVelocity;

    // Update the ball's y-position
    ballYPosition = ballYPosition + ballYVelocity;

    // Apply the x-position
    ball.style.left = `${ballXPosition}px`
    ball.style.right = `${ballXPosition + 20}px`

    // Apply the y-position
    ball.style.top = `${ballYPosition}px`
    ball.style.bottom = `${ballYPosition + 20}px`

    // bounce off top and bottom  
    if (ballYPosition <= 0 || ballYPosition >= 480){
       ballYVelocity = ballYVelocity * -1
    }

    // Reset ball in center after goal, with 2 second delay to restart
    if (ballXPosition < 0 || ballXPosition > 680){
       setTimeout(() => {ballXPosition = 350; ballYPosition = 250;}, 2000);
    }

    // make ball bounce off computer paddle
    if ((ballXPosition + 20) === 680 && ballYPosition > (computerPaddleYPosition - 19) && (ballYPosition < computerPaddleYPosition + 100)){
        ballXVelocity = ballXVelocity * -1;
    }

    // make ball bounce off player paddle
    if (ballXPosition === 20 && ballYPosition > playerPaddleYPosition && (ballYPosition < playerPaddleYPosition + 100)){
        ballXVelocity = ballXVelocity * -1;
    }

    // Update computer score and change score text dom
    if (ballXPosition === 0){
        computerScoreCount += 1;
        computerScore.innerText = `Computer: ${computerScoreCount}`;
    }

    // Update player score and change score text dom
    if (ballXPosition === 700){
        playerScoreCount += 1;
        playerScore.innerText = `Player: ${playerScoreCount}`;
    }

    // ** STUFF I WAS TOO AMBITIOUS ABOUT **
    
    // // make computer paddle bounce off top and bottom
    // if (computerPaddleYPosition < 0 || computerPaddleYPosition > 400){
    //     computerPaddleYVelocity = computerPaddleYVelocity * -1;
    // }
    
    // // make ball bounce off top of player paddle
    // if (ballXPosition < 20 && ballXPosition > 0 && ballYPosition > (playerPaddleYPosition - 20) && ballYPosition <= playerPaddleYPosition){
    //     ballYVelocity = ballYVelocity * -1;
    // }

    // // make ball bounce off bottom of player paddle
    // if (ballXPosition < 20 && ballXPosition > 0 && ballYPosition >= (playerPaddleYPosition + 100) && ballYPosition < (playerPaddleYPosition + 120)){
    //     ballYVelocity = ballYVelocity * -1;
    // }

    // // make ball bounce off top of computer paddle
    // if ((ballXPosition + 20) > 680 && (ballXPosition + 20) < 700 &&ballYPosition === computerPaddleYPosition && (ballYPosition < computerPaddleYPosition + 100)){
    //     ballYVelocity = ballYVelocity * -1;
    // }

    // // make ball bounce off bottom of computer paddle
    // if ((ballXPosition + 20) > 680 && (ballXPosition + 20) < 700 && ballYPosition === (computerPaddleYPosition + 100)){
    //     ballYVelocity = ballYVelocity * -1;
    // }

}

// Call the update() function every 30ms
setInterval(update, 30);
