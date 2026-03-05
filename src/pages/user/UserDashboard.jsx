import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Video, Receipt, User, Download, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';
import { formatCurrency, getCategoryLabel } from '../../utils/helpers';
import './UserDashboard.css';

const purchasedProducts = products.slice(0, 3); // simulate purchased

const transactions = [
    { id: 'TRX-001', date: '2025-01-15', products: 'Ebook Strategi Bisnis Digital', amount: 149000, status: 'Berhasil' },
    { id: 'TRX-002', date: '2025-01-22', products: 'Video Kelas Instagram Marketing', amount: 299000, status: 'Berhasil' },
    { id: 'TRX-003', date: '2025-02-05', products: 'Growth Pack', amount: 799000, status: 'Berhasil' },
];

export default function UserDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="user-dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="container">
                    <div className="dashboard-welcome">
                        <div className="welcome-avatar">{user?.name?.[0] || 'U'}</div>
                        <div>
                            <h1>Selamat Datang, <span className="text-gradient">{user?.name}</span>!</h1>
                            <p>Lanjutkan perjalanan belajar Anda hari ini.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container dashboard-main">
                {/* Stats */}
                <div className="dashboard-stats">
                    {[
                        { icon: BookOpen, label: 'Produk Dibeli', value: purchasedProducts.length },
                        { icon: Receipt, label: 'Total Transaksi', value: transactions.length },
                        { icon: Video, label: 'Video Ditonton', value: '12 / 50' },
                    ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="stat-card">
                            <div className="stat-icon"><Icon size={20} /></div>
                            <div>
                                <p className="stat-value">{value}</p>
                                <p className="stat-label">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* My Products */}
                <div className="dashboard-section">
                    <div className="section-header-row">
                        <h2 className="section-heading">Produk Saya</h2>
                        <Link to="/products" className="see-all-link" style={{ fontSize: 'var(--text-sm)' }}>+ Tambah Produk</Link>
                    </div>
                    <div className="my-products-grid">
                        {purchasedProducts.map(product => (
                            <div key={product.id} className="my-product-card">
                                <img src={product.thumbnail} alt={product.title} />
                                <div className="my-product-info">
                                    <p className="my-product-cat">{getCategoryLabel(product.category)}</p>
                                    <h3 className="my-product-title">{product.title}</h3>
                                    <div className="my-product-actions">
                                        {product.category === 'ebook' && (
                                            <button className="access-btn" onClick={() => navigate(`/dashboard/learning/${product.id}`)}><Download size={14} /> Unduh / Baca</button>
                                        )}
                                        {product.category === 'video' && (
                                            <button className="access-btn" onClick={() => navigate(`/dashboard/learning/${product.id}`)}><Video size={14} /> Tonton</button>
                                        )}
                                        {product.category === 'webinar' && (
                                            <button className="access-btn" onClick={() => navigate(`/dashboard/learning/${product.id}`)}><ExternalLink size={14} /> Akses Link</button>
                                        )}
                                        {product.category === 'offline' && (
                                            <button className="access-btn" onClick={() => navigate(`/dashboard/learning/${product.id}`)}><ExternalLink size={14} /> Jadwal</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Transactions */}
                <div className="dashboard-section">
                    <h2 className="section-heading">Riwayat Transaksi</h2>
                    <div className="transactions-table-wrap">
                        <table className="transactions-table">
                            <thead>
                                <tr>
                                    <th>ID Transaksi</th>
                                    <th>Tanggal</th>
                                    <th>Produk</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(t => (
                                    <tr key={t.id}>
                                        <td className="trx-id">{t.id}</td>
                                        <td>{t.date}</td>
                                        <td>{t.products}</td>
                                        <td>{formatCurrency(t.amount)}</td>
                                        <td><span className="status-badge success">{t.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Profile */}
                <div className="dashboard-section">
                    <h2 className="section-heading">Profil Saya</h2>
                    <div className="profile-card">
                        <div className="profile-avatar-big">{user?.name?.[0]}</div>
                        <div className="profile-info">
                            <div className="profile-field">
                                <label>Nama Lengkap</label>
                                <p>{user?.name}</p>
                            </div>
                            <div className="profile-field">
                                <label>Email</label>
                                <p>{user?.email}</p>
                            </div>
                            <div className="profile-field">
                                <label>Role</label>
                                <p className="capitalize">{user?.role}</p>
                            </div>
                            <button className="btn-edit-profile">Edit Profil</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
