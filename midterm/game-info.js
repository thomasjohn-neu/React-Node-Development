const words = require("./words");
const gameUtils = require('./game-utils');


// stores session object with id as key and username as attribute
const session = {};
  
const gameStats = {};

function addSession(sessionId, username) {
    session[sessionId] = {"username": username};
    if(gameStats[username]==null)
        newGame(username);
}

function removeSession(sessionId){
    delete session[sessionId];
}

function generateSecretWord(){
    return words[Math.floor(Math.random() * words.length)];
}

function newGame(username){
    let secretWord =  generateSecretWord();
    console.log("Username: ", username, "   SecretWord: ", secretWord);
    if(gameStats[username]==undefined){
        gameStats[username] = {};
        gameStats[username].bestScore = 0;
    }
    gameStats[username].secretWord = secretWord;
    gameStats[username].guessWords = {};
    gameStats[username].guessCounter = 0;
    gameStats[username].gameStatus = "IN-PROGRESS";

}

function validateWord(value, username){ 
    // empty input
    if(!value){
        gameStats[username].reason = "Oops, You didnt guess anyhthing, Try again!";
        return false;
    }

    // check for previous guesses
    if(gameStats[username].guessWords[value] != null){
        gameStats[username].reason = "Word already guessed in the same game!";
        return false;
    }
        
    // check for input from allowed word list    
    let match = false;
    gameStats[username].reason = "Word guessed outside from the available options!";
    words.forEach(element => {
        if(gameUtils.exactMatch(element, value)){
            match = true;
            gameStats[username].reason = "Valid input";
        }
            
    });
    return match;
}

function increaseGuessCounter(username){
    gameStats[username].guessCounter += 1;
}

function pushGuessWord(username, value){
    if(gameStats[username].secretWord==null || gameStats[username].gameStatus === "WON" || gameStats[username].gameStatus === "NEW-GAME")
        newGame(username);
    increaseGuessCounter(username);
    if(!validateWord(value, username)){
        gameStats[username].inputValidity = false;
        return gameStats[username];
    }
    gameStats[username].inputValidity = true;
    
    secretWord = gameStats[username].secretWord;
    if(gameUtils.exactMatch(value, secretWord))
        endGame(username);
    match = computeMatching(value, secretWord)
    gameStats[username].guessWords[value] = match;
    return gameStats[username];
}

function computeMatching(word, secretWord){
    match = gameUtils.compare(secretWord, word);
    return {secretWord, "match": match};
}

function getSecretWord(username){
    return gameStats[username].secretWord;
}

function endGame(username){
    gameStats[username].gameStatus = "WON";
    if(gameStats[username].guessCounter<gameStats[username].bestScore || gameStats[username].bestScore==0)
        gameStats[username].bestScore = gameStats[username].guessCounter;
}

const gameInfo = {
    session,
    addSession,
    removeSession,
    getSecretWord,
    newGame,
    pushGuessWord,
    gameStats,
};

module.exports = gameInfo;
  
  