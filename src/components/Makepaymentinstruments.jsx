import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Footer from './Footer';

const MakePaymentInstruments = () => {

    const { instrument } = useLocation().state || {};
    const navigate = useNavigate();
    const img_url = "https://dumabashir.alwaysdata.net/static/images/";

    const [number, setNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const formData = new FormData();
            formData.append("phone", number);
            formData.append("amount", instrument.price);

            const response = await axios.post(
                "https://dumabashir.alwaysdata.net/api/mpesa_payment_instruments",
                formData
            );

            setLoading(false);

            if (response.data.success) {
                setSuccess("✅ Payment Successful! Your order is being processed.");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                setError(response.data.Error || "Payment failed. Please try again.");
            }

        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    if (!instrument) {
        return (
            <div className="text-center mt-5">
                <h3 className="text-danger">No instrument selected. Please go back and select an instrument.</h3>
                <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>Go Home</button>
            </div>
        );
    }

    return (
        <div className='row justify-content-center'>
            <h1 className='text-success bg-success-subtle'>Make Payment - Lipa Na M-Pesa</h1>

            <div className="col-md-1">
                <input
                    type="button"
                    className="btn btn-primary"
                    value="<- Back"
                    onClick={() => navigate(-1)}
                />
            </div>

            <div className="col-md-6 card shadow p-4 bg-dark">
                <img src={img_url + instrument.photo} alt={instrument.name} className='product_img' />

                <div className="card-body">
                    <h2 className="text-info">{instrument.name}</h2>
                    <p className="text-light">{instrument.description}</p>
                    <h3 className="text-warning">Kes {instrument.price}</h3>

                    <form onSubmit={handlesubmit}>
                        {loading && <Loader />}

                        {success && (
                            <div className="alert alert-success text-center fw-bold fs-5">
                                {success}
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger text-center fw-bold">
                                {error}
                            </div>
                        )}

                        <input
                            type="number"
                            className='form-control'
                            placeholder='Enter Phone Number 254xxxxxxxx'
                            required
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <br />

                        <input
                            type="submit"
                            value="Pay for Instrument"
                            className="btn btn-success w-100"
                        />
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MakePaymentInstruments;