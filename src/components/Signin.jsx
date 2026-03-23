import axios from 'axios';
import react, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Mycarousel from './Mycarousel';
import Navbar from './Mynavbar';

const Signin = () => {

    // defining the two hooks for capturing user input
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    // declare the the three additional hooks
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // below we have useNavigate hook to enable us to redirect users to the home page after successful sign in
    const navigate = useNavigate();

    // below is the function that will handle the submit action
    const handleSubmit = async(e) => {
        // Below we prevent site from reloading
        e.preventDefault();

        // update our loading hook with a message that will be displayed to the user who are trying to register
        setLoading("Signing you in...");

        try {
            // create a form data object that will hold the email and password
            const formData = new FormData();

            // insert the email and password details interm of key - value pairs
            formData.append("email", Email);
            formData.append("password", Password);

            // interact with axios for response
            const response = await axios.post("https://dumabashir.alwaysdata.net/api/signin", formData);

            // set back loading to default
            setLoading("");

            // check whether the user exists as part of your response from API
            if (response.data.user) {
                // if user is there the details entered are correct
                // setSuccess("You have been signed in successfully.");

                // storing data locally
                localStorage.setItem("user", JSON.stringify(response.data.user));

                // if it is successful let it be redirected to the home page
                navigate("/");
            }
            else {
                // if user is not there the details entered are incorrect
                setError("Sorry! Invalid email or password. Please try again.");
            }
        }
        catch (error) {
            // set the loading to default
            setLoading("");

            // update the error hook with the error message
            setError("Oops! Something went wrong. Please try again later.");
        }
    }

    return (
        <div className='container-fluid bg-dark min-vh-100'>
            <Navbar />
            <div className="row mt-4 justify-content-center">

            {/* <!-- From Uiverse.io by 3bdel3ziz-T -->  */}
            <div class="card col-md-6 card shadow p-4 bg-dark">
                <h4 class="title">Sign In!</h4>
                <form>
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
                
                <input 
                type="submit" 
                value="Sign In" 
                className="btn btn-warning" />
                <a class="btn-link"><p>Don't have an account? <Link to="/signup" className='text-info'>Sign Up</Link></p></a>
                </form>
            </div>
            <Footer />
        </div>
        </div>
    )
}

export default Signin;