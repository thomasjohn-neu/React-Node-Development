const userInfo = require('./user-info');

const home = {
    HomePage: function(username) {
      return `
        <!doctype html>
        <html>
          <head>
            <title>Express Home</title>
            <link rel="stylesheet" href="/css/login.css">
          </head>
          <body>
          <div id="express-login">
            <div id="express-data">
              ${home.getUserData(username)}
              ${home.getUpdateForm()}
            </div>
            <div class="logout">
                  <form action="/logout" method="POST">
                    <button class="login-btn" type="submit">Logout</button>
                  </form>
                </div>
            </div>
          </body>
        </html>
    `;
    },
    getUpdateForm: function() {
        return `<div class="update">
                  <form action="/update" method="POST">
                    <input class="to-send" name="word" value="" placeholder="Enter your new word"/>
                    <button class="login-btn" type="submit">Update</button>
                  </form>
                </div>`;
      },
      getUserData: function(username) {

        return `<div class="login-msg">
                  <h2>Hello ${username}!</h2>
                  <p>Your word for the day is <b>${ userInfo.getWord(username) ? userInfo.getWord(username): "is not configured !!" }</b></p> 
                </div>`;
      },
      createSessionId: function(){
        return uuidv4();

    },
};


module.exports = home;
