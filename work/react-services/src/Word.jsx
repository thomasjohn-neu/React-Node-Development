import { useState } from 'react';
import './style.css';
function Word ({ onUpdateMessage, message }) {
    const [userMessage, setUserMessage] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        if (userMessage) {
            onUpdateMessage(userMessage);
            setUserMessage('');
        }
    };
    return (
        <div className='message-container'>
            <div className='user-message'>
            </div>
            <div className='update-form'>
                <h1 className='update-title'>Word App</h1>
                <form onSubmit={onSubmit}>
                    <div className='input-field'>
                        <input type='text' placeholder='Enter the word' className='message'
                            value={userMessage}
                            onInput={(e) => {
                                setUserMessage(e.target.value);
                            }}
                        />
                    </div>
                    <button className='update-button'>Update</button>
                </form>
            </div>
            <span className='new-message'>
                <h2><label className='new-msg-title'> Configured Word: </label>  {message}</h2>
            </span>
        </div>
    );
};

export default Word;
