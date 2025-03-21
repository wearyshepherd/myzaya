const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let cells = Array(9).fill(null);
let currentPlayer = null;
let opponent = null;
let gameActive = false;

// Corrected image paths & player names
const images = {
    "Zaya": "images/myzaya.png",
    "Marga": "images/marga.png",
    "Zia": "images/zia.png",
    "Zai": "images/zai.png",
    "Hera": "images/hera.png"
};

// Character Selection
const characterButtons = document.querySelectorAll('.character-btn');
characterButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!currentPlayer) {
            currentPlayer = button.dataset.character;
            const remainingPlayers = Object.keys(images).filter(p => p !== currentPlayer);
            opponent = remainingPlayers[Math.floor(Math.random() * remainingPlayers.length)];
            gameActive = true;
            status.innerText = `${currentPlayer} vs ${opponent} - ${currentPlayer}'s turn`;
        }
    });
});

// Initialize board
function renderBoard() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.index = index;
        if (cell) {
            const img = document.createElement('img');
            img.src = images[cell];
            img.style.width = '90%';
            img.style.height = '90%';
            img.style.objectFit = 'contain';
            cellDiv.appendChild(img);
        }
        cellDiv.addEventListener('click', handleMove);
        board.appendChild(cellDiv);
    });
}

// Handle a move & switch players
function handleMove(event) {
    const index = event.target.dataset.index;
    if (!gameActive || cells[index]) return;

    cells[index] = currentPlayer;
    renderBoard();
    if (checkWinner()) return;

    // Alternate between selected player & opponent
    currentPlayer = currentPlayer === opponent ? document.querySelector(".character-btn[data-character]:not([data-character='" + opponent + "'])").dataset.character : opponent;
    status.innerText = `${currentPlayer}'s turn`;
}

// Check for winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            status.innerText = `${cells[a]} wins!`;
            gameActive = false;
            showWinnerPopup(cells[a]);
            return true;
        }
    }

    if (!cells.includes(null)) {
        status.innerText = "It's a draw!";
        gameActive = false;
        return true;
    }

    return false;
}

// Show winner popup
function showWinnerPopup(winner) {
    const winnerPopup = document.getElementById('winner-popup');
    const winnerAvatar = document.getElementById('winner-avatar');
    const winnerText = document.getElementById('winner-text');

    winnerAvatar.src = images[winner];
    winnerText.innerText = `${winner} Wins!`;
    winnerPopup.classList.remove('hidden');
}

// Reset game
resetButton.addEventListener('click', () => {
    cells = Array(9).fill(null);
    currentPlayer = null;
    opponent = null;
    gameActive = false;
    status.innerText = "Select a character to start";
    document.getElementById('winner-popup').classList.add('hidden');
    renderBoard();
});

// Initialize game
renderBoard();
