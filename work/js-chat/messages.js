const messages = [];
messages.push({"username": "Sachin", "message": "Hello World!"});
messages.push({"username": "Rahul", "message": "Hello Sachin!"});

function makeMessageList() {
 
}

function getMessages() {
  return messages;
};

function addMessage(messageString, username) {
  messages.push({"username": username, "message": messageString})
};

module.exports = {
  makeMessageList,
  getMessages,
  addMessage,
};
