import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const {
      product,
      dataTestId,
      dataTestName,
      dataTestImage,
      dataTestPrice,
      dataTestButton,
      addToCart } = this.props;
    return (
      <section data-testid={ dataTestId }>
        <img
          data-testid={ dataTestImage }
          src={ product.thumbnail }
          alt={ product.title }
        />
        <h2 data-testid={ dataTestName }>{product.title}</h2>
        <p
          data-testid={ dataTestPrice }
        >
          {product.price}
        </p>
        { addToCart && (
          <button
            type="button"
            data-testid={ dataTestButton }
            onClick={ () => addToCart(product.title) }
          >
            Adicionar ao carrinho
          </button>
        ) }
      </section>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.arrayOf(),
  dataTestId: PropTypes.string,
  dataTestName: PropTypes.string,
  dataTestImage: PropTypes.string,
  dataTestPrice: PropTypes.string,
  dataTestButton: PropTypes.string,
  addToCart: PropTypes.func,
}.isRequired;
