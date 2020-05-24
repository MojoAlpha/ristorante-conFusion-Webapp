import React from 'react'
import {Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap'


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

function RenderDish({dish}) {
    if(dish != null) {
        return(
            <div className='container'>
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
                    <h1 className='mb-3'>Comments</h1>
                    <RenderComments cmmnts={dish.comments} />
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
                <RenderDish dish={props.dish} />
            </div>
        )
    }

export default DishDetail