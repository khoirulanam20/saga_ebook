import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, Video, Mic, MapPin } from 'lucide-react';
import { formatCurrency, getCategoryLabel } from '../../utils/helpers';
import './ProductCard.css';

const categoryIcons = {
    ebook: BookOpen,
    video: Video,
    webinar: Mic,
    offline: MapPin,
};

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const CatIcon = categoryIcons[product.category] || BookOpen;

    const goToDetail = () => navigate(`/products/${product.id}`);
    const goToBuy = (e) => {
        e.stopPropagation();
        navigate(`/products/${product.id}/buy`);
    };

    return (
        <div className="product-card" onClick={goToDetail} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && goToDetail()} aria-label={`Lihat detail ${product.title}`}>
            {/* Image – also clickable */}
            <div className="product-card__image-wrap">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-card__image"
                    loading="lazy"
                />
                {product.badge && (
                    <span className={`product-card__badge badge-${product.badge === 'Live' ? 'error' : product.badge === 'New' ? 'info' : 'accent'}`}>
                        {product.badge}
                    </span>
                )}
                {product.discount > 0 && (
                    <span className="product-card__discount">-{product.discount}%</span>
                )}
                {/* Hover overlay */}
                <div className="product-card__overlay">
                    <span className="overlay-text">Lihat Detail →</span>
                </div>
            </div>

            <div className="product-card__body">
                <div className="product-card__category">
                    <CatIcon size={12} />
                    <span>{getCategoryLabel(product.category)}</span>
                </div>

                <h3 className="product-card__title">{product.title}</h3>
                <p className="product-card__desc">{product.description}</p>

                <div className="product-card__rating">
                    <Star size={13} fill="currentColor" />
                    <span>{product.rating}</span>
                    <span className="rating-count">({product.totalRatings})</span>
                    <span className="dot">·</span>
                    <span className="sold-count">{product.sold.toLocaleString('id-ID')} terjual</span>
                </div>

                <div className="product-card__footer">
                    <div className="product-card__price">
                        <span className="price-current">{formatCurrency(product.price)}</span>
                        {product.originalPrice > product.price && (
                            <span className="price-original">{formatCurrency(product.originalPrice)}</span>
                        )}
                    </div>

                    {/* "Pilih" → goes to detail page */}
                    <button
                        className="product-card__btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${product.id}`);
                        }}
                        aria-label={`Pilih ${product.title}`}
                    >
                        Pilih <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
