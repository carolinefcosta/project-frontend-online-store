import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/ProductDetails.css';

class ProductDetails extends Component {
  state = {
    details: {},
  };

  componentDidMount() {
    this.getDetails();
  }

  getDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getProductById(id);

    this.setState({
      details: result,
    });
  };

  render() {
    const { history, addToCart } = this.props;
    const { details } = this.state;
    return (
      <div className="div-product-details">
        <ProductCard
          dataTestPrice="product-detail-price"
          dataTestImage="product-detail-image"
          dataTestName="product-detail-name"
          dataTestButton="product-detail-add-to-cart"
          product={ details }
          addToCart={ addToCart }
        />
        <button
          className="button-product-details"
          type="button"
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/shopping') }
        >
          Ir ao Carrinho

        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default ProductDetails;
