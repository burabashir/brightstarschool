import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedRole) setRole(storedRole);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close menu on route change
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
      <nav style={{ ...styles.navbar, ...(scrolled ? styles.navbarScrolled : {}) }}>
        <div style={styles.container}>

          {/* BRAND */}
          <Link to="/" style={styles.brand}>
            <span style={styles.brandIcon}>🌟</span>
            <span style={styles.brandText}>SPOTLIGHT</span>
          </Link>

          {/* DESKTOP LINKS */}
          <ul style={styles.desktopLinks}>

            <li>
              <Link to="/" style={linkStyle("/")}>
                🏠 Home
              </Link>
            </li>

            <li>
              <Link to="/apply" style={{ ...linkStyle("/apply"), ...styles.applyLink }}>
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

            {/* SCHOOL ONLY */}
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
                  <Link to="/addinstruments" style={linkStyle("/addinstruments")}>
                    ➕ Instruments
                  </Link>
                </li>
                <li>
                  <Link to="/addproduct" style={linkStyle("/addproduct")}>
                    ➕ Product
                  </Link>
                </li>
              </>
            )}

          </ul>

          {/* AUTH SECTION */}
          <div style={styles.authSection}>
            {!user ? (
              <div style={styles.authButtons}>
                <Link to="/signin" style={styles.signinBtn}>Sign In</Link>
                <Link to="/signup" style={styles.signupBtn}>Sign Up 🚀</Link>
              </div>
            ) : (
              <div style={styles.userSection}>
                <div style={styles.avatar}>
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <span style={styles.username}>Hi, {user.username}</span>
                <button style={styles.logoutBtn} onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            )}
          </div>

          {/* HAMBURGER */}
          <button
            style={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={{ ...styles.bar, ...(menuOpen ? styles.bar1Open : {}) }}></span>
            <span style={{ ...styles.bar, ...(menuOpen ? styles.barHide : {}) }}></span>
            <span style={{ ...styles.bar, ...(menuOpen ? styles.bar3Open : {}) }}></span>
          </button>

        </div>

        {/* MOBILE MENU */}
        <div style={{ ...styles.mobileMenu, ...(menuOpen ? styles.mobileMenuOpen : {}) }}>

          <Link to="/" style={styles.mobileLink}>🏠 Home</Link>
          <Link to="/apply" style={{ ...styles.mobileLink, ...styles.mobileLinkApply }}>✨ Apply</Link>
          <Link to="/clothes" style={styles.mobileLink}>👗 Clothes</Link>
          <Link to="/instruments" style={styles.mobileLink}>🎵 Instruments</Link>
          <Link to="/contact" style={styles.mobileLink}>📞 Contact</Link>

          {role === "school" && (
            <>
              <div style={styles.mobileDivider}></div>
              <p style={styles.mobileSection}>School Admin</p>
              <Link to="/dashboard" style={styles.mobileLink}>📊 Dashboard</Link>
              <Link to="/addclothes" style={styles.mobileLink}>➕ Add Clothes</Link>
              <Link to="/addinstruments" style={styles.mobileLink}>➕ Add Instruments</Link>
              <Link to="/addproduct" style={styles.mobileLink}>➕ Add Product</Link>
            </>
          )}

          <div style={styles.mobileDivider}></div>

          {!user ? (
            <div style={styles.mobileAuthRow}>
              <Link to="/signin" style={styles.mobileSignin}>Sign In</Link>
              <Link to="/signup" style={styles.mobileSignup}>Sign Up 🚀</Link>
            </div>
          ) : (
            <div style={styles.mobileUserRow}>
              <div style={styles.avatar}>{user.username?.charAt(0).toUpperCase()}</div>
              <span style={styles.mobileUsername}>Hi, {user.username}</span>
              <button style={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
            </div>
          )}

        </div>

      </nav>

      {/* SPACER so content doesn't hide behind fixed navbar */}
      <div style={{ height: "70px" }}></div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(168,85,247,0.4); }
          50% { box-shadow: 0 0 20px rgba(168,85,247,0.8); }
        }
        a:hover > span { opacity: 1 !important; }
      `}</style>
    </>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: "rgba(15, 5, 30, 0.7)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    transition: "all 0.3s ease",
  },
  navbarScrolled: {
    background: "rgba(15, 5, 30, 0.95)",
    borderBottom: "1px solid rgba(168,85,247,0.3)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    flexShrink: 0,
  },
  brandIcon: {
    fontSize: "24px",
  },
  brandText: {
    fontSize: "20px",
    fontWeight: "800",
    background: "linear-gradient(90deg, #fbbf24, #a78bfa, #34d399)",
    backgroundSize: "200% 200%",
    animation: "gradientShift 3s ease infinite",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "2px",
  },
  desktopLinks: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    listStyle: "none",
    margin: 0,
    padding: 0,
    flexWrap: "nowrap",
    "@media (max-width: 900px)": {
      display: "none",
    },
  },
  navLink: {
    color: "rgba(255,255,255,0.65)",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "600",
    padding: "6px 12px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
    display: "block",
  },
  navLinkActive: {
    color: "#fff",
    background: "rgba(168,85,247,0.2)",
    borderBottom: "2px solid #a78bfa",
  },
  applyLink: {
    background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.3))",
    border: "1px solid rgba(168,85,247,0.4)",
    color: "#c4b5fd",
    borderRadius: "20px",
  },
  authSection: {
    flexShrink: 0,
  },
  authButtons: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  signinBtn: {
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "600",
    padding: "7px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.15)",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  signupBtn: {
    color: "#000",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "700",
    padding: "7px 16px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    boxShadow: "0 4px 12px rgba(251,191,36,0.3)",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "800",
    fontSize: "14px",
    flexShrink: 0,
    animation: "glow 3s ease-in-out infinite",
  },
  username: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  logoutBtn: {
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.4)",
    borderRadius: "8px",
    color: "#fca5a5",
    fontSize: "12px",
    fontWeight: "600",
    padding: "6px 12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    zIndex: 1001,
    "@media (max-width: 900px)": {
      display: "flex",
    },
  },
  bar: {
    display: "block",
    width: "24px",
    height: "2px",
    background: "#fff",
    borderRadius: "2px",
    transition: "all 0.3s ease",
    transformOrigin: "center",
  },
  bar1Open: {
    transform: "translateY(7px) rotate(45deg)",
  },
  barHide: {
    opacity: 0,
    transform: "scaleX(0)",
  },
  bar3Open: {
    transform: "translateY(-7px) rotate(-45deg)",
  },
  mobileMenu: {
    maxHeight: 0,
    overflow: "hidden",
    transition: "max-height 0.4s ease, padding 0.3s ease",
    background: "rgba(15, 5, 30, 0.98)",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  mobileMenuOpen: {
    maxHeight: "600px",
    padding: "16px 20px",
  },
  mobileLink: {
    color: "rgba(255,255,255,0.75)",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "600",
    padding: "10px 14px",
    borderRadius: "10px",
    transition: "all 0.2s ease",
    display: "block",
  },
  mobileLinkApply: {
    color: "#c4b5fd",
    background: "rgba(124,58,237,0.15)",
    border: "1px solid rgba(168,85,247,0.3)",
  },
  mobileDivider: {
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    margin: "8px 0",
  },
  mobileSection: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    margin: "0 0 4px 14px",
  },
  mobileAuthRow: {
    display: "flex",
    gap: "10px",
    padding: "8px 0",
  },
  mobileSignin: {
    flex: 1,
    textAlign: "center",
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.15)",
  },
  mobileSignup: {
    flex: 1,
    textAlign: "center",
    color: "#000",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "700",
    padding: "10px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
  },
  mobileUserRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 0",
  },
  mobileUsername: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "14px",
    fontWeight: "600",
    flex: 1,
  },
};

export default Navbar;