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
        <input
          className="todo__toggle"
          data-id={transaction.id}
          type="checkbox"
          checked={transaction.done}
          onChange={ (e) => {
            const id = e.target.dataset.id;
            // onToggleTodo(id);
          }}
        />
        <span
          data-id={transaction.id}
          className={`todo__toggle todo__text ${ isDoneClass } ${isAddedClass}`}
        >
          {transaction.description}
        </span>
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
