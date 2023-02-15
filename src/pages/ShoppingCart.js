import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

class ShoppingCart extends Component {
  state = {
    // cartList: true,
  };

  render() {
    const {
      loading,
      myProducts,
      productList,
      increaseDecrazy,
      removeFromCart } = this.props;
    // const { cartList } = this.state;
    return (
      <div>
        {
          !loading ? (
            <>
              {productList.map((product) => (
                <div
                  key={ product.id }
                >
                  <ProductCard
                    dataTestName="shopping-cart-product-name"
                    dataTestButton="product-add-to-cart"
                    image={ product.thumbnail }
                    name={ product.title }
                    price={ product.price }
                  />
                  <p data-testid="shopping-cart-product-quantity">
                    { myProducts[product.title] }
                  </p>
                  <button
                    data-testid="product-decrease-quantity"
                    type="button"
                    onClick={ async () => increaseDecrazy(product.title, '-') }
                  >
                    -
                  </button>
                  <button
                    data-testid="product-increase-quantity"
                    type="button"
                    onClick={ async () => increaseDecrazy(product.title, '+') }
                  >
                    +
                  </button>
                  <button
                    data-testid="remove-product"
                    type="button"
                    onClick={ () => removeFromCart(product.title) }
                  >
                    x
                  </button>
                </div>
              ))}
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
