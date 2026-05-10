import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './Footer';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Instruments = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const img_url = "https://dumabashir.alwaysdata.net/static/images/";
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get("https://dumabashir.alwaysdata.net/api/get_instruments")
            .then(res => {
                setItems(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to load instruments");
                setLoading(false);
            });
    }, []);

    return (
        <div className="bg-dark min-vh-100">


            <div className="container-fluid px-4">
                <h2 className="text-warning text-center py-3">🎸 Instruments Showcase</h2>

                {loading && <Loader />}
                {error && <p className="text-danger text-center">{error}</p>}

                {!loading && items.length === 0 && (
                    <p className="text-center text-light mt-5">No instruments uploaded yet.</p>
                )}

                <div className="row mt-4 g-4">
                    {items.map(item => (
                        <div key={item.id} className="col-md-3 col-sm-6">
                            <div className="card h-100 shadow bg-secondary border-0 rounded-3">
                                <img
                                    src={img_url + item.photo}
                                    alt={item.name}
                                    className="card-img-top rounded-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="text-warning">{item.name}</h5>
                                    <p className="text-light small flex-grow-1">
                                        {item.description.slice(0, 80)}...
                                    </p>
                                    <h6 className="text-info">KES {item.price}</h6>
                                    <button
                                        className="btn btn-outline-warning mt-2 w-100"
                                        onClick={() => navigate('/buy-instrument', { state: { item } })}
                                    >
                                        🛒 Buy Now
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

export default Instruments;