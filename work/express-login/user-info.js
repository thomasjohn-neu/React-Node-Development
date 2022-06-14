// stores session object with id as key and username as attribute
const session = {};
  
const word = {};

function addSession(sessionId, username) {
    session[sessionId] = {"username": username};
}

function removeSession(sessionId){
    delete session[sessionId];
}

function updateWord(username, value){
    word[username] = value;
}

function getWord(username){
    return word[username];  
}

const userInfo = {
    session,
    word,
    addSession,
    removeSession,
    getWord,
    updateWord,
};

module.exports = userInfo;
  
  