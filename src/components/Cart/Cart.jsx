import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

export default function Cart() {
  const { cart, updateCount, removeFromCart } = useContext(StoreContext);

  const notify = (msg, type) => toast[type](msg);

  const changeCount = async (id, newCount) => {
    if (newCount < 1) {
      notify("Minimum quantity is 1", "warning");
      return;
    }

    const { status } = await updateCount(id, newCount);
    if (status === 200) {
      notify("Cart updated", "success");
    } else {
      notify("Failed to update cart", "error");
    }
  };

  const handleRemove = async (productId) => {
    const { status } = await removeFromCart(productId);
    if (status === 200) {
      notify("Item removed", "info");
    } else {
      notify("Failed to remove item", "error");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <h3>No Items In Cart</h3>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="container my-5">
        <h2>Cart</h2>
        <div className="row">
          {cart.map((item) => (
            <div
              key={item._id}
              className="col-md-12 border p-3 my-3 rounded shadow-sm d-flex align-items-center justify-content-between"
            >
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="flex-grow-1 px-3">
                <h5>{item.product.title}</h5>
                <p className="text-muted">{item.product.description}</p>
                <div className="d-flex align-items-center gap-3">
                  <button
                    className="btn btn-outline-success"
                    onClick={() => changeCount(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => changeCount(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="text-end d-flex flex-column align-items-end">
                <strong>{item.price} EGP</strong>
                <button
                  className="btn btn-sm btn-danger mt-2"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
