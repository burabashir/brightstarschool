import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Loader from './Loader';

const ShopPage = ({ title, badge, apiUrl, imgUrl, buyRoute }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('price');
    const [sortAsc, setSortAsc] = useState(true);
    const [cart, setCart] = useState({});
    const [remindItem, setRemindItem] = useState(null);
    const [remindForm, setRemindForm] = useState({ name: '', phone: '', when: '', note: '' });
    const [remindedIds, setRemindedIds] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(apiUrl)
            .then(r => r.json())
            .then(data => { setItems(data); setLoading(false); })
            .catch(() => { setError('Failed to load items'); setLoading(false); });

        // Load existing reminders from localStorage
        const saved = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('remind_' + buyRoute + '_')) {
                const id = key.replace('remind_' + buyRoute + '_', '');
                saved[id] = true;
            }
        }
        setRemindedIds(saved);
    }, [apiUrl]);

    const filtered = useMemo(() => {
        let list = items.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            (item.description || '').toLowerCase().includes(search.toLowerCase())
        );
        list.sort((a, b) => {
            if (sortKey === 'price') return sortAsc ? a.price - b.price : b.price - a.price;
            if (sortKey === 'name') return sortAsc
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            return 0;
        });
        return list;
    }, [items, search, sortKey, sortAsc]);

    const cartCount = Object.values(cart).reduce((s, v) => s + v, 0);
    const cartTotal = Object.entries(cart).reduce((s, [id, qty]) => {
        const item = items.find(i => String(i.id) === String(id));
        return s + (item ? item.price * qty : 0);
    }, 0);

    const addToCart = (item) => {
        setCart(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
    };

    const removeFromCart = (id) => {
        setCart(prev => {
            const next = { ...prev };
            if (next[id] > 1) next[id]--;
            else delete next[id];
            return next;
        });
    };

    const handleSort = (key) => {
        if (sortKey === key) setSortAsc(a => !a);
        else { setSortKey(key); setSortAsc(true); }
    };

    const openRemind = (item) => {
        setRemindItem(item);
        setRemindForm({ name: '', phone: '', when: '', note: '' });
    };

    const confirmRemind = () => {
        if (!remindForm.name || !remindForm.phone || !remindForm.when) {
            alert('Please fill in name, phone, and when to remind you.');
            return;
        }
        localStorage.setItem(
            'remind_' + buyRoute + '_' + remindItem.id,
            JSON.stringify({ ...remindForm, itemName: remindItem.name })
        );
        setRemindedIds(prev => ({ ...prev, [remindItem.id]: true }));
        setRemindItem(null);
        alert(`Reminder set! We'll remind you about "${remindItem.name}" in ${remindForm.when}.`);
    };

    const checkout = () => {
        const cartItems = Object.entries(cart).map(([id, qty]) => {
            const item = items.find(i => String(i.id) === String(id));
            return { ...item, qty };
        });
        navigate('/checkout', { state: { cartItems, total: cartTotal } });
    };

    return (
        <div style={S.page}>

            {/* BG BLOBS */}
            <div style={S.blob1} /><div style={S.blob2} />

            {/* HERO */}
            <div style={S.hero}>
                <span style={S.badge}>{badge}</span>
                <h1 style={S.heroTitle}>{title}</h1>
                <p style={S.heroSub}>Browse, add to cart, and pay securely with M-Pesa</p>
            </div>

            {/* TOOLBAR */}
            <div style={S.toolbar}>
                <div style={S.searchWrap}>
                    <span style={S.searchIcon}>🔍</span>
                    <input
                        style={S.searchInput}
                        placeholder="Search by name or description..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && (
                        <button style={S.clearSearch} onClick={() => setSearch('')}>✕</button>
                    )}
                </div>
                <button
                    style={{ ...S.sortBtn, ...(sortKey === 'price' ? S.sortActive : {}) }}
                    onClick={() => handleSort('price')}
                >
                    Price {sortKey === 'price' ? (sortAsc ? '↑' : '↓') : '↑'}
                </button>
                <button
                    style={{ ...S.sortBtn, ...(sortKey === 'name' ? S.sortActive : {}) }}
                    onClick={() => handleSort('name')}
                >
                    {sortKey === 'name' ? (sortAsc ? 'A → Z' : 'Z → A') : 'A → Z'}
                </button>
            </div>

            {/* CART BAR */}
            {cartCount > 0 && (
                <div style={S.cartBar}>
                    <div style={S.cartLeft}>
                        <span style={S.cartIcon}>🛒</span>
                        <span style={S.cartLabel}>Cart</span>
                        <span style={S.cartBadge}>{cartCount}</span>
                        <span style={S.cartItemList}>
                            {Object.entries(cart).map(([id, qty]) => {
                                const item = items.find(i => String(i.id) === String(id));
                                return item ? (
                                    <span key={id} style={S.cartChip}>
                                        {item.name.slice(0, 18)} ×{qty}
                                        <button style={S.chipRemove} onClick={() => removeFromCart(id)}>✕</button>
                                    </span>
                                ) : null;
                            })}
                        </span>
                    </div>
                    <div style={S.cartRight}>
                        <span style={S.cartTotal}>KES {cartTotal.toLocaleString()}</span>
                        <button style={S.btnClear} onClick={() => setCart({})}>Clear</button>
                        <button style={S.btnCheckout} onClick={checkout}>Checkout →</button>
                    </div>
                </div>
            )}

            {/* RESULT COUNT */}
            <div style={S.resultLabel}>
                {loading ? '' : `${filtered.length} item${filtered.length !== 1 ? 's' : ''} found`}
            </div>

            {/* STATES */}
            {loading && <Loader />}
            {error && <p style={S.errorMsg}>{error}</p>}
            {!loading && filtered.length === 0 && (
                <div style={S.empty}>
                    <p style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</p>
                    <p>No items found{search ? ` for "${search}"` : ''}.</p>
                </div>
            )}

            {/* GRID */}
            <div style={S.grid}>
                {filtered.map(item => {
                    const qty = cart[item.id] || 0;
                    const reminded = remindedIds[item.id];
                    return (
                        <div key={item.id} style={S.card}>
                            <div style={S.cardImgWrap}>
                                <img
                                    src={imgUrl + item.photo}
                                    alt={item.name}
                                    style={S.cardImg}
                                />
                                {qty > 0 && <div style={S.qtyBadge}>{qty}</div>}
                            </div>
                            <div style={S.cardBody}>
                                <h3 style={S.cardName}>{item.name}</h3>
                                <p style={S.cardDesc}>
                                    {(item.description || '').slice(0, 85)}{item.description?.length > 85 ? '…' : ''}
                                </p>
                                <div style={S.cardFooter}>
                                    <span style={S.cardPrice}>KES {Number(item.price).toLocaleString()}</span>
                                    <div style={S.cardActions}>
                                        <button
                                            style={{ ...S.btnRemind, ...(reminded ? S.btnRemindSet : {}) }}
                                            onClick={() => !reminded && openRemind(item)}
                                            title={reminded ? 'Reminder set' : 'Remind me to buy later'}
                                        >
                                            {reminded ? '✓' : '🔔'}
                                        </button>
                                        <button
                                            style={{ ...S.btnCart, ...(qty ? S.btnCartAdded : {}) }}
                                            onClick={() => addToCart(item)}
                                        >
                                            {qty ? `✓ ${qty} in cart` : '+ Add to cart'}
                                        </button>
                                    </div>
                                </div>
                                <button
                                    style={S.btnBuyNow}
                                    onClick={() => navigate(buyRoute, { state: { item } })}
                                >
                                    🛒 Buy Now
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* REMIND MODAL */}
            {remindItem && (
                <div style={S.modalBackdrop} onClick={e => e.target === e.currentTarget && setRemindItem(null)}>
                    <div style={S.modal}>
                        <div style={S.modalHeader}>
                            <div>
                                <h2 style={S.modalTitle}>🔔 Remind me to buy</h2>
                                <p style={S.modalSub}>"{remindItem.name}" — KES {Number(remindItem.price).toLocaleString()}</p>
                            </div>
                            <button style={S.modalClose} onClick={() => setRemindItem(null)}>✕</button>
                        </div>
                        <p style={S.modalDesc}>
                            Don't have the money right now? No problem — we'll send you a reminder when you're ready.
                        </p>
                        <div style={S.formGroup}>
                            <label style={S.label}>Your name</label>
                            <input
                                style={S.input}
                                placeholder="e.g. John Kamau"
                                value={remindForm.name}
                                onChange={e => setRemindForm(f => ({ ...f, name: e.target.value }))}
                            />
                        </div>
                        <div style={S.formGroup}>
                            <label style={S.label}>Phone number</label>
                            <input
                                style={S.input}
                                placeholder="07XXXXXXXX"
                                value={remindForm.phone}
                                onChange={e => setRemindForm(f => ({ ...f, phone: e.target.value }))}
                            />
                        </div>
                        <div style={S.formGroup}>
                            <label style={S.label}>Remind me in</label>
                            <select
                                style={S.input}
                                value={remindForm.when}
                                onChange={e => setRemindForm(f => ({ ...f, when: e.target.value }))}
                            >
                                <option value="">Select timeframe...</option>
                                <option value="1 week">1 week</option>
                                <option value="2 weeks">2 weeks</option>
                                <option value="1 month">1 month</option>
                                <option value="3 months">3 months</option>
                            </select>
                        </div>
                        <div style={S.formGroup}>
                            <label style={S.label}>Note to yourself (optional)</label>
                            <textarea
                                style={{ ...S.input, height: '70px', resize: 'none' }}
                                placeholder="e.g. Need this for term 2..."
                                value={remindForm.note}
                                onChange={e => setRemindForm(f => ({ ...f, note: e.target.value }))}
                            />
                        </div>
                        <div style={S.modalBtns}>
                            <button style={S.btnCancel} onClick={() => setRemindItem(null)}>Cancel</button>
                            <button style={S.btnConfirm} onClick={confirmRemind}>Set Reminder 🔔</button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
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
        top: '-150px', left: '-150px', borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
    },
    blob2: {
        position: 'fixed', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
        bottom: '-100px', right: '-100px', borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
    },
    hero: {
        padding: '48px 24px 24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
    },
    badge: {
        display: 'inline-block',
        background: 'rgba(124,58,237,0.2)',
        border: '1px solid rgba(168,85,247,0.4)',
        borderRadius: '50px',
        padding: '4px 16px',
        color: '#c4b5fd',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '14px',
    },
    heroTitle: {
        fontSize: 'clamp(24px, 4vw, 40px)',
        fontWeight: '900',
        color: '#fff',
        margin: '0 0 8px',
    },
    heroSub: {
        color: 'rgba(255,255,255,0.45)',
        fontSize: '14px',
    },
    toolbar: {
        display: 'flex',
        gap: '10px',
        padding: '0 24px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1,
        alignItems: 'center',
    },
    searchWrap: {
        flex: 1,
        minWidth: '240px',
        position: 'relative',
    },
    searchIcon: {
        position: 'absolute',
        left: '13px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '15px',
        pointerEvents: 'none',
    },
    searchInput: {
        width: '100%',
        padding: '11px 40px 11px 40px',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '14px',
        outline: 'none',
    },
    clearSearch: {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: 'rgba(255,255,255,0.4)',
        cursor: 'pointer',
        fontSize: '14px',
    },
    sortBtn: {
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '13px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
    },
    sortActive: {
        background: 'rgba(124,58,237,0.25)',
        borderColor: 'rgba(168,85,247,0.5)',
        color: '#c4b5fd',
    },
    cartBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 24px 20px',
        padding: '14px 20px',
        background: 'rgba(124,58,237,0.12)',
        border: '1px solid rgba(168,85,247,0.25)',
        borderRadius: '16px',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        zIndex: 1,
        flexWrap: 'wrap',
        gap: '12px',
    },
    cartLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        flex: 1,
    },
    cartIcon: { fontSize: '18px' },
    cartLabel: { color: '#c4b5fd', fontWeight: '700', fontSize: '14px' },
    cartBadge: {
        background: '#7c3aed', color: '#fff',
        borderRadius: '50px', padding: '2px 10px',
        fontSize: '11px', fontWeight: '700',
    },
    cartItemList: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
    cartChip: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '8px',
        padding: '3px 8px',
        fontSize: '11px',
        color: 'rgba(255,255,255,0.7)',
    },
    chipRemove: {
        background: 'none', border: 'none',
        color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
        fontSize: '10px', padding: 0,
    },
    cartRight: { display: 'flex', alignItems: 'center', gap: '10px' },
    cartTotal: { color: '#fff', fontWeight: '900', fontSize: '16px' },
    btnClear: {
        padding: '8px 14px',
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '50px',
        color: 'rgba(255,255,255,0.5)',
        fontSize: '12px',
        cursor: 'pointer',
    },
    btnCheckout: {
        padding: '9px 22px',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        border: 'none',
        borderRadius: '50px',
        color: '#fff',
        fontWeight: '700',
        fontSize: '13px',
        cursor: 'pointer',
        boxShadow: '0 6px 20px rgba(124,58,237,0.35)',
    },
    resultLabel: {
        fontSize: '12px',
        color: 'rgba(255,255,255,0.3)',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        fontWeight: '700',
        padding: '0 24px 14px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
    },
    errorMsg: { color: '#f87171', textAlign: 'center', padding: '20px' },
    empty: {
        textAlign: 'center',
        padding: '80px 20px',
        color: 'rgba(255,255,255,0.3)',
        fontSize: '14px',
        position: 'relative',
        zIndex: 1,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '20px',
        padding: '0 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
    },
    card: {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'transform 0.2s, border-color 0.2s',
    },
    cardImgWrap: { position: 'relative' },
    cardImg: { width: '100%', height: '190px', objectFit: 'cover', display: 'block' },
    qtyBadge: {
        position: 'absolute', top: '10px', right: '10px',
        background: '#7c3aed', color: '#fff',
        borderRadius: '50%', width: '24px', height: '24px',
        fontSize: '12px', fontWeight: '900',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    cardBody: { padding: '16px' },
    cardName: { fontSize: '15px', fontWeight: '700', color: '#fff', margin: '0 0 6px' },
    cardDesc: {
        fontSize: '12px', color: 'rgba(255,255,255,0.45)',
        margin: '0 0 14px', lineHeight: '1.5',
    },
    cardFooter: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '12px',
    },
    cardPrice: { fontSize: '17px', fontWeight: '900', color: '#fbbf24' },
    cardActions: { display: 'flex', gap: '6px' },
    btnRemind: {
        padding: '7px 10px',
        background: 'rgba(245,158,11,0.12)',
        border: '1px solid rgba(251,191,36,0.25)',
        borderRadius: '8px',
        color: '#fbbf24',
        fontSize: '14px',
        cursor: 'pointer',
    },
    btnRemindSet: {
        background: 'rgba(16,185,129,0.12)',
        borderColor: 'rgba(52,211,153,0.3)',
        color: '#34d399',
    },
    btnCart: {
        padding: '7px 12px',
        background: 'rgba(124,58,237,0.2)',
        border: '1px solid rgba(168,85,247,0.35)',
        borderRadius: '8px',
        color: '#c4b5fd',
        fontSize: '12px',
        fontWeight: '700',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    },
    btnCartAdded: {
        background: 'rgba(16,185,129,0.15)',
        borderColor: 'rgba(52,211,153,0.35)',
        color: '#34d399',
    },
    btnBuyNow: {
        width: '100%',
        padding: '10px',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        border: 'none',
        borderRadius: '10px',
        color: '#fff',
        fontWeight: '700',
        fontSize: '13px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
    },
    // MODAL
    modalBackdrop: {
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 100, padding: '20px',
    },
    modal: {
        background: 'linear-gradient(135deg, #1a0a3d, #0d1b4b)',
        border: '1px solid rgba(168,85,247,0.3)',
        borderRadius: '24px',
        padding: '28px',
        width: '100%',
        maxWidth: '420px',
    },
    modalHeader: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '12px',
    },
    modalTitle: { fontSize: '18px', fontWeight: '800', color: '#fff', margin: '0 0 4px' },
    modalSub: { fontSize: '13px', color: '#a78bfa', margin: 0 },
    modalClose: {
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '8px', color: 'rgba(255,255,255,0.5)',
        width: '32px', height: '32px', cursor: 'pointer', fontSize: '14px',
    },
    modalDesc: {
        color: 'rgba(255,255,255,0.5)', fontSize: '13px',
        lineHeight: '1.6', marginBottom: '20px',
    },
    formGroup: { marginBottom: '12px' },
    label: {
        display: 'block', color: 'rgba(255,255,255,0.5)',
        fontSize: '12px', fontWeight: '600',
        textTransform: 'uppercase', letterSpacing: '1px',
        marginBottom: '6px',
    },
    input: {
        width: '100%',
        padding: '10px 14px',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '10px',
        color: '#fff',
        fontSize: '14px',
        outline: 'none',
    },
    modalBtns: { display: 'flex', gap: '10px', marginTop: '18px' },
    btnCancel: {
        padding: '11px 20px',
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '10px',
        color: 'rgba(255,255,255,0.5)',
        fontSize: '14px',
        cursor: 'pointer',
    },
    btnConfirm: {
        flex: 1,
        padding: '11px',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        border: 'none',
        borderRadius: '10px',
        color: '#fff',
        fontWeight: '700',
        fontSize: '14px',
        cursor: 'pointer',
        boxShadow: '0 6px 20px rgba(124,58,237,0.35)',
    },
};

export default ShopPage;