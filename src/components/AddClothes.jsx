import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadPage from './UploadPage';

const AddClothes = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('role') !== 'school') navigate('/');
    }, []);

    return (
        <UploadPage
            title="Upload Clothes"
            badge="School Wear"
            icon="👕"
            apiUrl="https://dumabashir.alwaysdata.net/api/add_clothes"
            redirectTo="/clothes"
            buttonLabel="🚀 Upload Clothes"
            fields={[
                { key: 'name', label: 'Cloth Name', placeholder: 'e.g. School Uniform' },
                { key: 'description', label: 'Description', placeholder: 'Describe the cloth...', type: 'textarea' },
                { key: 'price', label: 'Price (KES)', placeholder: 'e.g. 500', type: 'number' },
            ]}
        />
    );
};

export default AddClothes;