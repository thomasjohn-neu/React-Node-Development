function TodoItem({
  todo,
  isLastAdded,
  onDeleteTodo,
  onToggleTodo,
}) {
  const isDoneClass = todo.done ? "todo__text--complete" : "";
  const isAddedClass = isLastAdded ? "todo__text--added" : "";
  return (
    <>
      <label>
       
        <div
          data-id={todo.id}
          className={`todo__toggle todo__text ${ isDoneClass } ${isAddedClass}`}
        >
          <div className="align_task"><h3>{todo.task}</h3></div>
          <div className="align_date">{new Date(todo.dateTime).toDateString()} </div>
        </div>
      </label>
      <button
        data-id={todo.id}
        className="todo__delete button_delete"
        onClick={ (e) => {
          const id = e.target.dataset.id;
          onDeleteTodo(id);
        }}
      >
        Delete
      </button>
    </>
  );
}

export default TodoItem;
