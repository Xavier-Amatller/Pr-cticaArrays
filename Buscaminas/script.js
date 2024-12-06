let board =
    [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];

const directions = [
    [-1, -1], [-1, 0], [-1, 1], // Arriba
    [0, -1], [0, 1],   // Izquierda y Derecha
    [1, -1], [1, 0], [1, 1]     // Abajo
];
document.getElementById("start").addEventListener("click", setBoard);

function setBoard() {
    document.getElementById("div-start").innerText = "";
    let nBombsLeft = 10;
    while (nBombsLeft > 0) {
        board.forEach((row, i) => {
            row.forEach((column, k) => {

                if ((Math.floor(Math.random() * 20) == 0) && (nBombsLeft > 0) && (board[i][k] == 0)) {
                    board[i][k] = "M";
                    nBombsLeft--;
                    updateSurroundingCells(i, k);
                }
            });
        });
    }
    console.log(board);
    renderBoard();
}

function renderBoard() {

    board.forEach((row, i) => {
        row.forEach((column, k) => {
            document.getElementById("board").innerHTML +=
                '<div class = "box">' + board[i][k] + '</div>'
        });
    });
}

function isValidPosition(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function updateSurroundingCells(x, y) {
    directions.forEach(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;

        if (isValidPosition(newX, newY)) {
            board[newX][newY] += 1;
        }
    });
}