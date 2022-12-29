import "./style.css";

function Loading({className='loading', children='Loading...'}){
  return (
    <div className="spinner">
      <div className={className}>{children}</div>
    </div>
  );
}

export default Loading;


