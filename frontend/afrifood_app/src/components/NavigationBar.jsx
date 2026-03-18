import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "./CartContext";

const NavigationBar = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top">

      {/* Logo / Brand */}
      <Link className="navbar-brand fw-bold" to="/">
        🍲 AfriFood
      </Link>

      {/* Hamburger Button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible Menu */}
      <div className="collapse navbar-collapse" id="navbarContent">

        {/* Left Links */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/menu">Menu</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/faq">FAQ</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>

        </ul>

        {/* Right Side (Cart + Auth) */}
        <ul className="navbar-nav">

          {/* Cart */}
          <li className="nav-item me-3">
            <Link className="nav-link" to="/cart">
              Cart{" "}
              {cartCount > 0 && (
                <span className="badge bg-warning text-dark">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          {/* Auth */}
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>

        </ul>

      </div>
    </nav>
  );
};

export default NavigationBar;