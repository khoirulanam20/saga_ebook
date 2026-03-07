import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, PlayCircle, ShieldCheck, Zap } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';
import './Ads.css';

export default function Ads({ previewMode = false }) {
    const { content } = useContent();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const adsContent = content?.ads || {
        heroTitle: 'Bongkar Rahasia Bisnis Beromset Ratusan Juta',
        heroSubtitle: 'Pelajari strategi digital yang telah terbukti.',
        videoUrl: '',
        selectedProductIds: [1] // Fallback
    };

    useEffect(() => {
        if (!previewMode) {
            document.title = "Promo Spesial - SAGA Academy";
        }
    }, [previewMode]);

    const handleBuy = (e, product) => {
        if (previewMode) {
            e.preventDefault();
            toast.success(`Simulasi: Menambahkan "${product.title}" ke keranjang dan diarahkan ke Checkout.`);
            return;
        }

        addToCart(product);
        navigate('/checkout');
    };

    // Find actual products based on selected IDs
    const featuredProducts = (adsContent.selectedProductIds || []).map(id => products.find(p => p.id === id)).filter(Boolean);

    return (
        <div className="ads-landing-min">
            {/* Header minimal */}
            <header className="ads-header">
                <div className="ads-container">
                    <span className="ads-brand">SAGA Academy</span>
                    <span className="ads-badge-top">Penawaran Terbatas</span>
                </div>
            </header>

            <main>
                <section className="ads-hero section-dark">
                    <div className="ads-container">
                        <div className="ads-hero-content">
                            <h1 className="ads-title-main">{adsContent.heroTitle}</h1>
                            <p className="ads-subtitle">{adsContent.heroSubtitle}</p>

                            {adsContent.videoUrl && (
                                <div className="ads-video-wrapper">
                                    <iframe
                                        src={adsContent.videoUrl}
                                        title="Video Promo"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}

                            {!adsContent.videoUrl && (
                                <div className="ads-video-wrapper" style={{ background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', padding: 40 }}>
                                        <PlayCircle size={48} style={{ marginBottom: 10, opacity: 0.5 }} />
                                        <p style={{ fontSize: '0.9rem' }}>Video Presentasi Promo</p>
                                    </div>
                                </div>
                            )}

                            <p className="ads-guarantee" style={{ marginTop: 24 }}><ShieldCheck size={16} /> Garansi Uang Kembali 100%</p>
                        </div>
                    </div>
                </section>

                <section className="ads-details section-light">
                    <div className="ads-container">

                        {featuredProducts.length === 0 ? (
                            <div className="ads-card">
                                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>Produk penawaran belum dikonfigurasi.</p>
                            </div>
                        ) : (
                            featuredProducts.map((product, index) => (
                                <div key={product.id} className="ads-card" style={{ marginTop: index === 0 ? '-40px' : '30px' }}>
                                    <h2 className="ads-section-title" style={{ fontSize: '1.25rem', color: '#0f4c81', marginBottom: 10 }}>PENAWARAN SPESIAL</h2>
                                    <h3 style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 800, marginBottom: 25, lineHeight: 1.3 }}>{product.title}</h3>

                                    <p style={{ textAlign: 'center', color: '#4a5568', marginBottom: 20, fontSize: '0.95rem' }}>
                                        {product.description}
                                    </p>

                                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 15, borderBottom: '1px solid #eee', paddingBottom: 10 }}>Apa yang Akan Anda Dapatkan:</h4>
                                    <ul className="ads-materi-list">
                                        {(product.benefits && product.benefits.length > 0 ? product.benefits : ['Akses Materi Lifetime', 'Exclusive Modul Pembelajaran', 'Sertifikat Kelulusan']).map((item, i) => (
                                            <li key={i}><CheckCircle2 size={18} className="icon-check" /> {item}</li>
                                        ))}
                                    </ul>

                                    <div className="ads-pricing-box" style={{ background: '#fff9e6', borderColor: '#ffe082', marginTop: 30 }}>
                                        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: 5 }}>Dapatkan penawaran ini hanya seharga:</p>
                                        <span className="ads-price-strike">{formatCurrency(product.originalPrice || (product.price * 2))}</span>
                                        <span className="ads-price-final">{formatCurrency(product.price)}</span>
                                    </div>

                                    <button onClick={(e) => handleBuy(e, product)} className="ads-btn-primary w-full pulse-anim" style={{ marginTop: 20 }}>
                                        Ambil Promo Sekarang
                                    </button>
                                    <p className="ads-scarcity"><Zap size={16} /> Amankan seat Anda sebelum promo berakhir!</p>
                                </div>
                            ))
                        )}

                    </div>
                </section>
            </main>

            <footer className="ads-footer">
                <p>&copy; {new Date().getFullYear()} SAGA Academy. All rights reserved.</p>
            </footer>
        </div>
    );
}
