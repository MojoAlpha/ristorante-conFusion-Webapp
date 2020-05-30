import React,{ Component} from 'react'
import {Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Label
, Button, Row, Col, Modal, ModalHeader, ModalBody} from 'reactstrap'  //breadcrumbs are the links
import {Link} from 'react-router-dom'
import {Control, LocalForm, Errors } from 'react-redux-form'
    
class DishDetail extends Component {

    constructor(props){
        super(props)

        this.state = {
            showComment: 1
        }

        this.toggleComment = this.toggleComment.bind(this)
    }

    toggleComment = () => {
        this.setState({
            showComment: !this.state.showComment
        })
    }

 RenderComments  = () => {
    const cmmntbox = this.props.comments.map((cmmnt) => {
        if(cmmnt != null){
        return (
            <div key={cmmnt.id} className='mb-5'>
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
        </div>
    )
}

 SubmitComment=()=> {

    const required = (val) => val && val.length
    const maxlength = (len) => (val) => !(val) || (val.length <= len)
    const minlength = (len) => (val) => !(val) || (val.length >= len)
    
        const handleSubmit = (values) => {
            console.log("Current State is : " + JSON.stringify(values))
            alert("Current State is : " + JSON.stringify(values))
        }

    return (
        <Modal isOpen={this.state.showComment} >
                <ModalHeader>Add Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => handleSubmit(values)} className='p-3'>
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
                        <Label htmlFor="username">Username</Label>
                        <Control.text model='.username' id='username' name='username'
                        placeholder='Your Name' className='form-control'
                        validators={{
                            required, maxlength:maxlength(15), minlength:minlength(3)
                        }}
                         />
                        <Errors 
                        className='text-danger'
                        model='.username'
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
                        <Col md={{size:8}}  className='p-0'>
                            <Button type="submit" color="primary" className='form-control'>Send Feedback</Button>
                        </Col>
                    </Row>
                </LocalForm>
            </ModalBody>
            </Modal>
    )
}

 RenderDish=() => {

    if(this.props.dish != null) {
        return(
            <div className='container'>
            <div className='row'>
                <Breadcrumb>
                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{this.props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className='col-12 row m-1 p-0'>
            <Card className='col-md-5'>
            <CardImg width='100%' src={this.props.dish.image} alt={this.props.dish.name} />
            <CardBody>
                <CardTitle>{this.props.dish.name}</CardTitle>
                <CardText>{this.props.dish.description}</CardText>
            </CardBody>
            </Card>
            <Card className='col-md-5 ml-2'>
                <CardBody>
                    <h1 className='mb-1'>Comments</h1>
                    {this.RenderComments}
                    <Button outline onClick={this.toggleComment}>
                        <span className='fa fa-pencil fa-md'><strong> Submit Comment</strong></span>
                    </Button>
                    {this.SubmitComment}
                    </CardBody>
            </Card>

            </div>
            </div>
        )
    }else{
        return (
            <div></div>
        )
    }
}
    render() {
        return (
            <div>
                {this.RenderDish}
            </div>
        )
    }
}

export default DishDetail