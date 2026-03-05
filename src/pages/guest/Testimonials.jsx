import { Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import TestimonialCard from '../../components/shared/TestimonialCard';
import './Testimonials.css';

const overallRating = 4.9;
const ratingBreakdown = [
    { stars: 5, count: 89 },
    { stars: 4, count: 8 },
    { stars: 3, count: 2 },
    { stars: 2, count: 1 },
    { stars: 1, count: 0 },
];
const total = ratingBreakdown.reduce((s, r) => s + r.count, 0);

export default function Testimonials() {
    return (
        <div className="testimonials-page">
            <div className="testi-header">
                <div className="container">
                    <p className="section-label">Dari Pelanggan Kami</p>
                    <h1 className="testi-title">Apa Kata Mereka tentang <span className="text-gradient">SAGA Academy</span></h1>
                    <p className="testi-subtitle">Bergabunglah dengan ribuan pelajar yang telah merasakan manfaat nyata dari produk kami.</p>
                </div>
            </div>

            <div className="container testi-main">
                {/* Summary */}
                <div className="rating-summary">
                    <div className="rating-overall">
                        <span className="rating-big">{overallRating}</span>
                        <div className="rating-stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={24} fill="currentColor" />)}</div>
                        <p className="rating-total">{total} ulasan</p>
                    </div>
                    <div className="rating-breakdown">
                        {ratingBreakdown.map(r => (
                            <div key={r.stars} className="breakdown-row">
                                <span className="breakdown-stars">{r.stars} ⭐</span>
                                <div className="breakdown-bar">
                                    <div className="breakdown-fill" style={{ width: `${(r.count / total) * 100}%` }} />
                                </div>
                                <span className="breakdown-count">{r.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="testi-grid">
                    {testimonials.map(t => <TestimonialCard key={t.id} testimonial={t} />)}
                </div>
            </div>
        </div>
    );
}
