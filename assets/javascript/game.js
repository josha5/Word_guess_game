const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
//console.log(alphabet);

puzzleList = [ "kitten" ];

 /*puzzleList = [
	"alphabet", "kitten", "blasphemy", "telephone", "sinkhole", "hammer", "technical", "banana", "elementary", "laptop", "excellent", "famous", "cheese", "actress", "landlord", "interest", "lipstick", "cardboard", "hungry", "inventory", "windblown", "attempt", "liquid", "tranquil", "effect", "alcohol", "strawberry", "clinic", "alchemy", "figure", "virtual", "melee", "gravity", "sugar", "piglet", "orange"
]; */

const randomWord = function(puzzleList) {
    // Grabbing random from puzzleList
    let puzzleWord = puzzleList.splice(Math.floor(Math.random() * puzzleList.length), 1);

    // splitting puzzle word into an array of letters
    puzzleWord = puzzleWord[0].split("");

    // Mapping over split puzzleword and returning the unicode value in the array
    let puzzleWordMap = puzzleWord.map(l => {
        return l.charCodeAt(0);
    });
    return puzzleWordMap;
}

const puzzleWordMap = randomWord(puzzleList);
// console.log(puzzleWordMap.length);
const createLetterBoxes = function(wordLength) {
    let i = 0;
    while(i < wordLength) {
        let letterBox = document.createElement("div");
        letterBox.className = "letterBox";
        document.querySelector("#hangManWord").appendChild(letterBox);
        i++;
    }
}

createLetterBoxes(puzzleWordMap.length);
let selectedLetters = [];

const checkGuessLetter = function(selectedLetters, puzzleWordMap) {
    console.log(selectedLetters, puzzleWordMap);
    let incorrectAnswers = [];
    
    // looping over selectedLetters array and checking puzzleMap indexOf each letter
    selectedLetters.forEach((letter, index, arr) => {
        
        // if puzzleWordMap index of letter is not equal to -1 append paragraph tag.
        if(puzzleWordMap.indexOf(letter) !== -1) {
            
            let correctLetter = document.createElement("p");
            
            correctLetter.className = 'text-center';
            
            // setting the inner html of the p tag to the letter from the char code value.
            correctLetter.innerHTML = String.fromCharCode(arr[index]);
            
            let letterPosition = puzzleWordMap.indexOf(letter);
            
            // convert all boxes with the class of letter box to an array.
            let letterBoxArray = Array.from(document.querySelectorAll(".letterBox"));
            
                // looping over array and finding index match of the letter position.
                letterBoxArray.forEach((box, index) => {
                    if(letterPosition === index) {
                        box.appendChild(correctLetter);
                    }
                });
            
            puzzleWordMap[letterPosition] = 0;
            
            checkGuessLetter(selectedLetters, puzzleWordMap);
            
        } else {
            // if the letter has an index of -1 populate incorrectAnswers
            incorrectAnswers.push(arr[index]);
        }
    });
}

// Handling keypress event
const getGuessInput = function(e) {
    selectedLetters.push(e.charCode)
    checkGuessLetter(selectedLetters, puzzleWordMap);
}


document.querySelector('#guessInput').addEventListener("keypress", getGuessInput);