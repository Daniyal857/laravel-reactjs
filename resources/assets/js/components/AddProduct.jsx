import React, { Component } from 'react';


class AddProduct extends Component {
    constructor(props) {
        super(props);

        /* Initialize the state. */
        this.state = {
            newProduct: {
                title: '',
                description: '',
                price: 0,
                availability: 0
            }
        }

        //Boilerplate code for binding methods with `this`
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {
        
    /*Duplicating and updating the state */
    var state = Object.assign({}, this.state.newProduct); 
    state[key] = e.target.value;
    this.setState({newProduct: state });
    }

    /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
        //preventDefault prevents page reload   
        e.preventDefault();
        /*A call back to the onAdd props. The current
        *state is passed as a param
        */
        this.props.onAdd(this.state.newProduct);
    }

    render() {
        return (
            <div className="new-product card">
                <h3>Add new Product</h3>
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
                                    onChange={(e)=>this.handleInput('description',e)}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label> Price: 
                                <input type="number"
                                    className="form-control"
                                    placeholder="Enter Price"
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

export default AddProduct;
