const error = {
    ErrorPage: function(message) {
      return `
        <!doctype html>
        <html>
          <head>
            <title>Express Home</title>
            <link rel="stylesheet" href="/css/login.css">
          </head>
          <body>
            <div class="error">
              <div id="express-data">
                <h2>${message}</h2>
              </div>
              <div class="login">
              <a href="/"><button class="login-btn redirect-bttn" type="submit">Retry login</button></a> 
              </div>
            </div>
          </body>
        </html>
    `;
    },
};


module.exports = error;
