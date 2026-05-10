import React from 'react';
import ShopPage from './ShopPage';

const Clothes = () => (
    <ShopPage
        title="👕 Clothes Showcase"
        badge="School Wear"
        apiUrl="https://dumabashir.alwaysdata.net/api/get_clothes"
        imgUrl="https://dumabashir.alwaysdata.net/static/images/"
        buyRoute="/buy-cloth"
    />
);

export default Clothes;