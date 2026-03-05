import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlayCircle, FileText, CheckCircle2, Download, Play, ChevronRight, Lock } from 'lucide-react';
import { products } from '../../data/products';
import { getCategoryLabel } from '../../utils/helpers';
import toast from 'react-hot-toast';
import './UserLearning.css';

export default function UserLearning() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === Number(id));

    // We default to index 0, but if there are no materials we handle gracefully
    const [activeIdx, setActiveIdx] = useState(0);

    // Simulate some completed chapters
    const [completed, setCompleted] = useState([0]);

    useEffect(() => {
        if (!product) {
            toast.error('Produk tidak ditemukan');
            navigate('/dashboard');
        }
    }, [product, navigate]);

    if (!product) return null;

    const materials = product.materials || [
        { title: 'Pengenalan Materi Dasar', duration: '12 min' },
        { title: 'Persiapan & Tools yang Digunakan', duration: '15 min' },
        { title: 'Penerapan Langkah demi Langkah', duration: '45 min' },
        { title: 'Tips Tingkat Lanjut', duration: '20 min' },
        { title: 'Studi Kasus: Membedah Kesuksesan', duration: '30 min' },
    ];

    const activeMaterial = materials[activeIdx];
    const isVideo = product.category === 'video' || product.category === 'webinar';
    const isEbook = product.category === 'ebook';

    const handleComplete = () => {
        if (!completed.includes(activeIdx)) {
            setCompleted(prev => [...prev, activeIdx]);
            toast.success('Materi ditandai selesai! 🎉');
        }

        // Auto go next
        if (activeIdx < materials.length - 1) {
            setActiveIdx(activeIdx + 1);
        }
    };

    return (
        <div className="user-learning">
            {/* Header */}
            <header className="learning-header">
                <Link to="/dashboard" className="learning-back">
                    <ArrowLeft size={18} />
                    <span>Kembali ke Dashboard</span>
                </Link>
                <h1 className="learning-title">{product.title}</h1>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <span className="badge-cat">{getCategoryLabel(product.category)}</span>
                </div>
            </header>

            <div className="learning-layout">
                {/* Sidebar - Playlist / Chapters */}
                <aside className="learning-sidebar">
                    <div className="sidebar-header">
                        <h3>Daftar Materi</h3>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: 4 }}>
                            {completed.length} dari {materials.length} Selesai ({Math.round((completed.length / materials.length) * 100)}%)
                        </p>
                        <div style={{ width: '100%', height: 4, background: 'var(--color-bg)', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: 'var(--color-success)', width: `${(completed.length / materials.length) * 100}%`, transition: 'width 0.3s ease' }} />
                        </div>
                    </div>

                    <div className="learning-materials">
                        {materials.map((m, i) => {
                            const isActive = i === activeIdx;
                            const isDone = completed.includes(i);
                            const iconSize = 16;

                            return (
                                <div
                                    key={i}
                                    className={`material-item ${isActive ? 'active' : ''}`}
                                    onClick={() => setActiveIdx(i)}
                                >
                                    <div className="material-icon">
                                        {isDone ? (
                                            <CheckCircle2 size={iconSize} color="var(--color-success)" />
                                        ) : isVideo ? (
                                            <PlayCircle size={iconSize} color={isActive ? "var(--color-accent-light)" : "var(--color-text-muted)"} />
                                        ) : (
                                            <FileText size={iconSize} color={isActive ? "var(--color-accent-light)" : "var(--color-text-muted)"} />
                                        )}
                                    </div>
                                    <div className="material-info">
                                        <div className="material-title">{i + 1}. {m.title}</div>
                                        <div className="material-meta">
                                            {m.duration || m.pages || m.videos || (isVideo ? 'Video' : 'Modul')}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="learning-main">

                    {/* VIDEO PLAYER */}
                    {isVideo && (
                        <div className="video-container">
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', padding: 'var(--space-8)' }}>
                                <PlayCircle size={64} style={{ marginBottom: 'var(--space-4)', opacity: 0.8 }} />
                                <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'white' }}>{activeMaterial?.title}</h3>
                                <p style={{ fontSize: 'var(--text-sm)', opacity: 0.6 }}>Video Simulation Player</p>
                            </div>
                            {/* Real implementation would use: <video src={activeMaterial.url} controls /> */}
                        </div>
                    )}

                    {/* EBOOK VIEWER */}
                    {isEbook && (
                        <div className="ebook-container">
                            <div className="ebook-icon-wrap">
                                <FileText size={40} color="var(--color-accent)" />
                            </div>
                            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', marginBottom: 'var(--space-2)' }}>{activeMaterial?.title}</h2>
                            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>Silakan baca modul ini atau unduh untuk dibaca offline.</p>

                            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                                <button className="btn-hero-primary" style={{ padding: '12px 24px', fontSize: '14px' }} onClick={handleComplete}>
                                    <BookOpen size={16} style={{ marginRight: 8 }} /> Baca Online
                                </button>
                                <button className="btn-admin-primary" style={{ padding: '12px 24px', fontSize: '14px', background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)' }}>
                                    <Download size={16} /> Unduh PDF
                                </button>
                            </div>
                        </div>
                    )}

                    {/* DETAILS BELOW CONTENT */}
                    <div className="content-details">
                        <h2 className="content-title">{activeMaterial?.title}</h2>
                        <div className="content-meta">
                            {isVideo && <span><Play size={14} style={{ verticalAlign: 'text-bottom', marginRight: 4 }} /> {activeMaterial?.duration || '15 mins'}</span>}
                            <span>Modul {activeIdx + 1} dari {materials.length}</span>
                        </div>

                        <div className="content-desc">
                            <p style={{ marginBottom: 'var(--space-3)' }}>
                                Ini adalah deskripsi materi untuk bagian: <strong>{activeMaterial?.title}</strong>. Pelajari dengan saksama dan pastikan Anda mempraktikkan hal-hal yang diajarkan dalam bab ini sebelum melangkah ke bab selanjutnya.
                            </p>
                            <p>
                                Jika Anda mengalami kesulitan atau ada pertanyaan seputar bab ini, jangan ragu untuk berdiskusi di grup komunitas tertutup kita.
                            </p>
                        </div>

                        <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button
                                className="btn-modal-cancel"
                                disabled={activeIdx === 0}
                                onClick={() => setActiveIdx(prev => prev - 1)}
                            >
                                Sebelumnya
                            </button>

                            <button
                                className="btn-modal-save"
                                style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: completed.includes(activeIdx) ? 0.7 : 1 }}
                                onClick={handleComplete}
                            >
                                {completed.includes(activeIdx) ? 'Sudah Selesai' : 'Tandai Selesai & Lanjut'} <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
