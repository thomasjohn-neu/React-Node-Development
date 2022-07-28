import { useState } from 'react';
import './App.css';
import compare from './compare';

function Game() {
    const [inputWord, setWord] = useState('');
    const word = "RECAT";
    const [message, setMessage] = useState(''); 

    function validateWord(inputWord){
        let msg;
        if(inputWord.length === 0)
            msg = "Word cannot be empty!";
        else if(inputWord.length < 5)
            msg = inputWord + " was not a valid word";
        else if(inputWord.toLowerCase()===word.toLowerCase())
            msg = inputWord + " is the secret word!";
        else{
            let matches = compare(word,inputWord)
            msg = inputWord + " had "+matches+" letters in common";
        }

        setWord('');
        setMessage(msg);
    }

    return (<form className="login">
            <label>
                <span>Guess the word: </span>
                <input className="username" value={inputWord} onInput={(e) => {setWord(e.target.value); setMessage('')}}/>
            </label>
                <button type="button" className="button" onClick={() => validateWord(inputWord) }>Play</button>
                <div className="login">
                    <h3>{message}</h3>
                </div>
            </form>);
}

export default Game;
