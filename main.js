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

// Get ball speed input
let ballSpeed = document.querySelectorAll('#ballSpeed input')

// Get score elements
let playerScore = document.querySelector('#Player-1');
let computerScore = document.querySelector('#Computer');

// Player score counter variables
playerScoreCount = 0;
computerScoreCount = 0;

//Boolean to manage when scores are first detected
let scoreDetector = false;

// Variables to store the ball's x-position, y-position, x-velocity, and y-velocity
let ballXPosition = (visualViewport.width * 0.6)/2;
let ballYPosition = (visualViewport.height * 0.5)/2;
let ballXVelocity = 8;
let ballYVelocity = 5;

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
let computerPaddleYVelocity = 4;

//Variables for player paddle
let playerPaddleYPosition = 0;
let playerPaddleYVelocity = 30;

//Set ball speed for the game from user input + blink animation + delay before restart
ballSpeed.forEach(choice => {
    choice.addEventListener('click', function(){
        if (choice.checked && choice.id === "1"){
            ball.id = "blink_me";
            ballXPosition = (visualViewport.width * 0.6)/2; 
            ballYPosition = (visualViewport.height * 0.5)/2;
            ballXVelocity = 0;
            ballYVelocity = 0;
            setTimeout(() => {ballXVelocity = 4; ballYVelocity = 2.5; ball.id = '';}, 2000);
        } else if (choice.checked && choice.id === "2"){
            ball.id = "blink_me";
            ballXPosition = (visualViewport.width * 0.6)/2; 
            ballYPosition = (visualViewport.height * 0.5)/2;
            ballXVelocity = 0;
            ballYVelocity = 0;
            setTimeout(() => {ballXVelocity = 8; ballYVelocity = 5; ball.id = '';}, 2000);
        } else if (choice.checked && choice.id === "3"){
            ball.id = "blink_me";
            ballXPosition = (visualViewport.width * 0.6)/2; 
            ballYPosition = (visualViewport.height * 0.5)/2;
            ballXVelocity = 0;
            ballYVelocity = 0;
            setTimeout(() => {ballXVelocity = 12; ballYVelocity = 7.5; ball.id = '';}, 2000);
        } 
    })
})

//function to make checkbox selection only one of group, because radio tag was being interfered with by up & down arrow keys while playing
function getSelectItemThat(id) {
    for (var i = 1;i <= 3; i++)
    {
        document.getElementById(i).checked = false;
    }
    document.getElementById(id).checked = true;
}


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
    playerPaddle.style.bottom = `${playerPaddleYPosition + 100}px`;

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
    ball.style.right = `${ballXPosition + 20}px`

    // Apply the y-position
    ball.style.top = `${ballYPosition}px`
    ball.style.bottom = `${ballYPosition + 20}px`

    // Make ball bounce off top and bottom  
    if (ballYPosition <= 0 || ballYPosition >= (visualViewport.height * 0.5) - 20){
       ballYVelocity = ballYVelocity * -1;
    }

    // Reset ball in center after goal, with 2 second delay to restart
    if (ballXPosition < 0 || ballXPosition > (visualViewport.width * 0.6)){
       setTimeout(() => {ball.style.opacity = 0}, 100);
       setTimeout(() => {ball.style.opacity = 1; ballXPosition = (visualViewport.width * 0.6)/2; ballYPosition = (visualViewport.height * 0.5)/2}, 2000);
    }

    // make ball bounce off computer paddle
    if ((ballXPosition + 20) >= (visualViewport.width * 0.6) - 20 && (ballXPosition + 20) < (visualViewport.width * 0.6) && ballYPosition > (computerPaddleYPosition - 19) && (ballYPosition < computerPaddleYPosition + 100)){
        ballXVelocity = ballXVelocity * -1;
    }

    // make ball bounce off player paddle
    if (ballXPosition <= 20 && ballXPosition > 10 && ballYPosition + 20 > playerPaddleYPosition && ballYPosition < playerPaddleYPosition + 100){
        ballXVelocity = ballXVelocity * -1;
    } else

    // Bounce off top of player paddle / deflect
    if (ballXPosition <= 20 && ballXPosition > -19 && ballYPosition + 20 >= playerPaddleYPosition && ballYPosition + 20 < playerPaddleYPosition + 20){
        ballYVelocity = ballYVelocity * -1;
    } else

    // Bounce off bottom of player paddle / deflect
    if (ballXPosition <= 20 && ballXPosition > -19 && ballYPosition <= playerPaddleYPosition + 100 && ballYPosition > playerPaddleYPosition + 80){
        ballYVelocity = ballYVelocity * -1;
    }
    
    // Update computer score and change score text dom
    if (ballXPosition < 0 && scoreDetector === false){
        scoreDetector = true;
        computerScoreCount += 1;
        computerScore.innerText = `Computer: ${computerScoreCount}`;
        setTimeout(() => {scoreDetector = false;}, 1000);
    }

    // Update player score and change score text dom
    if (ballXPosition > visualViewport.width * 0.6 && scoreDetector === false){
        scoreDetector = true;
        playerScoreCount += 1;
        playerScore.innerText = `Player: ${playerScoreCount}`;
        setTimeout(() => {scoreDetector = false;}, 1000);
    }

}

// Call the update() function every 30ms
setInterval(update, 30);

