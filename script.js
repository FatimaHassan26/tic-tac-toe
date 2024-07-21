const Game = (() => {
    let board = ["","","","","","","","",""];

    const getBoard = () => board;

    return {
        getBoard
    };
})()

const players = (playerName, marker) => {
    return {playerName, marker}
}
const gameController = (() => {
    const restartBtn= document.getElementById("restart-button")
    const startBtn = document.getElementById('start-button')
    let winningMessageElement = document.getElementById('winning-message')
    let activePlayer;
    let player1;
    let player2;
    let player1Name;
    let player2Name;
    let winMessageText = document.getElementById('winMessage')
    let gameOver=false;
    const board = Game.getBoard()
    const input = document.getElementsByTagName("input")

    const playGame = function (){

        startBtn.addEventListener("click", () =>{
            player1Name = document.getElementById('Player1').value;
            player2Name = document.getElementById('Player2').value;
            player1 = players(player1Name, 'X')
            player2 = players(player2Name, 'O')
            activePlayer= player1;
            clickCell()
        })
        restartBtn.addEventListener("click", () =>{
            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell) => {
                cell.innerHTML="";
                const index = cell.getAttribute('data-cell-index');
                board[index] = ""
            })
            winMessageText.innerHTML="";
            playGame()
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
                cell.innerHTML = activePlayer.marker;
                board[index] =activePlayer.marker;
                checkWin();
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
            if (activePlayer.playerName === ""){
                winMessageText.innerHTML = `${activePlayer.marker} Won!`
            }
            else{
                winMessageText.innerHTML = `${activePlayer.playerName} Won!`
            }
            //winMessageText.innerHTML = `${activePlayer.playerName} Won!`
            winningMessageElement.classList.add('show');
        
            gameOver= true;
        }
        else if (allisFilled()) {
            winMessageText.innerHTML = `Its a Draw!`
            gameOver= true;
        }
        else {
            switchTurn()
        }
    }

    const switchTurn = function (){
        activePlayer = activePlayer === player1 ? player2 : player1;
    
    }

return { playGame };
})()

gameController.playGame();