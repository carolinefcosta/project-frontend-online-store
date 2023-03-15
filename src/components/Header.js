import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Header.css';
import compras from '../img/compras.jpeg';
import carrinho from '../img/carrinho.jpeg';

class Header extends Component {
  render() {
    const { onClick, onChange, value } = this.props;
    return (
      <section className="section-header">
        <div className="div-img-h1">
          <img src={ compras } alt="logo-compras" className="logo-compras" />
          <div className="h1-online-store">
            <h1>FRONT-END</h1>
            <h3 className="h3">Online Store</h3>
          </div>
        </div>
        <div>
          <label>
            <input
              className="input-search"
              value={ value }
              name="inputSearch"
              onChange={ onChange }
              type="text"
              data-testid="query-input"
              placeholder="Digite o que você busca"
            />
          </label>
          <button
            className="button-header"
            type="button"
            data-testid="query-button"
            onClick={ onClick }
          >
            Buscar
          </button>
        </div>
        <Link
          to="/shopping"
          data-testid="shopping-cart-button"
          className="carrinho"
        >
          <img
            className="logo-carrinho"
            src={ carrinho }
            alt="logo-carrinho"
          />
        </Link>
      </section>
    );
  }
}

Header.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
}.isRequired;

export default Header;
