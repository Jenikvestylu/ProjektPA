document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = true;

    function createBoard() {
        gameBoard.innerHTML = ''; // Vyprázdnění herní plochy
        board.fill(null);
        gameActive = true;
        currentPlayer = 'X';

        board.forEach((_, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = index;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        });
    }

    function handleCellClick() {
        if (!gameActive) return;

        const cellIndex = this.dataset.index;
        if (board[cellIndex] !== null) return;

        board[cellIndex] = currentPlayer;
        this.textContent = currentPlayer;
        this.classList.add('taken');

        if (checkWinner()) {
            endGame(`${currentPlayer} vyhrává!`);
        } else if (board.every(cell => cell !== null)) {
            endGame('Remíza!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function endGame(message) {
        gameActive = false;
        const winnerMessage = document.getElementById('winnerMessage');
        winnerMessage.textContent = message;

        const gameOverModal = new bootstrap.Modal(document.getElementById('gameOverModal'));
        gameOverModal.show();
    }

    document.getElementById('restartGame').addEventListener('click', () => {
        const gameOverModal = bootstrap.Modal.getInstance(document.getElementById('gameOverModal'));
        gameOverModal.hide();
        createBoard();
    });

    createBoard();
});
