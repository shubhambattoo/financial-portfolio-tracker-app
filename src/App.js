import React from 'react';
import './App.scss';
import Header from './components/header/Header';
import StocksTable from './components/stockstable/StocksTable';
import StockList from './components/stockList/StockList';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="MyStocks">
        <h1>My Stocks</h1>
        <StocksTable />
      </div>
      <div className="AddStocksTitle">
        <h2>Add Stocks to track</h2>
        <StockList />
      </div>
    </div>
  );
}

export default App;
