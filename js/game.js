const body = document.getElementsByTagName('body')[0]
const versusSelector = document.querySelector('.versus-selector')
const light = document.getElementById('light')
const night = document.getElementById('night')

const displayTheme = document.querySelector('.display-theme')

const player1 = document.getElementById('player-1')
const player2 = document.getElementById('player-2')
const gameBoardContainer = document.getElementById('game-board-conatiner')
const gameBoard = document.getElementById('game-board')

const borders = gameBoard.children

const gameOver = document.querySelector('.game-over')
const whoWon = document.getElementById('who-won')
const playAgainButton = document.getElementById('play-again')

const tiles = document.querySelectorAll('.tile')
var places = ['', '', '', '', '', '', '', '', '']
const winTiles = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
const corners = [0, 2, 6, 8]
const edges = [1, 3, 5, 7]

var currentTurn = ''

var player1Symbol = ''
var player2Symbol = ''

var computerTileId = -1


if (localStorage.getItem('turn') != null) {
    if (localStorage.getItem('turn') == 'X') {
        player1Symbol = 'X'
        player2Symbol = 'O'
    }
    else if (localStorage.getItem('turn') == 'O') {
        player1Symbol = 'O'
        player2Symbol = 'X'
    }
}
else {
    player1Symbol = 'X'
    player2Symbol = 'O'
    localStorage.setItem('turn', player2Symbol)
}

const gameBoardWidth = gameBoardContainer.clientWidth
const gameBoardHeight = gameBoardContainer.clientHeight


gameBoard.style.width = Math.min(gameBoardWidth, gameBoardHeight) + 'px'

if (player1Symbol == 'X') {
    currentTurn = player1Symbol
    player1.style.color = 'rgba(0, 102, 255)'
    player2.style.color = 'rgba(255, 0, 0, 0.5)'
}
else {
    currentTurn = player2Symbol
    player1.style.color = 'rgba(0, 102, 255, 0.5);'
    player2.style.color = '#f00'
}

if (localStorage.getItem('vs') == 'c') {
    player1.innerHTML = localStorage.getItem('name') + ' :- ' + player1Symbol
    player2.innerHTML = 'Computer :- ' + player2Symbol

    if (currentTurn == player1Symbol) {
        for (var i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', handlePlayer1Click, false)
        }
    }
    else {
        computerClick(places)
    }
}

else if (localStorage.getItem('vs') == 'p') {
    player1.innerHTML = localStorage.getItem('name-1') + ' :- ' + player1Symbol
    player2.innerHTML = localStorage.getItem('name-2') + ' :- ' + player2Symbol



    for (var i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener('click', handlePlayerClick, false)
    }
}

function handlePlayerClick(tile) {

    if (tile.target.tagName != document.createElement('img').tagName) {
        if (!document.getElementById(tile.target.id).hasChildNodes()) {
            clickTile(tile.target.id, currentTurn)

            if (checkWon(places, currentTurn)) {

                for (var i = 0; i < tiles.length; i++) {
                    tiles[i].removeEventListener('click', handlePlayerClick, false)
                }

                gameOver.style.display = 'flex'

                if (currentTurn == player1Symbol) {
                    whoWon.innerHTML = player1.innerHTML.slice(0, player1.innerHTML.length - 5) + ' ' + 'won!..'
                }
                else {
                    whoWon.innerHTML = player2.innerHTML.slice(0, player2.innerHTML.length - 5) + ' ' + 'won!..'
                }


                if (localStorage.getItem('turn') == 'X') {
                    localStorage.setItem('turn', player2Symbol)
                }
                else if (localStorage.getItem('turn') == 'O') {
                    localStorage.setItem('turn', player2Symbol)
                }
            }

            else if (checkDraw(places)) {
                gameOver.style.display = 'flex'

                whoWon.innerHTML = 'Match Drawn!..'

                if (localStorage.getItem('turn') == 'X') {
                    localStorage.setItem('turn', player2Symbol)
                }
                else if (localStorage.getItem('turn') == 'O') {
                    localStorage.setItem('turn', player2Symbol)
                }

            }
            else {
                if (currentTurn == player1Symbol) {
                    currentTurn = player2Symbol
                    player1.style.color = 'rgba(0, 102, 255, 0.5)'
                    player2.style.color = 'rgb(255, 0, 0)'

                }
                else {
                    currentTurn = player1Symbol
                    player1.style.color = 'rgb(0, 102, 255)'
                    player2.style.color = 'rgba(255, 0, 0, 0.5)'
                }
            }
        }
    }


}


