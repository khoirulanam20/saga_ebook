import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Check, ChevronDown, ChevronUp, BookOpen, Video, Mic, MapPin, ArrowLeft } from 'lucide-react';
import { products } from '../../data/products';
import { testimonials } from '../../data/testimonials';
import TestimonialCard from '../../components/shared/TestimonialCard';
import { formatCurrency, getCategoryLabel } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './ProductDetail.css';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, isInCart } = useCart();
    const { user } = useAuth();
    const product = products.find(p => p.id === Number(id));
    const [openSection, setOpenSection] = useState(null);
    const inCart = product ? isInCart(product.id) : false;

    if (!product) {
        return (
            <div className="not-found-page">
                <h2>Produk tidak ditemukan</h2>
                <Link to="/products">Kembali ke daftar produk</Link>
            </div>
        );
    }

    const productTestimonials = testimonials.filter(t => t.productId === product.id);
    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

    // Route to sales funnel: intro → product overview → education → pre-checkout
    const handleBuy = () => {
        if (!user) {
            toast.error('Harap login terlebih dahulu untuk melakukan pembelian.');
            return navigate('/login');
        }
        navigate(`/products/${product.id}/buy`);
    };

    const handleAddToCart = () => {
        if (!user) {
            toast.error('Harap login terlebih dahulu.');
            return navigate('/login');
        }
        addToCart(product);
        toast.success('Ditambahkan ke keranjang!');
    };

    return (
        <div className="product-detail">
            <div className="container product-detail__inner">
                <Link to="/products" className="back-link"><ArrowLeft size={16} /> Kembali ke Produk</Link>

                <div className="product-detail__layout">
                    {/* Left */}
                    <div className="product-detail__main">
                        <div className="product-detail__hero-img">
                            <img src={product.thumbnail} alt={product.title} />
                            {product.badge && <span className="detail-badge">{product.badge}</span>}
                        </div>

                        <div className="detail-section">
                            <h2 className="detail-section-title">Deskripsi Produk</h2>
                            <p className="detail-desc">{product.longDescription}</p>
                        </div>

                        <div className="detail-section">
                            <h2 className="detail-section-title">Apa yang Akan Anda Dapatkan</h2>
                            <div className="benefits-list">
                                {product.benefits.map((b, i) => (
                                    <div key={i} className="benefit-item">
                                        <div className="benefit-check"><Check size={14} /></div>
                                        <span>{b}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="detail-section">
                            <h2 className="detail-section-title">Isi Materi</h2>
                            <div className="materials-list">
                                {product.materials.map((m, i) => (
                                    <div key={i} className="material-item" onClick={() => setOpenSection(openSection === i ? null : i)}>
                                        <div className="material-title">
                                            <span className="material-num">{String(i + 1).padStart(2, '0')}</span>
                                            {m.title}
                                        </div>
                                        <span className="material-meta">
                                            {m.pages ? `${m.pages} hal` : m.videos ? `${m.videos} video` : m.duration}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {productTestimonials.length > 0 && (
                            <div className="detail-section">
                                <h2 className="detail-section-title">Testimoni Peserta</h2>
                                <div className="grid-2">
                                    {productTestimonials.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="product-detail__sidebar">
                        <div className="detail-card">
                            <div className="detail-card__category">
                                <span>{getCategoryLabel(product.category)}</span>
                            </div>
                            <h1 className="detail-card__title">{product.title}</h1>

                            <div className="detail-card__rating">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={16} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                                ))}
                                <span className="rating-num">{product.rating}</span>
                                <span className="rating-total">({product.totalRatings} ulasan)</span>
                            </div>

                            <div className="detail-card__price">
                                <span className="price-big">{formatCurrency(product.price)}</span>
                                {product.originalPrice > product.price && (
                                    <div className="price-meta">
                                        <span className="price-strike">{formatCurrency(product.originalPrice)}</span>
                                        <span className="price-disc">Hemat {product.discount}%</span>
                                    </div>
                                )}
                            </div>

                            {product.schedule && (
                                <div className="detail-schedule">
                                    📅 {product.schedule}
                                </div>
                            )}

                            <div className="detail-card__actions">
                                <button className="btn-buy" onClick={handleBuy}>
                                    Beli Sekarang
                                </button>
                                <button
                                    className={`btn-cart ${inCart ? 'in-cart' : ''}`}
                                    onClick={handleAddToCart}
                                    disabled={inCart}
                                >
                                    <ShoppingCart size={17} />
                                    {inCart ? 'Di Keranjang' : 'Keranjang'}
                                </button>
                            </div>

                            <div className="detail-card__guarantees">
                                {['Akses Seumur Hidup', 'Garansi 7 Hari', 'Sertifikat Tersedia'].map(g => (
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
