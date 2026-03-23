import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Mycarousel from './Mycarousel';
import Navbar from './Mynavbar';

const Getproduct = () => {

    // initialize hook to help you manage the state of your application
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Declare the navigate hook
    const navigate = useNavigate();

    // below we specify the image base URL
    const img_url = "https://dumabashir.alwaysdata.net/static/images/"; 

    // create a function to help you get the products from the API
    const fetchProducts = async () => {
        try{
            // update the loading hook
            setLoading(true);


            // interact with your endpoint for fetching products
            const response = await axios.get("https://dumabashir.alwaysdata.net/api/get_products_details")

            // update the products hook with the response from the API
            setProducts(response.data);

            // set loading hook back to default
            setLoading(false);
        }
        catch(error) {
            // if there is an error
            // set the loading hook back to default
            setLoading(false);

            // update the error hook with a message
            setError(error.message);

        }
    }

    // we shall use useEffect hook.this hook enables use to automically re-render new features incase of any changes.
    useEffect(() => {
        fetchProducts()
    }, [])

    // console.log(products);

    return (
        <div className='row'>
            <Navbar />
            <h3 className="text-primary">Available Products</h3>
            <Mycarousel />
            {loading && <Loader />}
            <h4 className="text-danger">{error}</h4>

            {/* map the products fecthed from the API to the user interface */}

            {products.map((product) => (
                            <div className="col-3 justify-content-center mb-3">
                <div className='card shadow bg-dark'>
                    <img 
                    src={img_url + product.product_photo} 
                    alt="product name" 
                    className='product_img mt-3'/>

                    <div className="card-body">
                        <h3 className="text-danger">{product.product_name}</h3>

                        <p className='text-light'>{product.product_description.slice(0,70)}...</p>

                        <h4 className="text-warning">KES {product.product_cost}</h4>

                        <button className="btn btn-outline-info" onClick={() => navigate('/makepayment', { state: { product } })}>Apply Now</button>
                    </div>

                </div>
            </div>
            ))}
            <Footer />
        </div>
    )
}

export default Getproduct;