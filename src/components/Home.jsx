import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Mycarousel from './Mycarousel';

const Home = () => {

    const navigate = useNavigate();
    const [count, setCount] = useState({ students: 0, schools: 0, programs: 0 });

    // animated counters
    useEffect(() => {
        const targets = { students: 500, schools: 50, programs: 120 };
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            setCount({
                students: Math.floor(targets.students * progress),
                schools: Math.floor(targets.schools * progress),
                programs: Math.floor(targets.programs * progress),
            });
            if (step >= steps) clearInterval(timer);
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <div style={styles.wrapper}>

            {/* BG BLOBS */}
            <div style={styles.blob1}></div>
            <div style={styles.blob2}></div>
            <div style={styles.blob3}></div>

            {/* ── HERO / CAROUSEL ── */}
            <div style={styles.carouselWrapper}>
                <Mycarousel onNavigate={navigate} />
            </div>

            {/* ── STATS STRIP ── */}
            <div style={styles.statsStrip}>
                <div style={styles.statItem}>
                    <span style={styles.statNumber}>{count.students}+</span>
                    <span style={styles.statLabel}>🎒 Students</span>
                </div>
                <div style={styles.statDivider}></div>
                <div style={styles.statItem}>
                    <span style={styles.statNumber}>{count.schools}+</span>
                    <span style={styles.statLabel}>🏫 Schools</span>
                </div>
                <div style={styles.statDivider}></div>
                <div style={styles.statItem}>
                    <span style={styles.statNumber}>{count.programs}+</span>
                    <span style={styles.statLabel}>🎭 Programs</span>
                </div>
            </div>

            {/* ── WHAT WE OFFER ── */}
            <div style={styles.section}>
                <div style={styles.sectionHeader}>
                    <span style={styles.sectionBadge}>What We Offer</span>
                    <h2 style={styles.sectionTitle}>Everything You Need to Succeed</h2>
                    <p style={styles.sectionSub}>From talent discovery to payments — we've got you covered.</p>
                </div>

                <div style={styles.featureGrid}>
                    {[
                        { icon: "🎭", title: "Talent Programs", desc: "Browse hundreds of curated talent programs across music, drama, art, and sports. Find your perfect match.", color: "#7c3aed" },
                        { icon: "🎓", title: "Top Schools", desc: "Connect with Kenya's leading schools and institutions that invest in student development.", color: "#3b82f6" },
                        { icon: "🏆", title: "Win Opportunities", desc: "Compete in events, win scholarships, and unlock life-changing career opportunities.", color: "#f59e0b" },
                        { icon: "👗", title: "School Uniforms", desc: "Shop quality school clothes and uniforms directly from your school's official store.", color: "#10b981" },
                        { icon: "🎵", title: "Instruments", desc: "Get the musical instruments you need to practice and perform at your best.", color: "#ec4899" },
                        { icon: "📱", title: "Easy Payments", desc: "Pay instantly and securely with M-Pesa STK push — right from your phone.", color: "#06b6d4" },
                    ].map((item, i) => (
                        <div key={i} style={styles.featureCard}>
                            <div style={{ ...styles.featureIconBox, background: `${item.color}22`, border: `1px solid ${item.color}44` }}>
                                <span style={styles.featureIcon}>{item.icon}</span>
                            </div>
                            <h4 style={styles.featureTitle}>{item.title}</h4>
                            <p style={styles.featureDesc}>{item.desc}</p>
                            <div style={{ ...styles.featureAccent, background: item.color }}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── HOW IT WORKS ── */}
            <div style={styles.howSection}>
                <div style={styles.sectionHeader}>
                    <span style={styles.sectionBadge}>How It Works</span>
                    <h2 style={styles.sectionTitle}>Get Started in 3 Simple Steps</h2>
                </div>

                <div style={styles.stepsRow}>
                    {[
                        { step: "01", icon: "📝", title: "Create Account", desc: "Sign up as a student or school in under a minute. No paperwork needed." },
                        { step: "02", icon: "🔍", title: "Browse & Choose", desc: "Explore programs, clothes, and instruments listed by top schools." },
                        { step: "03", icon: "📱", title: "Pay with M-Pesa", desc: "Complete your purchase securely with a simple M-Pesa STK push." },
                    ].map((item, i) => (
                        <div key={i} style={styles.stepCard}>
                            <div style={styles.stepNumber}>{item.step}</div>
                            <div style={styles.stepIconBox}>{item.icon}</div>
                            <h4 style={styles.stepTitle}>{item.title}</h4>
                            <p style={styles.stepDesc}>{item.desc}</p>
                            {i < 2 && <div style={styles.stepArrow}>→</div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── CATEGORIES ── */}
            <div style={styles.section}>
                <div style={styles.sectionHeader}>
                    <span style={styles.sectionBadge}>Shop & Apply</span>
                    <h2 style={styles.sectionTitle}>Explore Our Categories</h2>
                </div>

                <div style={styles.categoryRow}>
                    {[
                        { icon: "🎭", label: "Programs", route: "/apply", gradient: "linear-gradient(135deg, #7c3aed, #a78bfa)" },
                        { icon: "👗", label: "Clothes", route: "/clothes", gradient: "linear-gradient(135deg, #10b981, #34d399)" },
                        { icon: "🎵", label: "Instruments", route: "/instruments", gradient: "linear-gradient(135deg, #3b82f6, #93c5fd)" },
                        { icon: "📞", label: "Contact Us", route: "/contact", gradient: "linear-gradient(135deg, #f59e0b, #fcd34d)" },
                    ].map((cat, i) => (
                        <div
                            key={i}
                            style={{ ...styles.categoryCard, background: cat.gradient }}
                            onClick={() => navigate(cat.route)}
                        >
                            <span style={styles.categoryIcon}>{cat.icon}</span>
                            <span style={styles.categoryLabel}>{cat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── TESTIMONIALS ── */}
            <div style={styles.howSection}>
                <div style={styles.sectionHeader}>
                    <span style={styles.sectionBadge}>Testimonials</span>
                    <h2 style={styles.sectionTitle}>What Our Users Say</h2>
                </div>

                <div style={styles.testimonialsRow}>
                    {[
                        { name: "Amina K.", role: "Student", text: "Spotlight helped me find a music program I never knew existed. I'm now performing at national level!", avatar: "A" },
                        { name: "St. Mary's School", role: "School Admin", text: "We've connected with over 200 talented students through this platform. It's a game changer.", avatar: "S" },
                        { name: "Brian O.", role: "Student", text: "Paying for my school uniform was so easy — M-Pesa STK push in seconds. Super convenient!", avatar: "B" },
                    ].map((t, i) => (
                        <div key={i} style={styles.testimonialCard}>
                            <p style={styles.testimonialText}>"{t.text}"</p>
                            <div style={styles.testimonialAuthor}>
                                <div style={styles.testimonialAvatar}>{t.avatar}</div>
                                <div>
                                    <div style={styles.testimonialName}>{t.name}</div>
                                    <div style={styles.testimonialRole}>{t.role}</div>
                                </div>
                            </div>
                            <div style={styles.stars}>⭐⭐⭐⭐⭐</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── CTA BANNER ── */}
            <div style={styles.ctaBanner}>
                <div style={styles.ctaInner}>
                    <h2 style={styles.ctaTitle}>Ready to Find Your Spark? 🔥</h2>
                    <p style={styles.ctaSub}>Join thousands of students and schools already on Spotlight.</p>
                    <div style={styles.ctaBtnRow}>
                        <button style={styles.ctaBtnPrimary} onClick={() => navigate('/signup')}>
                            🎉 Create Free Account
                        </button>
                        <button style={styles.ctaBtnOutline} onClick={() => navigate('/apply')}>
                            🔍 Browse Programs
                        </button>
                    </div>
                </div>
            </div>

            <Footer />

            <style>{`
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
            `}</style>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0520 0%, #0d1b4b 50%, #0a2a1a 100%)",
        position: "relative",
        overflow: "hidden",
    },
    blob1: {
        position: "fixed",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
        top: "-200px", left: "-200px",
        borderRadius: "50%",
        animation: "pulse 8s ease-in-out infinite",
        pointerEvents: "none", zIndex: 0,
    },
    blob2: {
        position: "fixed",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
        bottom: "-150px", right: "-150px",
        borderRadius: "50%",
        animation: "pulse 10s ease-in-out infinite",
        pointerEvents: "none", zIndex: 0,
    },
    blob3: {
        position: "fixed",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
        top: "40%", left: "40%",
        borderRadius: "50%",
        animation: "pulse 12s ease-in-out infinite",
        pointerEvents: "none", zIndex: 0,
    },

    // CAROUSEL
    carouselWrapper: {
        position: "relative",
        zIndex: 1,
    },
    carouselOverlay: {
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        background: "linear-gradient(to top, rgba(10,5,25,0.95) 0%, rgba(10,5,25,0.6) 60%, transparent 100%)",
        padding: "60px 40px 40px",
        textAlign: "center",
    },
    heroTitle: {
        fontSize: "clamp(28px, 5vw, 56px)",
        fontWeight: "900",
        color: "#fff",
        margin: "0 0 12px",
        textShadow: "0 2px 20px rgba(0,0,0,0.5)",
    },
    heroGradient: {
        background: "linear-gradient(90deg, #fbbf24, #a78bfa, #34d399)",
        backgroundSize: "200% 200%",
        animation: "gradientShift 3s ease infinite",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    heroSub: {
        color: "rgba(255,255,255,0.75)",
        fontSize: "clamp(14px, 2vw, 18px)",
        maxWidth: "600px",
        margin: "0 auto 24px",
    },
    heroBtnRow: {
        display: "flex",
        gap: "14px",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    heroBtnPrimary: {
        padding: "13px 32px",
        background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
        border: "none",
        borderRadius: "50px",
        color: "#fff",
        fontWeight: "700",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 8px 25px rgba(124,58,237,0.4)",
        transition: "all 0.3s ease",
    },
    heroBtnOutline: {
        padding: "13px 32px",
        background: "rgba(255,255,255,0.1)",
        border: "2px solid rgba(255,255,255,0.3)",
        borderRadius: "50px",
        color: "#fff",
        fontWeight: "700",
        fontSize: "16px",
        cursor: "pointer",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
    },

    // STATS
    statsStrip: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0",
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        margin: "30px auto",
        maxWidth: "700px",
        padding: "24px 40px",
        position: "relative",
        zIndex: 1,
        flexWrap: "wrap",
    },
    statItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 40px",
    },
    statNumber: {
        fontSize: "36px",
        fontWeight: "900",
        background: "linear-gradient(135deg, #fbbf24, #a78bfa)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    },
    statLabel: {
        color: "rgba(255,255,255,0.55)",
        fontSize: "13px",
        fontWeight: "600",
        marginTop: "4px",
    },
    statDivider: {
        width: "1px",
        height: "50px",
        background: "rgba(255,255,255,0.1)",
    },

    // SECTIONS
    section: {
        padding: "80px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
    },
    howSection: {
        padding: "80px 20px",
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        zIndex: 1,
    },
    sectionHeader: {
        textAlign: "center",
        marginBottom: "50px",
    },
    sectionBadge: {
        display: "inline-block",
        background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.3))",
        border: "1px solid rgba(168,85,247,0.4)",
        borderRadius: "50px",
        padding: "5px 18px",
        color: "#c4b5fd",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        marginBottom: "14px",
    },
    sectionTitle: {
        color: "#fff",
        fontSize: "clamp(22px, 4vw, 36px)",
        fontWeight: "800",
        margin: "0 0 12px",
    },
    sectionSub: {
        color: "rgba(255,255,255,0.5)",
        fontSize: "16px",
        maxWidth: "500px",
        margin: "0 auto",
    },

    // FEATURE GRID
    featureGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        maxWidth: "1100px",
        margin: "0 auto",
    },
    featureCard: {
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "28px 24px",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
    },
    featureIconBox: {
        width: "56px",
        height: "56px",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "16px",
    },
    featureIcon: {
        fontSize: "28px",
    },
    featureTitle: {
        color: "#fff",
        fontSize: "18px",
        fontWeight: "700",
        margin: "0 0 10px",
    },
    featureDesc: {
        color: "rgba(255,255,255,0.55)",
        fontSize: "14px",
        lineHeight: "1.6",
        margin: 0,
    },
    featureAccent: {
        position: "absolute",
        bottom: 0, left: 0,
        width: "100%",
        height: "3px",
        borderRadius: "0 0 20px 20px",
    },

    // STEPS
    stepsRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "16px",
        maxWidth: "900px",
        margin: "0 auto",
        flexWrap: "wrap",
        position: "relative",
    },
    stepCard: {
        flex: "1 1 220px",
        maxWidth: "260px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "32px 24px",
        textAlign: "center",
        position: "relative",
    },
    stepNumber: {
        fontSize: "11px",
        fontWeight: "800",
        color: "#a78bfa",
        letterSpacing: "2px",
        marginBottom: "12px",
    },
    stepIconBox: {
        fontSize: "40px",
        marginBottom: "14px",
        animation: "float 3s ease-in-out infinite",
    },
    stepTitle: {
        color: "#fff",
        fontSize: "17px",
        fontWeight: "700",
        margin: "0 0 10px",
    },
    stepDesc: {
        color: "rgba(255,255,255,0.5)",
        fontSize: "13px",
        lineHeight: "1.6",
        margin: 0,
    },
    stepArrow: {
        position: "absolute",
        top: "50%",
        right: "-24px",
        transform: "translateY(-50%)",
        color: "rgba(168,85,247,0.5)",
        fontSize: "22px",
        fontWeight: "900",
    },

    // CATEGORIES
    categoryRow: {
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: "900px",
        margin: "0 auto",
    },
    categoryCard: {
        flex: "1 1 160px",
        maxWidth: "200px",
        borderRadius: "20px",
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    },
    categoryIcon: {
        fontSize: "40px",
    },
    categoryLabel: {
        color: "#fff",
        fontWeight: "700",
        fontSize: "15px",
    },

    // TESTIMONIALS
    testimonialsRow: {
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        flexWrap: "wrap",
        maxWidth: "1100px",
        margin: "0 auto",
    },
    testimonialCard: {
        flex: "1 1 280px",
        maxWidth: "340px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "28px 24px",
    },
    testimonialText: {
        color: "rgba(255,255,255,0.75)",
        fontSize: "14px",
        lineHeight: "1.7",
        fontStyle: "italic",
        margin: "0 0 20px",
    },
    testimonialAuthor: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "12px",
    },
    testimonialAvatar: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "800",
        fontSize: "16px",
        flexShrink: 0,
    },
    testimonialName: {
        color: "#fff",
        fontWeight: "700",
        fontSize: "14px",
    },
    testimonialRole: {
        color: "rgba(255,255,255,0.4)",
        fontSize: "12px",
    },
    stars: {
        fontSize: "13px",
    },

    // CTA BANNER
    ctaBanner: {
        padding: "80px 20px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
        background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1), rgba(16,185,129,0.1))",
        borderTop: "1px solid rgba(168,85,247,0.2)",
    },
    ctaInner: {
        maxWidth: "600px",
        margin: "0 auto",
    },
    ctaTitle: {
        color: "#fff",
        fontSize: "clamp(24px, 4vw, 38px)",
        fontWeight: "900",
        margin: "0 0 14px",
    },
    ctaSub: {
        color: "rgba(255,255,255,0.6)",
        fontSize: "16px",
        margin: "0 0 32px",
    },
    ctaBtnRow: {
        display: "flex",
        gap: "14px",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    ctaBtnPrimary: {
        padding: "14px 36px",
        background: "linear-gradient(135deg, #7c3aed, #3b82f6, #10b981)",
        border: "none",
        borderRadius: "50px",
        color: "#fff",
        fontWeight: "700",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 8px 25px rgba(124,58,237,0.4)",
        transition: "all 0.3s ease",
    },
    ctaBtnOutline: {
        padding: "14px 36px",
        background: "transparent",
        border: "2px solid rgba(168,85,247,0.5)",
        borderRadius: "50px",
        color: "#c4b5fd",
        fontWeight: "700",
        fontSize: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
    },
};

export default Home;