function handlePlayer1Click(tile) {

    if (tile.target.tagName != document.createElement('img').tagName) {
        if (!document.getElementById(tile.target.id).hasChildNodes()) {
            clickTile(tile.target.id, currentTurn)
            for (var i = 0; i < tiles.length; i++) {
                tiles[i].removeEventListener('click', handlePlayer1Click, false)
            }

            if (checkWon(places, currentTurn)) {

                gameOver.style.display = 'flex'
                if (currentTurn == player1Symbol) {
                    whoWon.innerHTML = player1.innerHTML.slice(0, player1.innerHTML.length - 5) + ' ' + 'won!..'
                }
                else {
                    whoWon.innerHTML = 'Oops! You Lost!..'
                }



                if (localStorage.getItem('turn') == 'X') {
                    localStorage.setItem('turn', player2Symbol)
                }
                else if (localStorage.getItem('turn') == 'O') {
                    localStorage.setItem('turn', player2Symbol)
                }
            }

            else if (checkDraw(places)) {
                gameOver.style.display = 'flex'

                whoWon.innerHTML = 'Match Drawn!..'

                if (localStorage.getItem('turn') == 'X') {
                    localStorage.setItem('turn', player2Symbol)
                }
                else if (localStorage.getItem('turn') == 'O') {
                    localStorage.setItem('turn', player2Symbol)
                }

            }

            else {
                if (currentTurn == player1Symbol) {
                    currentTurn = player2Symbol
                    player1.style.color = 'rgba(0, 102, 255, 0.5)'
                    player2.style.color = 'rgb(255, 0, 0)'

                }
                else {
                    currentTurn = player1Symbol
                    player1.style.color = 'rgb(0, 102, 255)'
                    player2.style.color = 'rgba(255, 0, 0, 0.5)'
                }

                
                computerClick(places)
                
            }
        }
    }
}



function computerClick(places) {

    if (localStorage.getItem('difficulty') == 'easy') {
        while (true) {
            computerTileId = Math.floor(Math.random() * 10)
            if (places[computerTileId - 1] == '') {
                break
            }
        }
    }
    else if (localStorage.getItem('difficulty') == 'medium') {
        const playerWin = playerCanWin(places, player1Symbol)
        const playerWinOrNot = playerWin[1]
        const playerWinPos = playerWin[0]

        if (!playerWinOrNot) {
            while (true) {
                computerTileId = Math.floor(Math.random() * 10)
                if (places[computerTileId - 1] == '') {
                    break
                }
            }
        }
        else {
            computerTileId = playerWinPos
        }

    }
    else if (localStorage.getItem('difficulty') == 'hard') {

        const computerWin = playerCanWin(places, player2Symbol)
        const computerWinOrNot = computerWin[1]
        const computerWinPos = computerWin[0]

        if (!computerWinOrNot) {
            const playerWin = playerCanWin(places, player1Symbol)
            const playerWinOrNot = playerWin[1]
            const playerWinPos = playerWin[0]
            if (!playerWinOrNot) {
                if(places[4] == ''){
                    computerTileId = 5
                }
                else if(places[4] == player1Symbol  ){
                    while (true) {
                        computerTileId = corners[Math.floor(Math.random() * 4)] + 1
                        if (places[computerTileId - 1] == '') {
                            break
                        }
                    }
                }
                else{
                    if(lenghtOfPlaces(places) == 3){
                        const adj = isAdjacent(places)
                        const alt = isAlternate(places)
                        if(adj){
                            while(true){
                                computerTileId = Math.floor(Math.random() * 2)
                                if(adj == 1 || adj == 7){
                                    if(computerTileId == 0){
                                        computerTileId = 3
                                    }
                                    else{
                                        computerTileId = 5
                                    }
                                    break
                                }
                                else if(adj == 3 || adj == 5){
                                    if(computerTileId == 0){
                                        computerTileId = 1
                                    }
                                    else{
                                        computerTileId = 7
                                    }
                                    break
                                }
                            }
                            computerTileId += 1
                        }
                        else if(alt){
                            while (true) {
                                computerTileId = edges[Math.floor(Math.random() * 4)] + 1
                                if (places[computerTileId] == '') {
                                    break
                                }
                            }
                        }
                        else{

                        }
                    }
                    else{
                        while (true) {
                            computerTileId = Math.floor(Math.random() * 10)
                            if (places[computerTileId - 1] == '') {
                                break
                            }
                        }
                    }
                }
            }
            else {
                computerTileId = playerWinPos
            }
        }
        else{
            computerTileId = computerWinPos
        }
    }

    clickTile(computerTileId, currentTurn)
    if (checkWon(places, currentTurn)) {

        gameOver.style.display = 'flex'
        if (currentTurn == player1Symbol) {
            whoWon.innerHTML = player1.innerHTML.slice(0, player1.innerHTML.length - 5) + ' ' + 'won!..'
        }
        else {
            whoWon.innerHTML = player2.innerHTML.slice(0, player2.innerHTML.length - 5) + ' ' + 'won!..'
        }

        if (localStorage.getItem('turn') == 'X') {
            localStorage.setItem('turn', player2Symbol)
        }
        else if (localStorage.getItem('turn') == 'O') {
            localStorage.setItem('turn', player2Symbol)
        }
    }

    else if (checkDraw(places)) {
        gameOver.style.display = 'flex'

        whoWon.innerHTML = 'Match Drawn!..'

        if (localStorage.getItem('turn') == 'X') {
            localStorage.setItem('turn', player2Symbol)
        }
        else if (localStorage.getItem('turn') == 'O') {
            localStorage.setItem('turn', player2Symbol)
        }

    }

    else {
        if (currentTurn == player1Symbol) {
            currentTurn = player2Symbol
            player1.style.color = 'rgba(0, 102, 255, 0.5)'
            player2.style.color = 'rgb(255, 0, 0)'
        }
        else {
            currentTurn = player1Symbol
            player1.style.color = 'rgb(0, 102, 255)'
            player2.style.color = 'rgba(255, 0, 0, 0.5)'
        }

        for (var i = 0; i < tiles.length; i++) {
            tiles[i].addEventListener('click', handlePlayer1Click, false)
        }
    }
}


