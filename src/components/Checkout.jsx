import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Checkout = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const cartItems = state?.cartItems || [];
    const total = state?.total || 0;

    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [message, setMessage] = useState('');

    if (cartItems.length === 0) {
        return (
            <div style={S.page}>
                <div style={S.empty}>
                    <p style={{ fontSize: '40px', marginBottom: '16px' }}>🛒</p>
                    <p style={{ color: '#fff', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
                        Your cart is empty
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
                        Go back and add some items first.
                    </p>
                    <button style={S.btnBack} onClick={() => navigate(-1)}>← Go Back</button>
                </div>
            </div>
        );
    }

    const formatPhone = (raw) => {
        // Convert 07XXXXXXXX → 2547XXXXXXXX
        const cleaned = raw.replace(/\s+/g, '').replace(/^0/, '254');
        return cleaned;
    };

    const handlePay = async () => {
        if (!phone.trim()) {
            setStatus('error');
            setMessage('Please enter your M-Pesa phone number.');
            return;
        }

        const formatted = formatPhone(phone.trim());
        if (!/^2547\d{8}$/.test(formatted)) {
            setStatus('error');
            setMessage('Enter a valid Safaricom number e.g. 0712345678.');
            return;
        }

        setLoading(true);
        setStatus(null);
        setMessage('');

        const formData = new FormData();
        formData.append('phone', formatted);
        formData.append('amount', String(Math.round(total)));

        try {
            const res = await fetch(
                'https://dumabashir.alwaysdata.net/api/mpesa_payment_checkout',
                { method: 'POST', body: formData }
            );
            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setMessage(data.message || '✅ STK Push sent! Check your phone.');
            } else {
                setStatus('error');
                setMessage(data.Error || 'Payment failed. Please try again.');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={S.page}>
            <div style={S.blob1} /><div style={S.blob2} />

            <div style={S.inner}>

                <button style={S.backBtn} onClick={() => navigate(-1)}>← Back</button>

                <h1 style={S.title}>Checkout</h1>
                <p style={S.sub}>Review your order and pay securely with M-Pesa</p>

                {/* ORDER SUMMARY */}
                <div style={S.card}>
                    <p style={S.cardTitle}>Order Summary</p>
                    {cartItems.map((item, i) => (
                        <div key={i} style={S.lineItem}>
                            <div style={S.lineLeft}>
                                <span style={S.itemName}>{item.name}</span>
                                <span style={S.itemQty}>× {item.qty}</span>
                            </div>
                            <span style={S.itemPrice}>
                                KES {(item.price * item.qty).toLocaleString()}
                            </span>
                        </div>
                    ))}
                    <div style={S.divider} />
                    <div style={S.totalRow}>
                        <span style={S.totalLabel}>Total</span>
                        <span style={S.totalAmount}>KES {total.toLocaleString()}</span>
                    </div>
                </div>

                {/* MPESA PAYMENT */}
                <div style={S.card}>
                    <p style={S.cardTitle}>M-Pesa Payment</p>

                    <div style={S.mpesaBadge}>
                        <span style={S.mpesaDot} />
                        <span style={S.mpesaText}>Safaricom M-Pesa · Sandbox</span>
                    </div>

                    <label style={S.label}>M-Pesa Phone Number</label>
                    <div style={S.inputRow}>
                        <span style={S.inputPrefix}>+254</span>
                        <input
                            style={S.input}
                            type="tel"
                            placeholder="712 345 678"
                            value={phone}
                            onChange={e => {
                                setPhone(e.target.value);
                                setStatus(null);
                            }}
                            maxLength={13}
                        />
                    </div>
                    <p style={S.inputHint}>Enter your Safaricom number e.g. 0712345678</p>

                    {/* STATUS MESSAGE */}
                    {status && (
                        <div style={{
                            ...S.statusBox,
                            background: status === 'success'
                                ? 'rgba(16,185,129,0.12)'
                                : 'rgba(239,68,68,0.12)',
                            border: `1px solid ${status === 'success'
                                ? 'rgba(52,211,153,0.3)'
                                : 'rgba(248,113,113,0.3)'}`,
                        }}>
                            <span style={{
                                color: status === 'success' ? '#34d399' : '#f87171',
                                fontSize: '14px',
                            }}>
                                {message}
                            </span>
                        </div>
                    )}

                    {/* PAY BUTTON */}
                    <button
                        style={{ ...S.btnPay, opacity: loading ? 0.7 : 1 }}
                        onClick={handlePay}
                        disabled={loading}
                    >
                        {loading ? (
                            <span style={S.loadingRow}>
                                <span style={S.spinner} /> Sending STK Push...
                            </span>
                        ) : (
                            `📱 Pay KES ${total.toLocaleString()} via M-Pesa`
                        )}
                    </button>

                    {status === 'success' && (
                        <div style={S.successSteps}>
                            <p style={S.stepsTitle}>Next steps:</p>
                            <div style={S.step}><span style={S.stepNum}>1</span> Check your phone for the M-Pesa prompt</div>
                            <div style={S.step}><span style={S.stepNum}>2</span> Enter your M-Pesa PIN to confirm</div>
                            <div style={S.step}><span style={S.stepNum}>3</span> You'll receive an SMS confirmation</div>
                        </div>
                    )}

                    <p style={S.payNote}>
                        🔒 Payments are processed securely via Safaricom M-Pesa
                    </p>
                </div>

            </div>

            <Footer />

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
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
    },
    blob1: {
        position: 'fixed', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
        top: '-150px', left: '-150px', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 0,
    },
    blob2: {
        position: 'fixed', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
        bottom: '-100px', right: '-100px', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 0,
    },
    inner: {
        maxWidth: '560px', margin: '0 auto',
        padding: '48px 24px 80px',
        position: 'relative', zIndex: 1,
    },
    empty: {
        textAlign: 'center', padding: '120px 24px',
        position: 'relative', zIndex: 1,
    },
    backBtn: {
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '10px', color: 'rgba(255,255,255,0.6)',
        fontSize: '13px', padding: '8px 16px',
        cursor: 'pointer', marginBottom: '32px',
    },
    title: {
        fontSize: '32px', fontWeight: '900',
        color: '#fff', margin: '0 0 8px',
    },
    sub: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: '14px', marginBottom: '28px',
    },
    card: {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '20px', padding: '24px',
        marginBottom: '20px',
    },
    cardTitle: {
        fontSize: '11px', fontWeight: '700',
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase', letterSpacing: '2px',
        margin: '0 0 18px',
    },
    lineItem: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', padding: '10px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    lineLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
    itemName: { color: '#fff', fontSize: '14px', fontWeight: '600' },
    itemQty: {
        color: 'rgba(255,255,255,0.35)', fontSize: '11px',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '6px', padding: '2px 8px',
    },
    itemPrice: { color: '#fbbf24', fontSize: '14px', fontWeight: '700' },
    divider: {
        height: '1px',
        background: 'rgba(255,255,255,0.08)',
        margin: '16px 0',
    },
    totalRow: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    },
    totalLabel: { color: '#fff', fontSize: '15px', fontWeight: '700' },
    totalAmount: { color: '#fbbf24', fontSize: '24px', fontWeight: '900' },
    mpesaBadge: {
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: 'rgba(16,185,129,0.1)',
        border: '1px solid rgba(52,211,153,0.25)',
        borderRadius: '50px', padding: '5px 14px',
        marginBottom: '20px',
    },
    mpesaDot: {
        width: '8px', height: '8px', borderRadius: '50%',
        background: '#34d399', display: 'inline-block',
    },
    mpesaText: { color: '#34d399', fontSize: '12px', fontWeight: '700' },
    label: {
        display: 'block',
        color: 'rgba(255,255,255,0.5)',
        fontSize: '12px', fontWeight: '600',
        textTransform: 'uppercase', letterSpacing: '1px',
        marginBottom: '8px',
    },
    inputRow: {
        display: 'flex', alignItems: 'center',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '12px', overflow: 'hidden',
    },
    inputPrefix: {
        padding: '12px 14px',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '14px', fontWeight: '600',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        whiteSpace: 'nowrap',
    },
    input: {
        flex: 1, padding: '12px 14px',
        background: 'transparent',
        border: 'none', outline: 'none',
        color: '#fff', fontSize: '15px',
    },
    inputHint: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: '12px', margin: '7px 0 0',
    },
    statusBox: {
        borderRadius: '12px', padding: '12px 16px',
        margin: '16px 0',
    },
    btnPay: {
        width: '100%', padding: '15px',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        border: 'none', borderRadius: '14px',
        color: '#fff', fontWeight: '800',
        fontSize: '16px', cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(124,58,237,0.4)',
        marginTop: '18px', marginBottom: '16px',
        transition: 'opacity 0.2s',
    },
    loadingRow: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '10px',
    },
    spinner: {
        display: 'inline-block',
        width: '16px', height: '16px',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTop: '2px solid #fff',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
    successSteps: {
        background: 'rgba(16,185,129,0.08)',
        border: '1px solid rgba(52,211,153,0.2)',
        borderRadius: '12px', padding: '16px',
        marginBottom: '16px',
    },
    stepsTitle: {
        color: '#34d399', fontSize: '13px',
        fontWeight: '700', margin: '0 0 12px',
    },
    step: {
        display: 'flex', alignItems: 'center', gap: '10px',
        color: 'rgba(255,255,255,0.65)',
        fontSize: '13px', marginBottom: '8px',
    },
    stepNum: {
        width: '22px', height: '22px',
        background: 'rgba(52,211,153,0.2)',
        border: '1px solid rgba(52,211,153,0.3)',
        borderRadius: '50%', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        color: '#34d399', fontSize: '11px',
        fontWeight: '700', flexShrink: 0,
    },
    payNote: {
        color: 'rgba(255,255,255,0.25)',
        fontSize: '12px', textAlign: 'center', margin: 0,
    },
    btnBack: {
        padding: '12px 28px',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        border: 'none', borderRadius: '50px',
        color: '#fff', fontWeight: '700',
        fontSize: '14px', cursor: 'pointer',
    },
};

export default Checkout;