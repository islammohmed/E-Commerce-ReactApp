import "./App.css";
import MainLayout from "./Layouts/MainLayout.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import Products from "./components/Products/Products.jsx";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Checkout from "./components/Checkout/Checkout.jsx";
import CategoryDetails from "./Pages/CategoryDetails.jsx";
import BrandDetails from "./Pages/BrandDetails.jsx";

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

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout UserData={UserData} setUserData={setUserData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },

        {
          path: "product-details/:id",
          element: (
            <ProtectedRoute>
              <ProductsDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer theme="colored" />
      <StoreContextProvider>
        <Offline>
          <div className="network">You are Offline</div>
        </Offline>
        <RouterProvider router={routes} />
      </StoreContextProvider>
    </>
  );
}

export default App;
