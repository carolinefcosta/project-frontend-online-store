import React, { Component } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    listFull: false,
    resultProducts: {},
    inputSearch: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  getProductsFromApi = async (query) => {
    const result = await getProductsFromCategoryAndQuery(query);
    this.setState({ resultProducts: result, listFull: true });
  };

  render() {
    const { listFull, inputSearch, resultProducts } = this.state;
    const { results } = resultProducts;
    return (
      <div>
        <Header
          value={ inputSearch }
          onChange={ this.handleChange }
          onClick={ () => this.getProductsFromApi(inputSearch) }
        />
        {
          (results) ? (
            results.map((product) => (
              <ProductCard
                dataTestId="product"
                key={ product.id }
                image={ product.thumbnail }
                name={ product.title }
                price={ product.price }
              />
            ))

          ) : (
          // tentar encontart uma forma de só aparecer depois de clicar
            <h1>Nenhum produto foi encontrado</h1>
          )
        }
        {(!results) && (
          <h1
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        )}

      </div>
    );
  }
}

export default Home;
