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
  fetchDeleteTodo,
  fetchDeleteTransaction,
  fetchAddTodo,
  fetchAddTransaction,
  fetchWalletSummary,
  fetchQuotes,
} from './services';

import LoginForm from './LoginForm';
import Todos from './Activities';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import Wallet from './Wallet';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
    fetchLogout() 
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

    fetchQuotes()
    .then( quotes => {
      dispatch({ type: ACTIONS.START_FETCHING_QUOTES, quotes });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
    
  }

  function onDeleteTodo(id) {
    dispatch({ type: ACTIONS.START_LOADING_TODOS });
    fetchDeleteTodo(id)
      .then( () => {
        return fetchTodos();
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
        return fetchTransactions(); 
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

    fetchQuotes()
    .then( quotes => {
      dispatch({ type: ACTIONS.START_FETCHING_QUOTES, quotes });
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        dispatch({ type: ACTIONS.LOG_OUT });
        // Not yet logged in isn't a reported error
        return;
      }
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
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
          <div className="content head_contents">
            <div className='welcome'><span className='message'>Hello, {state.username}</span></div>
            <Controls onLogout={onLogout} onRefresh={onRefresh} onAddTaskForm={onAddTaskForm} enableAddTaskForm={state.enableAddTaskForm} onAddTransactionForm={onAddTransactionForm} enableAddTransactionForm={state.enableAddTransactionForm}/>
            <div>
              <Todos
                isTodoPending={state.isTodoPending}
                todos={state.todos}
                lastAddedTodoId={state.lastAddedTodoId}
                onDeleteTodo={onDeleteTodo}
                onToggleTodo={onToggleTodo}
                enableAddTaskForm={state.enableAddTaskForm}
                onAddTodo={onAddTodo}
                quotes={state.quotes}
              />
              <Wallet
                isTransactionPending={state.isTransactionPending}
                transactions={state.transactions}
                lastAddedTransactionId={state.lastAddedTransactionId}
                onDeleteTransaction={onDeleteTransaction}
                walletSummary={state.walletSummary}
                onAddTransaction={onAddTransaction}
                enableAddTransactionForm={state.enableAddTransactionForm}
              />
            </div>            
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
