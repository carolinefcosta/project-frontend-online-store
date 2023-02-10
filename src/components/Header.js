import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { onClick, onChange, value } = this.props;
    return (
      <>
        <label>
          <input
            value={ value }
            name="inputSearch"
            onChange={ onChange }
            type="text"
            data-testid="query-input"
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ onClick(value) }
        >
          Buscar

        </button>
        <Link to="/shopping" data-testid="shopping-cart-button">Meu Carrinho</Link>
      </>
    );
  }
}

export default Header;
