const uuid = require('uuid').v4;

function makeTransactionList() {
  // These are hardcoded initial state when we restart the server
  const id1 = uuid();
  const id2 = uuid();

  const transactionList = {};
  const transactions = {
    // The below syntax lets you use a variable value as the key
    // if the value of id1 is "asdf", the property is "asdf", not "id1"
    [id1]: {
      id: id1,
      description: 'Lunch KFC',
      done: false,
      dateTime: Date.now(),
      amount: -50
    },
    [id2]: {
      id: id2,
      description: 'Birthday Gift Purchase',
      done: false,
      dateTime: Date.now(),
      amount: -89
    },
  };

  transactionList.contains = function contains(id) {
    // This !! syntax coerces the value to a boolean
    // First by giving us the reverse of the truthy/falsy value,
    // then by reversing it to true/false
    return !!transactions[id];
  };

  transactionList.getTransactions = function getTransactions() {
    return transactions;
  };

  transactionList.addTransaction = function addTransaction(transaction) {
    const id = uuid();
    transactions[id] = {
      id,
      description: transaction.description,
      dateTime: new Date(transaction.date),
      done: false,
      amount: transaction.amount,
    };

    console.log(transactions[id], "   after addition");
    return id;
  };

  transactionList.getTransaction = function getTransaction(id) {
    return transactions[id];
  };

  transactionList.updateTransaction = function updateTransaction(id, transaction) {
    transactions[id].amount = transaction.amount ?? transactions[id].amount;
    transactions[id].description = transaction.description || transactions[id].description;
  };


  transactionList.deleteTransaction = function deleteTransaction(id) {
    delete transactions[id];
  };

  return transactionList;
};

module.exports = {
  makeTransactionList,
};
