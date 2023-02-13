import React, { Component } from 'react';
// import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCard extends Component {
  //  state= {
  //    boolDidUpdate: false,
  //  }

  //  componentDidMount() {
  //
  //  }

  //  shouldComponentUpdate(nextProps, nextState) {
  //
  //    return true;
  //  }

  //  componentDidUpdate() {
  //    const { boolDidUpdate } = this.state;
  //    if (boolDidUpdate) {
  //      this.setState({boolDidUpdate: false,}, this.func)
  //    }
  //  }

  //  componentDidMount() {
  //
  //  }

  render() {
    const { image, name, price, dataTestId } = this.props;
    console.log(dataTestId);
    return (
      <section data-testid={ dataTestId }>
        <img src={ image } alt={ name } />
        <h2>{name}</h2>
        <p>{price}</p>
      </section>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
}.isRequired;
