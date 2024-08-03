import React from 'react'
import { Link } from 'react-router-dom';

export default function Product({ products }) {
    return (
        <>
            {
                products.map((item) => {
                    return <div key={item._id} className="col-md-2">
                        <div className="product">
                            <Link to={'/product-details/' + item._id} >
                                <img src={item.imageCover} className='w-100' alt="" />
                                {/* <h6 className='text-main'>{item.category.name}</h6> */}
                                {item.title}
                                <div className='d-flex justify-content-between align-items-center m-3'>
                                    <span>{item.price} EGP</span>
                                    <div>
                                        <i className="faz -solid fa-star rating-color"></i>
                                        {item.rateAvg}
                                    </div>
                                </div>
                                <button className='btn bg-main text-white w-100 '> Add to Cart</button>
                            </Link>
                        </div>
                    </div>
                })
            }
        </>
    )
}
