var activePlayer
var playersPostion
var snakesAndLadders
var isPlaying

for (var i = 0; i < 100; i++) {
    var cell = document.createElement("div")

    cell.classList.add("cell")

    document.getElementById("board").appendChild(cell)
}

var board = document.getElementsByClassName("cell")

function startGame() {
    activePlayer = 0
    playersPostion = [0 , 0]
    snakesAndLadders = new Array(100)
    isPlaying = true

    for (var i = 0; i < 100; i++) {
        board[i].innerHTML = ''
    }

    board[0].innerHTML = "&#9823"
    
    for (var i = 0; i < 20; i++) {
        var position = Math.floor(Math.random() * 100)
    
        var dest = Math.floor(Math.random() * 100)
    
        if (position != dest) {
            snakesAndLadders[position] = dest
        }
    }
    
    document.getElementById('active-player').innerText = "Active player: 1"
}

startGame()

document.getElementById("roll").addEventListener("click", function() {
    if (isPlaying) {
        document.getElementById('message').innerText = ''
    
        var dice = Math.floor(Math.random() * 6 + 1)
    
        var diceDOM = document.getElementById("dice")
    
        diceDOM.src = "img/dice-" + dice + ".png"
        diceDOM.style.display = 'block'
    
        board[playersPostion[activePlayer]].innerHTML = ""
    
        playersPostion[activePlayer] += dice
    
        if (snakesAndLadders[playersPostion[activePlayer]] != undefined) {
            if (snakesAndLadders[playersPostion[activePlayer]] > playersPostion[activePlayer]) {
                document.getElementById('message').innerText = "You took a ladder!"
            } else {
                document.getElementById('message').innerText = "You've been hit by a snake!"
            }
            playersPostion[activePlayer] = snakesAndLadders[playersPostion[activePlayer]]
        }
    
        if (playersPostion[activePlayer] > 99) {
            document.getElementById('message').innerText = "Player " + (activePlayer + 1) + " won!"

            isPlaying = false

            return
        }
    
        board[playersPostion[activePlayer]].innerHTML = "&#9823"
    
        activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0)
    
        document.getElementById('active-player').innerText = "Active player: " + (activePlayer + 1)
    }
})

document.getElementById("reset").addEventListener("click", startGame)
