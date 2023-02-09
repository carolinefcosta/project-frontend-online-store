import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ShoppingCart from '../pages/ShoppingCart';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/shopping" component={ ShoppingCart } />
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}

export default Routes;
