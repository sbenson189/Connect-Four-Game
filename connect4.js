/** Connect Four
 
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 * 
 */


function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  htmlBoard = document.getElementById("board");                                                                                             //<--
  // TODO: add comment for this code
  var top = document.createElement("tr");         // creates table-row element assigned to the variable "top"
  top.setAttribute("id", "column-top");           // sets the "id" and "column-top" attributes to top
  top.addEventListener("click", handleClick);     // runs "handleClick" function when top is clicked on.

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");  // creates the table data cells for the board.
    headCell.setAttribute("id", x);               // sets the id name and x value for headCell.
    top.append(headCell);                         // appends headCell variable to top.
  }
  htmlBoard.append(top);                          // appends top to the htmlBoard, which we used getElementByID for at the beginning.

  // TODO: add comment for this code
  for (var y = 0; y < HEIGHT; y++) {              // y is set to 0, if y is less than HEIGHT (6), increment y by one.
    const row = document.createElement("tr");     // Iterates through the Height and creates rows based on the value of HEIGHT.
    for (var x = 0; x < WIDTH; x++) {             // x is set to 0, if y is less than WIDTH(7), increment x by one.
      const cell = document.createElement("td");  // Iterates through the width and creates table data "cells" based on the value of WIDTH. 
      cell.setAttribute("id", `${y}-${x}`);       // Sets the attribute for cells with id and `${y}-${x}` as the name, value.
      row.append(cell);                           // Appends cell to row (the columns to the rows.).
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--){
    if (!board[y][x]){
      return y;
    }
  }
 return null;
}
/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`player${currPlayer}`);
  placePiece = document.getElementById(`${y}-${x}`);
  placePiece.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    window.location.reload();
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
if (board.every(row => row.every(cell => cell))){
  return endGame("Game Was Tied!");
  
}
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }




  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();


// // Starts A New Game
// function newGame() {
//   newGameButton = document.getElementById("#newGameButton")
//   window.location.reload();
// }

// if (newGameButton.addEventListener("click", function (){ // If "New Game" Button is clicked, the page reloads for a new game to be played.
//     newGame();
//   }))