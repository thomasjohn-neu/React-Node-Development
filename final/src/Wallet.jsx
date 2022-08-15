import { isCompositeComponentWithType } from 'react-dom/test-utils';
import Loading from './Loading';
import WalletItem from './WalletItem';

function Wallet({
  transactions,
  isTransactionPending,
  lastAddedTransactionId,
  onDeleteTransaction,
  walletSummary,
  // onToggleTodo,
}) {
  // All this code before the return is to make the return easier to skim
  const SHOW = {  // a constant used only in this component
    PENDING: 'pending',
    EMPTY: 'empty',
    TRANSACTIONS: 'transactions',
  };

  let show;
  if(isTransactionPending) {
    show = SHOW.PENDING;
  } else if (!Object.keys(transactions).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.TRANSACTIONS;
  }

  // The `Object.values(todos).map()` below returns
  // an array of JSX elements

  console.log(transactions);

  return (
    <div className="content">
      <h2>My Wallet</h2>
      <h3>Wallet Balance: {walletSummary.balance}</h3>
      { show === SHOW.PENDING && <Loading className="tranasactions__waiting">Loading Transactions...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No Transactions yet, add one!</p>
      )}
      { show === SHOW.TRANSACTIONS && (
        <ul className="transactions">
          { Object.values(transactions).map( transaction => (
            <li className="transaction" key={transaction.id}>
              <WalletItem
                transaction={transaction}
                isLastAdded={lastAddedTransactionId===transaction.id}
                onDeleteTransaction={onDeleteTransaction}
                // onToggleTodo={onToggleTodo}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wallet;
