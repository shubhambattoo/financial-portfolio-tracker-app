import React from 'react';
import './StockList.scss';

function StockList(props) {
  return (
    <>
      {props.stocks.length > 0 && (
        <div className="list">
          {props.stocks.map(stock => (
            <div className="list-item" key={stock.symbol}>
              <button className="btn StockButton">{stock.symbol}</button>
              <div className="list-name"> {stock.name} </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default StockList;
