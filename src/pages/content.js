import React, { useState } from 'react';
import {
    Container,
    Form,
    FormGroup,
    FormControl,
    Row,
    Col,
    Card,
    Button,
  } from "react-bootstrap";
import { getProductInfo } from '../helpers/stripeHelper';

class Content extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            prod_id: '',
            desc: '',
            active: false,
            images: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleGetProductStat = this.handleGetProductStat.bind(this);
      }

    handleChange(event, name) {
        console.log(`handling change: ${name}; ${event.target.value}`);
        switch(name){
        case "prod_id":
            this.setState({prod_id: event.target.value})
            break;
        case "desc":
            this.setState({desc: event.target.value})
        case "active":
            this.setState({active: event.target.value})
        }
    }

    async handleGetProductStat (e){
        e.preventDefault();
        // console.log(`prod_id: ${this.state.prod_id}`)
        var prod = await getProductInfo(this.state.prod_id);
        var prod = JSON.parse(prod);
        console.log(prod);
        this.setState({
            desc: prod.description,
            active: prod.active,
            images: prod.images
        })
        console.log(`infos: ${this.state.desc}`);
        console.log(this.state.images);
    }

    render(){
       const {edit, prod_id, desc, active, images} = this.state;
    return(
        <Container className='py-4'>
        <Card>
            <Card.Body>
                <Form onSubmit={this.handleGetProductStat}>
                    <Col>
                    <FormGroup>
                        <Form.Label> Product ID </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='product ID'
                            value={prod_id}
                            onChange={(e)=>this.handleChange(e, "prod_id")}
                            />
                        <br/>
                        <Button type='submit'> Get Product </Button>
                    </FormGroup>
                    </Col>
                </Form>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
                <Button type="button" onClick={()=>this.setState({edit: true})}>Edit</Button>
                <Form >
                    {/* <fieldset disabled> */}
                    <Col>
                    <FormGroup>
                        <Form.Label> Description </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='description'
                            value={desc}
                            onChange={(e)=>this.handleChange(e, "desc")}
                            />
                        
                    </FormGroup>
                    <FormGroup>
                        <Form.Check
                            type='checkbox'
                            label="Active"
                            checked={active}
                            onChange={(e)=>this.handleChange(e, "active")}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label> Images </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="4"
                            placeholder='url links'
                            value={images}
                            onChange={(e)=>this.handleChange(e, "images")}
                            />
                    </FormGroup>
                    </Col>
                    {/* </fieldset> */}
                </Form>
            </Card.Body>
        </Card>
        </Container>

    );
    }



}

export default Content;