import React, {Component} from 'react';
import Home from './homeComponent'
import Menu from './MenuComponents'
import DishDetail from './dishDetailComponent'
import Header from './headerComponent'
import Footer from './footerComponent'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import Contact from './contactComponenet'
import About from './aboutComponent'
import {connect} from 'react-redux'
import { addComment } from '../redux/actionCreators'

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))   //dispatch function obtains and acts as a transporter
})

class Main extends Component {

  render(){

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0] } 
        promotions={this.props.promotions.filter((promo) => promo.featured)[0] }
        leader={this.props.leaders.filter((leader) => leader.featured)[0] }
        />  //filters out dish with featured true
      )
    }

    const AboutPage = () => {
      return (
        <About leaders={this.props.leaders} />
      )
    }

    const DishWithId = ({match}) => {
     return (
       <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0] }
       comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
       addComment={this.props.addComment}
       />
     )
    }

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
        <Route path="/menu/:dishId" component={DishWithId} />
        <Route path="/aboutus" component={AboutPage} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));