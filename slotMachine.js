const prompt = require("prompt-sync")()

const ROWS = 3
const COLUMNS = 3

const SYMBOL_COUNT = {
    "A": 2,
    "B": 3,
    "C": 4,
    "D": 5
}

const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 1
}




const deposit = () => {

    while(true){
        const depositAmnt = prompt("Enter your deposit: ");
        const numberDepositAmount = parseFloat(depositAmnt);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Not a valid bet")
        }
        else
            return numberDepositAmount;
    }
}

const numberOfLines = () => {

    while(true){
        const lines = prompt("Enter number of lines you want to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if(isNaN(lines) || numberOfLines >= 4 || numberOfLines <= 0){
            console.log("Not a valid selection of lines")
        }
        else
            return numberOfLines;
    }
}

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter your bet per line: ");
        const numberBet= parseFloat(bet);

        if(isNaN(lines) || numberBet > balance / lines || numberBet <=0 ){
            console.log("Not a valid bet, your balance is: ", balance)
        }
        else
            return numberBet;
    }
}

const spin = () => {
    const symbols = []

    for(const [symbol, count] of Object.entries(SYMBOL_COUNT)){
        for(let i = 0; i < count ; i++)
        symbols.push(symbol)
    }


    const reels = []
    for(let i = 0; i < COLUMNS ; i++){
        reels.push([])
        const reels_symbols = [...symbols]

        for(let j = 0; j < ROWS ;j++) {
            const randomNum = Math.floor(Math.random() * reels_symbols.length)
            const selectedSymbol = reels_symbols[randomNum]
            reels[i].push(selectedSymbol)
            reels_symbols.splice(randomNum, 1);
        }
    }

    return reels
}

const transpose = (reels) => {
    const transposed_reels = []

    for(let i = 0 ; i < ROWS ; i++) {
        transposed_reels.push([])
        for(let j = 0; j <  COLUMNS ; j++) { 
            transposed_reels[i].push(reels[j][i])
        }
    }

    return transposed_reels;
}

const printReels = (reels) => {
    for(let i = 0; i < ROWS ; i++) { 

        let reelsRows = "";
        for(let j = 0; j< COLUMNS; j++) {
            reelsRows += reels[i][j]
            
            if(j != COLUMNS - 1)
            reelsRows += "|"
        }
        console.log(reelsRows)
    }
}

const getWinnings = (reels, betAmount, lines) => {

    let total_winnings = 0
    for(let i = 0 ; i < lines ; i++) {
        const lineDetails = reels[i]

        let allSame = true
        for(const [symbol, i] of lineDetails) {
            if(symbol != lineDetails[0]){
                allSame = false
                break
            }
        }

        if(allSame == true){
            winningSymbol = lineDetails[0]
            total_winnings += (betAmount * SYMBOL_VALUES[winningSymbol])
        }
    }
    return total_winnings
}

let initialBalance = deposit()
console.log("Valid initial amount: ", initialBalance)

let playAgainNumber;
do {
    const lines = numberOfLines()
    console.log("Line selected are: " , lines)

    const betAmount = getBet(initialBalance, lines)
    console.log("Bet is of: ", betAmount)

    const reels = spin()

    const transpose_reels = transpose(reels)
    console.log(transpose_reels)

    printReels(transpose_reels)

    const winningOfThisRound =  getWinnings(transpose_reels, betAmount, lines)

    if(winningOfThisRound > 0){
        initialBalance += winningOfThisRound
        console.log("Congratulations, you won: " , winningOfThisRound , " in this round. Your current balance is: ", initialBalance)
    }
    else {
        initialBalance -= betAmount * lines
        console.log("You lost " , betAmount * lines , " in this round. Your current balance is: ", initialBalance)
    }

    const playAgain = prompt("Play Again?")
    playAgainNumber = parseFloat(playAgain)
} while(playAgainNumber > 0)

console.log("Nice plaiyng, come soon :)")