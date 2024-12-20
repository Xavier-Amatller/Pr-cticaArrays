let board = [];

document.getElementById("start").addEventListener("click", renderBoard);

function renderBoard() {
    document.getElementById("div-start").innerText = "";
    board = Array.from({ length: 8 }, () => Array(8).fill(0));

    board.forEach((row, i) => {
        row.forEach((column, k) => {

            let box = document.createElement("div");
            box.className = "box";
            box.dataset.row = i;
            box.dataset.column = k;
            box.addEventListener("mousedown", checkClick);
            document.getElementById("board").appendChild(box);
        });
    });
}

function checkClick(event) {
    let box = event.target;
    if (event.button == 0) {
        boxClicked(event);
    } else if (event.button == 2) {
        if (box.style.backgroundColor == "" || box.style.backgroundColor == "black") {
            box.style.backgroundColor = "red";
        } else if (box.style.backgroundColor == "red") {
            box.style.backgroundColor = "black";
        }
    }
}

const directions = [
    [-1, -1], [-1, 0], [-1, 1], // Arriba
    [0, -1], [0, 1],   // Izquierda y Derecha
    [1, -1], [1, 0], [1, 1]     // Abajo
];


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

function clickSurroundingCells(startX, startY) {
    let stack = [[startX, startY]];
    let visited = new Set();

    while (stack.length > 0) {
        const [x, y] = stack.pop();

        const key = `${x},${y}`;
        if (visited.has(key)) continue;
        visited.add(key);

        let box = document.querySelector(`.box[data-row='${x}'][data-column='${y}']`);
        if (box) {
            box.innerText = board[x][y] === 0 ? "" : board[x][y]; 
            box.style.backgroundColor = "antiquewhite";
            box.removeEventListener("mousedown", checkClick);
        }

        if (board[x][y] === 0) {
            directions.forEach(([dx, dy]) => {
                const newX = x + dx;
                const newY = y + dy;
                if (isValidPosition(newX, newY) && !visited.has(`${newX},${newY}`)) {
                    stack.push([newX, newY]);
                }
            });
        }
    }
}


let firstClick = true;
let punctuation = 0;
function boxClicked(event) {
    if (firstClick) {
        firstClick = false;
        setBoard();
    }

    let box = event.target;
    let row = parseInt(box.dataset.row);
    let column = parseInt(box.dataset.column);

    if (board[row][column] === 0) {
        clickSurroundingCells(row, column); 
    } else {
        box.innerText = board[row][column];
        box.style.backgroundColor = "antiquewhite";
    }

    if (board[row][column] === "B") {
        document.getElementById("result").innerHTML = "<h1>BOOOOOOOOOOM!!!!! HAS PERDIDO :(</h1>";
        box.style.color = "red";
        showAllBoard();
    } else {
        punctuation++;
        document.getElementById("punctuation").innerText = punctuation;
        box.removeEventListener("mousedown", checkClick);

        if (punctuation === 54) {
            document.getElementById("result").innerHTML = "<h1>HAS GANADOOO :)</h1>";
            showAllBoard();
        }
    }
}

function showAllBoard() {
    let allBoxes = [...document.getElementsByClassName("box")];

    allBoxes.forEach(box => {

        let row = box.dataset.row;
        let column = box.dataset.column;

        box.innerText = board[row][column];
        box.style.backgroundColor = "antiquewhite";
        box.removeEventListener("mousedown", checkClick);
    });
}
