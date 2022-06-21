const { v4: uuidv4 } = require('uuid');


const login = {
    LoginPage: function(error) {
      return `
        <!doctype html>
        <html>
          <head>
            <title>Express Login</title>
            <link rel="stylesheet" href="/css/login.css">
          </head>
          <body class="background">
            <div id="express-login">
              ${login.getLoginForm(error)}
            </div>
          </body>
        </html>`;
    },

    getLoginForm: function(error) {
        return `<div class="login">
                  <form class="login-form" action="/login" method="POST">
                  <h2 class="heading">Guesser</h2>
                  <div class="form-field">
                    <input class="to-send" name="username" value="" placeholder="Enter Username"/>
                  </div> 
                    <button class="login-btn" type="submit">Login</button>
                    <div>${error}</div>
                  </form>
                </div>`;
      },

      createSessionId: function(){
        return uuidv4();

    },
    validateUsername: function(username){
        let allowedCharatcers = /^[a-zA-Z0-9!@-]*$/;
        if(!username)
            return {status: false, "error": "Username is empty!"};
        if(username === "dog")
            return {status: false, "error": "Invalid username dog!"};
        if(username.match(allowedCharatcers))
          return {status: true, "error": ""};
        
        return {status: false, "error": "Username can only contain digits, alphabets, !, @, -"};
        
    }
};

module.exports = login;