import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ UserData, setUserData }) => {
  const { cartCount } = useContext(StoreContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-main-light navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="freshLogo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {UserData ? (
              <>
                <NavLink
                  to="/cart"
                  className="btn border-0 position-relative me-3"
                >
                  Cart <i className="fa-solid fa-cart-shopping" />
                  <span className="badge bg-success position-absolute top-0 start-100 translate-middle rounded-pill">
                    {cartCount}
                  </span>
                </NavLink>
                <li className="nav-item">
                  <button className="btn nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
