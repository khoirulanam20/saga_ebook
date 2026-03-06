import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Check, ArrowLeft, ExternalLink, Link as LinkIcon, Download, PlayCircle, FileText } from 'lucide-react';
import { products } from '../../data/products';
import { getCategoryLabel } from '../../utils/helpers';
import toast from 'react-hot-toast';
import '../guest/ProductDetail.css'; // Reusing the exact same ProductDetail CSS
import './UserLearning.css';

export default function UserLearning() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(p => p.id === Number(id));

    if (!product) {
        toast.error('Produk tidak ditemukan');
        navigate('/dashboard');
        return null;
    }

    const materials = product.materials && product.materials.length > 0 ? product.materials : [
        { title: 'Grup Komunitas Premium', duration: 'Akses Selamanya', link: 'https://t.me/saga_community_dummy' },
        { title: 'Link Download Modul PDF', duration: '12 MB', link: 'https://gdrive.link/dummy_modul' },
        { title: 'Rekaman Webinar Sesi 1', duration: '1h 45m', link: 'https://youtube.com/dummy_video_1' },
    ];

    const handleOpenLink = (m) => {
        if (m.link) {
            window.open(m.link, '_blank', 'noopener,noreferrer');
        } else {
            toast.error('Link materi belum tersedia.');
        }
    };

    return (
        <div className="product-detail">
            {/* We reuse .product-detail class to get the exact layout from ProductDetail */}
            <div className="container product-detail__inner">
                <Link to="/dashboard" className="back-link"><ArrowLeft size={16} /> Kembali ke Dashboard</Link>

                <div className="product-detail__layout">
                    {/* Left - Main Content */}
                    <div className="product-detail__main">
                        <div className="product-detail__hero-img">
                            <img src={product.thumbnail} alt={product.title} />
                            {product.badge && <span className="detail-badge">{product.badge}</span>}
                        </div>

                        <div className="detail-section">
                            <h2 className="detail-section-title">Deskripsi Produk</h2>
                            <p className="detail-desc">{product.longDescription || product.description}</p>
                        </div>

                        <div className="detail-section">
                            <h2 className="detail-section-title">Apa yang Anda Dapatkan</h2>
                            <div className="benefits-list">
                                {product.benefits?.map((b, i) => (
                                    <div key={i} className="benefit-item">
                                        <div className="benefit-check"><Check size={14} /></div>
                                        <span>{b}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="detail-section">
                            <h2 className="detail-section-title">Materi Pembelajaran</h2>
                            <p className="detail-desc" style={{ marginBottom: 'var(--space-4)' }}>Klik pada modul materi di bawah ini untuk langsung diarahkan ke tautan yang sesuai.</p>

                            <div className="materials-list">
                                {materials.map((m, i) => (
                                    <div
                                        key={i}
                                        className="material-item"
                                        onClick={() => handleOpenLink(m)}
                                        style={{ cursor: 'pointer', transition: 'all 0.2s ease', border: '1px solid var(--color-border)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    >
                                        <div className="material-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                            <span className="material-num">{String(i + 1).padStart(2, '0')}</span>
                                            {m.link ? <LinkIcon size={16} color="var(--color-accent)" /> : <FileText size={16} color="var(--color-text-muted)" />}
                                            {m.title}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                            <span className="material-meta">
                                                {m.duration || 'Eksternal Link'}
                                            </span>
                                            <ExternalLink size={16} color="var(--color-text-muted)" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Sidebar */}
                    <div className="product-detail__sidebar">
                        <div className="detail-card">
                            <div className="detail-card__category">
                                <span>{getCategoryLabel(product.category)}</span>
                            </div>
                            <h1 className="detail-card__title">{product.title}</h1>

                            {/* <div className="detail-card__rating">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={16} fill={i < Math.floor(product.rating || 5) ? 'currentColor' : 'none'} />
                                ))}
                                <span className="rating-num">{product.rating || 5.0}</span>
                            </div> */}

                            <div className="detail-card__price" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                                <span className="price-big" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-success)' }}>
                                    <Check size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
                                    Sudah Dibeli
                                </span>
                            </div>

                            {product.schedule && (
                                <div className="detail-schedule">
                                    📅 {product.schedule}
                                </div>
                            )}

                            <div className="detail-card__actions">
                                {/* Direct user to curriculum directly via scroll to view the links */}
                                <button className="btn-buy" onClick={() => window.scrollTo({ top: document.querySelector('.materials-list').offsetTop - 100, behavior: 'smooth' })}>
                                    Mulai Belajar
                                </button>
                            </div>

                            <div className="detail-card__guarantees">
                                {['Akses Seumur Hidup', 'Materi Terupdate', 'Dukungan Komunitas'].map(g => (
                                    <div key={g} className="guarantee-item">
                                        <Check size={14} className="g-check" />
                                        {g}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
