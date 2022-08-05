const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const users = require('./users');
const info = require('./info');
const sessions = require('./sessions');

app.use(express.static('./build'));
app.use(express.json());
app.use(cookieParser());

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !sessions.isValidSessionId(sid)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { username } = info.sessions[sid] || {};
    const userData = users.findUser(username);
    res.json({ userData });
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;
    if (username) {
        const formattedUname = username.toLowerCase();
        const validateUser = users.Valid(formattedUname);
        if (!validateUser) {
            res.status(401).json({ error: 'auth-insufficient' });
            return;
        }
        if (formattedUname === 'dog') {
            res.status(403).json({ error: 'auth-insufficient' });
            return;
        }
        const sessionId = sessions.createSession(username);
        const userData = users.createUser(username);
        res.cookie("sid", sessionId);
        res.json({ userData });
    } else {
        res.status(400).json({ error: 'required-username' });
        return;
    }
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const { username } = sessions.isValidSessionId(sid);
    if (sid || sessions.isValidSessionId(sid)) {
        delete info.sessions[sid];
        res.clearCookie('sid');
    }
    res.json({ username });
});

app.post('/api/word', (req, res) => {
    const { message } = req.body;
    if (message) {
        const sid = req.cookies.sid;
        const { username } = info.sessions[sid];
        const userData = users.addWord(username, message);
        res.json({ userData });
    }
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
