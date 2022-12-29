const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
};

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

function getActiveUsers(){
  let users = {}
  for (const session in sessions) {
    users[sessions[session].username] = sessions[session].username;
  }
  return users;
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getActiveUsers,
};
