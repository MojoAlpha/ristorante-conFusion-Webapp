import React, {Component} from 'react';
import Home from './homeComponent'
import Menu from './MenuComponents'
import {DISHES} from '../shared/dishes'
import Header from './headerComponent'
import Footer from './footerComponent'
import {Switch, Route, Redirect} from 'react-router-dom'
import {COMMENTS} from '../shared/comments'
import {LEADERS} from '../shared/leaders'
import {PROMOTIONS} from '../shared/promotions'
import Contact from './contactComponenet'

class Main extends Component {

  constructor(props){
    super(props)

    this.state = {
      dishes: DISHES,   //the state is lifted up to make it accessible to all the components
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }


  render(){

    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0] } 
        promotions={this.state.promotions.filter((promo) => promo.featured)[0] }
        leader={this.state.leaders.filter((leader) => leader.featured)[0] }
        />  //filters out dish with featured true
      )
    }
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
        <Route exact path="/contactus" component={Contact} />
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