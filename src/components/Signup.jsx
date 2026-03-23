import axios from "axios";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Mynavbar";
import Footer from "./Footer";

const Signup = () => {
    // adding state for all the input fields
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [tel, setTel] = useState("");

    // defining the three state an application will move through
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // below is the function that will handle the submit action
    const handleSubmit = async(e) => {
        // Below we prevent site from reloading
        e.preventDefault();

        // update our loading hook with a message that will be displayed to the user who are trying to register
        setLoading("Creating your account...");

        try {
            // create a form data object that will enable you to capture the four details entered on the form
            const formData = new FormData();

            // insert the four details (username, email, password and phone number) interm of key - value pairs
            formData.append("username", Username);
            formData.append("email", Email);
            formData.append("password", Password);
            formData.append("phone", tel);

            // by use of axios, we can access method post
            const response =await axios.post("https://dumabashir.alwaysdata.net/api/signup", formData)

            // set back loading to default
            setLoading("");

            // just incase everything goes well, update the success hook with a message
            setSuccess(response.data.Success);

            // clear your hooks
            setUsername("");
            setEmail("");
            setPassword("");
            setTel("");

            // reset the form (clear the form)
            e.target.reset();

            // adding time limit to the success message
            setTimeout(() => {
                setSuccess("");
            }, 5000);
        }
        catch (error) {
                // set the loading to default
            setLoading("");

                // update the error hook with the error message from the backend
            setError(error.message);
        }
    }

    return (
        <div className="container-fluid bg-dark min-vh-100">
            <Navbar />
            <div className="row mt-4 justify-content-center">
            <div class="card col-md-6 card shadow p-4 bg-dark">
                <h4 class="title">Sign Up!</h4>
                <form>
    
                {/* <!-- Username --> */}
                <label class="field" for="username">
                <span class="input-icon">👤</span>
                <input
                autocomplete="off"
                id="username"
                placeholder="Username"
                class="input-field"
                name="username"
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                </label>

                {/* <!-- Email --> */}
                <label class="field" for="logemail">
                <span class="input-icon">@</span>
                <input
                autocomplete="off"
                id="logemail"
                placeholder="Email"
                class="input-field"
                name="logemail"
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                </label>

                {/* <!-- Phone Number --> */}
                <label class="field" for="phone">
                <span class="input-icon">📞</span>
                <input
                id="phone"
                placeholder="Phone Number"
                class="input-field"
                name="phone"
                type="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                required
                />
                </label>

                {/* <!-- Password --> */}
                <label class="field" for="logpass">
                <svg
                class="input-icon"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"
                ></path>
                </svg>

                <input
                id="logpass"
                placeholder="Password"
                class="input-field"
                name="logpass"
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                </label>

                <input type="submit" value="Sign Up" className="btn btn-warning" />
                <a class="btn-link">
                    <p>Already have an account? <Link to="/signin" className="text-danger">Sign In</Link></p>
                </a>
                </form>
    </div>
    <Footer />
        </div>
        </div>
    )
}

export default Signup;