import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Signin = () => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("email", Email);
            formData.append("password", Password);

            const response = await axios.post(
                "https://dumabashir.alwaysdata.net/api/signin",
                formData
            );

            setLoading(false);

            if (response.data.user) {
                const user = response.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("role", user.role);

                if (user.role === "school") {
                    navigate("/addproduct");
                } else {
                    navigate("/");
                }

                window.location.reload();

            } else {
                setError("Invalid email or password. Please try again.");
            }

        } catch (err) {
            setLoading(false);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div style={styles.wrapper}>

            {/* ANIMATED BACKGROUND BLOBS */}
            <div style={styles.blob1}></div>
            <div style={styles.blob2}></div>
            <div style={styles.blob3}></div>
            <div style={styles.blob4}></div>

            {/* FLOATING ICONS */}
            <div style={{ ...styles.floatingIcon, top: "10%", left: "8%", animationDelay: "0s" }}>🎭</div>
            <div style={{ ...styles.floatingIcon, top: "20%", right: "10%", animationDelay: "1s" }}>🎵</div>
            <div style={{ ...styles.floatingIcon, bottom: "25%", left: "6%", animationDelay: "2s" }}>🏆</div>
            <div style={{ ...styles.floatingIcon, bottom: "15%", right: "8%", animationDelay: "0.5s" }}>🎓</div>
            <div style={{ ...styles.floatingIcon, top: "50%", left: "3%", animationDelay: "1.5s" }}>⭐</div>
            <div style={{ ...styles.floatingIcon, top: "40%", right: "4%", animationDelay: "2.5s" }}>🎨</div>

            <div style={styles.card}>

                {/* TOP BANNER */}
                <div style={styles.topBanner}>
                    <span style={styles.bannerText}>✨ SPOTLIGHT PLATFORM ✨</span>
                </div>

                {/* LOGO / TITLE */}
                <div style={styles.logoWrapper}>
                    <div style={styles.logoIcon}>🔐</div>
                </div>
                <h2 style={styles.title}>Welcome Back!</h2>
                <p style={styles.subtitle}>Sign in and let your talent shine 🌟</p>

                {/* FORM */}
                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* EMAIL */}
                    <div style={styles.inputGroup}>
                        <span style={styles.inputIcon}>📧</span>
                        <input
                            style={styles.input}
                            type="email"
                            placeholder="Email address"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* PASSWORD */}
                    <div style={styles.inputGroup}>
                        <span style={styles.inputIcon}>🔒</span>
                        <input
                            style={styles.input}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            style={styles.eyeIcon}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div style={styles.errorBox}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        style={loading ? { ...styles.btn, ...styles.btnDisabled } : styles.btn}
                        disabled={loading}
                    >
                        {loading ? (
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                <span style={styles.spinner}></span> Signing in...
                            </span>
                        ) : (
                            "🚀 Sign In"
                        )}
                    </button>

                </form>

                {/* DIVIDER */}
                <div style={styles.divider}>
                    <span style={styles.dividerLine}></span>
                    <span style={styles.dividerText}>or</span>
                    <span style={styles.dividerLine}></span>
                </div>

                {/* SIGNUP LINK */}
                <p style={styles.bottomText}>
                    New here?{" "}
                    <Link to="/signup" style={styles.link}>Create an account 🎉</Link>
                </p>

                {/* ROLES BADGE */}
                <div style={styles.badgeRow}>
                    <span style={styles.badgeStudent}>🎒 Students</span>
                    <span style={styles.badgeSchool}>🏫 Schools</span>
                </div>

            </div>

            <Footer />

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                }
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                input::placeholder {
                    color: rgba(255,255,255,0.35);
                }
                input:focus {
                    outline: none;
                    border-color: rgba(168, 85, 247, 0.8) !important;
                    background: rgba(255,255,255,0.12) !important;
                    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2) !important;
                }
                button:hover:not(:disabled) {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 12px 30px rgba(168, 85, 247, 0.5) !important;
                }
            `}</style>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a0533 0%, #0d1b4b 40%, #0a2a1a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
    },
    blob1: {
        position: "absolute",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
        top: "-150px",
        left: "-150px",
        borderRadius: "50%",
        animation: "pulse 6s ease-in-out infinite",
        pointerEvents: "none",
    },
    blob2: {
        position: "absolute",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
        bottom: "-100px",
        right: "-100px",
        borderRadius: "50%",
        animation: "pulse 8s ease-in-out infinite",
        pointerEvents: "none",
    },
    blob3: {
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
        top: "40%",
        left: "60%",
        borderRadius: "50%",
        animation: "pulse 7s ease-in-out infinite",
        pointerEvents: "none",
    },
    blob4: {
        position: "absolute",
        width: "250px",
        height: "250px",
        background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)",
        top: "20%",
        left: "20%",
        borderRadius: "50%",
        animation: "pulse 9s ease-in-out infinite",
        pointerEvents: "none",
    },
    floatingIcon: {
        position: "absolute",
        fontSize: "28px",
        animation: "float 4s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.7,
    },
    card: {
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "28px",
        padding: "0 0 40px 0",
        width: "100%",
        maxWidth: "430px",
        boxShadow: "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        zIndex: 1,
        overflow: "hidden",
    },
    topBanner: {
        background: "linear-gradient(90deg, #7c3aed, #3b82f6, #10b981, #f59e0b, #7c3aed)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 4s ease infinite",
        padding: "10px",
        textAlign: "center",
        marginBottom: "32px",
    },
    bannerText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: "13px",
        letterSpacing: "2px",
    },
    logoWrapper: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "16px",
        padding: "0 40px",
    },
    logoIcon: {
        fontSize: "44px",
        background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.3))",
        borderRadius: "50%",
        width: "84px",
        height: "84px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid rgba(168,85,247,0.4)",
        boxShadow: "0 0 30px rgba(168,85,247,0.3)",
    },
    title: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "800",
        fontSize: "28px",
        margin: "0 0 6px 0",
        padding: "0 40px",
    },
    subtitle: {
        color: "rgba(255,255,255,0.55)",
        textAlign: "center",
        fontSize: "14px",
        marginBottom: "28px",
        padding: "0 40px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "0 40px",
    },
    inputGroup: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    inputIcon: {
        position: "absolute",
        left: "14px",
        fontSize: "16px",
        zIndex: 2,
    },
    input: {
        width: "100%",
        padding: "15px 14px 15px 46px",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "14px",
        color: "#fff",
        fontSize: "15px",
        transition: "all 0.3s ease",
        boxSizing: "border-box",
    },
    eyeIcon: {
        position: "absolute",
        right: "14px",
        cursor: "pointer",
        fontSize: "18px",
        userSelect: "none",
        zIndex: 2,
    },
    errorBox: {
        background: "rgba(239, 68, 68, 0.15)",
        border: "1px solid rgba(239, 68, 68, 0.4)",
        borderRadius: "12px",
        padding: "12px 16px",
        color: "#fca5a5",
        fontSize: "14px",
        textAlign: "center",
    },
    btn: {
        padding: "15px",
        background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #10b981 100%)",
        backgroundSize: "200% 200%",
        border: "none",
        borderRadius: "14px",
        color: "#fff",
        fontWeight: "700",
        fontSize: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        marginTop: "4px",
        letterSpacing: "0.5px",
        boxShadow: "0 4px 15px rgba(124,58,237,0.4)",
    },
    btnDisabled: {
        opacity: 0.6,
        cursor: "not-allowed",
        transform: "none",
    },
    spinner: {
        display: "inline-block",
        width: "16px",
        height: "16px",
        border: "2px solid rgba(255,255,255,0.3)",
        borderTop: "2px solid #fff",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    },
    divider: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "24px 40px 16px",
    },
    dividerLine: {
        flex: 1,
        height: "1px",
        background: "rgba(255,255,255,0.1)",
    },
    dividerText: {
        color: "rgba(255,255,255,0.3)",
        fontSize: "13px",
    },
    bottomText: {
        textAlign: "center",
        color: "rgba(255,255,255,0.5)",
        fontSize: "14px",
        margin: "0 0 20px 0",
        padding: "0 40px",
    },
    link: {
        color: "#a78bfa",
        textDecoration: "none",
        fontWeight: "700",
    },
    badgeRow: {
        display: "flex",
        justifyContent: "center",
        gap: "12px",
        padding: "0 40px",
    },
    badgeStudent: {
        background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.1))",
        border: "1px solid rgba(59,130,246,0.4)",
        borderRadius: "20px",
        padding: "6px 16px",
        color: "#93c5fd",
        fontSize: "13px",
        fontWeight: "600",
    },
    badgeSchool: {
        background: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.1))",
        border: "1px solid rgba(34,197,94,0.4)",
        borderRadius: "20px",
        padding: "6px 16px",
        color: "#86efac",
        fontSize: "13px",
        fontWeight: "600",
    },
};

export default Signin;