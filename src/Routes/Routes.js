import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ShoppingCart from '../pages/ShoppingCart';
import { getProductsFromCategoryAndQuery,
  getCategories } from '../services/api';

class Routes extends Component {
  state = {
    resultProducts: {},
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

  getProductsFromApi = async (query) => {
    const result = await getProductsFromCategoryAndQuery(null, query);
    this.setState({ resultProducts: result });
  };

  getProductsFromCategory2 = async (categoryId) => {
    const result = await getProductsFromCategoryAndQuery(categoryId, null);
    this.setState({ resultProducts: result });
  };

  getProductsFromCategory = async ({ target }) => {
    this.getProductsFromCategory2(target.name);
  };

  // addToCart = () => {

  // };

  render() {
    const { inputSearch, resultProducts, listCategory } = this.state;
    return (
      <Switch>
        <Route
          path="/shopping"
          render={ () => <ShoppingCart /> }
        />
        <Route
          exact
          path="/"
          render={ () => (
            <Home
              inputSearch={ inputSearch }
              resultProducts={ resultProducts }
              listCategory={ listCategory }
              handleChange={ this.handleChange }
              getProductsFromApi={ this.getProductsFromApi }
              getProductsFromCategory={ this.getProductsFromCategory }
            />
          ) }
        />
      </Switch>
    );
  }
}

export default Routes;
