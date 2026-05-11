import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedRole) setRole(storedRole);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);

      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
    navigate("/signin");
  };

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    ...styles.navLink,
    ...(isActive(path) ? styles.navLinkActive : {}),
  });

  return (
    <>
      <nav
        style={{
          ...styles.navbar,
          ...(scrolled ? styles.navbarScrolled : {}),
        }}
      >
        <div style={styles.container}>
          {/* BRAND */}
          <Link to="/" style={styles.brand}>
            <span style={styles.brandIcon}>🌟</span>
            <span style={styles.brandText}>SPOTLIGHT</span>
          </Link>

          {/* DESKTOP LINKS */}
          {!isMobile && (
            <ul style={styles.desktopLinks}>
              <li>
                <Link to="/" style={linkStyle("/")}>
                  🏠 Home
                </Link>
              </li>

              <li>
                <Link
                  to="/apply"
                  style={{
                    ...linkStyle("/apply"),
                    ...styles.applyLink,
                  }}
                >
                  ✨ Apply
                </Link>
              </li>

              <li>
                <Link to="/clothes" style={linkStyle("/clothes")}>
                  👗 Clothes
                </Link>
              </li>

              <li>
                <Link to="/instruments" style={linkStyle("/instruments")}>
                  🎵 Instruments
                </Link>
              </li>

              <li>
                <Link to="/contact" style={linkStyle("/contact")}>
                  📞 Contact
                </Link>
              </li>

              {role === "school" && (
                <>
                  <li>
                    <Link to="/dashboard" style={linkStyle("/dashboard")}>
                      📊 Dashboard
                    </Link>
                  </li>

                  <li>
                    <Link to="/addclothes" style={linkStyle("/addclothes")}>
                      ➕ Clothes
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/addinstruments"
                      style={linkStyle("/addinstruments")}
                    >
                      ➕ Instruments
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/addproduct"
                      style={linkStyle("/addproduct")}
                    >
                      ➕ Product
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}

          {/* AUTH */}
          {!isMobile && (
            <div style={styles.authSection}>
              {!user ? (
                <div style={styles.authButtons}>
                  <Link to="/signin" style={styles.signinBtn}>
                    Sign In
                  </Link>

                  <Link to="/signup" style={styles.signupBtn}>
                    Sign Up 🚀
                  </Link>
                </div>
              ) : (
                <div style={styles.userSection}>
                  <div style={styles.avatar}>
                    {user.username?.charAt(0).toUpperCase()}
                  </div>

                  <span style={styles.username}>
                    Hi, {user.username}
                  </span>

                  <button
                    style={styles.logoutBtn}
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* HAMBURGER */}
          {isMobile && (
            <button
              style={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          )}
        </div>

        {/* MOBILE MENU */}
        {isMobile && menuOpen && (
          <div style={styles.mobileMenu}>
            <div style={styles.mobileScroll}>
              <Link
                to="/"
                style={mobileLinkStyle(isActive("/"))}
              >
                🏠 Home
              </Link>

              <Link
                to="/apply"
                style={{
                  ...mobileLinkStyle(isActive("/apply")),
                  ...styles.mobileLinkApply,
                }}
              >
                ✨ Apply
              </Link>

              <Link
                to="/clothes"
                style={mobileLinkStyle(isActive("/clothes"))}
              >
                👗 Clothes
              </Link>

              <Link
                to="/instruments"
                style={mobileLinkStyle(isActive("/instruments"))}
              >
                🎵 Instruments
              </Link>

              <Link
                to="/contact"
                style={mobileLinkStyle(isActive("/contact"))}
              >
                📞 Contact
              </Link>

              {role === "school" && (
                <>
                  <div style={styles.mobileDivider} />

                  <p style={styles.mobileSection}>
                    School Admin
                  </p>

                  <Link
                    to="/dashboard"
                    style={mobileLinkStyle(
                      isActive("/dashboard")
                    )}
                  >
                    📊 Dashboard
                  </Link>

                  <Link
                    to="/addclothes"
                    style={mobileLinkStyle(
                      isActive("/addclothes")
                    )}
                  >
                    ➕ Add Clothes
                  </Link>

                  <Link
                    to="/addinstruments"
                    style={mobileLinkStyle(
                      isActive("/addinstruments")
                    )}
                  >
                    ➕ Add Instruments
                  </Link>

                  <Link
                    to="/addproduct"
                    style={mobileLinkStyle(
                      isActive("/addproduct")
                    )}
                  >
                    ➕ Add Product
                  </Link>
                </>
              )}

              <div style={styles.mobileDivider} />

              {!user ? (
                <div style={styles.mobileAuthRow}>
                  <Link
                    to="/signin"
                    style={styles.mobileSignin}
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    style={styles.mobileSignup}
                  >
                    Sign Up 🚀
                  </Link>
                </div>
              ) : (
                <div style={styles.mobileUserRow}>
                  <div style={styles.avatar}>
                    {user.username?.charAt(0).toUpperCase()}
                  </div>

                  <span style={styles.mobileUsername}>
                    Hi, {user.username}
                  </span>

                  <button
                    style={styles.logoutBtn}
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}

              {/* EXTRA SPACE */}
              <div style={{ height: "120px" }} />
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div style={{ height: "70px" }} />

      <style>{`
        body {
          margin: 0;
          overflow-x: hidden;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes glow {
          0%,100% {
            box-shadow: 0 0 10px rgba(168,85,247,0.4);
          }

          50% {
            box-shadow: 0 0 20px rgba(168,85,247,0.8);
          }
        }
      `}</style>
    </>
  );
};

const mobileLinkStyle = (active) => ({
  color: active ? "#fff" : "rgba(255,255,255,0.75)",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: active ? "700" : "600",
  padding: "14px 16px",
  borderRadius: "12px",
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  background: active
    ? "rgba(168,85,247,0.2)"
    : "transparent",
  borderLeft: active
    ? "4px solid #a78bfa"
    : "4px solid transparent",
});

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: "rgba(15, 5, 30, 0.85)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  navbarScrolled: {
    background: "rgba(15, 5, 30, 0.97)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
  },

  brandIcon: {
    fontSize: "24px",
  },

  brandText: {
    fontSize: "20px",
    fontWeight: "800",
    background:
      "linear-gradient(90deg,#fbbf24,#a78bfa,#34d399)",
    backgroundSize: "200% 200%",
    animation: "gradientShift 3s ease infinite",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  desktopLinks: {
    display: "flex",
    gap: "5px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },

  navLink: {
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    padding: "8px 14px",
    borderRadius: "10px",
  },

  navLinkActive: {
    background: "rgba(168,85,247,0.2)",
    color: "#fff",
  },

  applyLink: {
    background:
      "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.3))",
    border: "1px solid rgba(168,85,247,0.4)",
    color: "#c4b5fd",
  },

  authSection: {},

  authButtons: {
    display: "flex",
    gap: "10px",
  },

  signinBtn: {
    color: "#fff",
    textDecoration: "none",
  },

  signupBtn: {
    color: "#000",
    textDecoration: "none",
    background: "#fbbf24",
    padding: "10px 16px",
    borderRadius: "10px",
    fontWeight: "700",
  },

  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#7c3aed,#3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "700",
    animation: "glow 3s ease infinite",
  },

  username: {
    color: "#fff",
  },

  logoutBtn: {
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.4)",
    borderRadius: "8px",
    color: "#fca5a5",
    padding: "8px 12px",
    cursor: "pointer",
  },

  hamburger: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "30px",
    cursor: "pointer",
  },

  mobileMenu: {
    position: "fixed",
    top: "70px",
    left: 0,
    right: 0,

    /* IMPORTANT FIX */
    height: "calc(100vh - 70px)",

    background: "rgba(12,4,26,0.98)",
    backdropFilter: "blur(20px)",
    zIndex: 999,
  },

  mobileScroll: {
    height: "100%",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
    padding: "16px",
    paddingBottom: "140px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  mobileLinkApply: {
    color: "#c4b5fd",
    background: "rgba(124,58,237,0.15)",
    border: "1px solid rgba(168,85,247,0.3)",
  },

  mobileDivider: {
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    margin: "12px 0",
  },

  mobileSection: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  mobileAuthRow: {
    display: "flex",
    gap: "10px",
  },

  mobileSignin: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
  },

  mobileSignup: {
    flex: 1,
    textAlign: "center",
    color: "#000",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "12px",
    background: "#fbbf24",
    fontWeight: "700",
  },

  mobileUserRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  mobileUsername: {
    color: "#fff",
    flex: 1,
  },
};

export default Navbar;