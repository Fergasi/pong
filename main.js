let randoCounter = false;

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

// Get game area element
const gameArea =  document.querySelector('.game-area');

// Get score elements
let playerScore = document.querySelector('#Player-1');
let computerScore = document.querySelector('#Computer');

// Variables to store the ball's x-position, y-position, x-velocity, and y-velocity
let ballXPosition = (visualViewport.width * 0.65)/2;
let ballYPosition = (visualViewport.height * 0.5)/2;
let ballXVelocity = 8;
let ballYVelocity = 5;

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 4;

//Variables for player paddle
let playerPaddleYPosition = 0;
let playerPaddleYVelocity = 20;

// Player score counter variables
playerScoreCount = 0;
computerScoreCount = 0;

//Event listener for player up and down movement
document.addEventListener('keydown', function(e) {
    if (e.key == 'ArrowUp') {
       if (playerPaddleYPosition >= 20){
           playerPaddleYPosition = playerPaddleYPosition - playerPaddleYVelocity;
        } else if (playerPaddleYPosition < 20 && playerPaddleYPosition > 0){
            playerPaddleYPosition = playerPaddleYPosition - playerPaddleYPosition;
        }
    }
    if (e.key == 'ArrowDown') {
        if (playerPaddleYPosition <= (visualViewport.height * 0.5) - PADDLE_HEIGHT - playerPaddleYVelocity){
        playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity;
    } else if (playerPaddleYPosition > (visualViewport.height * 0.5) - PADDLE_HEIGHT - playerPaddleYVelocity && playerPaddleYPosition < (visualViewport.height * 0.5)){
        playerPaddleYPosition = playerPaddleYPosition + ((visualViewport.height * 0.5) - playerPaddleYPosition - 100);
    }
    }
})

// Update the pong world
function update() {

    // Apply the y-position for player paddle 
    playerPaddle.style.top = `${playerPaddleYPosition}px`;

    // Update the computer paddle's position
    if (ballYPosition >= 40 && ballYPosition <= (visualViewport.height * 0.5) - 60){
        computerPaddleYPosition = ballYPosition - 40;
    } else if (ballYPosition < 40){
        computerPaddleYPosition = 0;
    } else if (ballYPosition > (visualViewport.height * 0.5) - 60){
        computerPaddleYPosition = (visualViewport.height * 0.5) - 100;
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
    ball.style.right = `${ballXPosition}px`

    // Apply the y-position
    ball.style.top = `${ballYPosition}px`
    ball.style.bottom = `${ballYPosition}px`

    // bounce off top and bottom  
    if (ballYPosition <= 0 || ballYPosition >= (visualViewport.height * 0.5) - 20){
       ballYVelocity = ballYVelocity * -1;
    }

    // Reset ball in center after goal, with 2 second delay to restart
    if (ballXPosition < 0 || ballXPosition > (visualViewport.width * 0.65)){
       setTimeout(() => {ballXPosition = (visualViewport.width * 0.65)/2; ballYPosition = (visualViewport.height * 0.5)/2;}, 2000);
    }

    // make ball bounce off computer paddle
    if ((ballXPosition + 20) >= (visualViewport.width * 0.65) - 20 && (ballXPosition + 20) < (visualViewport.width * 0.65) && ballYPosition > (computerPaddleYPosition - 19) && (ballYPosition < computerPaddleYPosition + 100)){
        ballXVelocity = ballXVelocity * -1;
    }

    // make ball bounce off player paddle
    if (ballXPosition < 20 && ballXPosition > 0 && ballYPosition > playerPaddleYPosition - 19 && ballYPosition < playerPaddleYPosition + 100){
        ballXVelocity = ballXVelocity * -1;
    }

    // Update computer score and change score text dom
    if (ballXPosition < 0 && randoCounter === false){
        randoCounter = true;
        computerScoreCount += 1;
        computerScore.innerText = `Computer: ${computerScoreCount}`;
        setTimeout(() => {randoCounter = false;}, 2000);
    }

    // Update player score and change score text dom
    if (ballXPosition > visualViewport.width * 0.65 && randoCounter === false){
        randoCounter = true;
        playerScoreCount += 1;
        playerScore.innerText = `Player: ${playerScoreCount}`;
        setTimeout(() => {randoCounter = false;}, 2000);
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

