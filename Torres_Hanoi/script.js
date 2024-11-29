let towers = {
    tower1: [5, 4, 3, 2, 1],
    tower2: [],
    tower3: []
};

let towers10 = [
    "tower1" = [5, 4, 3, 2, 1],
    "tower2" = [],
    "tower3" = []
];

console.log(towers10);

tower1 = [5, 4, 3, 2, 1];

function moveFromTo(from, to) {

    from = "tower" + from;
    to = "tower" + from;

    to.push(from.pop());

    console.log(tower1);
    console.log(tower2);
    console.log(tower3);

}

