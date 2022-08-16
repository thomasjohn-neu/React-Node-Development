import Loading from './Loading';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

function Todos({
  todos,
  isTodoPending,
  lastAddedTodoId,
  onDeleteTodo,
  onToggleTodo,
  enableAddTaskForm,
  onAddTodo,
  quotes,
}) {
  // All this code before the return is to make the return easier to skim
  const SHOW = {  // a constant used only in this component
    PENDING: 'pending',
    EMPTY: 'empty',
    TODOS: 'todos',
  };

  let show;
  if(isTodoPending) {
    show = SHOW.PENDING;
  } else if (!Object.keys(todos).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.TODOS;
  }

  // The `Object.values(todos).map()` below returns
  // an array of JSX elements
  return (
    <div className="content align_left">
      <h2 className='heading_action'>My Activities</h2>
      <h5 className="total_wallet">{quotes.quote}<span className='author'>- {quotes.author}</span></h5>
      {enableAddTaskForm && <AddTodoForm onAddTodo={onAddTodo}/>}
      { show === SHOW.PENDING && <Loading className="todos__waiting">Loading Todos...</Loading> }
      { show === SHOW.EMPTY && (
        <p className='color_red'>No Todo Items yet, add one!</p>
      )}
      { show === SHOW.TODOS && (
        <ul className="todos">
          { Object.values(todos).map( todo => (
            <li className="todo" key={todo.id}>
              <TodoItem
                todo={todo}
                isLastAdded={lastAddedTodoId===todo.id}
                onDeleteTodo={onDeleteTodo}
                onToggleTodo={onToggleTodo}
              />
            </li>
          ))}
        </ul>
      )}

      <ul className="pagination w3-border xw3-round">
        <li> ❮ &nbsp; </li>
        <li>  &nbsp; ❯</li>
      </ul>
    </div>
  );
}

export default Todos;
