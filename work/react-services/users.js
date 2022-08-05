const { users } = require('./info');

function createUser(username, message = '') {
  users[username] ? ' ' : users[username] = { username, message };
  return users[username];
};

function addWord(username, message) {
  if (users[username]) {
    users[username].message = message;
  }
  return users[username];
};

function findUser(username) {
  if (users[username]) {
    return users[username];
  }
};

function Valid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

module.exports = {
  Valid,
  createUser,
  findUser,
  addWord
};