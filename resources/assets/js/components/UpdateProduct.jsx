import React, { Component } from 'react';


class UpdateProduct extends Component {
    constructor(props) {
        super(props);

        /* Initialize the state. */
        this.state = {
            title: '',
            description: '',
            price: 0,
            availability: 0
        }

        //Boilerplate code for binding methods with `this`
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // console.log('update product console', props.product);
    }

    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {

    /*Duplicating and updating the state */
    var state = Object.assign({}, this.state.updateProduct); 
    state[key] = e.target.value;
    this.setState({updateProduct: state });
    }

    /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
        *state is passed as a param
        */
        this.props.onUpdate(this.state.updateProduct);
    }

    render() {
        console.log('update product console', this.state.title);
        return (
            
            <div className="new-product card">
                <h3>Update Product</h3>
                <div className="form-block card-body">
                    {
                   /*when Submit button is pressed, the control is passed to 
                    *handleSubmit method 
                    */
                    }
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label> Title: 
                            { /*On every keystroke, the handeInput method is invoked */ }
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter title"
                                    value={this.state.title}
                                    onChange={(e)=>this.handleInput('title',e)}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label> Description: 
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Desciption"
                                    value={this.state.description}
                                    onChange={(e)=>this.handleInput('description',e)}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label> Price: 
                                <input type="number"
                                    className="form-control"
                                    placeholder="Enter Price"
                                    value={this.state.price}
                                    onChange={(e)=>this.handleInput('price',e)} />
                            </label>
                        </div>
                        <input type="submit" className="btn btn-primary add-pro-btn" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}

export default UpdateProduct;
