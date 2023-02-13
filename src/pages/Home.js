import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery,
  getCategories } from '../services/api';
import ProductDetails from './ProductDetails';

class Home extends Component {
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
    console.log(result);
    this.setState({ resultProducts: result });
  };

  getProductsFromCategory2 = async (categoryId) => {
    const result = await getProductsFromCategoryAndQuery(categoryId, null);
    console.log(result);
    this.setState({ resultProducts: result });
  };

  getProductsFromCategory = async ({ target }) => {
    this.getProductsFromCategory2(target.name);
  };

  render() {
    const { inputSearch, resultProducts, listCategory } = this.state;
    const { results } = resultProducts;
    return (
      <div>
        <Header
          value={ inputSearch }
          onChange={ this.handleChange }
          onClick={ () => this.getProductsFromApi(inputSearch) }
        />
        <Category
          listCategory={ listCategory }
          onClick={ this.getProductsFromCategory }
        />
        {(!results) && (
          <h1>Nenhum produto foi encontrado</h1>

        )}
        {
          (results) ? (
            results.map((product) => (
              <div key={ product.id }>
                <ProductCard
                  dataTestId="product"
                  image={ product.thumbnail }
                  name={ product.title }
                  price={ product.price }
                  id={ product.id }
                />
                <Link
                  data-testid="product-detail-link"
                  to={ `/productDetails/${product.id}` }
                >
                  Detalhes
                </Link>
              </div>
            ))

          ) : (
          // tentar encontart uma forma de só aparecer depois de clicar
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
