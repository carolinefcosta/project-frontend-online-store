import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

class ShoppingCart extends Component {
  state = {
    // cartList: true,
  };

  render() {
    const { image, name, price, loading, myProducts } = this.props;
    // const { cartList } = this.state;
    return (
      <div>
        {
          !loading ? (
            <>
              <ProductCard
                dataTestName="shopping-cart-product-name"
                dataTestButton="product-add-to-cart"
                image={ image }
                name={ name }
                price={ price }
              />
              <p data-testid="shopping-cart-product-quantity">
                { myProducts[name] }
              </p>
            </>)
            : (
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

ShoppingCart.propTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

export default ShoppingCart;
