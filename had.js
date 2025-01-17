document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    let snake = [{ x: 200, y: 200 }];
    let direction = { x: 0, y: 0 };
    let food = { x: Math.floor(Math.random() * 20) * gridSize, y: Math.floor(Math.random() * 20) * gridSize };
    let gameOver = false;
    let interval;

    function draw() {
        if (gameOver) {
            clearInterval(interval);
            const gameOverModal = new bootstrap.Modal(document.getElementById('gameOverModal'));
            gameOverModal.show();
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'green';
        snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, gridSize, gridSize);

        const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = { x: Math.floor(Math.random() * 20) * gridSize, y: Math.floor(Math.random() * 20) * gridSize };
        } else {
            snake.pop();
        }

        if (
            head.x < 0 || head.x >= canvas.width ||
            head.y < 0 || head.y >= canvas.height ||
            snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
        ) {
            gameOver = true;
        }
    }

    function restartGame() {
        snake = [{ x: 200, y: 200 }];
        direction = { x: 0, y: 0 };
        food = { x: Math.floor(Math.random() * 20) * gridSize, y: Math.floor(Math.random() * 20) * gridSize };
        gameOver = false;
        interval = setInterval(draw, 100);
    }

    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    });

    document.getElementById('restartGame').addEventListener('click', () => {
        const gameOverModal = bootstrap.Modal.getInstance(document.getElementById('gameOverModal'));
        gameOverModal.hide();
        restartGame();
    });

    restartGame();
});
