import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import baseUrl from '../../utils/baseUrl';
import { Helmet } from "react-helmet";
export default function ProductsDetails() {

    let { id } = useParams()
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllProduct = async () => {
        try {

            const { data } = await axios.get(`${baseUrl}/product/${id}`);
            setProduct(data.product);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllProduct();
    }, []);

    if (loading) {
        return <div className='bg-info vh-50 text-center m-5 d-flex justify-content-center align-items-center'>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (

        <>
            <Helmet>
                <title>Products Details</title>
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <img src={product.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-md-9">
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
