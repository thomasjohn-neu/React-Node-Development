const chatWeb = {
  chatPage: function(chat) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {    
    let chatList = '';
    for(let i=0; i < chat.messages.length; i++){
      chatList = chatList + `<li class="order">
                              <div class="message">
                                <div class="sender-info">
                                  <img class="avatar" alt="avatar" src="images/avatar-${chat.messages[i].sender}.jpg"/>
                                    <span class="username-chat">${chat.messages[i].sender}</span>
                                </div>
                                <p class="message-text">${chat.messages[i].text}</p>
                              </div>
                            </li>`;
    }
    return `<ol class="messages">` + chatList + `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <div class="sender-info">
            <img class="avatar" alt="avatar" src="images/avatar-${user}.jpg"/>
              <span class="username-chat">${user}</span>
          </div>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    return `<div class="outgoing">
              <form action="/chat" method="POST">
                <input class="to-send" name="text" value="" placeholder="Enter message to send"/>
                <input type="hidden" name="username" value="Jack">
                <button type="submit">Send</button>
              </form>
            </div>`;
  },
};
module.exports = chatWeb;
