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
    name: '',
    price: '',
    loadingShoppingCart: true,
    productList: [],
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
    this.setState({ resultProducts: [...result.results] });
  };

  getProductsFromCategory2 = async (categoryId) => {
    const result = await getProductsFromCategoryAndQuery(categoryId, null);
    this.setState({ resultProducts: [...result.results] });
  };

  getProductsFromCategory = async ({ target }) => {
    this.getProductsFromCategory2(target.name);
  };

  increaseDecrazy = async (name, operator) => {
    const { myProducts } = this.state;
    const bool = Object.keys(myProducts).includes(name);

    if (bool && myProducts[name] > 0) {
      switch (operator) {
      case '-':
        this.setState((prevState) => ({
          myProducts: { ...prevState.myProducts, [name]: prevState.myProducts[name] - 1 },
        }
        ));
        break;
      case '+':
        this.setState((prevState) => ({
          myProducts: { ...prevState.myProducts, [name]: prevState.myProducts[name] + 1 },
        }
        ));
        break;
      default:
      }
    } else {
      this.setState((prevState) => ({
        myProducts: { ...prevState.myProducts, [name]: 1 },
      }));
    }
  };

  addToCart = async (image, name, price) => {
    // const product = {
    //   image,
    //   name,
    //   price,
    //   quantity: 1,
    // };
    // console.log(product);
    // const { productList, quantity } = this.state;
    // this.setState({
    //   productList: [...productList, product],
    // });
    // const trueOrFalse = productList.some((produto) => (
    //   produto.name === name
    // ));
    // console.log(trueOrFalse);
    // if (trueOrFalse) {
    //   this.setState((prevState) => ({
    //     quantity: ,
    //   }));
    // }
    const { resultProducts, productList } = this.state;
    const dataFilter = resultProducts.filter((product) => product.title === name)
      .reduce((acc, curr) => curr, {});
    await this.increaseDecrazy(name, '+');
    const trueOrFalse = productList.some((produto) => (
      produto.title === name
    ));
    if (!trueOrFalse) {
      this.setState({
        image,
        name,
        price,
        loadingShoppingCart: false,
        productList: [...productList, dataFilter],
      });
    }
    // Adicionar ao localStorage
  };

  removeFromCart = (name) => {
    const { productList } = this.state;
    const result = productList.filter((product) => product.title !== name);
    // const result2 = productList.filter((product) => product.title !== name);
    this.setState({
      productList: result,
    });
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
              image={ image }
              name={ name }
              price={ price }
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
