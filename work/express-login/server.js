const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const login = require('./login');
const home = require('./home');
const userInfo = require('./user-info'); 
const error = require('./error');

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/', (req, res) => {
    // !userInfo.session[req.cookies.sessionId] only for handling dev server restarts
    if(!req.cookies.sessionId || !userInfo.session[req.cookies.sessionId])
        res.send(login.LoginPage());
    else
        {
            let sessionInfo = userInfo.session[req.cookies.sessionId];
            let username = sessionInfo.username;
            res.send(home.HomePage(username));
        }
        
});

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
    const { username } = req.body;
    let validateLogin = login.validateUsername(username); 
    if(validateLogin.status === true){
        let sessonId = login.createSessionId();
        res.cookie('sessionId', sessonId);
        userInfo.addSession(sessonId, username);
        res.redirect('/');
    } else {
        res.status(401);
        res.send(error.ErrorPage(validateLogin.error));
    }
  
});

app.post('/logout', express.urlencoded({ extended: false }), (req, res) => {
    res.clearCookie('sessionId');
    res.redirect('/');
});

app.post('/update', express.urlencoded({ extended: false }), (req, res) => {
    const { word } =  req.body;
    let sessionId = req.cookies.sessionId;
    let username = userInfo.session[sessionId].username;
    userInfo.updateWord(username, word);
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
