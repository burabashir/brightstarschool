import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleContact = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("message", message);

      await axios.post(
        "https://dumabashir.alwaysdata.net/api/contact",
        formData
      );

      setSent(true);
      setEmail("");
      setMessage("");
      setTimeout(() => setSent(false), 3000);

    } catch (err) {
      setError("❌ Failed to send. Try again.");
    }
  };

  return (
    <footer style={styles.footer}>

      {/* TOP WAVE */}
      <div style={styles.wave}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#111"
            d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      <div className="container">
        <div className="row g-4 pt-3">

          {/* BRAND */}
          <div className="col-md-4">
            <h4 style={styles.brand}>⭐ SPOTLIGHT</h4>
            <p style={styles.muted}>
              Brightstar School's official talent and merchandise platform.
              Discover talents, shop uniforms, and explore musical instruments.
            </p>
            <div style={styles.socialRow}>
              <a href="#" style={styles.socialBtn}>📘</a>
              <a href="#" style={styles.socialBtn}>🐦</a>
              <a href="#" style={styles.socialBtn}>📸</a>
              <a href="#" style={styles.socialBtn}>▶️</a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-md-2">
            <h6 style={styles.heading}>Quick Links</h6>
            <ul style={styles.linkList}>
              <li><Link to="/" style={styles.link}>🏠 Home</Link></li>
              <li><Link to="/clothes" style={styles.link}>👕 Clothes</Link></li>
              <li><Link to="/instruments" style={styles.link}>🎸 Instruments</Link></li>
              <li><Link to="/signin" style={styles.link}>🔐 Sign In</Link></li>
              <li><Link to="/signup" style={styles.link}>📝 Sign Up</Link></li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="col-md-2">
            <h6 style={styles.heading}>Contact</h6>
            <ul style={styles.linkList}>
              <li style={styles.muted}>📍 Nairobi, Kenya</li>
              <li style={styles.muted}>📞 0712 345 678</li>
              <li style={styles.muted}>📧 info@brightstar.ac.ke</li>
              <li style={styles.muted}>🕐 Mon - Fri: 8am - 5pm</li>
            </ul>
          </div>

          {/* CONTACT FORM */}
          <div className="col-md-4">
            <h6 style={styles.heading}>Send Us a Message</h6>

            {sent && (
              <p style={{ color: "#28a745", fontWeight: "bold" }}>
                ✅ Message sent successfully!
              </p>
            )}
            {error && (
              <p style={{ color: "#dc3545", fontWeight: "bold" }}>
                {error}
              </p>
            )}

            <form onSubmit={handleContact}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
              <textarea
                placeholder="Your message..."
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={styles.input}
              ></textarea>
              <button type="submit" style={styles.sendBtn}>
                🚀 Send Message
              </button>
            </form>
          </div>

        </div>

        {/* DIVIDER */}
        <hr style={styles.divider} />

        {/* BOTTOM */}
        <div className="d-flex justify-content-between align-items-center flex-wrap pb-3">
          <p style={{ ...styles.muted, margin: 0 }}>
            © {new Date().getFullYear()} <strong style={{ color: "#ffc107" }}>Brightstar School</strong>. All rights reserved.
          </p>
          <p style={{ ...styles.muted, margin: 0 }}>
            Built with ❤️ in Nairobi
          </p>
        </div>

      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#111",
    color: "#fff",
    marginTop: "60px",
    position: "relative",
  },
  wave: {
    lineHeight: 0,
    backgroundColor: "#1a1a2e",
  },
  brand: {
    color: "#ffc107",
    fontWeight: "bold",
    fontSize: "22px",
    marginBottom: "12px",
  },
  heading: {
    color: "#ffc107",
    fontWeight: "bold",
    marginBottom: "15px",
    fontSize: "15px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  muted: {
    color: "#aaa",
    fontSize: "14px",
    lineHeight: "2",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  link: {
    color: "#aaa",
    textDecoration: "none",
    fontSize: "14px",
    lineHeight: "2.2",
    transition: "color 0.2s",
    display: "block",
  },
  socialRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },
  socialBtn: {
    backgroundColor: "#222",
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "18px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 0.2s",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  sendBtn: {
    backgroundColor: "#ffc107",
    color: "#000",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
    fontSize: "14px",
  },
  divider: {
    borderColor: "#333",
    marginTop: "30px",
  },
};

export default Footer;