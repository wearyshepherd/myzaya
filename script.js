const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let cells = Array(9).fill(null);
let currentPlayer = 'My Zaya';
let gameActive = true;

const images = {
    "My Zaya": "myzaya.png",  // Update with the correct hosted image URL
    "Marga": "marga.png"    // Update with the correct hosted image URL
};

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

// Handle a move
function handleMove(event) {
    const index = event.target.dataset.index;
    if (!gameActive || cells[index]) return;

    cells[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'My Zaya' ? 'Marga' : 'My Zaya';
    status.innerText = `${currentPlayer}'s turn`;
    renderBoard();
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
            return;
        }
    }

    if (!cells.includes(null)) {
        status.innerText = "It's a draw!";
        gameActive = false;
    }
}

// Reset game
resetButton.addEventListener('click', () => {
    cells = Array(9).fill(null);
    currentPlayer = 'My Zaya';
    gameActive = true;
    status.innerText = "My Zaya's turn";
    renderBoard();
});

// Initialize game
renderBoard();
