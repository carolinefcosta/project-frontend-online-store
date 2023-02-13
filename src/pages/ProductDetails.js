import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductDetails extends Component {
  // state = {
  //   image: '',
  //   title: '',
  //   price: '',
  // };

  render() {
    const { image, name, price, id } = this.state;
    return (
      <section data-testid={ id }>
        <img src={ image } alt={ name } />
        <h2>{name}</h2>
        <p>{price}</p>
      </section>
    );
  }
}

export default ProductDetails;

ProductDetails.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
