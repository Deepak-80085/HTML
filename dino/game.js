const dino = document.getElementById('dino');
const ground = document.getElementById('ground');
const gameContainer = document.querySelector('.game-container');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const gameOverElement = document.getElementById('game-over');
const restartButton = document.getElementById('restart-button');

let isGameOver = false;
let isJumping = false;
let score = 0;
let highScore = 0;
let animationFrame;
let gameSpeed = 5;
let obstacles = [];
let spawnTimer = 0;
let animationCounter = 0;

// Register event listeners for player interactions
document.addEventListener('keydown', handleKeyDown);
restartButton.addEventListener('click', restartGame);

/**
 * Main game loop - handles all core game mechanics per frame
 * Controls game state, obstacle movement, collision detection,
 * scoring, and animation timing
 */
function gameLoop() {
    if (isGameOver) return;
    
    updateObstacles();
    checkCollisions();
    updateScore();
    animateBirds();
    
    spawnTimer++;
    if (spawnTimer >= 60 + Math.random() * 50) {
        spawnObstacle();
        spawnTimer = 0;
    }
    
    // Gradually increase difficulty by incrementing game speed at score milestones
    if (score > 0 && score % 100 === 0) {
        gameSpeed += 0.1;
    }
    
    animationFrame = requestAnimationFrame(gameLoop);
}

/**
 * Creates wing-flapping animation effect for bird obstacles
 * Updates bird appearance every 15 frames to simulate flight
 */
function animateBirds() {
    animationCounter++;
    if (animationCounter % 15 !== 0) return; // Only change animation every 15 frames for performance

    const birds = document.querySelectorAll('.bird');
    birds.forEach(bird => {
        if (bird.style.transform === 'scaleY(1.2)') {
            bird.style.transform = 'scaleY(0.8)';
        } else {
            bird.style.transform = 'scaleY(1.2)';
        }
    });
}

/**
 * Processes keyboard input from the player
 * Triggers jump action during gameplay and game restart after game over
 */
function handleKeyDown(event) {
    if ((event.code === 'Space' || event.key === ' ' || event.key === 'ArrowUp') && !isJumping && !isGameOver) {
        jump();
    }
    
    if (event.code === 'Space' && isGameOver) {
        restartGame();
    }
}

/**
 * Executes dinosaur jump animation
 * Prevents multiple simultaneous jumps and handles jump timing
 */
function jump() {
    if (isJumping) return;
    
    isJumping = true;
    dino.classList.add('jumping');
    
    setTimeout(() => {
        dino.classList.remove('jumping');
        isJumping = false;
    }, 500);
}

/**
 * Creates new obstacles (cacti or birds)
 * Determines obstacle type based on score and random chance
 * Configures obstacle appearance, position and size variation
 */
function spawnObstacle() {
    const obstacle = document.createElement('div');
    
    // Select obstacle type with weighting - birds only appear after score 200
    if (Math.random() > 0.2 || score < 200) {
        // Generate cactus with random size variation
        obstacle.classList.add('cactus');
        const scale = 0.8 + Math.random() * 0.4; // Variable scale creates visual diversity
        obstacle.style.transform = `scaleX(${scale}) scaleY(${scale})`;
        obstacle.style.left = '600px';
        obstacle.style.bottom = '0px';
    } else {
        // Generate bird at random heights for gameplay variation
        obstacle.classList.add('bird');
        const height = Math.random() > 0.5 ? '50px' : '100px';
        obstacle.style.left = '600px';
        obstacle.style.bottom = height;
    }
    
    gameContainer.appendChild(obstacle);
    obstacles.push({
        element: obstacle,
        position: 1000
    });
}

/**
 * Updates position of all active obstacles
 * Moves obstacles from right to left based on game speed
 * Removes obstacles once they're offscreen to optimize performance
 */
function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        obstacle.position -= gameSpeed;
        obstacle.element.style.left = `${obstacle.position}px`;
        
        // Clean up obstacles that have moved past the game area
        if (obstacle.position < -50) {
            obstacle.element.remove();
            obstacles.splice(i, 1);
            i--;
        }
    }
}

/**
 * Manages collision detection between dinosaur and obstacles
 * Uses adjusted bounding boxes for more accurate hit detection
 * Triggers game over when collision is detected
 */
function checkCollisions() {
    const dinoRect = dino.getBoundingClientRect();
    // Create smaller collision box for more forgiving gameplay
    const dinoCollisionBox = {
        x: dinoRect.x + 5,
        y: dinoRect.y + 5,
        width: dinoRect.width - 10,
        height: dinoRect.height - 10
    };
    
    for (const obstacle of obstacles) {
        const obstacleRect = obstacle.element.getBoundingClientRect();
        // Adjust obstacle hitbox for better player experience
        const obstacleCollisionBox = {
            x: obstacleRect.x + 5,
            y: obstacleRect.y + 5,
            width: obstacleRect.width - 10,
            height: obstacleRect.height - 10
        };
        
        // Standard rectangle collision algorithm
        if (
            dinoCollisionBox.x < obstacleCollisionBox.x + obstacleCollisionBox.width &&
            dinoCollisionBox.x + dinoCollisionBox.width > obstacleCollisionBox.x &&
            dinoCollisionBox.y < obstacleCollisionBox.y + obstacleCollisionBox.height &&
            dinoCollisionBox.y + dinoCollisionBox.height > obstacleCollisionBox.y
        ) {
            gameOver();
            return;
        }
    }
}

/**
 * Increments and displays score during gameplay
 * Converts raw score to display score by dividing by 10
 */
function updateScore() {
    score++;
    scoreElement.textContent = Math.floor(score / 10);
}

/**
 * Handles game over state
 * Stops game loop, updates visuals, records high score,
 * displays game over UI elements
 */
function gameOver() {
    isGameOver = true;
    cancelAnimationFrame(animationFrame);
    
    // Visual indicator of crash
    dino.style.backgroundColor = '#ff0000';
    
    // Update and save high score if current score is better
    if (score / 10 > highScore) {
        highScore = Math.floor(score / 10);
        highScoreElement.textContent = `HI: ${highScore}`;
        localStorage.setItem('dinoHighScore', highScore);
    }
    
    gameOverElement.classList.remove('hidden');
    restartButton.classList.remove('hidden');
}

/**
 * Resets all game elements and variables to start a new game
 * Clears obstacles, resets score, speed, and UI elements
 */
function restartGame() {
    // Reset core game state
    isGameOver = false;
    score = 0;
    gameSpeed = 6;
    spawnTimer = 0;
    
    // Reset dinosaur appearance
    dino.style.backgroundColor = '#535353';
    
    // Remove all existing obstacles
    obstacles.forEach(obstacle => obstacle.element.remove());
    obstacles = [];
    
    // Reset UI elements
    scoreElement.textContent = '0';
    gameOverElement.classList.add('hidden');
    restartButton.classList.add('hidden');
    
    // Restart game loop
    animationFrame = requestAnimationFrame(gameLoop);
}

/**
 * Retrieves saved high score from browser's localStorage
 * Displays previous high score if available
 */
function loadHighScore() {
    const savedHighScore = localStorage.getItem('dinoHighScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore);
        highScoreElement.textContent = `HI: ${highScore}`;
    }
}

/**
 * Initializes game on page load
 * Loads previous high score and starts the game loop
 */
function initGame() {
    loadHighScore();
    animationFrame = requestAnimationFrame(gameLoop);
}

// Start the game when the page is fully loaded
window.addEventListener('load', initGame); 