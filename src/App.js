import React from 'react';
import './App.scss';
import Header from './components/header/Header';
import StocksTable from './components/stockstable/StocksTable';
import StockList from './components/stockList/StockList';
import db from './firebase/init';
import axios from 'axios';
import { format } from 'date-fns';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      tracked: []
    };
  }

  apiEndpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=${process.env.REACT_APP_APIKEY}`;

  getStockLists = () => {
    db.collection('stocks')
      .get()
      .then(querySnapshot => {
        const stocks = querySnapshot.docs.map(doc => doc.data());
        this.setState({ stocks });
      })
      .catch(err => {
        this.setState({ stocks: [] });
      });
  };

  getTrackedStocks = () => {
    db.collection('trackedStocks')
      .get()
      .then(querySnapshot => {
        const tracked = querySnapshot.docs.map(doc => doc.data());
        console.log(tracked);
        // eslint-disable-next-line array-callback-return
        tracked.map(data => {
          axios
            .get(this.apiEndpoint + `&symbol=${data.stockSymbol}`)
            .then(res => {
              const today = format(new Date(), 'yyyy-MM-dd');
              const currentDayData = res.data['Time Series (Daily)'][today];
            });
        });
      });
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
          <StocksTable />
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
