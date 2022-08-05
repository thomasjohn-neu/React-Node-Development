const { sessions } = require('./info');
const { v4: uuidv4 } = require('uuid');

function isValidSessionId(sid) {
    return sessions[sid];
};

function createSession(username) {
    const sid = uuidv4();
    sessions[sid] = { username };
    return sid;
};

module.exports = {
    createSession,
    isValidSessionId
};