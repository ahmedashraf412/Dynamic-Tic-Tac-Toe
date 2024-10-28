const submitBtn = document.querySelector('.submit-btn');
let reverseCount;
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
let counterX = 1;
let counterO = 1;
let counter1 = 0;
let counter2 = 0;
let mouseCursor;
let value;

gameSubmit();

function newGameFun() {
    roundWon = false;
    newGame.addEventListener('click', () => {
        resetGame();
        document.querySelector(".current-player").innerHTML = `Current Player: ${currentPlayer}`;
        document.querySelector(".result").innerHTML = `Result: `;

        if ((rows >= 3 ) && columns >= 3 && (winNumber >= 3) && (winNumber <= rows) && (winNumber <= columns)) {
            buildGame(rows, columns);
            startGame();
            newGameFun();
        }
        else {
            alert("Minimum Number is 3");

        }
    });
}
function gameSubmit() {
    roundWon = false;
    submitBtn.addEventListener("click", () => {
        resetGame();
        
        rows = parseInt(document.querySelector("#rows").value);
        columns = parseInt(document.querySelector("#columns").value);
        winNumber = parseInt(document.querySelector("#win-number").value);
        // document.querySelector("#rows").value = "";
        // document.querySelector("#columns").value = "";
        // document.querySelector("#win-number").value = "";
        if ((rows >= 3 ) && columns >= 3 && (winNumber >= 3) && (winNumber <= rows) && (winNumber <= columns)) {
            document.querySelector(".current-player").innerHTML = `Current Player: ${currentPlayer}`;
            document.querySelector(".result").innerHTML = `Result: `;
            document.querySelector(".current-player").style.display = "block";
            document.querySelector(".result").style.display = "block";
            buildGame(rows, columns);
            startGame();
            newGameFun();
        }
        else {
            alert("Minimum Number is 3, Number of wins must be less than or equal number of rows and coloumns");
            document.querySelector(".current-player").style.display = "none";
            document.querySelector(".result").style.display = "none";
            document.querySelector(".restart").style.display ="none";

        }

    });
}
function buildGame(rows, columns) {
    
    document.querySelector(".restart").style.display ="block";
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
    if(currentPlayer == "X"){
        document.querySelectorAll(".xo-block").forEach((element)=>{
            element.style.cursor = "cell";
        })
    }
}
function startGame() {
    let countX = 0;
    let countO = 0;
    let total = 0;
    if (roundWon === true) {
        return
    }

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
                if (total === (rows * columns) && roundWon == false) {
                    result.innerHTML = "Result: Draw!";
                    return; // Stop further actions if game is over
                }
                if(currentPlayer == "X"){
                    document.querySelectorAll(".xo-block").forEach((element)=>{
                        element.style.cursor = "cell";
                    })
                }
                else if(currentPlayer == "O"){
                    document.querySelectorAll(".xo-block").forEach((element)=>{
                        element.style.cursor ="not-allowed";
                    })
                }
            }





            )

        }
        )
    }

}

