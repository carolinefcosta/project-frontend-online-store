import React, { Component } from 'react';
import Category from '../components/Category';
import Header from '../components/Header';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

class Home extends Component {
  state = {
    listFull: false,
    resultProducts: [],
    inputSearch: '',
    listCategory: [],
  };

  componentDidMount() {
    this.getCategoriesList();
  }

  getCategoriesList = async () => {
    const list = await getCategories();
    this.setState({
      listCategory: list,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { listFull, inputSearch, listCategory } = this.state;
    return (
      <div>
        <Header
          value={ inputSearch }
          onChange={ this.handleChange }
          onClick={ () => getProductsFromCategoryAndQuery() }
        />
        <Category
          listCategory={ listCategory }
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
