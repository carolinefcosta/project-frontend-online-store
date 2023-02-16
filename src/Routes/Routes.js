import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ShoppingCart from '../pages/ShoppingCart';
import ProductDetails from '../pages/ProductDetails';
import { getProductsFromCategoryAndQuery,
  getCategories } from '../services/api';

class Routes extends Component {
  state = {
    resultProducts: [],
    inputSearch: '',
    listCategory: [],
    productList: [],
  };

  componentDidMount() {
    this.getCategoriesList();
  }

  setLocalStorage = (chave, value) => {
    const arrayStorage = JSON.parse(localStorage.getItem(chave));
    if (!arrayStorage) {
      localStorage.setItem(chave, JSON.stringify([]));
    }
    const arrayStorage2 = JSON.parse(localStorage.getItem(chave));
    const arrayStorage3 = [...arrayStorage2, value];
    localStorage.setItem(chave, JSON.stringify(arrayStorage3));
  };

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
    this.setState({ resultProducts: [...result.results] });
  };

  getProductsFromCategory2 = async (categoryId) => {
    const result = await getProductsFromCategoryAndQuery(categoryId, null);
    this.setState({ resultProducts: [...result.results] });
  };

  getProductsFromCategory = async ({ target }) => {
    this.getProductsFromCategory2(target.name);
  };

  increaseDecrazy = (name, operator) => {
    const { productList } = this.state;
    const dataFilter = productList.filter((product) => product.title === name)
      .reduce((acc, curr) => curr, {});
    console.log(dataFilter);
    const dataDecrazy = productList.map((product) => {
      if (product === dataFilter) {
        if (operator === '-' && product.quantity > 1) {
          product.quantity -= 1;
          return product;
        } if (operator === '+' && product.quantity > 0) {
          product.quantity += 1;
          return product;
        }
      }
      return product;
    });
    this.setState({
      productList: dataDecrazy,
    });
    console.log(productList);
  };

  addToCart = (name) => {
    // const product = {
    //   image,
    //   name,
    //   price,
    //   quantity: 1,
    // };
    const { resultProducts, productList } = this.state;
    const dataFilter = resultProducts.filter((product) => product.title === name)
      .reduce((acc, curr) => curr, {});
    const dataFilter2 = { ...dataFilter, quantity: 1 };
    console.log(dataFilter);
    this.increaseDecrazy(name, dataFilter);
    const trueOrFalse = productList.some((produto) => (
      produto.title === name
    ));
    if (!trueOrFalse) {
      this.setState({
        productList: [...productList, dataFilter2],
      });
    }
    this.setLocalStorage('productList', dataFilter2);
  };

  localStorageHandler = (value) => {
    this.setState({
      productList: [value],
    });
  };

  removeFromCart = (name) => {
    const { productList, myProducts } = this.state;
    const result = productList.filter((product) => product.title !== name);
    const result2 = myProducts;
    delete result2[name];
    this.setState({
      productList: result,
      myProducts: result2,
    });
    // localStorage.removeItem(name);
  };

  render() {
    const {
      inputSearch,
      resultProducts,
      listCategory,
      loadingShoppingCart,
      myProducts,
      productList,
    } = this.state;
    return (
      <Switch>
        <Route
          path="/productDetails/:id"
          render={
            (props) => (<ProductDetails
              { ...props }
              addToCart={ this.addToCart }
            />)
          }
        />

        <Route
          path="/shopping"
          render={ () => (
            <ShoppingCart
              loading={ loadingShoppingCart }
              myProducts={ myProducts }
              productList={ productList }
              increaseDecrazy={ this.increaseDecrazy }
              removeFromCart={ this.removeFromCart }
              localStorageHandler={ () => this.localStorageHandler() }
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
