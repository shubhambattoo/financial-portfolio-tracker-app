import React from 'react';
import './App.scss';
import Header from './components/header/Header';
import StocksTable from './components/stockstable/StocksTable';
import StockList from './components/stockList/StockList';
import db from './firebase/init';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: []
    };
  }

  componentDidMount() {
    db.collection('stocks')
      .get()
      .then(querySnapshot => {
        const stocks = querySnapshot.docs.map(doc => doc.data());
        this.setState({ stocks });
      });
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
