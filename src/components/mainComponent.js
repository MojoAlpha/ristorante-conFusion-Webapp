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
import { fetchDishes, fetchComments, fetchPromos, postComment, fetchLeaders, postFeedback } from '../redux/actionCreators'
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)) ,  //dispatch function obtains and acts as a transporter
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes()
    this.props.fetchComments()
    this.props.fetchPromos()
    this.props.fetchLeaders()
  }

  render(){

    const HomePage = () => {
      return (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading} 
        dishesErrMess={this.props.dishes.errMess} 
        promotions={this.props.promotions.promotions.filter((promo) => promo.featured)[0] }
        promosLoading={this.props.promotions.isLoading} 
        promosErrMess={this.props.promotions.errMess} 
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0] }
        leaderLoading={this.props.leaders.isLoading}
        leaderErrMess={this.props.leaders.errMess}
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
       <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0] }
       isLoading={this.props.dishes.isLoading} 
       errMess={this.props.dishes.errMess}
       comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
       commmentErrMess={this.props.comments.errMess}
       postComment={this.props.postComment}
       />
     )
    }

  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
        <Route path="/menu/:dishId" component={DishWithId} />
        <Route path="/aboutus" component={AboutPage} />
        <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
        <Redirect to='/home' />    {/* automatic redirection to home if nothing is specified */}
      </Switch>
      </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
  }
  //Usage of reactstrap elements and bootstrap classes to style the page
  //reactstrap is a library that enables the JS bootstrap components to work with react
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));