import React, {Component} from 'react';
import Menu from './MenuComponents'
import DishDetail from './dishDetailComponent';
import {DISHES} from '../shared/dishes'
import Header from './headerComponent'
import Footer from './footerComponent'

class Main extends Component {

  constructor(props){
    super(props)

    this.state = {
      dishes: DISHES,   //the state is lifted up to make it accessible to all the components
      selectedDish: null
    };
  }

  onDishSelect(dishId){
    this.setState({selectedDish: dishId});
   }

  render(){
  return (
    <div>
      <Header />
      <Menu dishes={this.state.dishes} 
      onClick={(dishId) => this.onDishSelect(dishId)} />
      <DishDetail 
        dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />   {/* filter function returns a subarray with the required condition satisfied */}
      <Footer />
    </div>
  );
  }
  //Usage of reactstrap elements and bootstrap classes to style the page
  //reactstrap is a library that enables the JS bootstrap components to work with react
}

export default Main;