import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {

  const [ task, setTask ] = useState('');
  const [ date, setDate ] = useState('');
  const [ error, setError ] = useState('');

  function onSubmit(e) {
    if(!task.length || !date.length){
      setError("Fields are empty!")
      return;
    }
    e.preventDefault(); // Don't forget, confusion follows if form submits
    setTask('');
    setDate('');
    onAddTodo({task, date});
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

  function onTypingTask(e) {
    setError("Task required!");
    let input = e.target.value;
    if(!input.length){
      setError("Task required!");
    }
    else{
      setError('');
    }   
    setTask(input);
  }

  return (
    <div className="add"> 
      <form className="add__form" action="#/add" onSubmit={onSubmit}>
        <input className="add__task" value={task} placeholder="Enter Task"  onChange={onTypingTask}/>
        <input className="add__task" value={date} placeholder="Enter (MM/DD/YYYY)"  onChange={onTypingDate}/>
        { error && <span class="error">{error}</span> }
        <button type="submit" className="add__button button_add" disabled={error}>Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
