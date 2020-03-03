import React, { Component } from 'react';
import './StocksTable.scss';

export default class StocksTable extends Component {
  render() {
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
          <tbody className="table-body">
            <tr className="table-body-row">
              <td>MSFT</td>
              <td>Microsoft Corporation</td>
              <td>20</td>
              <td>2500</td>
              <td>2100</td>
              <td>400</td>
              <td>
                <button className="btn btn--danger">Stop Tracking</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="alert alert-info">No Stocks have been selected</div>

        <div className="alert alert-danger">
          There seems to be a issue with server
        </div>
      </>
    );
  }
}
