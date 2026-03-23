import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold text-warning" to="/">
        SPOTLIGHT
        </Link>

        {/* Toggle (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/">
                HOME
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/addproduct">
                ADD PRODUCT
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/signin">
                SIGN IN
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/signup">
                SIGN UP
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;