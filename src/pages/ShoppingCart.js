import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cartList: false,
  };

  render() {
    const { cartList } = this.state;
    return (
      <div>
        {
          cartList ? <div /> : (
            <h1
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </h1>
          )
        }
      </div>
    );
  }
}

export default ShoppingCart;
