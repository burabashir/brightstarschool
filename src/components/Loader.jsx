import React from "react";

const Loader = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.container}>

        {/* Spinning Ring */}
        <div style={styles.ring}>
          <div style={styles.ringInner}></div>
        </div>

        {/* Bouncing Dots */}
        <div style={styles.dotsContainer}>
          <div style={{ ...styles.dot, animationDelay: "0s" }}></div>
          <div style={{ ...styles.dot, animationDelay: "0.2s" }}></div>
          <div style={{ ...styles.dot, animationDelay: "0.4s" }}></div>
        </div>

        <p style={styles.text}>Loading...</p>

      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-15px); opacity: 1; }
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "40px 0",
    animation: "fadeIn 0.3s ease-in",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  ring: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    border: "6px solid rgba(255, 193, 7, 0.2)",
    borderTop: "6px solid #ffc107",
    animation: "spin 0.9s linear infinite",
  },
  dotsContainer: {
    display: "flex",
    gap: "10px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#ffc107",
    animation: "bounce 0.6s ease-in-out infinite",
  },
  text: {
    color: "#ffc107",
    fontSize: "16px",
    fontWeight: "bold",
    letterSpacing: "2px",
    margin: 0,
  },
};

export default Loader;