import React from 'react';
import './App.scss';
import Header from './components/header/Header';
import StocksTable from './components/stockstable/StocksTable';
import StockList from './components/stockList/StockList';
import {
  getStockLists,
  getTrackedStocks,
  updateTracked,
  getOneStockInfo
} from './util/data';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      tracked: [],
      apiExhausted: false,
      loadingTrack: true
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
    this.setState({ loadingTrack: true });
    try {
      const tracked = await getTrackedStocks();
      if (tracked.message) {
        this.setState({ apiExhausted: true });
        return;
      }
      this.setState({ tracked, loadingTrack: false });
    } catch (error) {
      // console.log(error);
      if (error.message) {
        this.setState({ apiExhausted: true, tracked: [] });
      }
    }
  };

  onHandleAdd(doc) {
    getOneStockInfo(doc)
      .then(currentDayData => {
        const data = { ...doc };
        data['stockData'] = currentDayData;
        data['profit'] =
          (currentDayData['4. close'] - data.buyPrice) * data.numberOfShares;
        this.setState(prevState => {
          prevState.tracked.push(data);
          prevState.stocks = prevState.stocks.map(s => {
            if (s.symbol === data.stockSymbol) {
              s.isTracking = true;
            }
            return s;
          });
          return prevState;
        });
      })
      .catch(err => {
        this.setState({ apiExhausted: true });
        return;
      });
  }

  onAdd = doc => {
    this.onHandleAdd(doc);
  };

  handleDelete = stock => {
    updateTracked(stock.id, stock.stockSymbol)
      .then(() => {
        this.setState(prevState => {
          prevState.tracked = prevState.tracked.filter(s => s.id !== stock.id);
          prevState.stocks = prevState.stocks.map(s => {
            if (s.symbol === stock.stockSymbol) {
              s.isTracking = false;
            }
            return s;
          });
          return prevState;
        });
      })
      .catch(err => {
        console.log(err);
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
          <StocksTable
            stocks={this.state.tracked}
            isError={this.state.apiExhausted}
            loading={this.state.loadingTrack}
            handleDelete={this.handleDelete}
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
