import {
  LOGIN_STATUS,
  CLIENT,
  ACTIONS,
} from './constants';

export const initialState = {
  error: '',
  username: '',
  loginStatus: LOGIN_STATUS.PENDING,
  isTodoPending: false,
  todos: {},
  lastAddedTodoId: '',
  isTransactionPending: false,
  transactions: {},
  lastAddedTranasactionId: '',
  enableAddTaskForm: false,
  enableAddTransactionForm: false,
};

function reducer(state, action) {
  switch(action.type) {

    case ACTIONS.LOG_IN:   // actions are the change in state, not how that change happened
      return {
        ...state,
        error: '', // constantly resetting this is a "pain point", and a sign of something to improve!
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
      };

    case ACTIONS.START_LOADING_TODOS:
      return {
        ...state,
        error: '',
        isTodoPending: true, // Perhaps make this a "status" value like login?
      };

    case ACTIONS.START_LOADING_TRANSACTIONS:
      return {
        ...state,
        error: '',
        isTransactionPending: true, // Perhaps make this a "status" value like login?
      };

    case ACTIONS.REPLACE_TODOS:
      return {
        ...state,
        error: '',
        isTodoPending: false,
        lastAddedTodoId: '',
        todos: action.todos,
      };

    case ACTIONS.REPLACE_TRANSACTIONS:
      return {
        ...state,
        error: '',
        isTransactionPending: false,
        lastAddedTransactionId: '',
        transactions: action.transactions,
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: '',
        isTodoPending: false,
        todos: {},
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        lastAddedTodoId: '',
        username: '',
      };

    case ACTIONS.REPORT_ERROR:
      // We could move the "pick the message" logic from Status.jsx here. Better? It depends.
      return {
        ...state,
        error: action.error || 'ERROR', // ERROR is just to ensure a truthy value
      };

    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: {  // because todos is an object, we have to make an altered copy
          ...state.todos, // copy the existing todos...
          [action.todo.id]: action.todo // ...but override this one
        },
      };

    case ACTIONS.TOGGLE_ADD_TASK_FORM:
      return {
        ...state,
        error: '',
        enableAddTaskForm: !state.enableAddTaskForm, // Perhaps make this a "status" value like login?
      };

    case ACTIONS.TOGGLE_ADD_TRANSACTION_FORM:
      return {
        ...state,
        error: '',
        enableAddTransactionForm: !state.enableAddTransactionForm, // Perhaps make this a "status" value like login?
      };

    case ACTIONS.DELETE_TODO:
      const todosCopy = { ...state.todos }; // "shallow" copy, but we are only making a shallow change
      delete todosCopy[action.id];
      return {
        ...state,
        todos: todosCopy, // No need to copy the copy
      };

    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.todo.id]: action.todo,
        },
      };

    case ACTIONS.DELETE_TRANSACTION:
      const transactionsCopy = { ...state.transactions }; // "shallow" copy, but we are only making a shallow change
      delete transactionsCopy[action.id];
      return {
        ...state,
        transactions: transactionsCopy, // No need to copy the copy
      };

    case ACTIONS.ADD_TRANSACTION:
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.transaction.id]: action.transaction,
        },
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action }); // reporting detail for debugging aid, not shown to user
  }
}

export default reducer;
