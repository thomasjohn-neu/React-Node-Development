import { isCompositeComponentWithType } from 'react-dom/test-utils';
import Loading from './Loading';
import WalletItem from './WalletItem';
import AddTransactionForm from './AddTransactionForm';

function Wallet({
  transactions,
  isTransactionPending,
  lastAddedTransactionId,
  onDeleteTransaction,
  walletSummary,
  onAddTransaction,
  enableAddTransactionForm,
}) {
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

  console.log(transactions);

  return (
    <div className="content align_right">
      <h2 className='heading_wallet'>My Wallet</h2>
      <h3 className='total_wallet'>Wallet Balance: {walletSummary.balance}$</h3>
      {enableAddTransactionForm && <AddTransactionForm onAddTransaction={onAddTransaction}/>}
      { show === SHOW.PENDING && <Loading className="tranasactions__waiting">Loading Transactions...</Loading> }
      { show === SHOW.EMPTY && (
        <p className='error'>No Transactions yet, add one!</p>
      )}
      { show === SHOW.TRANSACTIONS && (
        <ul className="transactions">
          { Object.values(transactions).map( transaction => (
            <li className="transaction" key={transaction.id}>
              <WalletItem
                transaction={transaction}
                isLastAdded={lastAddedTransactionId===transaction.id}
                onDeleteTransaction={onDeleteTransaction}
              />
            </li>
          ))}
        </ul>
      )}

      <ul className="pagination_right w3-border xw3-round">
        <li> ❮ &nbsp; </li>
        <li>  &nbsp; ❯</li>
      </ul> 
    </div>
  );
}

export default Wallet;
