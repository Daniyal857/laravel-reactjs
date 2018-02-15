import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Product from "../components/Product";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";


/* An example React component */
class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            currentProduct: null
        }

        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleDeletePro = this.handleDeletePro.bind(this);
    }

    componentDidMount() {
        /* fetch API in action */
        fetch('/api/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                //Fetched product is stored in the state
                this.setState({
                    products
                });
            })
            .catch(error => console.log('Parsing failed.', error))
            
    }

    renderProducts() {
        return this.state.products.map(product => {
            return (
            /* When using list you need to specify a key
             * attribute that is unique for each list item
            */
            <li className="list-group-item" onClick={() => this.handleClick(product)} key={product.id}>
                { product.title }
            </li>
            );
        })
    }
    handleClick(product) {
        //handleClick is used to set the state
        this.setState({
            currentProduct: product
        });
    }

    handleAddProduct(product) {

        product.price = Number(product.price);
        /*Fetch API for post request */
        fetch( 'api/products/', {
            method:'post',
            /* headers are important*/
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            
            body: JSON.stringify(product)
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            //update the state of products and currentProduct
            this.setState((prevState)=> ({
                products: prevState.products.concat(data),
                currentProduct : data
            }))
        })
    }

    handleDeletePro() {
        const currentProduct = this.state.currentProduct.id;
        // console.log('print current product', currentProduct);
        fetch( 'api/products/' + this.state.currentProduct.id, 
            { method: 'delete' })
            .then(response => {
            /* Duplicate the array and filter out the item to be deleted */
            var array = this.state.products.filter(function(item) {
            return item !== currentProduct
            });

            this.setState({ products: array, currentProduct: null});

        });
    }
    
    handleUpdate(product) {

        const currentProduct = this.state.currentProduct;
        fetch( 'api/products/' + currentProduct.id, {
            method:'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
        .then(response => {
            return response.json();
        })
        .then( data => {
            /* Updating the state */
            var array = this.state.products.filter(function(item) {
                return item !== currentProduct
            })
            this.setState((prevState)=> ({
                products: array.concat(product),
                currentProduct : product
            }))
        }) 
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <h3>All Products</h3>
                        <ul className="list-group productList">
                            {
                                this.renderProducts()
                            }
                        </ul>
                    </div>
                    <div className="col-sm-6">
                        <Product product={this.state.currentProduct} handleDelete={this.handleDeletePro} />
                        <AddProduct onAdd={this.handleAddProduct} />
                        <UpdateProduct onUpdate={this.handleUpdate} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
