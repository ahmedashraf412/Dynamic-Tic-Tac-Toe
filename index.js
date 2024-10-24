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
let num = 0;
let counterX = 0;
let counterO = 0;
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
            startGame();
            newGameFun();
        }
        else {
            alert("Minimum Number is 3");

        }

    });
}
function buildGame(rows, columns) {
    let counter = 0;
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
    for (let i = 0; i < rows; i++) {
        history[i] = [];
        for (let j = 0; j < columns; j++) {
            history[i].push("");

        }
    }
}
function startGame() {
    let countX = 0;
    let countO = 0;
    let total = 0;

    for (let i = 0; i < rows; i++) {

        gameBlocks[i].forEach((block, index) => {


            block.addEventListener('click', () => {

                if (roundWon === true) {
                    return
                }
                if (result.innerHTML == `Result: ${currentPlayer} Wins!` || result.innerHTML == `Result:  ${currentPlayer} Wins!`) {
                    return;
                }
                if (block.innerHTML.trim() === "") {
                    console.log(`index is [${index}]`);
                    console.log(block);
                    block.innerHTML = `${currentPlayer}`;
                    updateHistory(i, index);
                    win(history, i, index);
                    currentPlayer = currentPlayer == "X" ? currentPlayer = "O" : currentPlayer = "X";
                    document.querySelector(".current-player").innerHTML = `Current Player: ${currentPlayer}`;

                    if (block.innerHTML == "X") {
                        countX++;
                    }
                    else if (block.innerHTML == "O") {
                        countO++;
                    }



                    total = countX + countO;

                    console.log(countX);
                    console.log(countO);
                    console.log(`total = ${total}`);




                }
                if (total === (rows * columns)) {
                    result.innerHTML = "Result: Draw!";
                    return; // Stop further actions if game is over
                }
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
function updateHistory(i, index) {
    if (history[i][index] === "") {
        history[i][index] = gameBlocks[i][index].innerHTML;
        console.log(history);
    }
}

function win(history, i, index) {

    if (history[i][index] == "X") {
        console.log(`I found ${history[i][index]} AT [${i}][${index}] `);
        counterX = 1;
        let symbol = "X";
        catchX(symbol, counterX, history, i, index);




    }
    else if (history[i][index] == "O") {
        console.log(`I found ${history[i][index]} AT [${i}][${index}] `);
        counterO = 1;
        let symbol = "O";
        catchX(symbol, counterO, history, i, index);

    }

}

function catchX(symbol, counter, arr, i, index) {
    console.log(i, index)

    let topLeft = i == 0 || arr[i - 1][index - 1] == undefined ? false : arr[i - 1][index - 1];
    console.log(`topLeft is ${topLeft}`);
    let top = i == 0 || arr[i - 1][index] == undefined ? false : arr[i - 1][index];
    console.log(`top is ${top}`);
    let topRight = i == 0 || arr[i - 1][index + 1] == undefined ? false : arr[i - 1][index + 1];
    console.log(`topRight is ${topRight}`);
    let midLeft = arr[i][index - 1] == undefined ? false : arr[i][index - 1];
    console.log(`midLeft is ${midLeft}`);
    let midRight = arr[i][index + 1] == undefined ? false : arr[i][index + 1];
    console.log(`midRight is ${midRight}`);
    let botLeft = i == (arr.length - 1) || arr[i + 1][index - 1] == undefined ? false : arr[i + 1][index - 1];
    console.log(`botLeft is ${botLeft}`);
    let bot = i == (arr.length - 1) || arr[i + 1][index] == undefined ? false : arr[i + 1][index];
    console.log(`bot is ${bot}`);
    let botRight = i == (arr.length - 1) || arr[i + 1][index + 1] == undefined ? false : arr[i + 1][index + 1];
    console.log(`botRight is ${botRight}`);

    if (midLeft == symbol || midRight == symbol) {
        counter++
        console.log(`Counter ${symbol} is now ${counter}`);
        if ((counter == 2 && midLeft == symbol)) {
            getAdjacent(symbol, counter, arr, i, (index - 1));

        }
        else if ((counter == 2 && midRight == symbol))
            getAdjacent(symbol, counter, arr, i, (index + 1));
        if (counter == 2) {
            getAdjacent(symbol, counter, arr, i, (index));
        }
    }
    else if (top == symbol || bot == symbol) {
        counter++
        console.log(`Counter ${symbol} is now ${counter}`);
        if ((counter == 2 && top == symbol)) {
            getAdjacent(symbol, counter, arr, (i - 1), (index));

        }
        else if ((counter == 2 && bot == symbol))
            getAdjacent(symbol, counter, arr, (i + 1), (index));
        if (counter == 2) {
            getAdjacent(symbol, counter, arr, i, (index));
        }
    }
    else if (topLeft == symbol || botRight == symbol) {
        counter++
        console.log(`Counter ${symbol} is now ${counter}`);
        if ((counter == 2 && topLeft == symbol)) {
            getAdjacent(symbol, counter, arr, (i - 1), (index - 1));

        }
        else if ((counter == 2 && botRight == symbol))
            getAdjacent(symbol, counter, arr, (i + 1), (index + 1));
        if (counter == 2) {
            getAdjacent(symbol, counter, arr, i, (index));
        }
    }
    else if (topRight == symbol || botLeft == symbol) {
        counter++
        console.log(`Counter ${symbol} is now ${counter}`);
        if ((counter == 2 && topRight == symbol)) {
            getAdjacent(symbol, counter, arr, (i - 1), (index + 1));

        }
        else if ((counter == 2 && botLeft == symbol))
            getAdjacent(symbol, counter, arr, (i + 1), (index - 1));
        if (counter == 2) {
            getAdjacent(symbol, counter, arr, i, (index));
        }
    }



}

function getAdjacent(symbol, counter, arr, i, index) {
    let topLeft = i == 0 || arr[i - 1][index - 1] == undefined ? false : arr[i - 1][index - 1];
    console.log(`topLeft is ${topLeft}`);
    let top = i == 0 || arr[i - 1][index] == undefined ? false : arr[i - 1][index];
    console.log(`top is ${top}`);
    let topRight = i == 0 || arr[i - 1][index + 1] == undefined ? false : arr[i - 1][index + 1];
    console.log(`topRight is ${topRight}`);
    let midLeft = arr[i][index - 1] == undefined ? false : arr[i][index - 1];
    console.log(`midLeft is ${midLeft}`);
    let midRight = arr[i][index + 1] == undefined ? false : arr[i][index + 1];
    console.log(`midRight is ${midRight}`);
    let botLeft = i == (arr.length - 1) || arr[i + 1][index - 1] == undefined ? false : arr[i + 1][index - 1];
    console.log(`botLeft is ${botLeft}`);
    let bot = i == (arr.length - 1) || arr[i + 1][index] == undefined ? false : arr[i + 1][index];
    console.log(`bot is ${bot}`);
    let botRight = i == (arr.length - 1) || arr[i + 1][index + 1] == undefined ? false : arr[i + 1][index + 1];
    console.log(`botRight is ${botRight}`);

    if (midLeft == symbol && midRight == symbol) {
        counter++
        console.log(`Counter ${symbol} is now ${counter}`);


    }
    else if (top == symbol && bot == symbol) {
        counter++
        console.log(`Counter ${symbol} is now ${counter}`);
    }
    else if (topLeft == symbol && botRight == symbol) {
        counter++
        console.log(`Counter ${symbol} is now ${counter}`);
    }
    else if (topRight == symbol && botLeft == symbol) {
        counter++
        console.log(`Counter ${symbol} is now ${counter}`);
    }
}