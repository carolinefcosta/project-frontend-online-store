import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard';

class ShoppingCart extends Component {
  state = {
    storageList: [],
  };

  componentDidMount() {
    this.getLocalStorage('productList');
  }

  getLocalStorage = (chave) => {
    const result = JSON.parse(localStorage.getItem(chave));
    this.setState({
      storageList: result,
    });
    console.log(result);
  };

  render() {
    const {
      loading,
      myProducts,
      increaseDecrazy,
      removeFromCart } = this.props;
    const { storageList } = this.state;
    return (
      <div>
        {console.log(storageList)}
        {
          !loading ? (
            <>
              {storageList.map((product) => (
                <div
                  key={ product.id }
                >
                  <ProductCard
                    dataTestName="shopping-cart-product-name"
                    dataTestButton="product-add-to-cart"
                    product={ product }
                  />
                  <p data-testid="shopping-cart-product-quantity">
                    { myProducts[product.title] }
                  </p>
                  <button
                    data-testid="product-decrease-quantity"
                    type="button"
                    onClick={ () => increaseDecrazy(product.title, '-') }
                  >
                    -
                  </button>
                  <button
                    data-testid="product-increase-quantity"
                    type="button"
                    onClick={ () => increaseDecrazy(product.title, '+') }
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
