const gameInfo = require('./game-info');
const words = require('./words');

const home = {
    HomePage: function(username) {
      return `
        <!doctype html>
        <html>
          <head>
            <title>Guesser</title>
            <link rel="stylesheet" href="/css/login.css">
          </head>
          <body class="background">
          <div id="express-login">
            <div id="express-data">
            <div class="heading-welcome">
              ${home.getUserData(username)}
                <div class="logout">
                    <form action="/logout" method="POST">
                        <button class="login-btn" type="submit">Logout</button>
                    </form>
                </div>
            </div>
              ${home.getUpdateForm()}
                    <div class="new-game">
                        <form action="/new-game" method="POST">
                            <button class="login-btn" type="submit">New Game</button>
                        </form>
                    </div></div>
              ${home.getWords(username)}
            </div>
        </div>
          </body>
        </html>`;
    },
    getUpdateForm: function() {
        return `<div class="word-guess"><div class="guess">
                  <form action="/guess" method="POST" class="search">
                    <input class="to-send" name="word" value="" placeholder="Enter your new word"/>
                    <button class="login-btn" type="submit">Guess</button>
                  </form>
                </div>`;
      },

      getMessage(username){
        if(gameInfo.gameStats[username].gameStatus === "WON"){
          message = "Congrats!!! You have Won!";
        }
        else if (gameInfo.gameStats[username].inputValidity == false){
          message = gameInfo.gameStats[username].reason;
        }
        else {
          message = "Try your guess!!";
        }
        return message;
      },

      getWords: function(username) {
        let wordList = ""; 
        words.forEach(element => {
            if(gameInfo.gameStats[username]?.guessWords[element]){
                let matchingCent = (gameInfo.gameStats[username].guessWords[element].match/element.length)*100;
                if(gameInfo.gameStats[username].guessWords[element].match==0)
                    wordList +=  "<li class='no-list'><span class='sub-word'>"+element+"</span><span class='icon'>("+gameInfo.gameStats[username].guessWords[element].match+")</span><div class='grey-border'><div class='red'></div></div></li>";
                else
                    wordList +=  "<li class='no-list'><span class='sub-word'>"+element+"</span><span class='icon'>("+gameInfo.gameStats[username].guessWords[element].match+")</span><div class='grey-border'><div class='green' style='width:"+matchingCent+"%'></div></div></li>";
            }      
            else
                wordList += "<li class='no-list'><span class='sub-word'>"+element+"</span><span class='icon'></span><div class='grey-border'><div class='grey'></div></div></li>";
        });

        return `<div class="list-border">
                <h2 class="heading">${home.getMessage(username)}</h2>
                 <ul>
                 ${wordList}
                 </ul>
                </div>`;
      },

      getUserData: function(username) {
        return `<div class="login-msg login-head">
                  <span class="greeting"> Hello, ${username}! </span>  
                  <span class="total"> Total Guess : ${gameInfo.gameStats[username]?.guessCounter}  </span> 
                  <span class="score"> Best Score : ${gameInfo.gameStats[username]?.bestScore} </span>
                </div>`;
      },
      
      createSessionId: function(){
        return uuidv4();

    },
};


module.exports = home;