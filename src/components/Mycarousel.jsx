import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    tag: "Talent Discovery",
    title: "Unlock Your Hidden Talent",
    desc: "Join Kenya's largest platform connecting students with world-class programs in music, drama, art, and sports.",
    btn: "Browse Programs",
    route: "/apply",
    color1: "#7c3aed",
    color2: "#3b82f6",
  },
  {
    tag: "Top Schools",
    title: "Connect with Leading Schools",
    desc: "50+ schools across Kenya are actively looking for talented students just like you. Your future starts here.",
    btn: "Find Instruments",
    route: "/instruments",
    color1: "#ec4899",
    color2: "#f59e0b",
  },
  {
    tag: "M-Pesa Payments",
    title: "Shop Smart, Pay Instantly",
    desc: "Uniforms, instruments, and more — pay securely with M-Pesa STK push in seconds from anywhere in Kenya.",
    btn: "Shop Now",
    route: "/clothes",
    color1: "#10b981",
    color2: "#06b6d4",
  },
];

const Mycarousel = ({ onNavigate }) => {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const goTo = (n) => {
    setCurrent(((n % slides.length) + slides.length) % slides.length);
    setProgress(0);
    clearInterval(timerRef.current);
    clearInterval(progressRef.current);
    startAuto();
  };

  const startAuto = () => {
    setProgress(0);
    timerRef.current = setTimeout(() => {
      setCurrent(c => (c + 1) % slides.length);
      setProgress(0);
    }, 5000);
    let p = 0;
    progressRef.current = setInterval(() => {
      p += 100 / (5000 / 50);
      if (p >= 100) { clearInterval(progressRef.current); p = 100; }
      setProgress(p);
    }, 50);
  };

  useEffect(() => {
    startAuto();
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, [current]);

  const s = slides[current];

  return (
    <div style={styles.root}>

      {/* Background blobs */}
      <div style={{
        ...styles.blob,
        background: `radial-gradient(circle, ${s.color1}33 0%, transparent 70%)`,
        top: '-120px', right: '-120px',
        transition: 'background 0.8s ease',
      }} />
      <div style={{
        ...styles.blob,
        width: '350px', height: '350px',
        background: `radial-gradient(circle, ${s.color2}22 0%, transparent 70%)`,
        bottom: '-100px', left: '-100px',
        transition: 'background 0.8s ease',
      }} />

      {/* Overlay */}
      <div style={styles.overlay} />

      {/* Content */}
      <div style={styles.content} key={current}>
        <span style={{ ...styles.tag, borderColor: `${s.color1}80`, background: `${s.color1}22`, color: '#c4b5fd' }}>
          {s.tag}
        </span>
        <h2 style={styles.title} dangerouslySetInnerHTML={{ __html: s.title.replace('\n', '<br/>') }} />
        <p style={styles.desc}>{s.desc}</p>
        <button
          style={{ ...styles.btn, background: `linear-gradient(135deg, ${s.color1}, ${s.color2})`, boxShadow: `0 8px 25px ${s.color1}44` }}
          onClick={() => onNavigate && onNavigate(s.route)}
        >
          {s.btn} →
        </button>
      </div>

      {/* Arrows */}
      <button style={{ ...styles.arrow, left: '20px' }} onClick={() => goTo(current - 1)}>&#8592;</button>
      <button style={{ ...styles.arrow, right: '20px' }} onClick={() => goTo(current + 1)}>&#8594;</button>

      {/* Dots */}
      <div style={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              ...styles.dot,
              width: i === current ? '28px' : '8px',
              background: i === current ? '#a78bfa' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>

      {/* Slide count badge */}
      <div style={styles.count}>{current + 1} / {slides.length}</div>

      {/* Progress bar */}
      <div style={{ ...styles.progressTrack }}>
        <div style={{
          ...styles.progressBar,
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${s.color1}, ${s.color2})`,
        }} />
      </div>
    </div>
  );
};

const styles = {
  root: {
    position: 'relative',
    width: '100%',
    height: '520px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #0f0520 0%, #0d1b4b 50%, #0a2a1a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blob: {
    position: 'absolute',
    width: '450px',
    height: '450px',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(10,5,25,0.7) 0%, transparent 60%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '0 40px',
    maxWidth: '680px',
    animation: 'fadeUp 0.6s ease forwards',
  },
  tag: {
    display: 'inline-block',
    border: '1px solid',
    borderRadius: '50px',
    padding: '5px 16px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '18px',
  },
  title: {
    fontSize: 'clamp(26px, 4vw, 50px)',
    fontWeight: '900',
    color: '#fff',
    lineHeight: '1.15',
    margin: '0 0 16px',
    textShadow: '0 2px 20px rgba(0,0,0,0.5)',
  },
  desc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '16px',
    lineHeight: '1.65',
    margin: '0 0 30px',
    maxWidth: '520px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btn: {
    padding: '13px 32px',
    border: 'none',
    borderRadius: '50px',
    color: '#fff',
    fontWeight: '700',
    fontSize: '15px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: '44px',
    height: '44px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '50%',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.2s',
  },
  dots: {
    position: 'absolute',
    bottom: '28px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    zIndex: 10,
  },
  dot: {
    height: '8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: 0,
  },
  count: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: 10,
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '50px',
    padding: '5px 14px',
    color: 'rgba(255,255,255,0.7)',
    fontSize: '12px',
    fontWeight: '700',
    backdropFilter: 'blur(10px)',
  },
  progressTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'rgba(255,255,255,0.08)',
    zIndex: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: '0 3px 3px 0',
    transition: 'width 0.05s linear',
  },
};

export default Mycarousel;