function resetGame() {
    roundWon = false;
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
        if (counter == 2 && midLeft == symbol && midRight == symbol) {
            value = 1;
            getAdjacent(symbol, counter, arr, i, (index), false, value);
            console.log(`Counter 1 is ${counter1}`);
            console.log(`Counter 2 is ${counter2}`);
            if(counter2 < counter1 ){
                value = 1;
                getAdjacent(symbol, counter, arr, i, (index), true, value);
                console.log(`Counter 1 is ${counter1}`);
                console.log(`Counter 2 is ${counter2}`);
                counter = counter1 + counter2;
                console.log(`Count ${symbol} is = ${counter}`);
                if(counter == winNumber){
                    result.innerHTML = `${symbol} WON !`;
                    return roundWon = true;
                }
                if(counter2 < counter1 ){
                    value = 2;
                    getAdjacent(symbol, counter, arr, (i), (index), false, value);
                    console.log(`Counter 1 is ${counter1}`);
                    console.log(`Counter 2 is ${counter2}`);
                    counter = counter1 + counter2;
                    console.log(`Count ${symbol} is = ${counter}`);
                    if(counter == winNumber){
                        result.innerHTML = `${symbol} WON !`;
                        return roundWon = true;
                    }
                    if(counter2 < counter1 ){
                        value = 2;
                        getAdjacent(symbol, counter, arr, (i), (index), true, value);
                        console.log(`Counter 1 is ${counter1}`);
                        console.log(`Counter 2 is ${counter2}`);
                        counter = counter1 + counter2;
                        console.log(`Count ${symbol} is = ${counter}`);
                        if(counter == winNumber){
                            result.innerHTML = `${symbol} WON !`;
                            return roundWon = true;
                        }
                    }
                }
            }
        }
        else if (counter == 2 && midLeft == symbol  ) {
            value = 1;
            getAdjacent(symbol, counter, arr, i, (index - 1), false, value);

        }
        else if (counter == 2 && midRight == symbol  )
            value = 1;
            getAdjacent(symbol, counter, arr, i, (index + 1), true, value);
        
    }
     if (top == symbol || bot == symbol) {
         if( counter < 2 ) {
             counter++
         }
        
        console.log(`Counter ${symbol} is now ${counter}`);
        if (counter == 2 && top == symbol && bot == symbol) {
            value = 2;
            getAdjacent(symbol, counter, arr, i, (index), false,value);
            console.log(`Counter 1 is ${counter1}`);
            console.log(`Counter 2 is ${counter2}`);
            if(counter2 < counter1 ){
                value = 2;
                getAdjacent(symbol, counter, arr, i, (index), true,value);
                console.log(`Counter 1 is ${counter1}`);
                console.log(`Counter 2 is ${counter2}`);
                counter = counter1 + counter2;
                console.log(`Count ${symbol} is = ${counter}`);
                if(counter == winNumber){
                    result.innerHTML = `${symbol} WON !`;
                    return roundWon = true;
                }
                if(counter2 < counter1 ){
                    value = 1;
                    getAdjacent(symbol, counter, arr, (i), (index), false, value);
                    console.log(`Counter 1 is ${counter1}`);
                    console.log(`Counter 2 is ${counter2}`);
                    counter = counter1 + counter2;
                    console.log(`Count ${symbol} is = ${counter}`);
                    if(counter == winNumber){
                        result.innerHTML = `${symbol} WON !`;
                        return roundWon = true;
                    }
                    if(counter2 < counter1 ){
                        value = 1;
                        getAdjacent(symbol, counter, arr, (i), (index), true, value);
                        console.log(`Counter 1 is ${counter1}`);
                        console.log(`Counter 2 is ${counter2}`);
                        counter = counter1 + counter2;
                        console.log(`Count ${symbol} is = ${counter}`);
                        if(counter == winNumber){
                            result.innerHTML = `${symbol} WON !`;
                            return roundWon = true;
                        }
                    }
                }
            }
        }
        else if ((counter == 2 && top == symbol)) {
            value = 2;
            getAdjacent(symbol, counter, arr, (i - 1), (index),false,value);

        }
        else if ((counter == 2 && bot == symbol))
            value = 2;
            getAdjacent(symbol, counter, arr, (i + 1), (index), true,value);
        
    }
     if (topLeft == symbol || botRight == symbol) {
        if( counter < 2 ) {
            counter++
        }
        console.log(`Counter ${symbol} is now ${counter}`);
        if (counter == 2 && topLeft == symbol && botRight == symbol) {
            value = 3;
            getAdjacent(symbol, counter, arr, i, (index), false,value);
            console.log(`Counter 1 is ${counter1}`);
            console.log(`Counter 2 is ${counter2}`);
            if(counter2 < counter1 ){
                value = 3;
                getAdjacent(symbol, counter, arr, i, (index), true, value);
                console.log(`Counter 1 is ${counter1}`);
                console.log(`Counter 2 is ${counter2}`);
                counter = counter1 + counter2;
                console.log(`Count ${symbol} is = ${counter}`);
                if(counter == winNumber){
                    result.innerHTML = `${symbol} WON !`;
                    return roundWon = true;
                }
                if(counter2 < counter1 ){
                    value = 4;
                    getAdjacent(symbol, counter, arr, i, (index), true, value);
                    console.log(`Counter 1 is ${counter1}`);
                    console.log(`Counter 2 is ${counter2}`);
                    counter = counter1 + counter2;
                    console.log(`Count ${symbol} is = ${counter}`);
                    if(counter == winNumber){
                        result.innerHTML = `${symbol} WON !`;
                        return roundWon = true;
                    }
                    if(counter2 < counter1 ){
                        value = 4;
                        getAdjacent(symbol, counter, arr, i, (index), true, value);
                        console.log(`Counter 1 is ${counter1}`);
                        console.log(`Counter 2 is ${counter2}`);
                        counter = counter1 + counter2;
                        console.log(`Count ${symbol} is = ${counter}`);
                        if(counter == winNumber){
                            result.innerHTML = `${symbol} WON !`;
                            return roundWon = true;
                        }
                    }
                }
            }
        }
        else if ((counter == 2 && topLeft == symbol)) {
            value = 3;
            getAdjacent(symbol, counter, arr, (i - 1), (index - 1),false,value);

        }
        else if ((counter == 2 && botRight == symbol))
            value = 3;
            getAdjacent(symbol, counter, arr, (i + 1), (index + 1),true,value);
        
    }
     if (topRight == symbol || botLeft == symbol) {
        if( counter < 2 ) {
            counter++
        }
        console.log(`Counter ${symbol} is now ${counter}`);
        if (counter == 2 && topRight == symbol && botLeft == symbol) {
            value = 4;
            getAdjacent(symbol, counter, arr, i, (index), false,value);
            console.log(`Counter 1 is ${counter1}`);
            console.log(`Counter 2 is ${counter2}`);
            if(counter2 < counter1 ){
                value = 4;
                getAdjacent(symbol, counter, arr, i, (index), true,value);
                console.log(`Counter 1 is ${counter1}`);
                console.log(`Counter 2 is ${counter2}`);
                counter = counter1 + counter2;
                console.log(`Count ${symbol} is = ${counter}`);
                if(counter == winNumber){
                    result.innerHTML = `${symbol} WON !`;
                    return roundWon = true;
                }
                if(counter2 < counter1 ){
                    value = 3;
                    getAdjacent(symbol, counter, arr, i, (index), true, value);
                    console.log(`Counter 1 is ${counter1}`);
                    console.log(`Counter 2 is ${counter2}`);
                    counter = counter1 + counter2;
                    console.log(`Count ${symbol} is = ${counter}`);
                    if(counter == winNumber){
                        result.innerHTML = `${symbol} WON !`;
                        return roundWon = true;
                    }
                    if(counter2 < counter1 ){
                        value = 3;
                        getAdjacent(symbol, counter, arr, i, (index), true, value);
                        console.log(`Counter 1 is ${counter1}`);
                        console.log(`Counter 2 is ${counter2}`);
                        counter = counter1 + counter2;
                        console.log(`Count ${symbol} is = ${counter}`);
                        if(counter == winNumber){
                            result.innerHTML = `${symbol} WON !`;
                            return roundWon = true;
                        }
                    }
                }
            }
        }
        else if ((counter == 2 && topRight == symbol)) {
            value = 4;
            getAdjacent(symbol, counter, arr, (i - 1), (index + 1),false,value);

        }
        else if ((counter == 2 && botLeft == symbol))
            value = 4;
            getAdjacent(symbol, counter, arr, (i + 1), (index - 1),true,value);
        
    }

    


}

