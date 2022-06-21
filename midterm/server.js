const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const login = require('./login');
const home = require('./home');
const gameInfo = require('./game-info'); 

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/', (req, res) => {
    if(!req.cookies.sid || !gameInfo.session[req.cookies.sid])
        res.send(login.LoginPage(""));
    else
        {
            let sessionInfo = gameInfo.session[req.cookies.sid];
            let username = sessionInfo.username;
            res.send(home.HomePage(username));
        }
        
});

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
    const { username } = req.body;
    let validateLogin = login.validateUsername(username); 
    if(validateLogin.status === true){
        let sessonId = login.createSessionId();
        res.cookie('sid', sessonId);
        gameInfo.addSession(sessonId, username);
        res.redirect('/');
    } else {
        res.status(401);
        res.send(login.LoginPage(validateLogin.error));
    }
  
});

app.post('/logout', express.urlencoded({ extended: false }), (req, res) => {
    let sessionId = req.cookies.sid;
    gameInfo.removeSession(sessionId);
    res.clearCookie('sid');
    res.redirect('/');
});

app.post('/guess', express.urlencoded({ extended: false }), (req, res) => {
    const { word } =  req.body;
    let sessionId = req.cookies.sid;
    let username = gameInfo.session[sessionId].username;
    let status = gameInfo.pushGuessWord(username, word);
    res.redirect('/');
});

app.post('/new-game', express.urlencoded({ extended: false }), (req, res) => {
    let sessionId = req.cookies.sid;
    let username = gameInfo.session[sessionId].username;
    gameInfo.newGame(username);
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));