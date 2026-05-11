import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Apply = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [hoveredId, setHoveredId] = useState(null);
    const [cart, setCart] = useState({});           // { product_id: qty }
    const [cartOpen, setCartOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    // Checkout form state
    const [phone, setPhone] = useState('');
    const [payLoading, setPayLoading] = useState(false);
    const [payError, setPayError] = useState('');

    const navigate = useNavigate();
    const IMG_URL = 'https://dumabashir.alwaysdata.net/static/images/';

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('https://dumabashir.alwaysdata.net/api/get_products_details');
            setProducts(res.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    // ── Cart helpers ──────────────────────────────────────────────
    const addToCart = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const removeOne = (id) => setCart(c => {
        if (!c[id]) return c;
        const next = { ...c, [id]: c[id] - 1 };
        if (next[id] === 0) delete next[id];
        return next;
    });
    const clearCart = () => setCart({});

    const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
    const cartItems = products
        .filter(p => cart[p.product_id])
        .map(p => ({
            id:    p.product_id,
            name:  p.product_name,
            price: Number(p.product_cost),
            qty:   cart[p.product_id],
            photo: p.product_photo,
        }));
    const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

    // ── Payment ───────────────────────────────────────────────────
    const formatPhone = (raw) => raw.replace(/\s+/g, '').replace(/^0/, '254');

    const handlePay = async () => {
        if (!phone.trim()) { setPayError('Please enter your M-Pesa phone number.'); return; }
        const formatted = formatPhone(phone.trim());
        if (!/^2547\d{8}$/.test(formatted)) { setPayError('Enter a valid Safaricom number e.g. 0712345678.'); return; }

        setPayLoading(true);
        setPayError('');

        const formData = new FormData();
        formData.append('phone', formatted);
        formData.append('amount', String(Math.round(cartTotal)));

        try {
            const res  = await fetch('https://dumabashir.alwaysdata.net/api/mpesa_payment_checkout', { method: 'POST', body: formData });
            const data = await res.json();

            if (data.success) {
                clearCart();
                setCheckoutOpen(false);
                setCartOpen(false);
                navigate('/payment-success', {
                    state: { total: cartTotal, phone: phone.trim(), from: '/apply' },
                });
            } else {
                setPayError(data.Error || 'Payment failed. Please try again.');
            }
        } catch {
            setPayError('Network error. Please check your connection.');
        } finally {
            setPayLoading(false);
        }
    };

    // ── Render ────────────────────────────────────────────────────
    return (
        <div style={S.page}>
            {/* Ambient blobs */}
            <div style={S.blob1} />
            <div style={S.blob2} />
            <div style={S.blob3} />

            {/* ── Floating cart button ── */}
            {cartCount > 0 && (
                <button style={S.cartFab} onClick={() => { setCartOpen(true); setCheckoutOpen(false); }}>
                    🛒
                    <span style={S.cartBadge}>{cartCount}</span>
                </button>
            )}

            {/* ══ CART DRAWER ══════════════════════════════════════════ */}
            {cartOpen && (
                <>
                    <div style={S.backdrop} onClick={() => { setCartOpen(false); setCheckoutOpen(false); }} />
                    <div style={S.drawer}>
                        <div style={S.drawerHeader}>
                            <span style={S.drawerTitle}>🛒 Your Cart</span>
                            <button style={S.drawerClose} onClick={() => { setCartOpen(false); setCheckoutOpen(false); }}>✕</button>
                        </div>

                        {!checkoutOpen ? (
                            <>
                                {cartItems.length === 0 ? (
                                    <div style={S.emptyCart}>
                                        <p style={{ fontSize: '36px' }}>🛒</p>
                                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Your cart is empty</p>
                                    </div>
                                ) : (
                                    <>
                                        <div style={S.cartList}>
                                            {cartItems.map(item => (
                                                <div key={item.id} style={S.cartRow}>
                                                    <img src={IMG_URL + item.photo} alt={item.name} style={S.cartThumb} />
                                                    <div style={S.cartInfo}>
                                                        <p style={S.cartName}>{item.name}</p>
                                                        <p style={S.cartPrice}>KES {(item.price * item.qty).toLocaleString()}</p>
                                                    </div>
                                                    <div style={S.qtyRow}>
                                                        <button style={S.qtyBtn} onClick={() => removeOne(item.id)}>−</button>
                                                        <span style={S.qtyNum}>{item.qty}</span>
                                                        <button style={S.qtyBtn} onClick={() => addToCart(item.id)}>+</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={S.cartFooter}>
                                            <div style={S.cartTotalRow}>
                                                <span style={S.cartTotalLabel}>Total</span>
                                                <span style={S.cartTotalAmt}>KES {cartTotal.toLocaleString()}</span>
                                            </div>
                                            <button style={S.btnCheckout} onClick={() => setCheckoutOpen(true)}>
                                                Proceed to Checkout →
                                            </button>
                                            <button style={S.btnClear} onClick={clearCart}>Clear Cart</button>
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            /* ── Inline checkout panel ── */
                            <div style={S.checkoutPanel}>
                                <button style={S.backLink} onClick={() => setCheckoutOpen(false)}>← Back to cart</button>

                                {/* Order summary */}
                                <p style={S.panelSection}>Order Summary</p>
                                {cartItems.map(item => (
                                    <div key={item.id} style={S.summaryRow}>
                                        <span style={S.summaryName}>
                                            {item.name} <span style={S.summaryQty}>× {item.qty}</span>
                                        </span>
                                        <span style={S.summaryPrice}>KES {(item.price * item.qty).toLocaleString()}</span>
                                    </div>
                                ))}
                                <div style={S.summaryDivider} />
                                <div style={S.summaryTotal}>
                                    <span style={{ color: '#fff', fontWeight: '700' }}>Total</span>
                                    <span style={{ color: '#fbbf24', fontWeight: '900', fontSize: '20px' }}>KES {cartTotal.toLocaleString()}</span>
                                </div>

                                {/* M-Pesa input */}
                                <p style={{ ...S.panelSection, marginTop: '20px' }}>M-Pesa Payment</p>

                                <div style={S.mpesaBadge}>
                                    <span style={S.mpesaDot} />
                                    <span style={S.mpesaText}>Safaricom M-Pesa · Sandbox</span>
                                </div>

                                <label style={S.inputLabel}>Phone Number</label>
                                <div style={S.inputRow}>
                                    <span style={S.inputPrefix}>+254</span>
                                    <input
                                        style={S.input}
                                        type="tel"
                                        placeholder="712 345 678"
                                        value={phone}
                                        maxLength={13}
                                        onChange={e => { setPhone(e.target.value); setPayError(''); }}
                                    />
                                </div>
                                <p style={S.inputHint}>Enter your Safaricom number e.g. 0712345678</p>

                                {payError && (
                                    <div style={S.errorBox}>
                                        <span style={{ color: '#f87171', fontSize: '13px' }}>{payError}</span>
                                    </div>
                                )}

                                <button
                                    style={{ ...S.btnPay, opacity: payLoading ? 0.7 : 1 }}
                                    onClick={handlePay}
                                    disabled={payLoading}
                                >
                                    {payLoading
                                        ? <span style={S.loadingRow}><span style={S.spinner} /> Sending STK Push…</span>
                                        : `📱 Pay KES ${cartTotal.toLocaleString()} via M-Pesa`}
                                </button>

                                <p style={S.payNote}>🔒 Secured by Safaricom M-Pesa</p>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* ══ MAIN CONTENT ══════════════════════════════════════════ */}
            <div style={S.inner}>

                {/* Header */}
                <div style={S.header}>
                    <div style={S.badge}>
                        <span style={S.badgeDot} />
                        <span style={S.badgeText}>Programs</span>
                    </div>
                    <h1 style={S.title}>Browse Programs</h1>
                    <p style={S.subtitle}>
                        Choose a program below and make your payment to secure your spot.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div style={S.stateWrap}>
                        <div style={S.spinnerRing} />
                        <p style={S.stateText}>Loading programs…</p>
                    </div>
                )}

                {/* Error */}
                {error && !loading && (
                    <div style={S.errorBanner}>
                        <span>⚠️</span>
                        <span style={{ color: '#f87171', fontSize: '14px' }}>{error}</span>
                    </div>
                )}

                {/* Grid */}
                {!loading && !error && (
                    <div style={S.grid}>
                        {products.map((product, idx) => {
                            const isHovered = hoveredId === product.product_id;
                            const qty = cart[product.product_id] || 0;
                            return (
                                <div
                                    key={product.product_id}
                                    style={{
                                        ...S.card,
                                        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                                        boxShadow: isHovered
                                            ? '0 24px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(251,191,36,0.2)'
                                            : '0 8px 30px rgba(0,0,0,0.35)',
                                        animationDelay: `${idx * 0.07}s`,
                                    }}
                                    onMouseEnter={() => setHoveredId(product.product_id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Image */}
                                    <div style={S.imgWrap}>
                                        <img
                                            src={IMG_URL + product.product_photo}
                                            alt={product.product_name}
                                            style={{ ...S.img, transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
                                        />
                                        <div style={S.imgOverlay} />
                                        <div style={S.costBadge}>
                                            KES {Number(product.product_cost).toLocaleString()}
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div style={S.body}>
                                        <h3 style={S.productName}>{product.product_name}</h3>
                                        <p style={S.productDesc}>
                                            {product.product_description.slice(0, 90)}…
                                        </p>

                                        {/* Add / qty controls */}
                                        {qty === 0 ? (
                                            <button
                                                style={{
                                                    ...S.btnAdd,
                                                    background: isHovered
                                                        ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                                                        : 'rgba(251,191,36,0.1)',
                                                    color: isHovered ? '#0f0520' : '#fbbf24',
                                                    border: isHovered
                                                        ? '1px solid transparent'
                                                        : '1px solid rgba(251,191,36,0.35)',
                                                }}
                                                onClick={() => { addToCart(product.product_id); setCartOpen(true); }}
                                            >
                                                + Add to Cart
                                            </button>
                                        ) : (
                                            <div style={S.inlineQty}>
                                                <button style={S.inlineQtyBtn} onClick={() => removeOne(product.product_id)}>−</button>
                                                <span style={S.inlineQtyNum}>{qty}</span>
                                                <button style={S.inlineQtyBtn} onClick={() => addToCart(product.product_id)}>+</button>
                                                <button style={S.viewCartBtn} onClick={() => setCartOpen(true)}>View Cart</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && products.length === 0 && (
                    <div style={S.stateWrap}>
                        <p style={{ fontSize: '40px', marginBottom: '12px' }}>📭</p>
                        <p style={S.stateText}>No programs available right now.</p>
                    </div>
                )}

            </div>

            <Footer />

            <style>{`
                @keyframes spin    { to { transform: rotate(360deg); } }
                @keyframes fadeUp  { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
                @keyframes slideIn { from { transform:translateX(100%); } to { transform:translateX(0); } }
            `}</style>
        </div>
    );
};

/* ── Styles ─────────────────────────────────────────────────────── */
const S = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0520 0%, #0d1b4b 50%, #0a2a1a 100%)',
        position: 'relative', overflow: 'hidden',
        fontFamily: "'Segoe UI', sans-serif",
    },
    blob1: { position:'fixed', width:'600px', height:'600px', background:'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', top:'-200px', left:'-200px', borderRadius:'50%', pointerEvents:'none', zIndex:0 },
    blob2: { position:'fixed', width:'450px', height:'450px', background:'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', bottom:'-120px', right:'-120px', borderRadius:'50%', pointerEvents:'none', zIndex:0 },
    blob3: { position:'fixed', width:'320px', height:'320px', background:'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)', top:'40%', right:'5%', borderRadius:'50%', pointerEvents:'none', zIndex:0 },

    /* FAB */
    cartFab: {
        position:'fixed', bottom:'32px', right:'28px', zIndex:200,
        width:'58px', height:'58px', borderRadius:'50%',
        background:'linear-gradient(135deg, #7c3aed, #3b82f6)',
        border:'none', fontSize:'22px', cursor:'pointer',
        boxShadow:'0 8px 28px rgba(124,58,237,0.5)',
        display:'flex', alignItems:'center', justifyContent:'center',
    },
    cartBadge: {
        position:'absolute', top:'-4px', right:'-4px',
        background:'#fbbf24', color:'#0f0520',
        borderRadius:'50%', width:'20px', height:'20px',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'11px', fontWeight:'900',
    },

    /* Drawer */
    backdrop: { position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', zIndex:300, backdropFilter:'blur(3px)' },
    drawer: {
        position:'fixed', top:0, right:0, bottom:0,
        width:'min(420px, 100vw)', zIndex:400,
        background:'linear-gradient(160deg, #12062a 0%, #0d1b4b 100%)',
        borderLeft:'1px solid rgba(255,255,255,0.08)',
        display:'flex', flexDirection:'column',
        animation:'slideIn 0.3s ease',
        boxShadow:'-12px 0 50px rgba(0,0,0,0.5)',
    },
    drawerHeader: {
        display:'flex', justifyContent:'space-between', alignItems:'center',
        padding:'20px 24px', borderBottom:'1px solid rgba(255,255,255,0.07)',
    },
    drawerTitle: { color:'#fff', fontWeight:'800', fontSize:'17px' },
    drawerClose: { background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', color:'rgba(255,255,255,0.5)', width:'32px', height:'32px', cursor:'pointer', fontSize:'14px' },

    emptyCart: { flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'8px' },

    cartList: { flex:1, overflowY:'auto', padding:'16px 24px' },
    cartRow: { display:'flex', alignItems:'center', gap:'12px', padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.06)' },
    cartThumb: { width:'52px', height:'52px', objectFit:'cover', borderRadius:'10px', flexShrink:0 },
    cartInfo: { flex:1, minWidth:0 },
    cartName: { color:'#fff', fontSize:'13px', fontWeight:'700', margin:'0 0 3px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' },
    cartPrice: { color:'#fbbf24', fontSize:'13px', fontWeight:'800', margin:0 },
    qtyRow: { display:'flex', alignItems:'center', gap:'6px' },
    qtyBtn: { width:'26px', height:'26px', borderRadius:'6px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', cursor:'pointer', fontSize:'14px', display:'flex', alignItems:'center', justifyContent:'center' },
    qtyNum: { color:'#fff', fontWeight:'700', fontSize:'13px', minWidth:'18px', textAlign:'center' },

    cartFooter: { padding:'16px 24px 28px', borderTop:'1px solid rgba(255,255,255,0.07)' },
    cartTotalRow: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' },
    cartTotalLabel: { color:'rgba(255,255,255,0.5)', fontSize:'13px', fontWeight:'600' },
    cartTotalAmt: { color:'#fbbf24', fontSize:'22px', fontWeight:'900' },
    btnCheckout: { width:'100%', padding:'13px', background:'linear-gradient(135deg, #7c3aed, #3b82f6)', border:'none', borderRadius:'12px', color:'#fff', fontWeight:'800', fontSize:'14px', cursor:'pointer', marginBottom:'8px', boxShadow:'0 6px 20px rgba(124,58,237,0.35)' },
    btnClear: { width:'100%', padding:'10px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:'12px', color:'#f87171', fontWeight:'700', fontSize:'13px', cursor:'pointer' },

    /* Checkout panel */
    checkoutPanel: { flex:1, overflowY:'auto', padding:'16px 24px 28px' },
    backLink: { background:'none', border:'none', color:'rgba(255,255,255,0.45)', fontSize:'13px', cursor:'pointer', padding:0, marginBottom:'18px', display:'block' },
    panelSection: { fontSize:'10px', fontWeight:'700', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'2px', margin:'0 0 12px' },
    summaryRow: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(255,255,255,0.05)' },
    summaryName: { color:'#fff', fontSize:'13px', fontWeight:'600' },
    summaryQty: { color:'rgba(255,255,255,0.35)', fontSize:'11px' },
    summaryPrice: { color:'#fbbf24', fontSize:'13px', fontWeight:'700' },
    summaryDivider: { height:'1px', background:'rgba(255,255,255,0.07)', margin:'12px 0' },
    summaryTotal: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'4px' },

    mpesaBadge: { display:'inline-flex', alignItems:'center', gap:'7px', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(52,211,153,0.25)', borderRadius:'50px', padding:'4px 12px', marginBottom:'14px' },
    mpesaDot: { width:'7px', height:'7px', borderRadius:'50%', background:'#34d399', display:'inline-block' },
    mpesaText: { color:'#34d399', fontSize:'11px', fontWeight:'700' },

    inputLabel: { display:'block', color:'rgba(255,255,255,0.45)', fontSize:'11px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'7px' },
    inputRow: { display:'flex', alignItems:'center', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'10px', overflow:'hidden' },
    inputPrefix: { padding:'11px 12px', color:'rgba(255,255,255,0.4)', fontSize:'13px', fontWeight:'600', borderRight:'1px solid rgba(255,255,255,0.08)', whiteSpace:'nowrap' },
    input: { flex:1, padding:'11px 12px', background:'transparent', border:'none', outline:'none', color:'#fff', fontSize:'14px' },
    inputHint: { color:'rgba(255,255,255,0.3)', fontSize:'11px', margin:'5px 0 0' },

    errorBox: { background:'rgba(239,68,68,0.1)', border:'1px solid rgba(248,113,113,0.25)', borderRadius:'10px', padding:'10px 14px', margin:'12px 0' },
    errorBanner: { display:'flex', alignItems:'center', gap:'10px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(248,113,113,0.25)', borderRadius:'14px', padding:'16px 20px', maxWidth:'480px', margin:'0 auto 32px' },

    btnPay: { width:'100%', padding:'13px', background:'linear-gradient(135deg, #7c3aed, #3b82f6)', border:'none', borderRadius:'12px', color:'#fff', fontWeight:'800', fontSize:'14px', cursor:'pointer', marginTop:'14px', marginBottom:'10px', boxShadow:'0 6px 20px rgba(124,58,237,0.35)', transition:'opacity 0.2s' },
    loadingRow: { display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' },
    spinner: { display:'inline-block', width:'14px', height:'14px', border:'2px solid rgba(255,255,255,0.3)', borderTop:'2px solid #fff', borderRadius:'50%', animation:'spin 0.8s linear infinite' },
    payNote: { color:'rgba(255,255,255,0.2)', fontSize:'11px', textAlign:'center', margin:0 },

    /* Main */
    inner: { maxWidth:'1200px', margin:'0 auto', padding:'60px 24px 80px', position:'relative', zIndex:1 },

    header: { textAlign:'center', marginBottom:'48px' },
    badge: { display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(251,191,36,0.1)', border:'1px solid rgba(251,191,36,0.25)', borderRadius:'50px', padding:'5px 16px', marginBottom:'16px' },
    badgeDot: { width:'7px', height:'7px', borderRadius:'50%', background:'#fbbf24', display:'inline-block' },
    badgeText: { color:'#fbbf24', fontSize:'12px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'1.5px' },
    title: { fontSize:'clamp(28px, 5vw, 44px)', fontWeight:'900', color:'#fff', margin:'0 0 12px', letterSpacing:'-0.5px' },
    subtitle: { color:'rgba(255,255,255,0.4)', fontSize:'15px', maxWidth:'480px', margin:'0 auto', lineHeight:1.6 },

    stateWrap: { textAlign:'center', padding:'80px 24px' },
    stateText: { color:'rgba(255,255,255,0.4)', fontSize:'16px', marginTop:'16px' },
    spinnerRing: { display:'inline-block', width:'42px', height:'42px', border:'3px solid rgba(255,255,255,0.1)', borderTop:'3px solid #fbbf24', borderRadius:'50%', animation:'spin 0.85s linear infinite' },

    grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'24px' },

    card: { background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:'22px', overflow:'hidden', display:'flex', flexDirection:'column', transition:'transform 0.3s ease, box-shadow 0.3s ease', animation:'fadeUp 0.5s ease both', cursor:'default' },

    imgWrap: { position:'relative', height:'200px', overflow:'hidden', flexShrink:0 },
    img: { width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.45s ease', display:'block' },
    imgOverlay: { position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,5,25,0.75) 0%, transparent 55%)' },
    costBadge: { position:'absolute', top:'12px', right:'12px', background:'rgba(15,5,32,0.75)', backdropFilter:'blur(8px)', border:'1px solid rgba(251,191,36,0.35)', borderRadius:'50px', padding:'4px 12px', color:'#fbbf24', fontSize:'12px', fontWeight:'800' },

    body: { padding:'20px', display:'flex', flexDirection:'column', flex:1 },
    productName: { color:'#fff', fontSize:'16px', fontWeight:'800', margin:'0 0 8px', lineHeight:1.3 },
    productDesc: { color:'rgba(255,255,255,0.45)', fontSize:'13px', lineHeight:1.6, flex:1, margin:'0 0 18px' },

    btnAdd: { width:'100%', padding:'11px', borderRadius:'12px', fontWeight:'800', fontSize:'14px', cursor:'pointer', transition:'background 0.25s ease, color 0.25s ease, border 0.25s ease' },

    inlineQty: { display:'flex', alignItems:'center', gap:'6px' },
    inlineQtyBtn: { width:'30px', height:'30px', borderRadius:'8px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff', cursor:'pointer', fontSize:'16px', display:'flex', alignItems:'center', justifyContent:'center' },
    inlineQtyNum: { color:'#fff', fontWeight:'800', fontSize:'14px', minWidth:'22px', textAlign:'center' },
    viewCartBtn: { flex:1, padding:'7px 10px', background:'rgba(124,58,237,0.2)', border:'1px solid rgba(124,58,237,0.35)', borderRadius:'8px', color:'#a78bfa', fontSize:'12px', fontWeight:'700', cursor:'pointer' },
};

export default Apply;