import React from 'react'
import Slider from "react-slick";
import slider1 from "../../../src/images/slider1.jpg"
import slider3 from "../../../src/images/slider3.jpeg"
import slider4 from "../../../src/images/slider 4.png"
import slider5 from "../../../src/images/slider5.png"
import slider6 from "../../../src/images/slider4.jpeg"
export default function Mainslider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
            <div className="my-3 container">
                <Slider {...settings}>
                    <img src={slider1} alt="slider1" />
                    <img src={slider3} alt="slider3" />
                    <img src={slider4} alt="slider4" />
                    <img src={slider5} alt="slider5" />
                    <img src={slider6} alt="slider6" />
                </Slider>
            </div>


        </>

    )
}
