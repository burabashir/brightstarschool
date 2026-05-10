import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Apply = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const img_url = "https://dumabashir.alwaysdata.net/static/images/";

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://dumabashir.alwaysdata.net/api/get_products_details");
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="bg-dark min-vh-100">

            <div className="container-fluid px-4">

                <div className="text-center py-4">
                    <h2 className="text-warning fw-bold">🌟 Browse Programs</h2>
                    <p className="text-light">Choose a program below and make your payment to secure your spot.</p>
                </div>

                {loading && <Loader />}
                {error && <p className="text-danger text-center">{error}</p>}

                <div className="row mt-2 g-4">
                    {products.map((product) => (
                        <div className="col-md-3 col-sm-6" key={product.product_id}>
                            <div className="card h-100 shadow bg-secondary border-0 rounded-3">
                                <img
                                    src={img_url + product.product_photo}
                                    alt={product.product_name}
                                    className="card-img-top rounded-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="text-warning">{product.product_name}</h5>
                                    <p className="text-light small flex-grow-1">
                                        {product.product_description.slice(0, 80)}...
                                    </p>
                                    <h6 className="text-info">KES {product.product_cost}</h6>
                                    <button
                                        className="btn btn-outline-warning mt-2 w-100"
                                        onClick={() => navigate('/makepayment', { state: { product } })}
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Apply;