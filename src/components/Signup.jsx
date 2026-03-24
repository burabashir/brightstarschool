import axios from "axios";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Mynavbar";
import Footer from "./Footer";
import "../css/signin.css";

const Signup = () => {

    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [tel, setTel] = useState("");

    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading("Creating your account...");

        try {
            const formData = new FormData();
            formData.append("username", Username);
            formData.append("email", Email);
            formData.append("password", Password);
            formData.append("phone", tel);

            const response = await axios.post("https://dumabashir.alwaysdata.net/api/signup", formData);

            setLoading("");
            setSuccess(response.data.Success);

            setUsername("");
            setEmail("");
            setPassword("");
            setTel("");

        } catch (error) {
            setLoading("");
            setError(error.message);
        }
    };

    return (
        <div className="container-fluid bg-dark min-vh-100">
            <Navbar />

            <div className="row mt-4 justify-content-center">
                <div className="col-md-6 custom-card shadow">

                    <h4 className="custom-title">Sign Up!</h4>

                    <form onSubmit={handleSubmit}>

                        <label className="custom-field">
                            <span className="custom-input-icon">👤</span>
                            <input
                                className="custom-input"
                                type="text"
                                placeholder="Username"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>

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
                            <span className="custom-input-icon">📞</span>
                            <input
                                className="custom-input"
                                type="tel"
                                placeholder="Phone"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
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
                            Sign Up
                        </button>

                        <p className="custom-link">
                            Already have an account?{" "}
                            <Link to="/signin" className="text-danger">Sign In</Link>
                        </p>

                    </form>

                    {loading && <p className="text-warning">{loading}</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Signup;