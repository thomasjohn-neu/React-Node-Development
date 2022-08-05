import { useState, useEffect } from 'react';
import {
  LOGIN_STATUS,
  MESSAGE_STATUS,
  SERVER_STATUS,
  CLIENT_STATUS,
  ISSUES,
} from './validation';
import {
  getLogin,
  getSession,
  getLogout,
  setWord,
} from './services';
import './App.css';
import Login from './Login';
import Loading from './Loading';
import Logout from './Logout';
import Word from './Word';


function App() {
  const [userInfo, setUserInfo] = useState({});
  const [loginStatus, setLogin] = useState(LOGIN_STATUS.PENDING);
  const [message, setMessage] = useState(MESSAGE_STATUS.PENDING);
  const [error, setError] = useState('');
  
  function onUpdateMessage(message) {
    setMessage(MESSAGE_STATUS.PENDING);
    setWord(message)
      .then((user) => {
        const { userData } = user;
        setUserInfo({
          username: userData.username,
          message: userData.message,
        });
        setMessage(MESSAGE_STATUS.IS_AVAILABLE);
      })
      .catch((err) => {
        setError(ISSUES[err?.error] || 'ERROR');
      });
  }

  function onLogin(username) {
    getLogin(username)
      .then((user) => {
        const { userData } = user;
        setUserInfo({
          username: userData.username,
          message: userData.message,
        });
        setLogin(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch((err) => {
        setError(ISSUES[err?.error] || 'ERROR');
      });
  }

  function onLogout() {
    setError("");
    setUserInfo({});
    setLogin(LOGIN_STATUS.NOT_LOGGED_IN);
    getLogout().catch((err) => {
      setError(ISSUES[err?.error] || 'ERROR');
    });
  }

  function checkForSession() {
    getSession()
      .then((session) => {
        const { userData } = session;
        setUserInfo({
          username: userData.username,
          message: userData.message,
        });
        setLogin(LOGIN_STATUS.IS_LOGGED_IN);
        setMessage(MESSAGE_STATUS.IS_AVAILABLE);
      })
      .catch((err) => {
        if (err?.error === SERVER_STATUS.AUTH_MISSING) {
          setLogin(LOGIN_STATUS.NOT_LOGGED_IN);
          return Promise.reject({ error: CLIENT_STATUS.NO_SESSION });
        }
        return Promise.reject(err);
      });
  }


  useEffect(() => {
    checkForSession();
  }, []);
  
  return (
    <div className='app'>
      <main>
        {loginStatus === LOGIN_STATUS.PENDING && <Loading className='login-loader'><h1>Logging in user..</h1></Loading>}
       
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <Login onLogin={onLogin} error={error}></Login>
        )}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <>
            <Logout  onLogout={onLogout} />
            <Word
              onUpdateMessage={onUpdateMessage}
              message={userInfo.message}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
