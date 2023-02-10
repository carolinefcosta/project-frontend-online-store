import React, { Component } from 'react';
import Header from '../components/Header';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    listFull: false,
    resultProducts: [],
    inputSearch: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { listFull, inputSearch } = this.state;
    return (
      <div>
        <Header
          value={ inputSearch }
          onChange={ this.handleChange }
          onClick={ () => getProductsFromCategoryAndQuery() }
        />
        {
          listFull ? <div /> : (
            <h1
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h1>
          )
        }

      </div>
    );
  }
}

export default Home;
