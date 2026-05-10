import React, { useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import "../css/signin.css";

const Addproduct = () => {

    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_cost, setProductCost] = useState("");
    const [product_photo, setProductPhoto] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const role = localStorage.getItem("role");

            const formData = new FormData();
            formData.append("product_name", product_name);
            formData.append("product_description", product_description);
            formData.append("product_cost", product_cost);
            formData.append("product_photo", product_photo);
            formData.append("role", role);

            const response = await axios.post(
                "https://dumabashir.alwaysdata.net/api/add_product",
                formData
            );

            setLoading(false);
            setSuccess("🎉 Talent submitted successfully!");

            setProductName("");
            setProductDescription("");
            setProductCost("");
            setProductPhoto("");

            e.target.reset();

            setTimeout(() => {
                setSuccess("");
                navigate("/");
            }, 3000);

        } catch (error) {
            setLoading(false);
            setError("❌ Failed to submit talent. Try again.");
        }
    };

    return (
        <div className="container-fluid bg-dark min-vh-100">

            <div className="row mt-4 justify-content-center">
                <div className="col-md-6 custom-card shadow p-4 text-light">

                    <h4 className="custom-title">🎭 Add Talent Entry</h4>

                    {loading && <Loader />}
                    {success && <h3 className="text-success">{success}</h3>}
                    {error && <h4 className="text-danger">{error}</h4>}

                    <form onSubmit={handleSubmit}>

                        <label className="custom-field">
                            <span className="custom-input-icon">🏆</span>
                            <input
                                type="text"
                                placeholder="Talent (e.g. Karate Performance)"
                                className="custom-input"
                                value={product_name}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </label>

                        <label className="custom-field">
                            <span className="custom-input-icon">📝</span>
                            <textarea
                                placeholder="Describe the talent performance..."
                                className="custom-input"
                                value={product_description}
                                onChange={(e) => setProductDescription(e.target.value)}
                                required
                            ></textarea>
                        </label>

                        <label className="custom-field">
                            <span className="custom-input-icon">💰</span>
                            <input
                                type="number"
                                placeholder="Entry Fee (KES)"
                                className="custom-input"
                                value={product_cost}
                                onChange={(e) => setProductCost(e.target.value)}
                                required
                            />
                        </label>

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

                        <input
                            type="submit"
                            value="Submit Talent"
                            className="custom-btn mt-3"
                        />

                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Addproduct;