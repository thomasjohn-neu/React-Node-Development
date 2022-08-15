import { useState } from "react";

function Controls({ onLogout, onRefresh, onAddTaskForm, enableAddTaskForm }) {
  return (
    <div className="controls">
      <button onClick={onRefresh} className="controls__refresh">Refresh</button>
      <button onClick={onLogout} className="controls__logout">Logout</button>
      { !enableAddTaskForm && <button onClick={onAddTaskForm} className="controls__addTaskForm">Add Task</button>}
    </div>
  );
}

export default Controls;
