import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { notify } from '../../utils/notify'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";
export default function Cart() {
    let { getUserCart, removeCartItem, updateQuantity, getCartCount } = useContext(StoreContext)
    const [Cart, setCart] = useState([])
    const [totalPrice, settotalPrice] = useState([])

    async function getCart() {
        let token = localStorage.getItem('token')
        if (token) {
            let response = await getUserCart(token)
            console.log(response);

            setCart(response.data.cart.cartItem)
            settotalPrice(response.data.cart.totalprice)
        }
    }
    async function removeFromCart(product) {
        let token = localStorage.getItem('token')
        if (token) {
            let response = await removeCartItem(token, product)
            notify('produc deleted Successfully', 'success')
            setCart(response.data.cart.cartItem)
            settotalPrice(response.data.cart.totalprice)
        }
    }
    async function updateCount(product, quantity) {
        let token = localStorage.getItem('token')
        if (token) {
            let response = await updateQuantity(token, quantity, product)
            notify('product updated', 'success')
            setCart(response.data.cart.cartItem)
            settotalPrice(response.data.cart.totalprice)
        }
    }

    useEffect(() => {
        getCart()
    }, [])
    return (
        <>
            <Helmet>
                <title>Cart Details</title>
            </Helmet>
            {Cart.length != 0 ? <div className="container">
                <div className="bg-main-light p-3 my-4">
                    <h3>Shop Cart</h3>
                    <h6 className='text-main my-3 fw-bold'>Total Cart Price: {totalPrice}</h6>
                    {Cart.map((item) => {
                        return <div key={item._id} className='row my-3'>
                            <div className="col-md-1 ">
                                <img className='w-100' src={item.product.imageCover} alt="" />
                            </div>
                            <div className="col-md-11 d-flex justify-content-between">
                                <div>
                                    <h6>{item.product.title}</h6>
                                    <h6 className='text-main mx-2'>{item.price} EGP</h6>
                                    <button onClick={() => {
                                        removeFromCart(item._id)
                                        getCartCount()
                                    }
                                    } className='text-danger border-0'>Remove <i className="fa-solid fa-trash"></i></button>
                                </div>
                                <div>
                                    <button onClick={() => updateCount(item._id, item.quantity + 1)} className='btn btn-border'>+</button>
                                    <span className='mx-2'>{item.quantity}</span>
                                    <button onClick={() => updateCount(item._id, item.quantity - 1)} className='btn btn-border'>-</button>
                                </div>
                            </div>
                        </div>
                    })}
                    <Link className='btn bg-main text-white' to={'/checkout'}>CHECKOUT</Link>
                </div>
            </div >
                : <h1><Loading /></h1>
            }
        </>
    )
}
