const { v4: uuidv4 } = require('uuid');


const login = {
    LoginPage: function() {
      return `
        <!doctype html>
        <html>
          <head>
            <title>Express Login</title>
            <link rel="stylesheet" href="/css/login.css">
          </head>
          <body>
            <div id="express-login">
              ${login.getLoginForm()}
            </div>
          </body>
        </html>
    `;
    },
    getLoginForm: function() {
        return `<div class="login">
                  <form class="login-form" action="/login" method="POST">
                  <h2>Express Login</h2>
                  <div class="form-field">
                    <input class="to-send" name="username" value="" placeholder="Enter username"/>
                  </div> 
                    <button class="login-btn" type="submit">Login</button>
                  </form>
                  <div class="login-image">
                    <img class="image-login" src="/images/login.jpg">
                  </div>
                </div>`;
      },
      createSessionId: function(){
        return uuidv4();

    },
    validateUsername: function(username){
        if(!username)
            return {status: false, "error": "Username is empty!"}
        if(username === "dog")
            return {status: false, "error": "Invalid username dog!"}
        if(username.match(/^\d+$/))
            return {status: false, "error": "Username cannot be a numeric value!"}
        if(!username.match(/^[a-zA-Z0-9- ]*$/
        ))
            return {status: false, "error": "Special charactrers not allowed!"}
        return {status: true}
    }
};

module.exports = login;
