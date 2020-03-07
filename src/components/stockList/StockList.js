import React from 'react';
import './StockList.scss';
import Modal from './../modal/Modal';

class StockList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      selectedStock: undefined,
      showList: true
    };
  }

  showModal = stock => {
    this.setState({ isModal: true, selectedStock: stock });
  };

  hideModal = (moreError = false) => {
    this.setState({ isModal: false, selectedStock: undefined });
    this.props.onAdd();
    if (moreError) {
      this.setState({ showList: false });
    }
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
