import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ShoppingCart from '../pages/ShoppingCart';
import ProductDetails from '../pages/ProductDetails';
import { getProductsFromCategoryAndQuery,
  getCategories } from '../services/api';

class Routes extends Component {
  state = {
    resultProducts: {},
    inputSearch: '',
    listCategory: [],
    myProducts: {},
    name: '',
    price: '',
    loadingShoppingCart: true,
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

  auxFunc = (name) => {
    const { myProducts } = this.state;
    const bool = Object.keys(myProducts).includes(name);

    if (bool) {
      this.setState((prevState) => ({
        myProducts: { ...prevState.myProducts, [name]: prevState.myProducts[name] + 1 },
      }
      ));
    } else {
      this.setState((prevState) => ({
        myProducts: { ...prevState.myProducts, [name]: 1 },
      }));
    }
  };

  addToCart = (image, name, price) => {
    this.auxFunc(name);
    this.setState({
      image,
      name,
      price,
      loadingShoppingCart: false,
    });
    // Adicionar ao localStorage
  };

  render() {
    const {
      inputSearch,
      resultProducts,
      listCategory,
      image,
      name,
      price,
      loadingShoppingCart,
      myProducts } = this.state;
    return (
      <Switch>
        <Route path="/productDetails/:id" component={ ProductDetails } />
        <Route
          path="/shopping"
          render={ () => (
            <ShoppingCart
              image={ image }
              name={ name }
              price={ price }
              loading={ loadingShoppingCart }
              myProducts={ myProducts }
            />
          ) }
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
              addToCart={ this.addToCart }
            />
          ) }
        />
      </Switch>
    );
  }
}

export default Routes;
