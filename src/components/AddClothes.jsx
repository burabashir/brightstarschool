import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Mynavbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const AddClothes = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    // ✅ Protect route - school only
    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "school") {
            navigate("/");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading("Uploading clothes...");
        setError("");
        setSuccess("");

        try {
            const role = localStorage.getItem("role");

            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("photo", image);
            formData.append("role", role);

            const response = await axios.post(
                "https://dumabashir.alwaysdata.net/api/add_clothes",
                formData
            );

            setLoading("");
            setSuccess("✅ Clothes uploaded successfully!");

            setTimeout(() => {
                navigate("/clothes");
            }, 2000);

        } catch (err) {
            setLoading("");
            setError("❌ Upload failed. Try again.");
        }
    };

    return (
        <div className="container-fluid bg-dark min-vh-100">
            <Navbar />

            <div className="row justify-content-center mt-5">
                <div className="col-md-6 bg-secondary p-4 rounded shadow text-light">

                    <h3 className="text-warning mb-4">👕 Upload Clothes</h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Cloth Name</label>
                            <input
                                className="form-control bg-dark text-light border-secondary"
                                placeholder="e.g. School Uniform"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control bg-dark text-light border-secondary"
                                rows="3"
                                placeholder="Describe the cloth..."
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Price (KES)</label>
                            <input
                                type="number"
                                className="form-control bg-dark text-light border-secondary"
                                placeholder="e.g. 500"
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Photo</label>
                            <input
                                type="file"
                                className="form-control bg-dark text-light border-secondary"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                        </div>

                        <button className="btn btn-warning w-100 fw-bold">
                            Upload Clothes
                        </button>

                    </form>

                    {loading && <p className="text-warning text-center mt-3">{loading}</p>}
                    {error && <p className="text-danger text-center mt-3">{error}</p>}
                    {success && <p className="text-success text-center mt-3">{success}</p>}

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AddClothes;