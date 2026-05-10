import React, { useState, useRef } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const UploadPage = ({ title, badge, icon, fields, apiUrl, redirectTo, buttonLabel }) => {
    const [values, setValues] = useState({});
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileRef = useRef();
    const navigate = useNavigate();

    const handleChange = (key, val) => setValues(prev => ({ ...prev, [key]: val }));

    const handleFile = (file) => {
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) handleFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) { setError('Please select a photo.'); return; }

        setLoading(true);
        setError('');
        setSuccess('');
        setUploadProgress(0);

        try {
            const role = localStorage.getItem('role');
            const formData = new FormData();
            Object.entries(values).forEach(([k, v]) => formData.append(k, v));
            formData.append('photo', image);
            formData.append('role', role);

            await axios.post(apiUrl, formData, {
                onUploadProgress: (e) => {
                    setUploadProgress(Math.round((e.loaded * 100) / e.total));
                },
            });

            setLoading(false);
            setSuccess('Uploaded successfully!');
            setTimeout(() => navigate(redirectTo), 2000);
        } catch {
            setLoading(false);
            setError('Upload failed. Please try again.');
        }
    };

    return (
        <div style={S.page}>
            <div style={S.blob1} /><div style={S.blob2} />

            <div style={S.inner}>

                {/* HEADER */}
                <div style={S.header}>
                    <button style={S.backBtn} onClick={() => navigate(-1)}>← Back</button>
                    <span style={S.badge}>{badge}</span>
                    <h1 style={S.title}>{icon} {title}</h1>
                    <p style={S.sub}>Fill in the details below and upload a photo</p>
                </div>

                <form onSubmit={handleSubmit} style={S.form}>

                    {/* TEXT FIELDS */}
                    {fields.map((field) => (
                        <div key={field.key} style={S.formGroup}>
                            <label style={S.label}>{field.label}</label>
                            {field.type === 'textarea' ? (
                                <textarea
                                    style={{ ...S.input, height: '100px', resize: 'none' }}
                                    placeholder={field.placeholder}
                                    onChange={e => handleChange(field.key, e.target.value)}
                                    required
                                />
                            ) : (
                                <input
                                    style={S.input}
                                    type={field.type || 'text'}
                                    placeholder={field.placeholder}
                                    onChange={e => handleChange(field.key, e.target.value)}
                                    required
                                />
                            )}
                        </div>
                    ))}

                    {/* DRAG & DROP UPLOAD */}
                    <div style={S.formGroup}>
                        <label style={S.label}>Photo</label>
                        <div
                            style={{
                                ...S.dropZone,
                                ...(dragOver ? S.dropZoneActive : {}),
                                ...(preview ? S.dropZoneHasImage : {}),
                            }}
                            onClick={() => fileRef.current.click()}
                            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                        >
                            {preview ? (
                                <div style={S.previewWrap}>
                                    <img src={preview} alt="Preview" style={S.previewImg} />
                                    <div style={S.previewOverlay}>
                                        <span style={S.previewChange}>Click to change</span>
                                    </div>
                                </div>
                            ) : (
                                <div style={S.dropContent}>
                                    <div style={S.dropIcon}>📸</div>
                                    <p style={S.dropTitle}>Drop your image here</p>
                                    <p style={S.dropSub}>or click to browse · PNG, JPG, WEBP</p>
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={e => handleFile(e.target.files[0])}
                        />
                    </div>

                    {/* UPLOAD PROGRESS */}
                    {loading && (
                        <div style={S.progressWrap}>
                            <div style={S.progressHeader}>
                                <span style={S.progressLabel}>Uploading...</span>
                                <span style={S.progressPct}>{uploadProgress}%</span>
                            </div>
                            <div style={S.progressTrack}>
                                <div style={{ ...S.progressBar, width: `${uploadProgress}%` }} />
                            </div>
                        </div>
                    )}

                    {/* STATUS */}
                    {error && (
                        <div style={{ ...S.statusBox, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(248,113,113,0.3)' }}>
                            <span style={{ color: '#f87171' }}>❌ {error}</span>
                        </div>
                    )}
                    {success && (
                        <div style={{ ...S.statusBox, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(52,211,153,0.3)' }}>
                            <span style={{ color: '#34d399' }}>✅ {success}</span>
                        </div>
                    )}

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        style={{ ...S.submitBtn, opacity: loading ? 0.7 : 1 }}
                        disabled={loading}
                    >
                        {loading ? (
                            <span style={S.loadingRow}>
                                <span style={S.spinner} /> Uploading...
                            </span>
                        ) : buttonLabel}
                    </button>

                </form>
            </div>

            <Footer />

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

const S = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0520 0%, #0d1b4b 50%, #0a2a1a 100%)',
        position: 'relative', overflow: 'hidden',
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
        maxWidth: '580px', margin: '0 auto',
        padding: '48px 24px 80px',
        position: 'relative', zIndex: 1,
        animation: 'fadeIn 0.5s ease forwards',
    },
    header: { textAlign: 'center', marginBottom: '36px' },
    backBtn: {
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '10px', color: 'rgba(255,255,255,0.6)',
        fontSize: '13px', padding: '8px 16px',
        cursor: 'pointer', marginBottom: '20px',
        display: 'block',
    },
    badge: {
        display: 'inline-block',
        background: 'rgba(124,58,237,0.2)',
        border: '1px solid rgba(168,85,247,0.4)',
        borderRadius: '50px', padding: '4px 16px',
        color: '#c4b5fd', fontSize: '11px', fontWeight: '700',
        letterSpacing: '2px', textTransform: 'uppercase',
        marginBottom: '14px',
    },
    title: {
        fontSize: 'clamp(22px, 4vw, 34px)',
        fontWeight: '900', color: '#fff', margin: '0 0 8px',
    },
    sub: { color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 },
    form: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px', padding: '32px',
    },
    formGroup: { marginBottom: '20px' },
    label: {
        display: 'block', color: 'rgba(255,255,255,0.5)',
        fontSize: '11px', fontWeight: '700',
        textTransform: 'uppercase', letterSpacing: '1.5px',
        marginBottom: '8px',
    },
    input: {
        width: '100%', padding: '12px 16px',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px', color: '#fff',
        fontSize: '14px', outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    },
    dropZone: {
        border: '2px dashed rgba(255,255,255,0.15)',
        borderRadius: '16px',
        padding: '40px 20px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        background: 'rgba(255,255,255,0.03)',
    },
    dropZoneActive: {
        border: '2px dashed rgba(168,85,247,0.6)',
        background: 'rgba(124,58,237,0.1)',
    },
    dropZoneHasImage: {
        padding: 0, border: '2px solid rgba(168,85,247,0.3)',
    },
    dropContent: {},
    dropIcon: { fontSize: '36px', marginBottom: '10px' },
    dropTitle: {
        color: '#fff', fontSize: '15px',
        fontWeight: '600', margin: '0 0 6px',
    },
    dropSub: { color: 'rgba(255,255,255,0.35)', fontSize: '12px', margin: 0 },
    previewWrap: { position: 'relative', borderRadius: '14px', overflow: 'hidden' },
    previewImg: { width: '100%', height: '220px', objectFit: 'cover', display: 'block' },
    previewOverlay: {
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: 0, transition: 'opacity 0.2s',
    },
    previewChange: { color: '#fff', fontWeight: '700', fontSize: '14px' },
    progressWrap: { marginBottom: '16px' },
    progressHeader: {
        display: 'flex', justifyContent: 'space-between',
        marginBottom: '6px',
    },
    progressLabel: { color: 'rgba(255,255,255,0.5)', fontSize: '12px' },
    progressPct: { color: '#a78bfa', fontSize: '12px', fontWeight: '700' },
    progressTrack: {
        height: '6px', background: 'rgba(255,255,255,0.08)',
        borderRadius: '50px', overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        background: 'linear-gradient(90deg, #7c3aed, #3b82f6)',
        borderRadius: '50px',
        transition: 'width 0.2s ease',
    },
    statusBox: {
        borderRadius: '12px', padding: '12px 16px',
        marginBottom: '16px', fontSize: '14px',
    },
    submitBtn: {
        width: '100%', padding: '15px',
        background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
        border: 'none', borderRadius: '14px',
        color: '#fff', fontWeight: '800',
        fontSize: '16px', cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(124,58,237,0.4)',
        transition: 'opacity 0.2s, transform 0.2s',
        marginTop: '8px',
    },
    loadingRow: {
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '10px',
    },
    spinner: {
        display: 'inline-block', width: '16px', height: '16px',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTop: '2px solid #fff', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
};

export default UploadPage;