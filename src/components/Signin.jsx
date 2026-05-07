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
        setError("");

        try {
            const formData = new FormData();
            formData.append("email", Email);
            formData.append("password", Password);

            const response = await axios.post(
                "https://dumabashir.alwaysdata.net/api/signin",
                formData
            );

            setLoading("");

            if (response.data.user) {
                const user = response.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("role", user.role);

                if (user.role === "school") {
                    navigate("/addproduct");
                } else {
                    navigate("/");
                }

            } else {
                setError("Invalid email or password");
            }

        } catch (err) {
            setLoading("");
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='container-fluid bg-dark min-vh-100'>
            <Navbar />

            <div className="row mt-5 justify-content-center">
                <div className="col-md-5 custom-card shadow">

                    <h4 className="custom-title">🔐 Sign In</h4>

                    <form onSubmit={handleSubmit}>

                        <label className="custom-field">
                            <span className="custom-input-icon">📧</span>
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

                        <button type="submit" className="btn btn-warning custom-btn w-100">
                            Sign In
                        </button>

                        <p className="custom-link text-center mt-3">
                            Don't have an account?{" "}
                            <Link to="/signup" className='text-info'>Sign Up</Link>
                        </p>

                    </form>

                    {loading && <p className="text-warning text-center">{loading}</p>}
                    {error && <p className="text-danger text-center">{error}</p>}

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Signin;