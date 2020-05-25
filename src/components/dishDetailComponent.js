import React from 'react'
import {Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem} from 'reactstrap'  //breadcrumbs are the links
import {Link} from 'react-router-dom'


function RenderComments({cmmnts}) {
    const cmmntbox = cmmnts.map((cmmnt) => {
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

function RenderDish({props}) {
    if(props.dish != null) {
        return(
            <div className='container'>
            <div className='row'>
                <Breadcrumb>
                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className='col-12 row m-1 p-0'>
            <Card className='col-md-5'>
            <CardImg width='100%' src={props.dish.image} alt={props.dish.name} />
            <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <CardText>{props.dish.description}</CardText>
            </CardBody>
            </Card>
            <Card className='col-md-5 ml-2'>
                <CardBody>
                    <h1 className='mb-3'>Comments</h1>
                    <RenderComments cmmnts={props.comments} />
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
    


const DishDetail = (props) => {

        return (
            <div>
                <RenderDish props={props} />
            </div>
        )
    }

export default DishDetail