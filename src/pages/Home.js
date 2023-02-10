import React, { Component } from 'react';
import Category from '../components/Category';
import Header from '../components/Header';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    listFull: false,
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

  render() {
    const { listFull, listCategory } = this.state;
    return (
      <div>
        <Header />
        <Category
          listCategory={ listCategory }
        />
        {
          listFull ? <div /> : (
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
