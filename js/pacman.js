'use strict'
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    if (nextCell === CHERRY) updateScore(10);

    else if (nextCell === GHOST) {
        if (gPacman.isSuper === true) {
            nextCell = PACMAN
            for (var i = 0; i < gGhosts.length; i++) {
                if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                    gGhosts.splice(i, 1);
                    gDeleteGhosts++
                }
            } 
            console.log(+gDeleteGhosts);
        } else {
            gameOver();
            renderCell(gPacman.location, EMPTY)
            return;
        }
    } else if (nextCell === POWERFOOD) {
        if (gPacman.isSuper === true) return
        gPacman.isSuper = true
        setTimeout(() => {
            gPacman.isSuper = false
            for (var i = 0 ; i < gDeleteGhosts ; i++) {
                createGhost(gBoard)
                
            }gDeleteGhosts = 0
        }, 5000)
        console.log(gGhosts);
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);

    checkVictory(gBoard)
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}