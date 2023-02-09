import React, { Component } from 'react';
import Header from '../components/Header';

class Home extends Component {
  state = {
    listFull: false,
  };

  render() {
    const { listFull } = this.state;
    return (
      <div>
        <Header />
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
