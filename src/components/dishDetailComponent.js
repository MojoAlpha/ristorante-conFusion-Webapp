import React,{ Component} from 'react'
import {Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Label
, Button, Row, Col, Modal, ModalHeader, ModalBody} from 'reactstrap'  //breadcrumbs are the links
import {Link} from 'react-router-dom'
import {Control, LocalForm, Errors } from 'react-redux-form'
    
const required = (val) => val && val.length
const maxlength = (len) => (val) => !(val) || (val.length <= len)
const minlength = (len) => (val) => !(val) || (val.length >= len)

function RenderDish({dish, comments, addComment}) {
    return (
                <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                      <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                      <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='col-12 row m-1 p-0'>
                <Card className='col-md-5'>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
                </Card>
                <Card className='col-md-5 ml-2'>
                    <CardBody>
                        <h1 className='mb-1'>Comments</h1>
                        <RenderComments comments={comments}
                        addComment={addComment}
                        dishId={dish.id} />
                        </CardBody>
                </Card>
                </div>
                </div>
            )
}

function RenderComments({comments, addComment, dishId}) {
    const cmmntbox = comments.map((cmmnt) => {
        if(cmmnt != null){
        return (
            <div key={cmmnt.id} className='mb-4'>
                <p className='mb-2'>-- {cmmnt.comment}</p>
                <p>{cmmnt.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmmnt.date)))}</p>
            </div>
        )
        }else{
            return (
                <div></div>
            )
        }
    })
    return(
        <div>
            {cmmntbox}
            <SubmitComment dishId={dishId} addComment={addComment} />
        </div>
    )
}

class SubmitComment extends Component {
    
    constructor(props){
        super(props)

        this.state ={
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.message)
    }

    render(){
        return (
            <div>
            <Button outline onClick={this.toggleModal}>
                <span className='fa fa-pencil fa-md'><strong> Submit Comment</strong></span>
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader>Add A Comment</ModalHeader>
            <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)} className='p-3'>
                <Row>
                    <Label htmlFor="rating">Rating</Label>
                    <Control.select model='.rating' name='rating'
                    className='form-control'>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                </Row>
                <Row>
                    <Label htmlFor="author">Your Name</Label>
                    <Control.text model='.author' id='author' name='author'
                    placeholder='Your Name' className='form-control'
                    validators={{
                        required, maxlength: maxlength(15), minlength: minlength(3)
                    }}
                     />
                    <Errors 
                    className='text-danger'
                    model='.author'
                    show='touched'
                    messages={{
                        required: 'Required!!',
                        minlength: 'Must be greater than 2 characters!!',
                        maxlength: 'Must be 15 characters or less!!'
                    }}
                    />
                </Row>
                <Row>
                <Col md={12} className='p-0'>
                    <Label htmlFor="message">Comment</Label><br />
                    <Control.textarea model='.message' id='message' name='message'
                    className='form-control' />
                    </Col>
                </Row>
                <Row className='mt-1'>
                    <Col md={{size:4}}  className='p-0 mt-1'>
                        <Button type="submit" color="primary" className='form-control'><strong>Comment</strong></Button>
                    </Col>
                </Row>
            </LocalForm>
        </ModalBody>
        </Modal>
        </div>
        )
    }
}

const DishDetail = (props) => {
    if(props.dish != null) {
        return (
            <RenderDish dish={props.dish} comments={props.comments} addComment={props.addComment} />
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default DishDetail