import { useState } from "react";

function Controls({ onLogout, onRefresh, onAddTaskForm, onAddTransactionForm, enableAddTaskForm, enableAddTransactionForm }) {
  return (
    <div>
      <div className="controls">
        { !enableAddTaskForm && <button onClick={onAddTaskForm} className="controls__addTaskForm">Add Task</button>}
        { !enableAddTransactionForm && <button onClick={onAddTransactionForm} className="controls__addTransactionForm">Add Transaction</button>}
        <button onClick={onRefresh} className="controls__refresh">Refresh</button>
        <button onClick={onLogout} className="controls__logout">Logout</button>
      </div>
    </div>
    
  );
}

export default Controls;
