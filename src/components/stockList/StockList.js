import React from 'react';
import './StockList.scss';
import Modal from './../modal/Modal';
import { getTrackedDBLen } from './../../util/data';

class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      selectedStock: undefined,
      showList: true
    };
  }

  componentDidMount() {
    getTrackedDBLen()
      .then(len => {
        if (len >= 5) {
          this.setState({ showList: false });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    getTrackedDBLen()
      .then(len => {
        if (len >= 5) {
          this.setState({ showList: false });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  showModal = stock => {
    this.setState({ isModal: true, selectedStock: stock });
  };

  hideModal = (moreError = false) => {
    if (moreError) {
      this.setState({
        showList: false,
        isModal: false,
        selectedStock: undefined
      });
      return;
    }
    this.setState({ isModal: false, selectedStock: undefined });
    this.props.onAdd();
  };

  render() {
    return (
      <>
        {this.state.showList && (
          <div className="list">
            {this.props.stocks.map(
              stock =>
                !stock.isTracking && (
                  <div className="list-item" key={stock.symbol}>
                    <button
                      className="btn StockButton"
                      onClick={() => this.showModal(stock)}
                    >
                      {stock.symbol}
                    </button>
                    <div className="list-name"> {stock.name} </div>
                  </div>
                )
            )}
          </div>
        )}
        {!this.state.showList && (
          <div className="alert alert-danger">
            You can only add 5 stocks to track
          </div>
        )}
        {this.state.isModal && (
          <Modal
            stock={this.state.selectedStock}
            onModalHide={this.hideModal}
          />
        )}
      </>
    );
  }
}

export default StockList;
