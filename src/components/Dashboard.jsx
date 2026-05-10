import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Dashboard = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [clothes, setClothes] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const role = localStorage.getItem("role");

    useEffect(() => {
        // Redirect if not school
        if (role !== "school") {
            navigate("/");
            return;
        }
        fetchAll();
    }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [p, c, i] = await Promise.all([
                axios.get("https://dumabashir.alwaysdata.net/api/get_products_details"),
                axios.get("https://dumabashir.alwaysdata.net/api/get_clothes"),
                axios.get("https://dumabashir.alwaysdata.net/api/get_instruments"),
            ]);
            setProducts(p.data);
            setClothes(c.data);
            setInstruments(i.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const img_url = "https://dumabashir.alwaysdata.net/static/images/";

    if (loading) return <div className="text-center text-info mt-5">Loading dashboard...</div>;
    if (error) return <div className="text-center text-danger mt-5">{error}</div>;

    return (
        <div className="container mt-4">
            <h2 className="text-warning text-center mb-4">School Dashboard</h2>

            {/* SUMMARY CARDS */}
            <div className="row text-center mb-5">
                <div className="col-md-4">
                    <div className="card bg-primary text-white p-3 shadow">
                        <h3>{products.length}</h3>
                        <p className="mb-0">Total Products</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white p-3 shadow">
                        <h3>{clothes.length}</h3>
                        <p className="mb-0">Total Clothes</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-warning text-dark p-3 shadow">
                        <h3>{instruments.length}</h3>
                        <p className="mb-0">Total Instruments</p>
                    </div>
                </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="row text-center mb-5">
                <div className="col-md-4 mb-2">
                    <button className="btn btn-outline-primary w-100" onClick={() => navigate("/addproduct")}>
                        + Add Product
                    </button>
                </div>
                <div className="col-md-4 mb-2">
                    <button className="btn btn-outline-success w-100" onClick={() => navigate("/addclothes")}>
                        + Add Clothes
                    </button>
                </div>
                <div className="col-md-4 mb-2">
                    <button className="btn btn-outline-warning w-100" onClick={() => navigate("/addinstruments")}>
                        + Add Instrument
                    </button>
                </div>
            </div>

            {/* PRODUCTS TABLE */}
            <h4 className="text-info">Products</h4>
            <div className="table-responsive mb-5">
                <table className="table table-dark table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Cost (Kes)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, i) => (
                            <tr key={i}>
                                <td><img src={img_url + p.product_photo} alt={p.product_name} width="60" style={{ borderRadius: "6px" }} /></td>
                                <td>{p.product_name}</td>
                                <td>{p.product_description}</td>
                                <td>{p.product_cost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CLOTHES TABLE */}
            <h4 className="text-success">Clothes</h4>
            <div className="table-responsive mb-5">
                <table className="table table-dark table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price (Kes)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clothes.map((c, i) => (
                            <tr key={i}>
                                <td><img src={img_url + c.photo} alt={c.name} width="60" style={{ borderRadius: "6px" }} /></td>
                                <td>{c.name}</td>
                                <td>{c.description}</td>
                                <td>{c.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* INSTRUMENTS TABLE */}
            <h4 className="text-warning">Instruments</h4>
            <div className="table-responsive mb-5">
                <table className="table table-dark table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price (Kes)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instruments.map((inst, i) => (
                            <tr key={i}>
                                <td><img src={img_url + inst.photo} alt={inst.name} width="60" style={{ borderRadius: "6px" }} /></td>
                                <td>{inst.name}</td>
                                <td>{inst.description}</td>
                                <td>{inst.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;