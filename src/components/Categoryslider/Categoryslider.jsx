import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
};

export default function Categoryslider() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllCategory = async () => {
        let page = 1;
        let allCategories = [];
        let hasMoreData = true;

        try {
            while (hasMoreData) {
                const { data } = await axios.get(`${baseUrl}/categories?page=${page}`);
                allCategories = [...allCategories, ...data.category];
                page += 1;
                hasMoreData = data.category.length > 0; // Check if there's more data to fetch
            }
            setCategories(allCategories);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    if (loading) {
        return <div className='bg-info vh-50 text-center m-5 d-flex justify-content-center align-items-center'>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="my-5 container">
            <h3>Shop popular Categories</h3>
            <br />
            <Slider {...settings}>
                {categories.map((item) => (
                    <div key={item._id}>
                        <img src={item.imageCover} className='' height='300' alt={item.name} />
                        <h6>{item.name}</h6>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
