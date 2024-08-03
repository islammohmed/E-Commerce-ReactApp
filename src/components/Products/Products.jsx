import axios from 'axios';
import React, { useEffect, useState } from 'react'
import baseUrl from '../../utils/baseUrl';
import Product from '../Product/Product';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllProducts = async () => {
        let page = 1;
        let allProducts = [];
        let hasMoreData = true;

        try {
            while (hasMoreData) {
                const { data } = await axios.get(`${baseUrl}/product?page=${page}`);
                allProducts = [...allProducts, ...data.product];
                page += 1;
                hasMoreData = data.product.length > 0; // Check if there's more data to fetch
            }
            setProducts(allProducts);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    if (loading) {
        return <div className='bg-info vh-50 text-center m-5 d-flex justify-content-center align-items-center'>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="my-5 container">
            <h3>Shop popular Products</h3>
            <br />
            <>
                <div className="container">
                    <div className="row">
                        <Product products={products} />
                    </div>
                </div>
            </>
        </div>
    );
}
