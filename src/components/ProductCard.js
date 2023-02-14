import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const {
      image,
      name,
      price,
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
          src={ image }
          alt={ name }
        />
        <h2 data-testid={ dataTestName }>{name}</h2>
        <p
          data-testid={ dataTestPrice }
        >
          {price}
        </p>
        { addToCart && (
          <button
            data-testid={ dataTestButton }
            onClick={ () => addToCart(image, name, price) }
          >
            Adicionar ao carrinho
          </button>
        ) }
      </section>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
}.isRequired;
