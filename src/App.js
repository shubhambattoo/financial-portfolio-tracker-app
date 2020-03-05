import React from 'react';
import './App.scss';
import Header from './components/header/Header';
import StocksTable from './components/stockstable/StocksTable';
import StockList from './components/stockList/StockList';
import { getStockLists, getTrackedStocks } from './util/data';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      tracked: []
    };
  }

  getStockLists = async () => {
    try {
      const stocks = await getStockLists();
      this.setState({ stocks });
    } catch (error) {
      this.setState({ stocks: [] });
    }
  };

  getTrackedStocks = async () => {
    try {
      const tracked = await getTrackedStocks();
      console.log(tracked);
      this.setState({ tracked });
    } catch (error) {
      this.setState({ tracked: [] });
    }
  };

  componentDidMount() {
    this.getStockLists();
    this.getTrackedStocks();
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="MyStocks">
          <h1>My Stocks</h1>
          <StocksTable stocks={this.state.tracked} />
        </div>
        <div className="AddStocksTitle">
          <h2>Add Stocks to track</h2>
          <StockList stocks={this.state.stocks} />
        </div>
      </div>
    );
  }
}

export default App;
