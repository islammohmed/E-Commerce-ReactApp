import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { notify } from "../../utils/notify";

const Product = ({ products }) => {
  const { addToCart, fetchCart } = useContext(StoreContext);

  const addProduct = async (product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        notify("You are not logged in.", "error");
        return;
      }

      const response = await addToCart(product);

      if (response?.status === 200 || response?.status === "200") {
        await fetchCart();
        notify("Product added successfully", "success");
      } else {
        notify("Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      notify("Error adding product to cart.", error);
    }
  };

  return (
    <>
      {products.map((item) => (
        <div key={item._id} className="col-md-2">
          <div className="product">
            <Link to={`/product-details/${item._id}`}>
              <img src={item.imageCover} className="w-100" alt={item.title} />
              <h6 className="text-main">{item.title}</h6>
              <div className="d-flex justify-content-between align-items-center m-3">
                <span>{item.price} EGP</span>
                <div>
                  <i className="fa-solid fa-star rating-color"></i>{" "}
                  {item.rateAvg || "N/A"}
                </div>
              </div>
            </Link>
            <button
              onClick={() => addProduct(item._id)}
              className="btn bg-main text-white w-100"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Product;
