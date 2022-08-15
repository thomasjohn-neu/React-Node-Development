import { useState } from 'react';

function AddTransactionForm({ onAddTransaction }) {

  const [ description, setDescription ] = useState('');
  const [ date, setDate ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ error, setError ] = useState('');

  function onSubmit(e) {
    e.preventDefault(); // Don't forget, confusion follows if form submits
    setDescription('');
    setDate('');
    setAmount('');
    onAddTransaction({description, date, amount});
  }

  function onTypingDate(e) {
    validateDate(e.target.value)
    setDate(e.target.value)
  }

  function validateDate(dateString){
    let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if(!dateString.length){
      setError("Date required!");
      return
    }
    if (!(date_regex.test(dateString))) {
      setError("Invalid Date!");
    }else{
      setError('');
    }   
  }

  function onTypingDescription(e) {
    setDescription(e.target.value);
  }

  function onTypingAmount(e) {
    setAmount(e.target.value);
  }

  return (
    <div className="add"> 
      <form className="add__form" action="#/add" onSubmit={onSubmit}>
        <input className="add__task" value={description} placeholder="Enter Transaction Info"  onChange={onTypingDescription}/>
        <input className="add__task" value={date} placeholder="Enter Date(MM/DD/YYYY)"  onChange={onTypingDate}/>
        <input className="add__task" value={amount} placeholder="Enter Amount, use(-/+) for expense and savings"  onChange={onTypingAmount}/>
        { error && <span>{error}</span> }
        <button type="submit" className="add__button">Add</button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
