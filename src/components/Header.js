import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <>
        <label>
          <input
            type="text"
          />
        </label>
        {/* <button
          type="button"
        >
          Meu Carrinho

        </button> */}
        <Link to="/shopping" data-testid="shopping-cart-button">Meu Carrinho</Link>
      </>
    );
  }
}

export default Header;
