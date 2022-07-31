import { useState } from 'react';
import "./style.css"

function Login({ onLogin, error }) {
    const [username, setUserName] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        onLogin(username);
        setUserName("");

    };
    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-username">Word App</h2>
                <form onSubmit={onSubmit} action="#/login">
                    <div className="input-field">
                        <input type="text" className="username" value={username} onInput={(e) => {setUserName(e.target.value);
                        }}
                        />
                    </div>
                    <button type="submit" className="login-btn"> Login </button>
                </form>
                <span className="error-msg"><h5>{error}</h5></span>
            </div>
        </div>
    );
}

export default Login;