function getAdjacent(symbol, counter, arr, i, number, reverseCount, value) {
    console.log(`hi i am the number now ${number}`);
    
    let topLeft = i == 0 || arr[i - 1][number - 1] == undefined ? false : arr[i - 1][number - 1];
    console.log(`topLeft is ${topLeft}`);
    let top = i == 0 || arr[i - 1][number] == undefined ? false : arr[i - 1][number];
    console.log(`top is ${top}`);
    let topRight = i == 0 || arr[i - 1][number + 1] == undefined ? false : arr[i - 1][number + 1];
    console.log(`topRight is ${topRight}`);
    let midLeft = arr[i][number - 1] == undefined ? false : arr[i][number - 1];
    console.log(`midLeft is ${midLeft}`);
    let midRight = arr[i][number + 1] == undefined ? false : arr[i][number + 1];
    console.log(`midRight is ${midRight}`);
    let botLeft = i == (arr.length - 1) || arr[i + 1][number - 1] == undefined ? false : arr[i + 1][number - 1];
    console.log(`botLeft is ${botLeft}`);
    let bot = i == (arr.length - 1) || arr[i + 1][number] == undefined ? false : arr[i + 1][number];
    console.log(`bot is ${bot}`);
    let botRight = i == (arr.length - 1) || arr[i + 1][number + 1] == undefined ? false : arr[i + 1][number + 1];
    console.log(`botRight is ${botRight}`);

    if (midLeft == symbol && midRight == symbol && value == 1) {
        counter++
        console.log(`hello i am the numberes  [${i}],[${number}]`);
        console.log(`Counter ${symbol} is now ${counter}`);
        if(counter == winNumber ){
            result.innerHTML = `${symbol} WON !`;
            return roundWon = true;
        }
        
        // if(counter >= 3 && counter < winNumber &&  midLeft == symbol && midRight == symbol){
        //     getAdjacent(symbol, counter, arr, i, (number));
        // }
        if (counter >= 3 && counter < winNumber &&  midLeft == symbol && reverseCount == false && value == 1){
            counter1 = counter;
            if(counter == winNumber){
                result.innerHTML = `${symbol} WON !`;
                return roundWon = true;
            }
            console.log(`hello i am the numberes straight [${i}],[${number}]`);
            getAdjacent(symbol, counter, arr, i, (number-1),false,value);
            
           // console.log(`hi again i am the counter ${counter}`);
        }
        else if (counter >= 3 && counter < winNumber &&  midRight == symbol && reverseCount == true && value == 1){
            counter2 = counter-3;
            if(counter == winNumber){
                result.innerHTML = `${symbol} WON !`;
                return roundWon = true;
            }
            console.log(`hello i am the numberes reverse  [${i}],[${number}]`);
            getAdjacent(symbol, counter, arr, i, (number+1),true,value);
        }

    }
    else if (top == symbol && bot == symbol && value == 2) {
        counter++
        console.log(`hello i am the numberes  [${i}],[${number}]`);
        console.log(`Counter ${symbol} is now ${counter}`);
        if(counter == winNumber){
            result.innerHTML = `${symbol} WON !`;
            return roundWon = true;
        }
        if (counter >= 3 && counter < winNumber && top == symbol && reverseCount == false && value == 2){
            counter1 = counter;
            if(counter == winNumber){
                result.innerHTML = `${symbol} WON !`;
                return roundWon = true;
            }
            console.log(`hello i am the numberes straight[${i}],[${number}]`);
            getAdjacent(symbol, counter, arr, (i-1), (number),false,value);
            // console.log(`hi again i am the counter ${counter}`);
        }
        else if (counter >= 3 && counter < winNumber && bot == symbol && reverseCount == true && value == 2){
            counter2 = counter-3;
            if(counter == winNumber){
                result.innerHTML = `${symbol} WON !`;
                return roundWon = true;
            }
            console.log(`hello i am the numberes reverse [${i}],[${number}]`);
            getAdjacent(symbol, counter, arr, (i+1), (number),true,value);
        }
    }
    else if (topLeft == symbol && botRight == symbol && value == 3) {
        counter++
        console.log(`hello i am the numberes  [${i}],[${number}]`);
        console.log(`Counter ${symbol} is now ${counter}`);
        if(counter == winNumber){
            result.innerHTML = `${symbol} WON !`;
            return roundWon = true;
        }
        if (counter >= 3 && counter < winNumber && topLeft == symbol && reverseCount == false && value == 3){
            counter1 = counter;
            if(counter == winNumber){
                result.innerHTML = `${symbol} WON !`;
                return roundWon = true;
            }
            console.log(`hello i am the numberes straight [${i}],[${number}]`);
            getAdjacent(symbol, counter, arr, (i-1), (number-1), false,value);
            // console.log(`hi again i am the counter ${counter}`);
        }
        else if (counter >= 3 && counter < winNumber && botRight == symbol && reverseCount == true && value == 3){
            counter2 = counter-3;
            if(counter == winNumber){
                result.innerHTML = `${symbol} WON !`;
                return roundWon = true;
            }
            console.log(`hello i am the numberes reverse [${i}],[${number}]`);
            getAdjacent(symbol, counter, arr, (i+1), (number+1), true,value);
        }
    }
    else if (topRight == symbol && botLeft == symbol && value == 4) {
        counter++
        console.log(`hello i am the numberes  [${i}],[${number}]`);
        console.log(`Counter ${symbol} is now ${counter}`);
        if(counter == winNumber){
            result.innerHTML = `${symbol} WON !`;
            return roundWon = true;
        }
        if (counter >= 3 && counter < winNumber && topRight == symbol && reverseCount == false && value == 4){
            counter1 = counter;
            if(counter == winNumber){
                result.innerHTML = `${symbol} WON !`;
                return roundWon = true;
            }
            console.log(`hello i am the numberes straight [${i}],[${number}]`);
            getAdjacent(symbol, counter, arr, (i-1), (number+1), false,value);
            // console.log(`hi again i am the counter ${counter}`);
        }
        else if (counter >= 3 && counter < winNumber && botLeft == symbol && reverseCount == true && value == 4){
            counter2 = counter-3;
            if(counter == winNumber){
                result.innerHTML = `${symbol} WON !`;
                return roundWon = true;
            }
            console.log(`hello i am the numberes reverse [${i}],[${number}]`);
            getAdjacent(symbol, counter, arr, (i+1), (number-1), true,value);
        }
    }
    
    
}
