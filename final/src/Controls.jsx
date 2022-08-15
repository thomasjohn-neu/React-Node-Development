import { useState } from "react";

function Controls({ onLogout, onRefresh, onAddTaskForm, onAddTransactionForm, enableAddTaskForm, enableAddTransactionForm }) {
  return (
    <div className="controls">
      <button onClick={onRefresh} className="controls__refresh">Refresh</button>
      <button onClick={onLogout} className="controls__logout">Logout</button>
      { !enableAddTaskForm && <button onClick={onAddTaskForm} className="controls__addTaskForm">Add Task</button>}
      { !enableAddTransactionForm && <button onClick={onAddTransactionForm} className="controls__addTransactionForm">Add Transaction</button>}

      <div>Time and tide doesnt wait for anyone! - Buddha</div>
    </div>
  );
}

export default Controls;
