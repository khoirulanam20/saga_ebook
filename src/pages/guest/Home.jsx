import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Video, Mic, MapPin, Users, Star, Zap, Shield, Award } from 'lucide-react';
import { products } from '../../data/products';
import { testimonials } from '../../data/testimonials';
import { packages } from '../../data/packages';
import ProductCard from '../../components/shared/ProductCard';
import TestimonialCard from '../../components/shared/TestimonialCard';
import { formatCurrency } from '../../utils/helpers';
import { useContent } from '../../context/ContentContext';
import './Home.css';

const stats = [
    { icon: Users, value: '5,200+', label: 'Pelajar Aktif' },
    { icon: BookOpen, value: '50+', label: 'Produk Digital' },
    { icon: Star, value: '4.9', label: 'Rating Rata-rata' },
    { icon: Award, value: '98%', label: 'Kepuasan Pelanggan' },
];

const features = [
    { icon: Zap, title: 'Akses Instan', desc: 'Nikmati produk digital Anda segera setelah pembayaran berhasil, tanpa menunggu.' },
    { icon: Shield, title: 'Akses Seumur Hidup', desc: 'Satu kali beli, akses selamanya. Termasuk semua update konten di masa mendatang.' },
    { icon: Award, title: 'Dijamin Berkualitas', desc: 'Semua materi dikurasi oleh para expert dengan pengalaman industri yang terbukti.' },
];

