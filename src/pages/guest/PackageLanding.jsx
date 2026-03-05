import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import { packages, packageComparison } from '../../data/packages';
import { testimonials } from '../../data/testimonials';
import TestimonialCard from '../../components/shared/TestimonialCard';
import { formatCurrency } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './PackageLanding.css';

export default function PackageLanding() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const pkg = packages.find(p => p.slug === slug) || packages[1];

    const handleBuy = () => {
        addToCart({ id: `pkg-${pkg.id}`, title: pkg.title, price: pkg.price, type: 'package' });
        navigate('/checkout');
    };

    return (
        <div className="pkg-landing">
            {/* Hero */}
            <section className="pkg-hero">
                <div className="pkg-hero__glow" />
                <div className="container pkg-hero__content">
                    {pkg.badge && <span className="pkg-landing-badge">{pkg.badge}</span>}
                    <h1 className="pkg-hero__title">{pkg.title}</h1>
                    <p className="pkg-hero__subtitle">{pkg.subtitle}</p>
                    <div className="pkg-hero__price">
                        <span className="hero-price-current">{formatCurrency(pkg.price)}</span>
                        <span className="hero-price-original">{formatCurrency(pkg.originalPrice)}</span>
                        <span className="hero-save">Hemat {formatCurrency(pkg.originalPrice - pkg.price)}</span>
                    </div>
                    <button className="btn-hero-primary" onClick={handleBuy}>
                        Dapatkan Paket Ini <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <div className="container pkg-landing__main">
                {/* Included Products */}
                <section className="pkg-section">
                    <h2 className="pkg-section-title">Produk yang Termasuk</h2>
                    <div className="pkg-included-grid">
                        {pkg.productNames.map((name, i) => (
                            <div key={i} className="pkg-included-item">
                                <div className="included-check"><Check size={16} /></div>
                                <span>{name}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Benefits */}
                <section className="pkg-section">
                    <h2 className="pkg-section-title">Apa yang Anda Dapatkan</h2>
                    <div className="benefits-grid">
                        {pkg.benefits.map((b, i) => (
                            <div key={i} className="pkg-benefit-item">
                                <div className="benefit-icon">🎯</div>
                                <span>{b}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Comparison Table */}
                <section className="pkg-section">
                    <h2 className="pkg-section-title">Perbandingan Paket</h2>
                    <div className="comparison-table-wrap">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Fitur</th>
                                    <th className={pkg.slug === 'starter-pack' ? 'active-col' : ''}>Starter</th>
                                    <th className={pkg.slug === 'growth-pack' ? 'active-col' : ''}>Growth</th>
                                    <th className={pkg.slug === 'ultimate-pack' ? 'active-col' : ''}>Ultimate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packageComparison.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.feature}</td>
                                        <td className={pkg.slug === 'starter-pack' ? 'active-col' : ''}>
                                            {row.starter ? <Check size={16} className="check-yes" /> : <X size={16} className="check-no" />}
                                        </td>
                                        <td className={pkg.slug === 'growth-pack' ? 'active-col' : ''}>
                                            {row.growth ? <Check size={16} className="check-yes" /> : <X size={16} className="check-no" />}
                                        </td>
                                        <td className={pkg.slug === 'ultimate-pack' ? 'active-col' : ''}>
                                            {row.ultimate ? <Check size={16} className="check-yes" /> : <X size={16} className="check-no" />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Other Packages */}
                <section className="pkg-section">
                    <h2 className="pkg-section-title">Paket Lainnya</h2>
                    <div className="other-packages">
                        {packages.filter(p => p.slug !== pkg.slug).map(p => (
                            <Link key={p.id} to={`/packages/${p.slug}`} className="other-pkg-card">
                                <h3>{p.title}</h3>
                                <p>{formatCurrency(p.price)}</p>
                                <span>Lihat Detail <ArrowRight size={13} /></span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="pkg-section">
                    <h2 className="pkg-section-title">Apa Kata Mereka</h2>
                    <div className="grid-3">
                        {testimonials.slice(0, 3).map(t => <TestimonialCard key={t.id} testimonial={t} />)}
                    </div>
                </section>

                {/* CTA */}
                <section className="pkg-cta">
                    <h2>Siap Memulai?</h2>
                    <p>Bergabunglah dengan ribuan pelajar yang telah berhasil bersama SAGA Academy</p>
                    <div className="pkg-cta__price">
                        <span>{formatCurrency(pkg.price)}</span>
                        <del>{formatCurrency(pkg.originalPrice)}</del>
                    </div>
                    <button className="btn-hero-primary" onClick={handleBuy}>
                        Beli {pkg.title} Sekarang <ArrowRight size={18} />
                    </button>
                </section>
            </div>
        </div>
    );
}
