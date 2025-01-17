document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cards = [
        '🐶', '🐱', '🐭', '🐹',
        '🐰', '🦊', '🐻', '🐼',
        '🐶', '🐱', '🐭', '🐹',
        '🐰', '🦊', '🐻', '🐼'
    ];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedPairs = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        gameBoard.innerHTML = ''; 
        shuffle(cards);
        cards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
        matchedPairs = 0;
    }

    function flipCard() {
        if (lockBoard || this.classList.contains('matched')) return;

        this.textContent = this.dataset.symbol;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            matchCards();
        } else {
            unflipCards();
        }
    }

    function matchCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs += 1;
        resetBoard();

        if (matchedPairs === cards.length / 2) {
            const gameOverModal = new bootstrap.Modal(document.getElementById('gameOverModal'));
            gameOverModal.show();
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    document.getElementById('restartGame').addEventListener('click', () => {
        const gameOverModal = bootstrap.Modal.getInstance(document.getElementById('gameOverModal'));
        gameOverModal.hide();
        createBoard();
    });

    createBoard();
});
