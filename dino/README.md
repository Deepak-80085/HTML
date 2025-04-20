# Dino Game

A recreation of the famous Google Chrome dinosaur game that appears when you're offline.

## How to Play

1. Open `index.html` in your web browser
2. Press the Space bar or Up arrow key to make the dinosaur jump
3. Avoid obstacles (cacti and birds) by jumping over them
4. Your score increases as you progress
5. The game gradually gets faster as your score increases
6. If you hit an obstacle, the game ends
7. Press Space to restart after game over

## Game Controls

- **Space / Up Arrow**: Jump
- **Space** (after game over): Restart game

## Features

- Dinosaur character that jumps
- Multiple sizes of cacti obstacles
- Animated flying birds
- Increasing difficulty (speed) over time
- Score tracking
- High score saved between sessions using localStorage
- Game over screen with restart option

## Technologies Used

- HTML
- CSS (using clip-path for shapes)
- JavaScript (Vanilla)

## Implementation Details

- The game uses pure CSS for all game elements
- CSS clip-path is used to create the shapes of the dinosaur, cacti, and birds
- Birds are animated by changing their scale
- Cacti have random sizes for variety
- Collision detection uses adjusted bounding boxes for better gameplay

## Credits

This game is a recreation of the Chrome Dino game created by Google. This implementation was built as a learning exercise and for entertainment purposes.

Enjoy the game! 