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
    myProducts: {},
    loadingShoppingCart: true,
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
    const arrayStorage2 = [...arrayStorage, value];
    localStorage.setItem(chave, JSON.stringify(arrayStorage2));
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
    const { myProducts } = this.state;
    const bool = Object.keys(myProducts).includes(name);

    if (bool && myProducts[name] > 1 && operator === '-') {
      this.setState((prevState) => ({
        myProducts: { ...prevState.myProducts, [name]: prevState.myProducts[name] - 1 },
      }
      ));
    } else if (bool && myProducts[name] > 0 && operator === '+') {
      this.setState((prevState) => ({
        myProducts: { ...prevState.myProducts, [name]: prevState.myProducts[name] + 1 },
      }));
    } else {
      this.setState((prevState) => ({
        myProducts: { ...prevState.myProducts, [name]: 1 },
      }));
    }
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
    this.increaseDecrazy(name);
    const trueOrFalse = productList.some((produto) => (
      produto.title === name
    ));
    if (!trueOrFalse) {
      this.setState({
        loadingShoppingCart: false,
        productList: [...productList, dataFilter],
      });
    }
    this.setLocalStorage('productList', dataFilter);
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