export default function Home() {
    const featuredProducts = products.filter(p => p.featured).slice(0, 3);
    const { content } = useContent();
    const { home } = content;

    return (
        <div className="home">
            {/* Hero */}
            <section className="hero">
                <div className="hero__bg-glow" />
                <div className="container hero__content">
                    <div className="hero__badge badge badge-accent">
                        <Zap size={12} />
                        {home.heroBadge}
                    </div>
                    <h1 className="hero__title">
                        {home.heroTitleLine1}<br />
                        <span className="text-gradient">{home.heroTitleLine2}</span>
                    </h1>
                    <p className="hero__subtitle">
                        {home.heroSubtitle}
                    </p>
                    <div className="hero__actions">
                        <Link to="/products" className="btn-hero-primary">
                            {home.ctaPrimary} <ArrowRight size={18} />
                        </Link>
                        <Link to="/packages/growth-pack" className="btn-hero-secondary">
                            {home.ctaSecondary}
                        </Link>
                    </div>
                    <div className="hero__proof">
                        <div className="proof-avatars">
                            {['A', 'B', 'C', 'D'].map((l) => (
                                <div key={l} className="proof-avatar">{l}</div>
                            ))}
                        </div>
                        <p className="proof-text">
                            Bergabung dengan <strong>5.200+ pelajar</strong> yang telah meningkatkan skill mereka
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="stats-bar">
                <div className="container stats-bar__grid">
                    {stats.map(({ icon: Icon, value, label }) => (
                        <div key={label} className="stats-bar__item">
                            <div className="stats-icon"><Icon size={20} /></div>
                            <div>
                                <p className="stats-value">{value}</p>
                                <p className="stats-label">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Product Categories */}
            <section className="section categories-section">
                <div className="container">
                    <div className="section-header">
                        <p className="section-label"><BookOpen size={14} /> Kategori Produk</p>
                        <h2 className="section-title">Berbagai Format<br /><span className="text-gradient">Pembelajaran</span></h2>
                    </div>
                    <div className="categories-grid">
                        {[
                            { icon: BookOpen, label: 'Ebook', desc: 'Buku digital lengkap & informatif', count: '12 Produk', cat: 'ebook' },
                            { icon: Video, label: 'Video Kelas', desc: 'Pembelajaran visual step-by-step', count: '18 Kelas', cat: 'video' },
                            { icon: Mic, label: 'Webinar', desc: 'Sesi interaktif dengan pakar', count: '8 Sesi', cat: 'webinar' },
                            { icon: MapPin, label: 'Kelas Offline', desc: 'Pengalaman belajar langsung', count: '5 Program', cat: 'offline' },
                        ].map(({ icon: Icon, label, desc, count, cat }) => (
                            <Link to="/products" state={{ category: cat }} key={label} className="category-card">
                                <div className="category-card__icon"><Icon size={24} /></div>
                                <h3 className="category-card__title">{label}</h3>
                                <p className="category-card__desc">{desc}</p>
                                <span className="category-card__count">{count}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section">
                <div className="container">
                    <div className="section-header-row">
                        <div>
                            <p className="section-label"><Star size={14} /> Produk Unggulan</p>
                            <h2 className="section-title">Pilihan <span className="text-gradient">Terbaik</span></h2>
                        </div>
                        <Link to="/products" className="see-all-link">Lihat Semua <ArrowRight size={16} /></Link>
                    </div>
                    <div className="grid-3">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages Preview */}
            <section className="section packages-preview">
                <div className="container">
                    <div className="section-header text-center">
                        <p className="section-label"><Zap size={14} /> Paket Bundling</p>
                        <h2 className="section-title">Hemat Lebih Banyak dengan<br /><span className="text-gradient">Paket Lengkap</span></h2>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            Dapatkan akses ke berbagai produk premium dengan harga yang jauh lebih hemat.
                        </p>
                    </div>
                    <div className="packages-grid">
                        {packages.map(pkg => (
                            <div key={pkg.id} className={`pkg-card ${pkg.popular ? 'pkg-card--popular' : ''}`}>
                                {pkg.badge && <div className="pkg-badge">{pkg.badge}</div>}
                                <h3 className="pkg-title">{pkg.title}</h3>
                                <p className="pkg-subtitle">{pkg.subtitle}</p>
                                <div className="pkg-price">
                                    <span className="pkg-price-current">{formatCurrency(pkg.price)}</span>
                                    <span className="pkg-price-original">{formatCurrency(pkg.originalPrice)}</span>
                                </div>
                                <div className="pkg-products">
                                    {pkg.productNames.map(name => (
                                        <div key={name} className="pkg-product-item">
                                            <span className="check">✓</span> {name}
                                        </div>
                                    ))}
                                </div>
                                <Link to={`/packages/${pkg.slug}`} className={`pkg-btn ${pkg.popular ? 'pkg-btn--primary' : 'pkg-btn--ghost'}`}>
                                    Pilih Paket <ArrowRight size={15} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section">
                <div className="container">
                    <div className="features-layout">
                        <div className="features-left">
                            <p className="section-label"><Shield size={14} /> Mengapa SAGA?</p>
                            <h2 className="section-title">Platform Pembelajaran<br /><span className="text-gradient">Terpercaya</span></h2>
                            <p className="section-subtitle">
                                Ribuan pelajar telah mempercayakan pengembangan skill mereka kepada SAGA Academy.
                            </p>
                            <Link to="/about" className="learn-more-link">
                                Pelajari Lebih Lanjut <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="features-right">
                            {features.map(({ icon: Icon, title, desc }) => (
                                <div key={title} className="feature-item">
                                    <div className="feature-icon"><Icon size={20} /></div>
                                    <div>
                                        <h4 className="feature-title">{title}</h4>
                                        <p className="feature-desc">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section">
                <div className="container">
                    <div className="section-header-row">
                        <div>
                            <p className="section-label"><Star size={14} /> Testimoni</p>
                            <h2 className="section-title">Kata Mereka tentang<br /><span className="text-gradient">SAGA Academy</span></h2>
                        </div>
                        <Link to="/testimonials" className="see-all-link">Semua Testimoni <ArrowRight size={16} /></Link>
                    </div>
                    <div className="grid-3">
                        {testimonials.slice(0, 3).map(t => (
                            <TestimonialCard key={t.id} testimonial={t} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section cta-section">
                <div className="container">
                    <div className="cta-card">
                        <div className="cta-glow" />
                        <p className="section-label" style={{ justifyContent: 'center' }}><Zap size={14} /> Mulai Sekarang</p>
                        <h2 className="cta-title">Siap Tingkatkan Skill Anda?</h2>
                        <p className="cta-desc">Bergabunglah dengan ribuan pelajar yang telah mengubah karir mereka bersama SAGA Academy.</p>
                        <div className="cta-actions">
                            <Link to="/products" className="btn-hero-primary">
                                Mulai Belajar Sekarang <ArrowRight size={18} />
                            </Link>
                            <Link to="/contact" className="btn-hero-secondary">Hubungi Kami</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
