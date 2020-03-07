import React from 'react';
import './StockList.scss';
import Modal from './../modal/Modal';

class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      selectedStock: undefined
    };
  }

  showModal = stock => {
    this.setState({ isModal: true, selectedStock: stock });
  };

  hideModal = () => {
    this.setState({ isModal: false, selectedStock: undefined });
    this.props.onAdd();
  };

  render() {
    return (
      <>
        {this.props.stocks.length > 0 && (
          <div className="list">
            {this.props.stocks.map(
              stock =>
                !stock.isTracking && (
                  <div
                    className="list-item"
                    key={stock.symbol}
                    onClick={() => this.showModal(stock)}
                  >
                    <button className="btn StockButton">{stock.symbol}</button>
                    <div className="list-name"> {stock.name} </div>
                  </div>
                )
            )}
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
