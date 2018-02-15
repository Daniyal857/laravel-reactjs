import React, { Component } from 'react';

/* Stateless component or pure component
* { product } syntax is the object destructing
*/

const Product = ({ product, handleDelete }) => {

    //if the props product is null, return Product doesn't exist
    if(!product) {
        return (
            <div>Product dost not exist.</div>
        )
    }

    //Else, display the product data
    return (
        <div className="product card">
            <div className="card-body">
                <h2>{product.title}</h2>
                <p> {product.description} </p>
                <h3> Status: {product.availability ? 'Available' : 'Out of stock'} </h3>
                <h3> Price: { product.price } </h3>
                <button onClick={handleDelete} className="btn btn-sm btn-danger">Delete Product</button>
            </div>
        </div>
    )

}

export default Product;
