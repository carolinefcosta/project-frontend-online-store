import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  render() {
    const { listCategory } = this.props;
    return (
      <div>
        <p>Categorias</p>
        { listCategory.map((item) => (
          <button
            key={ item.id }
            data-testid="category"
          >
            { item.name }
          </button>)) }
      </div>
    );
  }
}

Category.propTypes = {
  getCategoriesList: PropTypes.func,
  listCategory: PropTypes.arrayOf,
}.isRequired;

export default Category;
