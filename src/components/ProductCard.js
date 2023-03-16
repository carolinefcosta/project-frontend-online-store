import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductCard.css';

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
      <section data-testid={ dataTestId } className="section-product-card">
        <img
          className="img-product-card"
          data-testid={ dataTestImage }
          src={ product.thumbnail }
          alt={ product.title }
        />
        <h2
          data-testid={ dataTestName }
          className="title-product-card"
        >
          {product.title}

        </h2>
        <div
          className="price-product-card"
          data-testid={ dataTestPrice }
        >
          R$
          {' '}
          {product.price}
        </div>
        { addToCart && (
          <button
            className="button-product-card"
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
