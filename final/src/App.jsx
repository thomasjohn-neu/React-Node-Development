import { useEffect, useReducer } from 'react';

import './App.css';
import reducer, { initialState } from './reducer';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  ACTIONS,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchTodos,
  fetchTransactions,
  fetchUpdateTodo,
  fetchUpdateTransaction,
  fetchDeleteTodo,
  fetchDeleteTransaction,
  fetchAddTodo,
  fetchAddTransaction,
  fetchWalletSummary,
} from './services';

import LoginForm from './LoginForm';
import Todos from './Todos';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddTodoForm from './AddTodoForm';
import Wallet from './Wallet';
import AddTransactionForm from './AddTransactionForm';

function App() {

  // All our global state is from the reducer
  // Some "local" state will remain in various components
  const [state, dispatch] = useReducer(reducer, initialState);

  // We also pass "action" functions that do things and update state
  // The top level state has a BUNCH of these
  // We can move these elsewhere if we think it helps
  // - to move, these would have to get dispatch somehow
  // - such as adding dispatch to the params
  // - or having a function that takes dispatch and returns these functions
  // For now, recognize the benefit of keeping the JSX returned at the bottom of this component
  // clean and readable because we have all of these state-management functions here

  function onLogin( username ) {
    dispatch({ type: ACTIONS.START_LOADING_TODOS });
    fetchLogin(username)
    .then( fetchedData => {
      dispatch({ type: ACTIONS.LOG_IN, username });
      dispatch({ type: ACTIONS.REPLACE_TODOS, todos: fetchedData.tasks });
      dispatch({ type: ACTIONS.REPLACE_TRANSACTIONS, transactions: fetchedData.transactions})
      dispatch({ type: ACTIONS.START_LOADING_WALLET_SUMMARY, walletSummary: fetchedData.walletSummary });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout() // We don't really care about server results
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onRefresh() {
    dispatch({ type: ACTIONS.START_LOADING_TODOS });
    fetchTodos()
    .then( todos => {
      dispatch({ type: ACTIONS.REPLACE_TODOS, todos });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
    fetchTransactions()
    .then( transactions => {
      dispatch({ type: ACTIONS.REPLACE_TRANSACTIONS, transactions });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });

    fetchWalletSummary().
    then( walletSummary => {
      dispatch({ type: ACTIONS.START_LOADING_WALLET_SUMMARY, walletSummary });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
    
  }

  function onWalletRefresh() {
    dispatch({ type: ACTIONS.START_LOADING_TRANSACTIONS });
    fetchTransactions()
    .then( transactions => {
      dispatch({ type: ACTIONS.REPLACE_TRANSACTIONS, transactions });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onDeleteTodo(id) {
    dispatch({ type: ACTIONS.START_LOADING_TODOS });
    fetchDeleteTodo(id)
      .then( () => {
        return fetchTodos(); // Return the promise so we can chain
      })
      .then( todos => {
        dispatch({ type: ACTIONS.REPLACE_TODOS, todos });
      })
      .catch( err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  function onDeleteTransaction(id) {
    dispatch({ type: ACTIONS.START_LOADING_TRANSACTIONS });
    fetchDeleteTransaction(id)
      .then( () => {
        return fetchTransactions(); // Return the promise so we can chain
      })
      .then( transactions => {
        dispatch({ type: ACTIONS.REPLACE_TRANSACTIONS, transactions });
      })
      .catch( err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
    fetchWalletSummary().
      then( walletSummary => {
        dispatch({ type: ACTIONS.START_LOADING_WALLET_SUMMARY, walletSummary });
      })
      .catch( err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  function onToggleTodo(id) {
    fetchUpdateTodo(id, { done: !state.todos[id].done } )
    .then( todo => { // Service call returns the updated todo
      dispatch({ type: ACTIONS.TOGGLE_TODO, todo});
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onAddTodo(task) {
    fetchAddTodo(task)
    .then( todo => {
      dispatch({ type: ACTIONS.ADD_TODO, todo});
      dispatch({ type: ACTIONS.TOGGLE_ADD_TASK_FORM})
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onAddTransaction(transaction) {
    fetchAddTransaction(transaction)
    .then( item => {
      dispatch({ type: ACTIONS.ADD_TRANSACTION, item});
      dispatch({ type: ACTIONS.TOGGLE_ADD_TRANSACTION_FORM})
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });

    fetchWalletSummary().
    then( walletSummary => {
      dispatch({ type: ACTIONS.START_LOADING_WALLET_SUMMARY, walletSummary });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
    
  }

  function onAddTaskForm(){
    dispatch({ type: ACTIONS.TOGGLE_ADD_TASK_FORM})
  }

  function onAddTransactionForm(){
    dispatch({ type: ACTIONS.TOGGLE_ADD_TRANSACTION_FORM})
  }

  function checkForSession() {
    fetchSession()
    .then( session => { // The returned object from the service call
      dispatch({ type: ACTIONS.LOG_IN, username: session.username });
      return fetchTodos(); // By returning this promise we can chain the original promise
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( todos => {
      dispatch({ type: ACTIONS.REPLACE_TODOS, todos});
      onRefresh();
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        dispatch({ type: ACTIONS.LOG_OUT });
        // Not yet logged in isn't a reported error
        return;
      }
      // For unexpected errors, report them
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });


  }

  // Here we use a useEffect to perform the initial loading
  // Initial loading isn't triggered by an event like most service calls
  useEffect(
    () => {
      checkForSession();
    },
    [] // Only run on initial render
  );

  return (
    <div className="app">
      <main className="">
        { state.error && <Status error={state.error}/> }
        { state.loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <p>Hello, {state.username}</p>
            <Controls onLogout={onLogout} onRefresh={onRefresh} onAddTaskForm={onAddTaskForm} enableAddTaskForm={state.enableAddTaskForm} onAddTransactionForm={onAddTransactionForm} enableAddTransactionForm={state.enableAddTransactionForm}/>
            <Todos
              isTodoPending={state.isTodoPending}
              todos={state.todos}
              lastAddedTodoId={state.lastAddedTodoId}
              onDeleteTodo={onDeleteTodo}
              onToggleTodo={onToggleTodo}
            />
            {state.enableAddTaskForm && <AddTodoForm onAddTodo={onAddTodo}/>}
            <Wallet
              isTransactionPending={state.isTransactionPending}
              transactions={state.transactions}
              lastAddedTransactionId={state.lastAddedTransactionId}
              onDeleteTransaction={onDeleteTransaction}
              walletSummary={state.walletSummary}
            />
              {state.enableAddTransactionForm && <AddTransactionForm onAddTransaction={onAddTransaction}/>}
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
