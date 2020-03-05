import React, { Component } from 'react';
import './StocksTable.scss';

export default class StocksTable extends Component {
  render() {
    const tableRow = this.props.stocks.map(stock => (
      <tr className="table-body-row">
        <td>{stock.stockSymbol}</td>
        <td>{stock.stockName}</td>
        <td>{stock.numberOfShares}</td>
        <td>{stock.buyPrice}</td>
        <td>{stock.stockData['4. close']}</td>
        <td>{stock.profit}</td>
        <td>
          <button className="btn btn--danger">Stop Tracking</button>
        </td>
      </tr>
    ));
    return (
      <>
        <table className="MyStocksTable" border="0">
          <thead className="table-header">
            <tr>
              <th>Stock symbol</th>
              <th>Stock name</th>
              <th>No.of shares</th>
              <th>Buy price</th>
              <th>Current price</th>
              <th>Profit/Loss</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-body">{tableRow}</tbody>
        </table>
        <div className="alert alert-info">No Stocks have been selected</div>

        <div className="alert alert-danger">
          There seems to be a issue with server
        </div>
      </>
    );
  }
}
