import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Category from '../components/Category';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

class Home extends Component {
  render() {
    const { inputSearch,
      resultProducts,
      listCategory,
      handleChange,
      getProductsFromApi,
      getProductsFromCategory,
      addToCart,
    } = this.props;
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
        <div className="home-div">
          {(resultProducts.length < 1) && (
            <h1 className="home-h1">Nenhum produto foi encontrado</h1>
          )}
          {
            (!resultProducts.length < 1) ? (
              resultProducts.map((product) => (
                <div key={ product.id } className="home-product">
                  <ProductCard
                    dataTestId="product"
                    dataTestButton="product-add-to-cart"
                    addToCart={ addToCart }
                    product={ product }
                  />
                  <Link
                    className="home-details"
                    data-testid="product-detail-link"
                    to={ `/productDetails/${product.id}` }
                  >
                    Detalhes
                  </Link>
                </div>
              ))

            ) : (
              <h1
                className="home-h1-2"
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h1>
            )
          }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  inputSearch: PropTypes.func,
  resultProducts: PropTypes.objectOf,
  listCategory: PropTypes.arrayOf,
  handleChange: PropTypes.func,
  getProductsFromApi: PropTypes.func,
  getProductsFromCategory: PropTypes.func,
  addToCart: PropTypes.func,
}.isRequired;

export default Home;
