import React from 'react';
import './StockList.scss';

function StockList(props) {
  return (
    <>
      <div className="list">
        {props.stocks.map(stock => (
        <div className="list-item">
          <button className="btn StockButton" key={stock.symbol}>{stock.symbol}</button>
          <div className="list-name"> {stock.name} </div>
        </div>
        ))}
      </div>
    </>
  );
}

export default StockList;
