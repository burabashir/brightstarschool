import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadPage from './UploadPage';

const Addproduct = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('role') !== 'school') navigate('/');
    }, []);

    return (
        <UploadPage
            title="Add Talent Entry"
            badge="Talent Expo"
            icon="🎭"
            apiUrl="https://dumabashir.alwaysdata.net/api/add_product"
            redirectTo="/"
            buttonLabel="🎯 Submit Talent"
            fields={[
                { key: 'product_name', label: 'Talent Name', placeholder: 'e.g. Karate Performance' },
                { key: 'product_description', label: 'Description', placeholder: 'Describe the talent performance...', type: 'textarea' },
                { key: 'product_cost', label: 'Entry Fee (KES)', placeholder: 'e.g. 200', type: 'number' },
            ]}
        />
    );
};

export default Addproduct;