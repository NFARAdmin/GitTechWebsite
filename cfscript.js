//Enter your Javascript code here. You must rename this file with your initials for your first name and last name.
// Example John Doe will be jdscript.js

// Instructions from https://www.codebrainer.com/blog/tic-tac-toe-javascript-game
// step 1 of exercise
const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
// step 2 of exercise
const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false

// step 3 of exercise
startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X_CLASS)
		cell.classList.remove(PLAYER_O_CLASS)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

// step 4 of exercise
function handleCellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

// step 5 of exercise
function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = "It's a draw!"
	} else {
		winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`
	}
	winningMessageElement.classList.add('show')
}

// step 6 of exercise
function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}

// step 7 of exercise
function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

// step 8 of exercise
function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS)
	boardElement.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(PLAYER_O_CLASS)
	} else {
		boardElement.classList.add(PLAYER_X_CLASS)
	}
}

// step 9 of exercise
function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}