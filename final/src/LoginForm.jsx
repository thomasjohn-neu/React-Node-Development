import { useState } from 'react';
import book from './book.png'

// The "onLogin" below is not an automatic event
// such events only happen on JSX representing native HTML elements
// Here it just a prop name like any other
function LoginForm({ onLogin }) {
  // This state is local to this component
  // it is used only inside this component
  // until login is complete
  // when we call the passed action function
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault(); // Remember this! Can be very confusing if page reloads
    if(username) {  // Don't allow blank username to try login
      // We could enforce more requirements, but I'm keeping this simple
      onLogin(username); // "action" function we were passed in
    }
  }

  return (
    <div>
        <div className='left__banner'>
            <img className='img_align' src={book}></img>
        </div>
        <div className='right__banner'>
          <div className="login">
          <h1 className="title">CHRONICLES</h1>
            <h2 className='heading'>Login</h2>
            <form className="login__form" action="#/login" onSubmit={onSubmit}>
              <label>
                <span>Username:</span>
              </label><br/>
              <input className="login__username" value={username} onChange={onChange}/><br/>
              <button className="login__button" type="submit">Login</button>
            </form>
          </div>
        </div>
    </div>
   
      
  );

}

export default LoginForm;
