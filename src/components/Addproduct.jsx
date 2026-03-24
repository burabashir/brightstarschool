import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import Navbar from './Mynavbar';
import Footer from './Footer';
import "../css/signin.css";

const Addproduct = () => {

    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_cost, setProductCost] = useState("");
    const [product_photo, setProductPhoto] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const formData = new FormData();

            formData.append("product_name", product_name);
            formData.append("product_description", product_description);
            formData.append("product_cost", product_cost);
            formData.append("product_photo", product_photo);

            const response = await axios.post(
                "https://dumabashir.alwaysdata.net/api/add_product",
                formData
            );

            setLoading(false);
            setSuccess(response.data.Message);

            setProductName("");
            setProductDescription("");
            setProductCost("");
            setProductPhoto("");

            e.target.reset();

            setTimeout(() => setSuccess(""), 5000);

        }
        catch(error) {
            setLoading(false);
            setError(error.message);
        }
    }

    return (
        <div className="container-fluid bg-dark min-vh-100">
            <Navbar />

            <div className="row mt-4 justify-content-center">

                {/* ✅ Updated class */}
                <div className="col-md-6 custom-card shadow p-4 text-light">

                    <h4 className="custom-title">Add Product</h4>

                    {loading && <Loader/>}

                    <h3 className="text-success">{success}</h3>
                    <h4 className="text-danger">{error}</h4>

                    <form onSubmit={handleSubmit}>

                        {/* Product Name */}
                        <label className="custom-field">
                            <span className="custom-input-icon">📦</span>
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="custom-input"
                                value={product_name}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </label>

                        {/* Product Description */}
                        <label className="custom-field">
                            <span className="custom-input-icon">📝</span>
                            <textarea
                                placeholder="Product Description"
                                className="custom-input"
                                value={product_description}
                                onChange={(e) => setProductDescription(e.target.value)}
                                required
                            ></textarea>
                        </label>

                        {/* Product Price */}
                        <label className="custom-field">
                            <span className="custom-input-icon">💰</span>
                            <input
                                type="number"
                                placeholder="Product Price"
                                className="custom-input"
                                value={product_cost}
                                onChange={(e) => setProductCost(e.target.value)}
                                required
                            />
                        </label>

                        {/* Product Photo */}
                        <label className="custom-field">
                            <span className="custom-input-icon">📷</span>
                            <input
                                type="file"
                                className="custom-input"
                                accept="image/*"
                                onChange={(e) => setProductPhoto(e.target.files[0])}
                                required
                            />
                        </label>

                        {/* ✅ Updated button */}
                        <input
                            type="submit"
                            value="Add Product"
                            className="custom-btn mt-3"
                        />

                    </form>
                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Addproduct;