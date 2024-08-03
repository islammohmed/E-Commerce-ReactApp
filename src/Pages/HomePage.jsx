import React from 'react'
import Mainslider from '../components/Mainslider/Mainslider.jsx'
import Categoryslider from '../components/Categoryslider/Categoryslider.jsx'
import Products from '../components/Products/Products.jsx'

export default function HomePage() {
    return (
        <>
            <Mainslider />
            <Categoryslider />
            <Products />
        </>
    )
}
