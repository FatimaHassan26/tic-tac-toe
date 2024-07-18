const restartBtn= document.getElementById("restart-button")
const board = ["","","","","","","","",""];
let activePlayer= "X";
let winMessageText = document.getElementById('winMessage')
let gameOver=false;


const playGame = function (){
    clickCell();
    restartBtn.addEventListener("click", () =>{
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.innerHTML="";
            const index = cell.getAttribute('data-cell-index');
            board[index] = "";
        })
        console.log(board)
        winMessageText.innerHTML="";
    })
}

const clickCell = function(){
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener("click", () =>{
            const index = cell.getAttribute('data-cell-index');
            if (board[index] !== "" || gameOver) {
                return;
            }
            cell.innerHTML = activePlayer;
            board[index] = activePlayer;
            checkWin()
            
        })
    })
}

const allisFilled = function (){
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          return false;
        }
      }
      return true; 
}

const checkWin = function (){
    if (
        (board[0] === board[1] && board[1] === board[2] && board[0] !== "") ||
        (board[3] === board[4] && board[4] === board[5] && board[3] !== "") ||
        (board[6] === board[7] && board[7] === board[8] && board[6] !== "") ||
        (board[0] === board[3] && board[3] === board[6] && board[0] !== "") ||
        (board[1] === board[4] && board[4] === board[7] && board[1] !== "") ||
        (board[2] === board[5] && board[5] === board[8] && board[2] !== "") ||
        (board[0] === board[4] && board[4] === board[8] && board[0] !== "") ||
        (board[2] === board[4] && board[4] === board[6] && board[2] !== "")
    ){
        winMessageText.innerHTML = `Player ${activePlayer} Won!`
        gameOver= true;
    }
    else if (allisFilled()) {
        winMessageText.innerHTML = `Its a Draw!`
        gameOver= true;
    }
    else {
        switchTurn();
    
    } 
}

const switchTurn = function (){
    activePlayer = activePlayer === "X" ? "O" : "X";
}

playGame();
