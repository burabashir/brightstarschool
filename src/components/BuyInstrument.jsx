import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Footer from './Footer';
import Navbar from './Mynavbar';

const BuyInstrument = () => {

    const { item } = useLocation().state || {};
    const navigate = useNavigate();

    const img_url = "https://dumabashir.alwaysdata.net/static/images/";

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("phone", number);
            formData.append("amount", item.price);

            const response = await axios.post(
                "https://dumabashir.alwaysdata.net/api/mpesa_payment",
                formData
            );

            setLoading(false);
            setSuccess(response.data.Message);

        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    if (!item) {
        navigate("/instruments");
        return null;
    }

    return (
        <div className="row justify-content-center bg-dark min-vh-100">
            <Navbar />

            <h1 className="text-success bg-success-subtle text-center">
                Make Payment - Lipa Na M-Pesa
            </h1>

            <div className="col-md-1 mt-2">
                <input
                    type="button"
                    className="btn btn-primary"
                    value="<- Back"
                    onClick={() => navigate("/instruments")}
                />
            </div>

            <div className="col-md-6 card shadow p-4 bg-dark mt-2">
                <img
                    src={img_url + item.photo}
                    alt={item.name}
                    className="product_img"
                    style={{ height: "250px", objectFit: "cover", borderRadius: "8px" }}
                />

                <div className="card-body">
                    <h2 className="text-info">{item.name}</h2>
                    <p className="text-light">{item.description}</p>
                    <h3 className="text-warning">KES {item.price}</h3>

                    <form onSubmit={handleSubmit}>

                        {loading && <Loader />}

                        <h3 className="text-success">{success}</h3>
                        <h4 className="text-danger">{error}</h4>

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Phone Number 254xxxxxxxx"
                            required
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <br />

                        <input
                            type="submit"
                            value="Make Payment"
                            className="btn btn-success w-100"
                        />

                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BuyInstrument;