// Just a thought: Perhaps this "page" should be broken up into two separate components.
import React, { Component } from 'react';
import './Cart.css';
// import Shipping from './Shipping'; //Just working on the Cart for now. Limiting scope.

//import ShirtListRow from './../ShirtListRow'; //For some reason I'm getting an error that it cannot find this component when I try to import it.

class Cart extends Component {
  constructor() {
    super();
    // this.completeOrder = this.completeOrder.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    // Set the initial state
    this.state = {
      // The cart items are yet to be completed orders and will be brought down from the App itself once the storage piece is worked out. The orderDetails are going to represent completed orders that are sent to the storage. For now it's static for testing.
      orderDetails: {},
      counter: 0
    };
  }

  handleChange(e, key) {
    const item = this.props.cartItems[key];
    console.log(item);
    const updatedItem = {
      ...item,
      //Maybe we can make this into a new function called Quantity + or -. Separate one for removing an item.
      quantity: item.quantity + 1
    };
    console.log(updatedItem.quantity);
    this.props.updateItem(key, updatedItem);
  }

  //Example from code pen: https://codepen.io/ajcbrown820/pen/eZdWaj?editors=0010#0

  increment() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  decrement() {
    this.setState({
      counter: this.state.counter - 1
    });
  }

  renderTable(key) {
    const cartItem = this.props.cartItems[key];
    return (
      <tr className="cartRow" key={key}>
        <th className="cartID" scope="row">
          {cartItem.id}
        </th>
        <td className="cartDesc">{/* {cartItem.getDescription()} */}</td>
        <td className="cartQty ">
          {/* <button onClick={(e) => this.props.incItemQty(cartItem.id)} className="btn vcenter"> */}
          <button
            onClick={e => this.handleChange(e, key)}
            className="btn vcenter"
          >
            <i className="fa fa-plus-circle" aria-hidden="true" />
          </button>
          <h5 className="vcenter">{cartItem.quantity}</h5>
          <button className="btn vcenter">
            <i className="fa fa-minus-circle" aria-hidden="true" />
          </button>
        </td>
        <td className="cartCost">
          <h5>{cartItem.subTotal}</h5>
        </td>
        <td className="cartCancel">
          {/* This button will update the currentCartItems to remove the item by ID from the state. GitHub Issue #21 */}
          <button className="btn btn-danger">
            <i className="fa fa-trash" aria-hidden="true" />
          </button>
        </td>
      </tr>
    );
  }

  render() {
    // Solves Issue #18 of the Total. Other items in issue #18 were solved through props.
    let total = 0;
    if (this.props.cartItems.length > 0) {
      total = this.props.cartItems
        .map(lim => lim.subTotal)
        .reduce((previous, current) => previous + current);
    }

    return (
      <div className="row">
        <div className="col">
          <h1 className="orderItems">Your Order</h1>
          {/* We should also include on the right the order number. Either that or upon completion of the order*/}
          {/* Begins Order Table */}
          <div>
            <div id="counter">{this.state.counter}</div>
            <button onClick={this.increment}> Add 1 </button>
            <button onClick={this.decrement}> Minus 1 </button>
          </div>
          <table className="table table-striped table-hover table-sm table-sm">
            {/* Renders headings on the table */}
            <thead>
              <tr>
                <th>
                  <h6>Item No.</h6>
                </th>
                <th>
                  <h6>Description</h6>
                </th>
                <th>
                  <h6>Quantity</h6>
                </th>
                <th>
                  <h6>Subtotal</h6>
                </th>
                <th>
                  <h6>Remove</h6>
                </th>
              </tr>
            </thead>
            {/* Renders the footer of the table with the total */}
            <tfoot>
              <tr>
                <th colSpan="3" scope="row">
                  Total
                </th>
                <th colSpan="2">{total}</th>
              </tr>
            </tfoot>
            <tbody>
              {/* This loops over the cartItems from the App.js state and renders each item on a different line, according to the renderTable function. */}
              {Object.keys(this.props.cartItems).map(this.renderTable)}
            </tbody>
          </table>

          {/*  SHIPPING FORM - Currently rendering here, but we can always send it over to a separate page with routing.*/}
          <h2 classID="shipHeader">Shipping Details</h2>
          {/* Shipping form moved to its own component, Shipping.js */}
          {/* <Shipping /> - Have just hidden for now while I work on the cart itself. */}
          {/* End Shipping form. */}
        </div>
      </div>
    );
  }
}

export default Cart;
