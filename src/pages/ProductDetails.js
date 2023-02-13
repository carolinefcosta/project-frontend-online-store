import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import ProductCard from '../components/ProductCard';

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
    const { history } = this.props;
    const { details } = this.state;
    return (
      <>
        {console.log(details)}
        <ProductCard
          image={ details.thumbnail }
          name={ details.title }
          price={ details.price }
        />
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ () => history.push('/shopping') }
        >
          Ir ao Carrinho

        </button>
      </>
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
