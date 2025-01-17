document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const resultMessage = document.getElementById('resultMessage');
    const winnerMessage = document.getElementById('winnerMessage');
    let playerChoice = null;
    let computerChoice = null;

    const choicesMap = {
        rock: '🪨',
        scissors: '✂️',
        paper: '📄',
    };

    function getComputerChoice() {
        const choices = ['rock', 'scissors', 'paper'];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function determineWinner(player, computer) {
        if (player === computer) return 'Remíza!';
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'scissors' && computer === 'paper') ||
            (player === 'paper' && computer === 'rock')
        ) {
            return 'Vyhráli jste!';
        }
        return 'Prohráli jste!';
    }

    function handleChoice(e) {
        playerChoice = e.target.dataset.choice;
        computerChoice = getComputerChoice();

        const result = determineWinner(playerChoice, computerChoice);

        resultMessage.innerHTML = `
            Vaše volba: ${choicesMap[playerChoice]} <br>
            Počítačova volba: ${choicesMap[computerChoice]} <br>
            <strong>${result}</strong>
        `;

        winnerMessage.textContent = result;

        const gameOverModal = new bootstrap.Modal(document.getElementById('gameOverModal'));
        gameOverModal.show();
    }

    function restartGame() {
        resultMessage.textContent = '';
        playerChoice = null;
        computerChoice = null;
    }

    choices.forEach(choice => choice.addEventListener('click', handleChoice));

    document.getElementById('restartGame').addEventListener('click', () => {
        const gameOverModal = bootstrap.Modal.getInstance(document.getElementById('gameOverModal'));
        gameOverModal.hide();
        restartGame();
    });
});
