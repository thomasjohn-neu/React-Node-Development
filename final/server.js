const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
// PORT=4000 node server.js
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

const tasks = require('./tasks');
const transactions = require('./transactions');
const sessions = require('./sessions');
const users = require('./users');
const { quotes } = require('./quotes');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    demoTasks = tasks.makeTaskList();
    demoTransactions = transactions.makeTransactionList();
    users.addUserData(username, {tasks:demoTasks, transactions:demoTransactions});
  }

  res.cookie('sid', sid);
  res.json({tasks: users.getUserData(username).tasks.getTasks(), 
            transactions: users.getUserData(username).transactions.getTransactions(),
            "walletSummary": users.getUserData(username).transactions.getWalletSummary()});
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }

  // We don't report any error if sid or session didn't exist
  // Because that means we already have what we want
  res.json({ username });
});

// Tasks
app.get('/api/tasks', (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).tasks.getTasks());
});

app.post('/api/tasks', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { task } = req.body;
  if(!task) {
    res.status(400).json({ error: 'required-task' });
    return;
  }
  const taskList = users.getUserData(username).tasks;
  const id = taskList.addTask(task);
  res.json(taskList.getTask(id));
});

app.get('/api/tasks/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const taskList = users.getUserData(username).tasks;
  const { id } = req.params;
  if(!taskList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No task with id ${id}` });
    return;
  }
  res.json(taskList.getTask(id));
});

app.put('/api/tasks/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const taskList = users.getUserData(username).tasks;
  const { id } = req.params;
  const { task, done=false } = req.body;
  // Full Replacement required for a PUT
  if(!task) {
    res.status(400).json({ error: 'required-task' });
    return;
  }
  if(!taskList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  taskList.updateTask(id, { task, done });
  res.json(taskList.getTask(id));
});

app.patch('/api/tasks/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { task, done } = req.body;
  const taskList = users.getUserData(username).tasks;
  if(!taskList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  taskList.updateTask(id, { task, done });
  res.json(taskList.getTask(id));
});

app.delete('/api/tasks/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const taskList = users.getUserData(username).tasks;
  const exists = taskList.contains(id);
  if(exists) {
    taskList.deleteTask(id);
  }
  res.json({ message: exists ? `task ${id} deleted` : `task ${id} did not exist` });
});

// Transactions

app.get('/api/transactions', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).transactions.getTransactions());
});

app.post('/api/transactions', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { transaction } = req.body;
  if(!transaction) {
    res.status(400).json({ error: 'required-transaction' });
    return;
  }
  const transactionList = users.getUserData(username).transactions;
  const id = transactionList.addTransaction(transaction);
  res.json(transactionList.getTransaction(id));
});

app.get('/api/transactions/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const transactionList = users.getUserData(username).transactions;
  const { id } = req.params;
  if(!transactionList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No transaction with id ${id}` });
    return;
  }
  res.json(transactionList.getTransaction(id));
});

app.put('/api/transactions/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const transactionList = users.getUserData(username).transactions;
  const { id } = req.params;
  const { transaction, done=false } = req.body;
  // Full Replacement required for a PUT
  if(!transaction) {
    res.status(400).json({ error: 'required-transaction' });
    return;
  }
  if(!transactionList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No transaction with id ${id}` });
    return;
  }
  transactionList.updateTransaction(id, { transaction, done });
  res.json(transactionList.getTransaction(id));
});

app.patch('/api/transactions/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const { transaction, done } = req.body;
  const transactionList = users.getUserData(username).transactions;
  if(!transactionList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }
  transactionList.updateTransaction(id, { transaction, done });
  res.json(transactionList.getTransaction(id));
});

app.delete('/api/transactions/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const transactionList = users.getUserData(username).transactions;
  const exists = transactionList.contains(id);
  if(exists) {
    transactionList.deleteTransaction(id);
  }
  res.json({ message: exists ? `transaction ${id} deleted` : `transaction ${id} did not exist` });
});

app.get('/api/wallet', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).transactions.getWalletSummary());
});

app.get('/api/quotes', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)]);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

