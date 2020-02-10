# Connect Four Game

Connect Four is played on a grid, 7 wide by 6 deep, with two players, 1 (yellow) and 2 (pink). The players alternate turns, dropping a piece of their color in the top of a column. The piece will fall down to the further-down unoccupied slot.

The game is won when a player makes four in a row (horizontally, vertically, or diagonally). The game is a tie if the entire board fills up without a winner.
 
## Functionality

The JavaScript:
- The makeBoard() function is implemented and sets the global board variable to be an array of 6 arrays (height), each containing 7 items (width).
- The makeHTMLBoard() function sets the board variable to the HTML board DOM node.
- The placeInTable & Piece CSS add a div inside the correct td cell in the HTML game board. This has the piece class on it, and has a class for whether the current player is 1 or 2, like p1 or p2.
- The handleClick() function adds a check for “is the entire board filled”. Adds code to switch currPlayer between 1 and 2. 
- The findSpotForCol and endGame functions find the lowest empty spot in the game board and returns the y coordinate (or null if the column is filled). The endGame function runs and alerts which user has won!

## Screenshot of Application

![Image of application](https://github.com/crwirth/ConnectFour/blob/master/Screen%20Shot%202020-02-10%20at%2012.17.33%20PM.png)

You can access the Connect Four game and play at:
https://crwirth.github.io/ConnectFour/
