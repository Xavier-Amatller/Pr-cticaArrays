let board = [];

function renderBoard() {
    document.getElementById("div-start").innerText = "";
    board = Array.from({ length: 8 }, () => Array(8).fill(0));

    board.forEach((row, i) => {
        row.forEach((column, k) => {

            let box = document.createElement("div");
            box.className = "box";
            box.dataset.row = i;
            box.dataset.column = k;
            box.addEventListener("mousedown", event => {
                if (event.button == 0) {
                    boxClicked(event);
                } else if (event.button == 2) {
                    if (box.style.backgroundColor == "" || box.style.backgroundColor == "black") {
                        box.style.backgroundColor = "red";
                    } else if (box.style.backgroundColor == "red") {
                        box.style.backgroundColor = "black"
                    }
                }
            });
            document.getElementById("board").appendChild(box);
        });
    });
}

const directions = [
    [-1, -1], [-1, 0], [-1, 1], // Arriba
    [0, -1], [0, 1],   // Izquierda y Derecha
    [1, -1], [1, 0], [1, 1]     // Abajo
];

document.getElementById("start").addEventListener("click", renderBoard);

function setBoard() {
    let nBombsLeft = 10;
    while (nBombsLeft > 0) {
        board.forEach((row, i) => {
            let nBombsRow = 0;
            row.forEach((column, k) => {
                if ((Math.floor(Math.random() * 20) == 0) && (nBombsLeft > 0) && (board[i][k] == 0) && nBombsRow <= 3) {
                    board[i][k] = "B";
                    nBombsRow++;
                    nBombsLeft--;
                    updateSurroundingCells(i, k);
                }
            });
        });
    }
    console.log(board);
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
let firstClick = true;
let punctuation = 0;
function boxClicked(event) {

    if (firstClick) {
        firstClick = false;
        setBoard(event);
    }

    let box = event.target;
    let row = box.dataset.row;
    let column = box.dataset.column;

    box.innerText = board[row][column];
    box.style.backgroundColor = "antiquewhite";
    box.removeEventListener("click", boxClicked);

    if (board[row][column] == "B") {
        document.getElementById("result").innerHTML = "<h1>BOOOOOOOOOOM!!!!! HAS PERDIDO :(</h1>";
        box.style.color = "red";
        showAllBoard();
    }

    if (punctuation == 74) {
        document.getElementById("result").innerHTML = "<h1>HAS GANADOOO :)</h1>";
    }
    punctuation++;
    document.getElementById("punctuation").innerText = punctuation;
}

function showAllBoard() {
    let allBoxes = [...document.getElementsByClassName("box")];

    allBoxes.forEach(box => {

        let row = box.dataset.row;
        let column = box.dataset.column;

        box.innerText = board[row][column];
        box.style.backgroundColor = "antiquewhite";
        box.removeEventListener("click", boxClicked);
    });


}