function clickTile(tileId, symbol) {

    
    places[tileId - 1] = symbol
    

    const imgSymbol = document.createElement('img')
    if (symbol == 'X') {
        imgSymbol.style.width = '60%'
        if(localStorage.getItem('theme') == null){
            imgSymbol.src = './assets/x-light.png'
        }
        else if(localStorage.getItem('theme') == 'light'){
            imgSymbol.src = './assets/x-light.png'
        }
        else{
            imgSymbol.src = './assets/x-night.png'
        }
    }
    else if (symbol == 'O') {
        imgSymbol.style.width = '74%'
        if(localStorage.getItem('theme') == null){
            imgSymbol.src = './assets/o-light.png'
        }
        else if(localStorage.getItem('theme') == 'light'){
            imgSymbol.src = './assets/o-light.png'
        }
        else{
            imgSymbol.src = './assets/o-night.png'
        }
    }
    document.getElementById(tileId).appendChild(imgSymbol)
}

function checkWon(places, player) {
    for (var i = 0; i < winTiles.length; i++) {
        if ((places[winTiles[i][0]] == places[winTiles[i][1]]) && (places[winTiles[i][1]] == places[winTiles[i][2]]) && (places[winTiles[i][2]] == player)) {
            return true
        }
    }
    return false
}

function checkDraw(places) {
    for (var i = 0; i < places.length; i++) {
        if (places[i] == '') {
            return false
        }
    }
    return true
}

function playerCanWin(places, player) {
    for (var i = 0; i < winTiles.length; i++) {
        if ((places[winTiles[i][0]] == places[winTiles[i][1]]) && places[winTiles[i][0]] == player && places[winTiles[i][2]] == '') {
            return [winTiles[i][2] + 1, true]
        }
        else if ((places[winTiles[i][1]] == places[winTiles[i][2]]) && places[winTiles[i][1]] == player && places[winTiles[i][0]] == '') {
            return [winTiles[i][0] + 1, true]
        }
        else if ((places[winTiles[i][0]] == places[winTiles[i][2]]) && places[winTiles[i][0]] == player && places[winTiles[i][1]] == '') {
            return [winTiles[i][1] + 1, true]
        }
    }
    return [-1, false]
}

function isAdjacent(places){
    for(var i = 0; i < edges.length; i++){
        if(places[edges[i]] == 'X'){

            return edges[i]
        }
    }
    return false
}

function isAlternate(places){
    if(places[0] == places[7] || places[3] == places[5]){
        return true
    }
    return false
}

function lenghtOfPlaces(places){
    let lenOfPlaces = 0
    for(var i = 0; i < places.length; i++){
        if(places[i] != ''){
            lenOfPlaces += 1
        }
    }
    return lenOfPlaces
}


playAgainButton.onclick = () => {
    window.location.reload()
}

light.onclick = () => {
    light.style.display = 'none'
    night.style.display = 'flex'
    night.style.color = 'white'
    body.style.backgroundColor = '#0D1821'
    displayTheme.style.border = '1px solid white'
    for(var i = 0; i < borders.length; i++){
        borders[i].classList.remove('theme')
        borders[i].classList.add('theme-change')
    }
    for(var i = 0; i < borders.length; i++){
        if(borders[i].children[0]){
            if(borders[i].children[0].src[borders[i].children[0].src.length - 11] == 'x'){
                borders[i].children[0].src = './assets/x-night.png'
            }
            else if(borders[i].children[0].src[borders[i].children[0].src.length - 11] == 'o'){
                borders[i].children[0].src = './assets/o-night.png'
            }
        }
    }

    gameOver.style.backgroundColor = 'rgb(191, 191, 206)'

    localStorage.setItem('theme', 'night')
}
night.onclick = () => {
    night.style.display = 'none'
    light.style.display = 'flex'
    light.style.color = 'black'
    body.style.backgroundColor = 'white'
    displayTheme.style.border = '1px solid #0D1821'

    for(var i = 0; i < borders.length; i++){
        borders[i].classList.remove('theme-change')
        borders[i].classList.add('theme')
    }
    for(var i = 0; i < borders.length; i++){
        if(borders[i].children[0]){
            if(borders[i].children[0].src[borders[i].children[0].src.length - 11] == 'x'){
                borders[i].children[0].src = './assets/x-light.png'
            }
            else if(borders[i].children[0].src[borders[i].children[0].src.length - 11] == 'o'){
                borders[i].children[0].src = './assets/o-light.png'
            }
        }
    }
    gameOver.style.backgroundColor = 'ghostwhite'

    localStorage.setItem('theme', 'light')
}


if (localStorage.getItem('theme') == 'night') {
    light.click()
}
