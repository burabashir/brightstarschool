import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const total = state?.total || 0;
    const phone = state?.phone || '';
    const from = state?.from || '/'; // e.g. '/clothes' or '/instruments'

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animation after mount
        const t = setTimeout(() => setVisible(true), 60);
        return () => clearTimeout(t);
    }, []);

    return (
        <div style={S.page}>
            <div style={S.blob1} />
            <div style={S.blob2} />
            <div style={S.blob3} />

            <div style={{ ...S.inner, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.55s ease, transform 0.55s ease' }}>

                {/* ── Icon ── */}
                <div style={S.iconWrap}>
                    <div style={S.iconRing} />
                    <span style={S.iconEmoji}>📱</span>
                </div>

                {/* ── Heading ── */}
                <h1 style={S.title}>Check Your Phone</h1>
                <p style={S.sub}>
                    An M-Pesa STK Push has been sent to{' '}
                    <span style={S.phoneChip}>{phone || 'your number'}</span>
                </p>

                {/* ── Amount pill ── */}
                <div style={S.amountPill}>
                    <span style={S.amountLabel}>Amount due</span>
                    <span style={S.amountValue}>KES {total.toLocaleString()}</span>
                </div>

                {/* ── Steps ── */}
                <div style={S.stepsCard}>
                    <p style={S.stepsHeading}>Complete your payment in 3 steps</p>

                    {[
                        { num: '1', icon: '🔔', title: 'Check your phone', desc: 'An M-Pesa prompt has been sent to your Safaricom number.' },
                        { num: '2', icon: '🔐', title: 'Enter your M-Pesa PIN', desc: 'Approve the transaction by typing your 4-digit PIN.' },
                        { num: '3', icon: '✅', title: 'Confirmation SMS', desc: "You'll receive an SMS from M-Pesa confirming the payment." },
                    ].map((s, i) => (
                        <div key={i} style={{ ...S.step, animationDelay: `${0.15 + i * 0.12}s` }}>
                            <div style={S.stepLeft}>
                                <div style={S.stepNumBox}>{s.num}</div>
                                {i < 2 && <div style={S.stepLine} />}
                            </div>
                            <div style={S.stepBody}>
                                <p style={S.stepTitle}>{s.icon} {s.title}</p>
                                <p style={S.stepDesc}>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Notice ── */}
                <div style={S.notice}>
                    <span style={S.noticeDot} />
                    <p style={S.noticeText}>
                        The STK Push expires in <strong style={{ color: '#fbbf24' }}>60 seconds</strong>.
                        If it disappears, go back and try again.
                    </p>
                </div>

                {/* ── Actions ── */}
                <div style={S.actions}>
                    <button style={S.btnHome} onClick={() => navigate(from)}>
                        ← Continue Shopping
                    </button>
                    <button style={S.btnRetry} onClick={() => navigate(-1)}>
                        Retry Payment
                    </button>
                </div>

                <p style={S.footnote}>🔒 Secured by Safaricom M-Pesa</p>
            </div>

            <style>{`
                @keyframes pulseRing {
                    0%   { transform: scale(1);   opacity: 0.6; }
                    50%  { transform: scale(1.18); opacity: 0.2; }
                    100% { transform: scale(1);   opacity: 0.6; }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

const S = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0520 0%, #0d1b4b 50%, #0a2a1a 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Segoe UI', sans-serif",
    },
    blob1: {
        position: 'fixed', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)',
        top: '-160px', left: '-160px', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 0,
    },
    blob2: {
        position: 'fixed', width: '420px', height: '420px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
        bottom: '-110px', right: '-110px', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 0,
    },
    blob3: {
        position: 'fixed', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)',
        top: '40%', right: '10%', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 0,
    },
    inner: {
        maxWidth: '520px', margin: '0 auto',
        padding: '60px 24px 80px',
        position: 'relative', zIndex: 1,
        textAlign: 'center',
    },

    // Icon
    iconWrap: {
        position: 'relative', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center',
        marginBottom: '28px',
    },
    iconRing: {
        position: 'absolute',
        width: '96px', height: '96px',
        borderRadius: '50%',
        border: '2px solid rgba(52,211,153,0.4)',
        animation: 'pulseRing 2.2s ease-in-out infinite',
    },
    iconEmoji: {
        fontSize: '52px',
        lineHeight: 1,
        filter: 'drop-shadow(0 0 18px rgba(52,211,153,0.35))',
    },

    // Text
    title: {
        fontSize: '34px', fontWeight: '900',
        color: '#fff', margin: '0 0 10px',
        letterSpacing: '-0.5px',
    },
    sub: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: '15px', marginBottom: '24px',
        lineHeight: 1.6,
    },
    phoneChip: {
        background: 'rgba(52,211,153,0.15)',
        border: '1px solid rgba(52,211,153,0.3)',
        borderRadius: '50px', padding: '2px 12px',
        color: '#34d399', fontSize: '14px',
        fontWeight: '700', whiteSpace: 'nowrap',
    },

    // Amount pill
    amountPill: {
        display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
        background: 'rgba(251,191,36,0.09)',
        border: '1px solid rgba(251,191,36,0.25)',
        borderRadius: '16px', padding: '14px 32px',
        marginBottom: '28px',
    },
    amountLabel: {
        color: 'rgba(255,255,255,0.35)',
        fontSize: '11px', fontWeight: '700',
        textTransform: 'uppercase', letterSpacing: '2px',
        marginBottom: '4px',
    },
    amountValue: {
        color: '#fbbf24', fontSize: '26px', fontWeight: '900',
    },

    // Steps card
    stepsCard: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '22px', padding: '24px',
        marginBottom: '20px',
        textAlign: 'left',
    },
    stepsHeading: {
        fontSize: '11px', fontWeight: '700',
        color: 'rgba(255,255,255,0.35)',
        textTransform: 'uppercase', letterSpacing: '2px',
        margin: '0 0 20px',
    },
    step: {
        display: 'flex', gap: '14px',
        animation: 'fadeUp 0.45s ease both',
    },
    stepLeft: {
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', flexShrink: 0,
        width: '28px',
    },
    stepNumBox: {
        width: '28px', height: '28px',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(52,211,153,0.4))',
        border: '1px solid rgba(52,211,153,0.3)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: '12px', fontWeight: '800',
        flexShrink: 0,
    },
    stepLine: {
        width: '1px', flex: 1, minHeight: '20px',
        background: 'rgba(255,255,255,0.1)',
        margin: '4px 0',
    },
    stepBody: { paddingBottom: '20px' },
    stepTitle: {
        color: '#fff', fontSize: '14px',
        fontWeight: '700', margin: '4px 0 4px',
    },
    stepDesc: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: '13px', lineHeight: 1.5, margin: 0,
    },

    // Notice
    notice: {
        display: 'flex', alignItems: 'flex-start', gap: '10px',
        background: 'rgba(251,191,36,0.08)',
        border: '1px solid rgba(251,191,36,0.2)',
        borderRadius: '14px', padding: '14px 16px',
        marginBottom: '24px', textAlign: 'left',
    },
    noticeDot: {
        width: '8px', height: '8px', borderRadius: '50%',
        background: '#fbbf24', flexShrink: 0, marginTop: '4px',
    },
    noticeText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: '13px', lineHeight: 1.5, margin: 0,
    },

    // Actions
    actions: {
        display: 'flex', gap: '12px',
        justifyContent: 'center', marginBottom: '20px',
        flexWrap: 'wrap',
    },
    btnHome: {
        padding: '13px 26px',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        border: 'none', borderRadius: '50px',
        color: '#fff', fontWeight: '800',
        fontSize: '14px', cursor: 'pointer',
        boxShadow: '0 6px 20px rgba(124,58,237,0.35)',
    },
    btnRetry: {
        padding: '13px 26px',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '50px',
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '700', fontSize: '14px',
        cursor: 'pointer',
    },

    footnote: {
        color: 'rgba(255,255,255,0.2)',
        fontSize: '12px', margin: 0,
    },
};

export default PaymentSuccess;