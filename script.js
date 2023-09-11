let cell = ["","","","","","","","",""];
let round = 0;

function Player(name, mark) {
    this.name = name;
    this.mark = mark;
  }
const player1 = new Player("1", "X");
const player2 = new Player("2", "O");
let currentPlayer = player1;

function makeGrid() {
    let container = document.getElementById("gridContainer")

    for (let i in cell) {
        let createCell = document.createElement("div");
        createCell.classList.add("cell");
        createCell.innerHTML = `${cell[i]}`;

        if (createCell.innerHTML == "" && round != "gameover"){
            createCell.addEventListener("click", function() {
                if (currentPlayer == player1) {
                    cell[i] = player1.mark;
                    currentPlayer = player2;
                } 
                else {
                    cell[i] = player2.mark;
                    currentPlayer = player1;
                }

                deleteElements();
                makeGrid();
                round += 1;
                checkWinner();
            });
        }

        container.appendChild(createCell);
    }
}

function deleteElements() {
    var elements = document.querySelectorAll(".cell");
    elements.forEach(function(element) {
      element.remove();
    });
  }

function checkWinner() {
    let winDiv = document.getElementById("winNotifier");

    const winCond = [[0, 1, 2], [3, 4, 5], [6, 7, 8]
                    ,[0, 3, 6], [1, 4, 7], [2, 5, 8]
                    ,[0, 4, 8], [6, 4, 2]]

    for (let i in winCond) {
        let currCond = winCond[i];
        let a = cell[currCond[0]];
        let b = cell[currCond[1]];
        let c = cell[currCond[2]];

        if (a != "" && a == b && b == c) {

            if (currentPlayer == player1) {
                winDiv.innerHTML = `<h1>Winner is ${player2.name}!</h1>`;
            } 
            else {
                winDiv.innerHTML = `<h1>Winner is ${player1.name}!</h1>`;
            }

            round = "gameover";
            deleteElements();
            makeGrid();
        } 
        else if (round == 9) {
            winDiv.innerHTML = `<h1>Tie!</h1>`;
            round = "gameover";
        }
    }
}