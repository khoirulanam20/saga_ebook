import { Link } from 'react-router-dom';
import { ShoppingCart, Star, BookOpen, Video, Mic, MapPin } from 'lucide-react';
import { formatCurrency, getCategoryLabel, getCategoryIcon } from '../../utils/helpers';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const categoryIcons = {
    ebook: BookOpen,
    video: Video,
    webinar: Mic,
    offline: MapPin,
};

export default function ProductCard({ product }) {
    const { addToCart, isInCart } = useCart();
    const inCart = isInCart(product.id);
    const CatIcon = categoryIcons[product.category] || BookOpen;

    return (
        <div className="product-card">
            <div className="product-card__image-wrap">
                <img src={product.thumbnail} alt={product.title} className="product-card__image" loading="lazy" />
                {product.badge && <span className={`product-card__badge badge-${product.badge === 'Live' ? 'error' : product.badge === 'New' ? 'info' : 'accent'}`}>{product.badge}</span>}
                {product.discount > 0 && <span className="product-card__discount">-{product.discount}%</span>}
            </div>
            <div className="product-card__body">
                <div className="product-card__category">
                    <CatIcon size={12} />
                    <span>{getCategoryLabel(product.category)}</span>
                </div>
                <Link to={`/products/${product.id}`} className="product-card__title">{product.title}</Link>
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
                    <button
                        className={`product-card__btn ${inCart ? 'in-cart' : ''}`}
                        onClick={() => addToCart(product)}
                        disabled={inCart}
                    >
                        <ShoppingCart size={15} />
                        {inCart ? 'Di Keranjang' : 'Tambah'}
                    </button>
                </div>
            </div>
        </div>
    );
}
