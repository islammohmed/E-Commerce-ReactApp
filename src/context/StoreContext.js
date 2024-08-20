import axios from "axios";
import { createContext, useEffect, useState } from "react";
import baseUrl from "../utils/baseUrl";

export let StoreContext = createContext(0)


export function StoreContextProvider({ children }) {
    const [cartCount, setcartCount] = useState(0)
    function addToCart(token, product) {
        return axios.post(`${baseUrl}/cart`, { product }, {
            headers: { token }
        }).then(data => data).catch(error => error)
    }
    function getUserCart(token) {
        return axios.get(`${baseUrl}/cart`, {
            headers: { token }
        }).then(data => data).catch(error => error)
    }
    function removeCartItem(token, product) {
        return axios.delete(`${baseUrl}/cart/${product}`, {
            headers: { token }
        }).then(data => data).catch(error => error)
    }
    function updateQuantity(token, quantity, product) {
        return axios.put(`${baseUrl}/cart/${product}`, { quantity }, {
            headers: { token }
        }).then(data => data).catch(error => error)
    }
    function getCartCount() {
        let token = localStorage.getItem('token')
        axios.get(`${baseUrl}/cart`, {
            headers: { token }
        }).then(data => {
            setcartCount(data.data.cartNumber)
        }).catch(error => error)
    }
    useEffect(() => {
        getCartCount()
    }, [])
    return <StoreContext.Provider value={{ addToCart, getUserCart, removeCartItem, updateQuantity, setcartCount, cartCount, getCartCount }}>
        {children}
    </StoreContext.Provider>
} 