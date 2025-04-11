import React from "react";
import Slider from "react-slick";
import slider1 from "../../images/slider1.jpg";
import slider3 from "../../images/slider3.jpeg";
import slider4 from "../../images/slider 4.png";
import slider5 from "../../images/slider5.png";
import slider6 from "../../images/slider4.jpeg";

const Mainslider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const images = [slider1, slider3, slider4, slider5, slider6];

  return (
    <div className="my-4 container">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`slider-${idx + 1}`}
            className="w-100 rounded"
          />
        ))}
      </Slider>
    </div>
  );
};

export default Mainslider;
