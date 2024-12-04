let towers = {
    tower1: [5, 4, 3, 2, 1],
    tower2: [],
    tower3: []
};


function moveFromTo(from, to) {

    fromTower = towers["tower" + from];
    toTower = towers["tower" + to];

    if (fromTower.length == 0) {
        alert("No puedes mover algo que no existe crack");
    } else if (fromTower[fromTower.length - 1] > toTower[toTower - 1]) {
        alert("no puedes meter eso ahí");
    } else {

        //MOVE PIECE
        toTower.push(fromTower.pop());

        console.log(towers["tower1"]);
        console.log(towers["tower2"]);
        console.log(towers["tower3"]);

        //RENDER TOWERS
        renderTowers();
    }
}

function renderTowers() {

    let towe1div = document.getElementById("tower1-div").innerHTML = "";
    let towe2div = document.getElementById("tower2-div").innerHTML = "";
    let towe3div = document.getElementById("tower3-div").innerHTML = "";

    towers["tower1"].forEach(element => {
        let piece = '<div class = piece-"' + element + '"></div>';
        document.getElementById("tower1-div").innerHTML = piece;
    });


}