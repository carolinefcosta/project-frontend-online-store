import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';
import '../styles/ShoppingCart.css';

class ShoppingCart extends Component {
  componentDidMount() {
    this.getLocalStorage('productList');
  }

  getLocalStorage = (chave) => {
    const { localStorageHandler } = this.props;
    const result = JSON.parse(localStorage.getItem(chave));
    localStorageHandler(result);
  };

  render() {
    const {
      increaseDecrazy,
      removeFromCart,
      productList } = this.props;
    return (
      <div className="div-shopping-cart">
        {
          (productList) ? (
            <>
              {productList.map((product) => (
                <div
                  className="product-shopping-cart"
                  key={ product.id }
                >
                  <ProductCard
                    dataTestName="shopping-cart-product-name"
                    dataTestButton="product-add-to-cart"
                    product={ product }
                  />
                  <p data-testid="shopping-cart-product-quantity">
                    { product.quantity }
                  </p>
                  <button
                    className="button-shopping-cart"
                    data-testid="product-decrease-quantity"
                    type="button"
                    onClick={ () => increaseDecrazy(product.title, '-') }
                  >
                    ➖
                  </button>
                  <button
                    className="button-shopping-cart"
                    data-testid="product-increase-quantity"
                    type="button"
                    onClick={ () => increaseDecrazy(product.title, '+') }
                  >
                    ➕
                  </button>
                  <button
                    className="button-shopping-cart"
                    data-testid="remove-product"
                    type="button"
                    onClick={ () => removeFromCart(product.title) }
                  >
                    ❌
                  </button>
                </div>
              ))}
            </>)
            : (
              <h1
                className="h1-shopping-cart"
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

ShoppingCart.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

export default ShoppingCart;
