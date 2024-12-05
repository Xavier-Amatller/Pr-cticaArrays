let towers = [
    [],
    [],
    []
];

document.getElementById("submit").addEventListener("click", () => {
    let nPiezas = document.getElementById("nPiezas").value;
    for (let index = 1; index <= nPiezas; index++) {
        towers[0].splice(0, 0, index);
    }
    document.getElementById("nPiezas-div").innerHTML = "";
    renderTowers()
});

function moveFromTo(from, to) {

    fromTower = towers[from - 1];
    toTower = towers[to - 1];

    if (fromTower.length == 0) {
        alert("No puedes mover algo que no existe crack");
    } else if (fromTower[fromTower.length - 1] > toTower[toTower.length - 1]) {
        alert("no puedes meter eso ahí");
    } else {
        toTower.push(fromTower.pop());
        renderTowers();
    }
    
    if (towers[0].length == 0 && towers[1].length == 0) {
        document.body.innerHTML = '<h1>ENORABUENA HAS GANADO</h1>';
    }
}

function renderTowers() {

    let towe1div = document.getElementById("tower1-div").innerHTML = "";
    let towe2div = document.getElementById("tower2-div").innerHTML = "";
    let towe3div = document.getElementById("tower3-div").innerHTML = "";

    for (let index = 0; index < 3; index++) {

        let auxTower = towers[index].toReversed();

        auxTower.forEach(element => {
            let piece = '<div class = piece-' + element + '></div>';
            let tower = 'tower' + (index + 1) + '-div';
            document.getElementById(tower).innerHTML += piece;
        });
    }
}