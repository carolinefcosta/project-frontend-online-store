import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Category.css';

class Category extends React.Component {
  render() {
    const { listCategory, onClick } = this.props;
    return (
      <aside className="div-category">
        <div>
          <p className="p-category">Categorias</p>
        </div>
        { listCategory.map((item) => (
          <button
            className="button-category"
            type="button"
            key={ item.id }
            data-testid="category"
            onClick={ onClick }
            name={ item.id }
          >
            { item.name }
          </button>)) }
      </aside>
    );
  }
}

Category.propTypes = {
  getCategoriesList: PropTypes.func,
  listCategory: PropTypes.arrayOf,
}.isRequired;

export default Category;
