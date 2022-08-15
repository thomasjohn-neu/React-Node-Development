function WalletItem({
  transaction,
  isLastAdded,
  onDeleteTransaction,
  // onToggleTodo,
}) {
  const isDoneClass = transaction.done ? "transaction__text--complete" : "";
  const isAddedClass = isLastAdded ? "transaction__text--added" : "";
  return (
    <>
      <label>
        <span
          data-id={transaction.id}
          className={`todo__toggle todo__text ${ isDoneClass } ${isAddedClass}`}
        >
          <h3>{transaction.description}</h3>
        </span>

        <span>{new Date(transaction.dateTime).toDateString()}</span>
        <span><h4>{transaction.amount}</h4></span>
      </label>
      <button
        data-id={transaction.id}
        className="transaction__delete"
        onClick={ (e) => {
          const id = e.target.dataset.id;
          onDeleteTransaction(id);
        }}
      >
        &#10060;
      </button>
    </>
  );
}

export default WalletItem;
