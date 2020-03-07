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
      tracked: [],
      apiExhausted: false
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
      this.setState({ tracked });
    } catch (error) {
      console.log("error happen");
      this.setState({ apiExhausted: true }, () => {
        console.log(this.state);
      });
    }
  };

  onAdd = () => {
    this.getStockLists();
    this.getTrackedStocks();
  }

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
          <StocksTable
            stocks={this.state.tracked}
            isError={this.state.apiExhausted}
          />
        </div>
        <div className="AddStocksTitle">
          <h2>Add Stocks to track</h2>
          <StockList stocks={this.state.stocks} onAdd={this.onAdd} />
        </div>
      </div>
    );
  }
}

export default App;
