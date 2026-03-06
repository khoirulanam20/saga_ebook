import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { products } from '../../data/products';
import { categoriesData } from '../../data/categories';
import ProductCard from '../../components/shared/ProductCard';
import './Products.css';

const categories = [{ id: 'all', label: 'Semua' }, ...categoriesData];

const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Harga: Rendah ke Tinggi' },
    { value: 'price-desc', label: 'Harga: Tinggi ke Rendah' },
    { value: 'rating', label: 'Rating Tertinggi' },
    { value: 'popular', label: 'Terpopuler' },
];

export default function Products() {
    const location = useLocation();
    const initCat = location.state?.category || 'all';
    const [activeCategory, setActiveCategory] = useState(initCat);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('default');

    const filtered = products
        .filter(p => activeCategory === 'all' || p.category === activeCategory)
        .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sort === 'price-asc') return a.price - b.price;
            if (sort === 'price-desc') return b.price - a.price;
            if (sort === 'rating') return b.rating - a.rating;
            if (sort === 'popular') return b.sold - a.sold;
            return 0;
        });

    return (
        <div className="products-page">
            <div className="products-header">
                <div className="container">
                    <p className="section-label" style={{ marginBottom: 'var(--space-3)' }}>Katalog Produk</p>
                    <h1 className="products-title">Semua <span className="text-gradient">Produk</span></h1>
                    <p className="products-subtitle">Temukan produk digital yang sesuai dengan kebutuhan dan tujuan belajar Anda.</p>
                </div>
            </div>

            <div className="container products-main">
                {/* Filters */}
                <div className="products-filters">
                    <div className="search-wrap">
                        <Search size={17} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="categories-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="sort-wrap">
                        <SlidersHorizontal size={15} />
                        <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
                            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <div className="results-info">
                    <span className="results-count">{filtered.length} produk ditemukan</span>
                    {activeCategory !== 'all' && (
                        <button className="clear-filter" onClick={() => setActiveCategory('all')}>
                            Hapus filter ×
                        </button>
                    )}
                </div>

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="products-grid">
                        {filtered.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>😕 Tidak ada produk yang ditemukan.</p>
                        <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="btn-reset">
                            Reset pencarian
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
