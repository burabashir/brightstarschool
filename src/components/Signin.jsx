import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Mynavbar';
import "../css/signin.css";

const Signin = () => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading("Signing you in...");

        try {
            const formData = new FormData();
            formData.append("email", Email);
            formData.append("password", Password);

            const response = await axios.post("https://dumabashir.alwaysdata.net/api/signin", formData);

            setLoading("");

            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/");
            } else {
                setError("Invalid email or password.");
            }
        } catch {
            setLoading("");
            setError("Something went wrong.");
        }
    };

    return (
        <div className='container-fluid bg-dark min-vh-100'>
            <Navbar />

            <div className="row mt-4 justify-content-center">
                <div className="col-md-6 custom-card shadow">

                    <h4 className="custom-title">Sign In!</h4>

                    <form onSubmit={handleSubmit}>

                        <label className="custom-field">
                            <span className="custom-input-icon">@</span>
                            <input
                                className="custom-input"
                                type="email"
                                placeholder="Email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>

                        <label className="custom-field">
                            <span className="custom-input-icon">🔒</span>
                            <input
                                className="custom-input"
                                type="password"
                                placeholder="Password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>

                        <button type="submit" className="btn btn-warning custom-btn">
                            Sign In
                        </button>

                        <p className="custom-link">
                            Don't have an account?{" "}
                            <Link to="/signup" className='text-info'>Sign Up</Link>
                        </p>

                    </form>

                    {loading && <p className="text-warning">{loading}</p>}
                    {error && <p className="text-danger">{error}</p>}

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Signin;