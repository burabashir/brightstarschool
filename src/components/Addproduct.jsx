import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import Navbar from './Mynavbar';
import Footer from './Footer';

const Addproduct = () => {

    // introduceing the hooks for capturing user input
    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_cost, setProductCost] = useState("");
    const [product_photo, setProductPhoto] = useState("");

    // declare  additional hook to manage the state of application
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // create a function that will handle the submit action
    const handleSubmit = async (e) => {
        // Below we prevent site from reloading
        e.preventDefault();

        // set loading hook with message (activate it)
        setLoading(true);

        try{
            // create a form data
            const formData = new FormData();
            
            // append the details to the form data created above
            formData.append("product_name", product_name);
            formData.append("product_description", product_description);
            formData.append("product_cost", product_cost);
            formData.append("product_photo", product_photo);

            // interact with the axios to help use the post method
            const response = await axios.post("https://dumabashir.alwaysdata.net/api/add_product", formData);

            // set loading hook back to default
            setLoading(false);

            // update the success hook with the message
            setSuccess(response.data.Message);

            // clearing the hook (setting back to default)
            setProductName("");
            setProductDescription("");
            setProductCost("");
            setProductPhoto("");

            // reset the form (clear the form)
            e.target.reset();

            // adding time limit to the success message
            setTimeout(() => {
                setSuccess("");
            }, 5000);

        }
        catch(error) {
            // set loading hook back to default
            setLoading(false);

            // update seterror with a message
            setError(error.message);
        }
    }

    return (
        <div className="row justify-content-center">
            <Navbar />
            <div className="container-fluid bg-dark min-vh-100">

            <div className="row mt-4 justify-content-center">

            <div className="card col-md-6 shadow p-4 bg-dark text-light">

            <h4 className="title">Add Product</h4>

            {/* bind the loading hook */}
                {loading && <Loader/>}

                <h3 className="text-success">{success}</h3>
                <h4 className="text-danger">{error}</h4>

                <form onSubmit={handleSubmit}>

                    {/* Product Name */}
                    <label className="field">
                    <span className="input-icon">📦</span>
                    <input
                    type="text"
                    placeholder="Product Name"
                    className="input-field"
                    value={product_name}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                    />
                    </label>

                    {/* Product Description */}
                    <label className="field">
                    <span className="input-icon">📝</span>
                    <textarea
                    placeholder="Product Description"
                    className="input-field"
                    value={product_description}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                    ></textarea>
                    </label>

                    {/* Product Price */}
                    <label className="field">
                    <span className="input-icon">💰</span>
                    <input
                    type="number"
                    placeholder="Product Price"
                    className="input-field"
                    value={product_cost}
                    onChange={(e) => setProductCost(e.target.value)}
                    required
                    />
                    </label>

                    {/* Product Photo */}
                    <label className="field">
                    <span className="input-icon">📷</span>
                    <input
                        type="file"
                        className="input-field"
                        accept="image/*"
                        onChange={(e) => setProductPhoto(e.target.files[0])}
                        required
                        />
                        </label>

                        {/* Submit Button */}
                        <input
                        type="submit"
                        value="Add Product"
                        className="btn          btn-warning mt-3"
                        />

                        </form>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Addproduct;