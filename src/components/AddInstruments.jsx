import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadPage from './UploadPage';

const AddInstruments = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('role') !== 'school') navigate('/');
    }, []);

    return (
        <UploadPage
            title="Upload Instrument"
            badge="Music"
            icon="🎸"
            apiUrl="https://dumabashir.alwaysdata.net/api/add_instruments"
            redirectTo="/instruments"
            buttonLabel="🚀 Upload Instrument"
            fields={[
                { key: 'name', label: 'Instrument Name', placeholder: 'e.g. Guitar' },
                { key: 'description', label: 'Description', placeholder: 'Describe the instrument...', type: 'textarea' },
                { key: 'price', label: 'Price (KES)', placeholder: 'e.g. 1500', type: 'number' },
            ]}
        />
    );
};

export default AddInstruments;