import React from 'react';
import ShopPage from './ShopPage';

const Instruments = () => (
    <ShopPage
        title="🎸 Instruments Showcase"
        badge="Music"
        apiUrl="https://dumabashir.alwaysdata.net/api/get_instruments"
        imgUrl="https://dumabashir.alwaysdata.net/static/images/"
        buyRoute="/buy-instrument"
    />
);

export default Instruments;