import "./App.css";
import MainLayout from "./Layouts/MainLayout.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // <-- Use HashRouter here
import HomePage from "./Pages/HomePage.jsx";
import Products from "./components/Products/Products.jsx";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import { ToastContainer } from "react-toastify";
import { Offline } from "react-detect-offline";
import StoreContextProvider from "./context/StoreContext";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [UserData, setUserData] = useState(null);

  // Save decoded token into state
  function saveUserData() {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      try {
        const decodedToken = jwtDecode(encodedToken);
        setUserData(decodedToken);
      } catch (error) {
        console.error("Failed to decode token", error);
        localStorage.removeItem("token");
        setUserData(null);
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, []);

  return (
    <>
      <ToastContainer theme="colored" />
      <StoreContextProvider>
        <Offline>
          <div className="network">You are Offline</div>
        </Offline>
        {/* Replace RouterProvider with HashRouter */}
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout UserData={UserData} setUserData={setUserData} />
              }
            >
              <Route
                index
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="product-details/:id"
                element={
                  <ProtectedRoute>
                    <ProductsDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="login"
                element={<Login saveUserData={saveUserData} />}
              />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </StoreContextProvider>
    </>
  );
}

export default App;
