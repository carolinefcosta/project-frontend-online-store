import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Category from '../components/Category';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
// import { getProductsFromCategoryAndQuery,
//   getCategories } from '../services/api';
// import ProductDetails from './ProductDetails';

class Home extends Component {
  // state = {
  //   resultProducts: {},
  //   inputSearch: '',
  //   listCategory: [],
  // };

  // componentDidMount() {
  //   this.getCategoriesList();
  // }

  // getCategoriesList = async () => {
  //   const list = await getCategories();
  //   this.setState({
  //     listCategory: list,
  //   });
  // };

  // handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({ [name]: value });
  // };

  // getProductsFromApi = async (query) => {
  //   const result = await getProductsFromCategoryAndQuery(null, query);
  //   // console.log(result);
  //   this.setState({ resultProducts: result });
  // };

  // getProductsFromCategory2 = async (categoryId) => {
  //   const result = await getProductsFromCategoryAndQuery(categoryId, null);
  //   // console.log(result);
  //   this.setState({ resultProducts: result });
  // };

  // getProductsFromCategory = async ({ target }) => {
  //   this.getProductsFromCategory2(target.name);
  // };

  // addToCart = () => {
  //   console.log({ resultProducts: { target } });
  //   this.setState
  // };

  render() {
    const { inputSearch,
      resultProducts,
      listCategory,
      handleChange,
      getProductsFromApi,
      getProductsFromCategory,
      addToCart,
    } = this.props;
    const { results } = resultProducts;
    return (
      <div>
        <Header
          value={ inputSearch }
          onChange={ handleChange }
          onClick={ () => getProductsFromApi(inputSearch) }
        />
        <Category
          listCategory={ listCategory }
          onClick={ getProductsFromCategory }
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
                  dataTestButton="product-add-to-cart"
                  image={ product.thumbnail }
                  name={ product.title }
                  price={ product.price }
                  id={ product.id }
                  addToCart={ addToCart }
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

Home.propTypes = {
  inputSearch: PropTypes.func,
  resultProducts: PropTypes.objectOf,
  listCategory: PropTypes.arrayOf,
}.isRequired;

export default Home;
