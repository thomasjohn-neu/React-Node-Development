import { useState } from 'react';
import './App.css';
import Game from "./Game";
import validateUserName from './login';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    let content;

    function actionLogin(username){
      let validity = validateUserName(username);
      if(validity===true){
        setIsLoggedIn(true);
      }
      else{
        setMessage(validity);
        setUsername('');
      }
    }


    if (isLoggedIn) {
        content = ( <div className="login">
                    <h2>Hello {username}</h2>
                    <Game/>
                    <button className="button" onClick={() => {setIsLoggedIn(false); setUsername('');}}>Logout</button>
                    </div>);
                  } 
    else {
          content = (<form className="login">
                        <h1 className="login"> React Intro Application</h1>
                        <label>
                        <span>Username: </span>
                        <input className="username" value={username} onInput={(e) => {setUsername(e.target.value); setMessage('')}}/>
                        </label>
                        <button className="button" type="button" onClick={() => actionLogin(username)}>Login</button>
                        <div><h3>{message}</h3></div>
                      </form>);
          }
return (
        <div className="app"> { content } </div>
      );

}


export default App;