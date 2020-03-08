import './Modal.scss';
import React from 'react';
import { addTrackedStock } from './../../util/data';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noShares: '',
      buyPrice: '',
      buyDate: '',
      stockId: '',
      feedback: ''
    };
  }

  handleInputChange = ev => {
    const name = ev.target.name;
    const value = ev.target.value;
    this.setState({
      [name]: value
    });
  };

  add = () => {
    const { noShares, buyDate, buyPrice } = this.state;
    if (!noShares || !buyPrice || !buyDate) {
      alert('All field(s) are required');
      return;
    }
    const { name, symbol } = this.props.stock;
    const doc = {
      numberOfShares: parseInt(noShares, 10),
      buyPrice: parseFloat(buyPrice),
      buyDate: new Date(buyDate),
      stockName: name,
      stockSymbol: symbol
    };

    addTrackedStock(doc, this.props.stock.id)
      .then(data => {
        if (data && data.message) {
          this.props.onModalHide(true);
          return;
        }
        // console.log(typeof data);
        this.props.onModalHide(false, doc);
      })
      .catch(err => {
        console.log(err);
        // console.log('failed');
        if (err === 5) {
          this.props.onModalHide(true);
          return;
        }
        alert('could not add document');
      });
  };

  render() {
    return (
      <div className="modal-container">
        <div className="modal AddStockForm">
          <div className="modal__header">
            <h3>
              Add <span className="text-cap">{this.props.stock.name}</span> to
              my Stocks
            </h3>
            <div className="close" onClick={() => this.props.onModalHide(false, undefined)}>&times;</div>
          </div>
          <div className="modal__content">
            <div className="add-form">
              <div className="field">
                <label htmlFor="name">Company Name</label>
                <div className="text-cap">{this.props.stock.name}</div>
              </div>
              <div className="field">
                <label htmlFor="name">No. of Shares</label>
                <input
                  type="number"
                  name="noShares"
                  id="noShares"
                  placeholder="No. of Shares"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="name">Buy Price</label>
                <input
                  type="number"
                  name="buyPrice"
                  id="buyPrice"
                  placeholder="Buying Price"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="name">Buy Date</label>
                <input
                  type="date"
                  name="buyDate"
                  onChange={this.handleInputChange}
                  id="buyDate"
                />
              </div>
              <div className="field center">
                <button className="AddButton" onClick={this.add}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  stock: PropTypes.object.isRequired,
  onModalHide: PropTypes.func.isRequired
}
