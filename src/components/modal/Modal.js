import './Modal.scss';
import React from 'react';
import { addTrackedStock, getOneStock } from './../../util/data';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noShares: '',
      buyPrice: '',
      buyDate: '',
      stockId: ''
    };
  }

  componentDidMount() {
    getOneStock(this.props.stock.symbol)
      .then(id => {
        this.setState({ stockId: id });
      })
      .catch(err => {
        console.log(err);
      });
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
      alert('All field are required');
      return;
    }
    const { name, symbol } = this.props.stock;
    const data = {
      numberOfShares: parseInt(noShares, 10),
      buyPrice: parseFloat(buyPrice),
      buyDate: new Date(buyDate),
      stockName: name,
      stockSymbol: symbol
    };

    addTrackedStock(data, this.state.stockId)
      .then(data => {
        this.props.onModalHide();
      })
      .catch(err => {
        console.log(err);
        // console.log('failed');
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
            <div className="close">&times;</div>
          </div>
          <div className="modal__content">
            <div className="add-form">
              <div className="field">
                <label htmlFor="name">Company Name</label>
                <div>{this.props.stock.name}</div>
              </div>
              <div className="field">
                <label htmlFor="name">No. of Shares</label>
                <input
                  type="text"
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
