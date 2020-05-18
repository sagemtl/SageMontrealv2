import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import {getProductInfo} from '../helpers/stripeHelper'
import { render } from "react-dom"


class Product extends React.Component {
    constructor(props){
        super(props);
        this.update = this.update.bind(this);
    }

    update(){
        // updateProduct("prod_HHPbCnslkyaHCK", "helo");
        getProductInfo("prod_HHPbCnslkyaHCK");

    }

    componentDidMount(){
        // debugger;
        this.update();
    }

    render(){
        return(
            <div>hello world</div>
        )
    }
}

export default Product;