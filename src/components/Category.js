import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  render() {
    const { listCategory, onClick } = this.props;
    return (
      <div>
        <p>Categorias</p>
        { listCategory.map((item) => (
          <button
            type="button"
            key={ item.id }
            data-testid="category"
            onClick={ onClick }
            name={ item.id }
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
