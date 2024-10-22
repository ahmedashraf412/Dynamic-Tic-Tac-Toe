const submitBtn = document.querySelector('.submit-btn');
let rows = 0;
let columns = 0;
let winNumber = 0;
let history = [];

getValue();



 function getValue() {
    submitBtn.addEventListener("click", () => {
        
            rows = document.querySelector("#rows").value;
            columns = document.querySelector("#columns").value;
            winNumber = document.querySelector("#win-number").value;
            if (rows && columns && winNumber >= 3) {
                buildGame();
                startGame();
        }
        else {
            alert("Minimum Number is 3");
            
        }
    });
}
function buildGame(){
    
}
function startGame(){
    
}
