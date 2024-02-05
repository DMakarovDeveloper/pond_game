<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        canvas {
            display: block;
            margin: auto;
            background-color: black;
        }
    </style>
    <title>Pong Game</title>
</head>
<body>
    <canvas id="pongCanvas" width="800" height="400"></canvas>
    <script>
        const canvas = document.getElementById('pongCanvas');
        const ctx = canvas.getContext('2d');

        // Create the paddles
        const paddleWidth = 10, paddleHeight = 60;
        let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
        let rightPaddleY = canvas.height / 2 - paddleHeight / 2;

        // Create the ball
        const ballSize = 10;
        let ballX = canvas.width / 2 - ballSize / 2;
        let ballY = canvas.height / 2 - ballSize / 2;
        let ballSpeedX = 5, ballSpeedY = 5;

        // Draw the paddles
        function drawPaddles() {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
            ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
        }

        // Draw the ball
        function drawBall() {
            ctx.beginPath();
            ctx.arc(ballX, ballY, ballSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();
        }

        // Update game state
        function update() {
            // Move the right paddle
            if (ballY > rightPaddleY + paddleHeight / 2) {
                rightPaddleY += 5;
            } else {
                rightPaddleY -= 5;
            }

            // Update ball position
            ballX += ballSpeedX;
            ballY += ballSpeedY;

            // Bounce off top and bottom walls
            if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > canvas.height) {
                ballSpeedY = -ballSpeedY;
            }

            // Bounce off paddles
            if (
                (ballX - ballSize / 2 < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
                (ballX + ballSize / 2 > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
            ) {
                ballSpeedX = -ballSpeedX;
            }

            // Reset ball position if it goes out of bounds
            if (ballX - ballSize / 2 < 0 || ballX + ballSize / 2 > canvas.width) {
                ballX = canvas.width / 2;
                ballY = canvas.height / 2;
            }
        }

        // Draw everything
        function draw() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw paddles and ball
            drawPaddles();
            drawBall();
        }

        // Game loop
        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        // Keyboard event listener for left paddle
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp' && leftPaddleY > 0) {
                leftPaddleY -= 10;
            } else if (event.key === 'ArrowDown' && leftPaddleY < canvas.height - paddleHeight) {
                leftPaddleY += 10;
            }
        });

        // Start the game loop
        gameLoop();
    </script>
</body>
</html>
