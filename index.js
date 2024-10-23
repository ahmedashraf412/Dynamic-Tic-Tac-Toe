const submitBtn = document.querySelector('.submit-btn');
let rows = 0;
let columns = 0;
let winNumber = 0;
let history = [];
let gameBlocks = [];
let currentPlayer = "X";
let roundWon = false;
let result = document.querySelector(".result");
let newGame = document.querySelector(".restart");
gameSubmit();

function newGameFun() {
    newGame.addEventListener('click', () => {
        resetGame();
        document.querySelector(".current-player").innerHTML = `Current Player: ${currentPlayer}`;
        document.querySelector(".result").innerHTML = `Result: `;

        if (rows >= 3 && columns >= 3 && winNumber >= 3) {
            buildGame(rows, columns);
            startGame();
            newGameFun();
        }
        startGame();
    });
}
function gameSubmit() {
    submitBtn.addEventListener("click", () => {
        resetGame();
        document.querySelector(".current-player").innerHTML = `Current Player: ${currentPlayer}`;
        document.querySelector(".result").innerHTML = `Result: `;
        rows = document.querySelector("#rows").value;
        columns = document.querySelector("#columns").value;
        winNumber = document.querySelector("#win-number").value;
        // document.querySelector("#rows").value = "";
        // document.querySelector("#columns").value = "";
        // document.querySelector("#win-number").value = "";
        if (rows >= 3 && columns >= 3 && winNumber >= 3) {
            buildGame(rows, columns);
            console.log(gameBlocks);
            startGame();
            newGameFun();
        }
        else {
            alert("Minimum Number is 3");

        }

    });
}
function buildGame(rows, columns) {
    let counter =0;
    document.getElementById("xo-game").style.gridTemplateColumns = `repeat(${columns},70px)`;
    document.getElementById("xo-game").style.gridTemplateRows = `repeat(${rows},70px)`;
    for (i = 0; i < (rows * columns); i++) {
        let createBlock = document.createElement('div');
        createBlock.className = 'xo-block'
        createBlock.id = `${i}`;
        document.querySelector('.xo-game').appendChild(createBlock);
    }
    for (let i = 0; i < rows; i++) {
        gameBlocks[i] = [];
        for (let j = 0; j < columns; j++) {
            gameBlocks[i][j] = document.getElementById(`${counter++}`);

        }
    }
}
function startGame() {
    for (let i = 0; i < rows; i++) {
        console.log(gameBlocks[i]);
        gameBlocks[i].forEach((block) => {

            console.log(block);
            block.addEventListener('click', () => {
                if (roundWon === true) {
                    return
                }
                if (result.innerHTML == `Result: ${currentPlayer} Wins!` || result.innerHTML == `Result:  ${currentPlayer} Wins!`) {
                    return;
                }
                if (block.innerHTML.trim() === "") {
                    block.innerHTML = `${currentPlayer}`;
                    currentPlayer = currentPlayer == "X" ? currentPlayer = "O" : currentPlayer = "X";
                    document.querySelector(".current-player").innerHTML = `Current Player: ${currentPlayer}`;
                }
                // let countX = gameBlocks[i].filter(block => block.innerHTML === 'X').length;
                // let countO = gameBlocks[i].filter(block => block.innerHTML === 'O').length;
                // if (countX + countO === (rows * columns)) {
                //     result.innerHTML = "Result: Draw!";
                //     return; // Stop further actions if game is over
                // }
            }

            )
        }
        )
    }
}

function resetGame() {
    if (document.querySelector(".xo-game").firstChild == null) {
        return
    }
    while (document.querySelector(".xo-game").firstChild) {
        document.querySelector(".xo-game").removeChild(document.querySelector(".xo-game").lastChild);
    }
    gameBlocks = [];
    currentPlayer = "X";
    result.innerHTML = "Result: ";
}

function win() {

}