import axios from "axios";
import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Mynavbar";
import Footer from "./Footer";
import "../css/signin.css";

const Signup = () => {

    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [tel, setTel] = useState("");
    const [role, setRole] = useState("student");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading("Creating your account...");
        setError("");
        setSuccess("");

        try {
            const formData = new FormData();
            formData.append("username", Username);
            formData.append("email", Email);
            formData.append("password", Password);
            formData.append("phone", tel);
            formData.append("role", role);

            const response = await axios.post(
                "https://dumabashir.alwaysdata.net/api/signup",
                formData
            );

            setLoading("");

            if (response.data.Success) {
                localStorage.setItem("user", JSON.stringify({
                    username: Username,
                    email: Email,
                    role: role
                }));
                localStorage.setItem("role", role);

                setSuccess("✅ Account created successfully! Redirecting...");

                setTimeout(() => {
                    navigate("/");
                }, 3000);

                setUsername("");
                setEmail("");
                setPassword("");
                setTel("");
                setRole("student");

            } else {
                setError("Signup failed. Try again.");
            }

        } catch (err) {
            setLoading("");
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container-fluid bg-dark min-vh-100">
            <Navbar />

            <div className="row mt-5 justify-content-center">
                <div className="col-md-5 custom-card shadow">

                    <h4 className="custom-title">📝 Sign Up</h4>

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

                        <label className="custom-field">
                            <span className="custom-input-icon">🎓</span>
                            <select
                                className="custom-input"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="student">Student</option>
                                <option value="school">School</option>
                            </select>
                        </label>

                        <button type="submit" className="btn btn-warning custom-btn w-100">
                            Sign Up
                        </button>

                        <p className="custom-link text-center mt-3">
                            Already have an account?{" "}
                            <Link to="/signin" className="text-danger">Sign In</Link>
                        </p>

                    </form>

                    {loading && <p className="text-warning text-center">{loading}</p>}
                    {error && <p className="text-danger text-center">{error}</p>}
                    {success && <p className="text-success text-center">{success}</p>}

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Signup;