import axios from 'axios';
import { useState } from 'react';
import Footer from './Footer';

const Contact = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("message", message);

            const response = await axios.post(
                "https://dumabashir.alwaysdata.net/api/contact",
                formData
            );

            setLoading(false);
            setSuccess(response.data.Success);
            setEmail("");
            setMessage("");
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 card shadow p-4 bg-dark">
                    <h2 className="text-warning text-center mb-4">Contact Us</h2>

                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {loading && <div className="text-center text-info">Sending...</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="text-light">Your Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="text-light">Message</label>
                            <textarea
                                className="form-control"
                                placeholder="Write your message here..."
                                rows="5"
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-warning w-100">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;