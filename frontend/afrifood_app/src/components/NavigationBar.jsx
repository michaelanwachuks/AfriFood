import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartContext from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const NavigationBar = () => {
  const { cartCount } = useContext(CartContext);
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const displayName = user?.name || user?.email || (typeof user === "string" ? user : null);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 sticky-top">

      <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
        <FontAwesomeIcon icon={faBowlFood} className="text-warning" />
        AfriFood
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">

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

        <ul className="navbar-nav align-items-lg-center">
          <li className="nav-item me-3">
            <Link className="nav-link" to="/cart">
              <FontAwesomeIcon icon={faCartShopping} className="me-1" />
              Cart{" "}
              {cartCount > 0 && (
                <span className="badge bg-warning text-dark">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          {loading ? (
            <li className="nav-item">
              <span className="nav-link text-muted">...</span>
            </li>
          ) : user ? (
            <>
              {user.role === "ADMIN" && (
                <li className="nav-item">
                  <Link className="nav-link text-danger fw-semibold" to="/admin">
                    Admin
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <span className="nav-link text-warning">
                  Hi, {displayName}
                  {user.role === "ADMIN" && (
                    <span className="badge bg-danger ms-1">Admin</span>
                  )}
                </span>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>

      </div>
    </nav>
  );
};

export default NavigationBar;
