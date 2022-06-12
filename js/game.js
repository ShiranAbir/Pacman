'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const POWERFOOD = '🍭'
const CHERRY = '🍒'
var gEmptyCells = [];
var gCherryInterval

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gDeleteGhosts = 0
    console.log('hello')
    gBoard = buildBoard()
    getEmptyCell()
    createPacman(gBoard);
    createPowerFood(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(getCherry,15000)
    console.log(gGhosts);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    return board;
}



function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    renderCell(gPacman.location, '🪦')
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    var elModalGameOver = document.querySelector('.game-over-modal')
    elModalGameOver.style.display = 'block'
    gGame.score = 0;
}

function restartGame() {
    document.querySelector('h2 span').innerText = 0
    var elModalGameOver = document.querySelector('.game-over-modal')
    elModalGameOver.style.display = 'none'
    var elModalVictory = document.querySelector('.victory-modal')
    elModalVictory.style.display = 'none'
    init()
}

function checkVictory(gBoard) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === '.') {
                return false
            }
        }
    }victory()
} 

function victory() {
    gGame.score = 0
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    var elModalVictory = document.querySelector('.victory-modal')
    elModalVictory.style.display = 'block'
}

function createPowerFood(board) {
    var elPowerFood1 = {
        location: {
            i: 8,
            j: 8
        }
    }
    var elPowerFood2 = {
        location: {
            i: 1,
            j: 8
        }
    }
    var elPowerFood3 = {
        location: {
            i: 1,
            j: 1
        }
    }
    var elPowerFood4 = {
        location: {
            i: 8,
            j: 1
        }
    }
    board[elPowerFood1.location.i][elPowerFood1.location.j] = POWERFOOD
    board[elPowerFood2.location.i][elPowerFood2.location.j] = POWERFOOD
    board[elPowerFood3.location.i][elPowerFood3.location.j] = POWERFOOD
    board[elPowerFood4.location.i][elPowerFood4.location.j] = POWERFOOD
}

function getCherry() {
    var randomNum = parseInt(Math.random() * gEmptyCells.length);
    var emptyCell = gEmptyCells[randomNum];
    console.log(emptyCell);
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY);
}