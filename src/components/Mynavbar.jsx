import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        {/* BRAND */}
        <Link className="navbar-brand fw-bold text-warning" to="/">
          SPOTLIGHT
        </Link>

        {/* TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* HOME */}
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/">
                HOME
              </Link>
            </li>

            {/* 👕 CLOTHES (ALL USERS) */}
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/clothes">
                CLOTHES
              </Link>
            </li>

            {/* 🎸 INSTRUMENTS (ALL USERS) */}
            <li className="nav-item">
              <Link className="nav-link text-uppercase" to="/instruments">
                INSTRUMENTS
              </Link>
            </li>

            {/* 🏫 SCHOOL ONLY LINKS */}
            {role === "school" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-uppercase" to="/addclothes">
                    ADD CLOTHES
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-uppercase" to="/addinstruments">
                    ADD INSTRUMENTS
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link text-uppercase" to="/addproduct">
                    ADD PRODUCT
                  </Link>
                </li>
              </>
            )}

            {/* AUTH */}
            {!user ? (
              <>
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
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-danger ms-2"
                  onClick={handleLogout}
                >
                  LOG OUT
                </button>
              </li>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;