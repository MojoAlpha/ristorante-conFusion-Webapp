import React, {Component} from 'react';
import Home from './homeComponent'
import Menu from './MenuComponents'
import DishDetail from './dishDetailComponent';
import {DISHES} from '../shared/dishes'
import Header from './headerComponent'
import Footer from './footerComponent'
import {Switch, Route, Redirect} from 'react-router-dom'

class Main extends Component {

  constructor(props){
    super(props)

    this.state = {
      dishes: DISHES,   //the state is lifted up to make it accessible to all the components
    };
  }


  render(){

    const HomePage = () => {
      return (
        <Home />
      )
    }
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
        <Redirect to='/home' />    {/* automatic redirection to home if nothing is specified */}
      </Switch>
      <Footer />
    </div>
  );
  }
  //Usage of reactstrap elements and bootstrap classes to style the page
  //reactstrap is a library that enables the JS bootstrap components to work with react
}

export default Main;