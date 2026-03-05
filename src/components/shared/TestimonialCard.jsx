import { Star } from 'lucide-react';
import './TestimonialCard.css';

export default function TestimonialCard({ testimonial }) {
    return (
        <div className="testimonial-card">
            <div className="testimonial-card__rating">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                ))}
            </div>
            <p className="testimonial-card__text">"{testimonial.text}"</p>
            <div className="testimonial-card__author">
                <div className="author-avatar">
                    {testimonial.name[0]}
                </div>
                <div className="author-info">
                    <p className="author-name">{testimonial.name}</p>
                    <p className="author-role">
                        {testimonial.role}{testimonial.company ? ` · ${testimonial.company}` : ''}
                    </p>
                </div>
                {testimonial.verified && (
                    <span className="verified-badge" title="Verified Purchase">✓</span>
                )}
            </div>
        </div>
    );
}
