import React, { useContext } from 'react'
import logo from "../../images/freshcart-logo.svg"
import { NavLink } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
export default function Navbar({ UserData }, { setUserData }) {
    let { cartCount } = useContext(StoreContext)
    return (

        <>
            <nav className="navbar navbar-expand-lg bg-main-light navbar-light">
                <div className="container">
                    <NavLink className="navbar-brand" to="#">
                        <img src={logo} alt="freshLogo" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/products">Products</NavLink>
                            </li>
                            <li className="nav-item">
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Category</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Brands</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 my-3">
                            {UserData == null ?
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" aria-current="page" to="/register">Register</NavLink>
                                    </li>
                                </> : <>
                                    <NavLink to={'/cart'} type="button" className="btn border-0 position-relative me-4">
                                        Cart <i className="fa-solid  fa-cart-shopping" />
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                            {cartCount}
                                            <span className="visually-hidden">unread messages</span>
                                        </span>
                                    </NavLink>
                                    <li className="nav-item">
                                        <NavLink onClick={() => {
                                            localStorage.removeItem('token')
                                            setUserData(null)
                                        }
                                        } className="nav-link active" aria-current="page" to="/">Logout</NavLink>
                                    </li>
                                </>
                            }

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
