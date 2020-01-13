//set the board width and height
const WIDTH = 7;
const HEIGHT = 6;

// active player: 1 or 2
let currPlayer = 1; 
// array of rows, each row is array of cells  (board[y][x])
let board = []; 


//creates board structure in JS
// board = array of rows, each row is an array of cells
function makeBoard() {
    for (let y = 0; y < HEIGHT; y++) {
      board.push(Array.from({ length: WIDTH }));
    }
  }


// make HTML table and row of column tops

function makeHtmlBoard() {
    const board = document.getElementById('board');
  
    // makes clickable place to add pieces to the column
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', handleClick);
  
    for (let x = 0; x < WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
  
    board.append(top);
  
    // makes the main part of the board
    for (let y = 0; y < HEIGHT; y++) {
      const row = document.createElement('tr');
  
      for (let x = 0; x < WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
  
      board.append(row);
    }
  }
  
  //given column x, return top empty y

  function findSpotForCol(x) {
    for (let y = HEIGHT - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  }


  //update DOM to place piece into HTML table

function placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  // announcement that the game has ended

function endGame(msg) {
    alert(msg);
  }




//click of column top

function handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
  
    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    board[y][x] = currPlayer;
    placeInTable(y, x);
    
    // check win
    if (checkForWin()) {
      return endGame(`Player ${currPlayer} won!`);
    }
    
    // check tie
    if (board.every(row => row.every(cell => cell))) {
      return endGame('Tie!');
    }
      
    // switch players
    currPlayer = currPlayer === 1 ? 2 : 1;
  }
  
//check board cell by cell for win
  
  function checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  cells: list of four (y, x) cells
      //  returns true if all are coordinates & all match currPlayer
  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < HEIGHT &&
          x >= 0 &&
          x < WIDTH &&
          board[y][x] === currPlayer
      );
    }
  
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        // get "check list" of 4 cells for each of the different ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
  
  makeBoard();
  makeHtmlBoard();
  