import { createContext, useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { notify } from "../utils/notify";
export const StoreContext = createContext();

export default function StoreContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const token = localStorage.getItem("token");
  const headers = { token };

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/cart`, { headers });

      // Now access cart.cartItem to get the products
      if (data.cart && data.cart.cartItem) {
        setCart(data.cart.cartItem); // Update cart with the fetched items
        updateCartCount(data.cart.cartItem); // Update cart count based on cart items
      } else {
        console.warn("No cart items found in the response.");
        setCart([]); // Reset cart if no items found
        setCartCount(0);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]); // Reset cart in case of error
      setCartCount(0); // Reset count to 0 on error

      // Optionally, display a notification about the error
      notify("Failed to load cart. Please try again later.", "error");
    }
  };

  const updateCartCount = (cartItems) => {
    if (Array.isArray(cartItems)) {
      const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(total);
    } else {
      console.warn("Invalid cartItems data.");
      setCartCount(0); // Reset count if the data is invalid
    }
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You are not logged in.");

    try {
      const { data, status } = await axios.post(
        `${baseUrl}/cart`,
        { product: productId },
        { headers }
      );

      if (status === 200) {
        await fetchCart(); // Re-fetch the cart after adding a product
        notify("Product added successfully", "success");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      notify("Failed to add product to the cart", "error");
    }
  };

  const updateCount = async (productId, newCount) => {
    console.log(productId);
    try {
      const { data, status } = await axios.put(
        `${baseUrl}/cart/${productId}`,
        { quantity: newCount }, // Updated parameter name to 'quantity'
        { headers }
      );

      if (status === 200) {
        await fetchCart(); // Refresh the cart after updating count
        return { status };
      }
    } catch (err) {
      console.error("Update count error:", err);
      return { status: err.response?.status || 500 };
    }
  };
  const removeFromCart = async (productId) => {
    try {
      const { status } = await axios.delete(`${baseUrl}/cart/${productId}`, {
        headers,
      });
      if (status === 200) {
        await fetchCart(); // Refresh cart
        return { status };
      }
    } catch (err) {
      console.error("Remove from cart error:", err);
      return { status: err.response?.status || 500 };
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        updateCount,
        fetchCart,
        removeFromCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
