import { LayoutDashboard, Package, Receipt, Users, TrendingUp, ArrowUp, Eye, ShoppingBag } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './Admin.css';

const salesData = [
    { month: 'Jan', revenue: 4200, orders: 28 },
    { month: 'Feb', revenue: 6800, orders: 45 },
    { month: 'Mar', revenue: 5600, orders: 38 },
    { month: 'Apr', revenue: 9200, orders: 62 },
    { month: 'Mei', revenue: 8100, orders: 54 },
    { month: 'Jun', revenue: 12400, orders: 82 },
    { month: 'Jul', revenue: 11000, orders: 74 },
];

const recentOrders = [
    { id: 'TRX-089', customer: 'Budi Santoso', product: 'Growth Pack', amount: 799000, status: 'Berhasil', date: '2025-02-28' },
    { id: 'TRX-088', customer: 'Rina Pratiwi', product: 'Video Instagram', amount: 299000, status: 'Berhasil', date: '2025-02-27' },
    { id: 'TRX-087', customer: 'Ahmad Rahmat', product: 'Ebook SEO', amount: 129000, status: 'Pending', date: '2025-02-27' },
    { id: 'TRX-086', customer: 'Dewi Sutanto', product: 'Ultimate Pack', amount: 1999000, status: 'Berhasil', date: '2025-02-26' },
    { id: 'TRX-085', customer: 'Hendra Wijaya', product: 'Webinar Finance', amount: 99000, status: 'Gagal', date: '2025-02-26' },
];

const stats = [
    { icon: Receipt, label: 'Total Transaksi', value: '89', change: '+12%', up: true },
    { icon: TrendingUp, label: 'Pendapatan Bulan Ini', value: 'Rp 12.4jt', change: '+28%', up: true },
    { icon: Users, label: 'Pengguna Terdaftar', value: '312', change: '+5%', up: true },
    { icon: Package, label: 'Produk Aktif', value: '24', change: '+2', up: true },
];

const formatCurrencyShort = (v) => `Rp${(v / 1000).toFixed(0)}k`;

export default function AdminDashboard() {
    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Dashboard</h1>
                <p className="admin-page-subtitle">Ringkasan aktivitas platform SAGA Academy</p>
            </div>

            {/* Stats */}
            <div className="admin-stats-grid">
                {stats.map(({ icon: Icon, label, value, change, up }) => (
                    <div key={label} className="admin-stat-card">
                        <div className="admin-stat-icon"><Icon size={20} /></div>
                        <div className="admin-stat-body">
                            <p className="admin-stat-label">{label}</p>
                            <p className="admin-stat-value">{value}</p>
                            <p className={`admin-stat-change ${up ? 'up' : 'down'}`}>
                                <ArrowUp size={12} /> {change} dari bulan lalu
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="admin-charts-grid">
                <div className="admin-chart-card">
                    <h3 className="admin-chart-title">Pendapatan Bulanan</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={salesData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" tick={{ fill: '#9090a8', fontSize: 12 }} />
                            <YAxis tickFormatter={formatCurrencyShort} tick={{ fill: '#9090a8', fontSize: 12 }} />
                            <Tooltip formatter={(v) => [`Rp${v.toLocaleString('id-ID')}`, 'Pendapatan']} contentStyle={{ background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }} />
                            <Area type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#colorRevenue)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="admin-chart-card">
                    <h3 className="admin-chart-title">Pesanan per Bulan</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" tick={{ fill: '#9090a8', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#9090a8', fontSize: 12 }} />
                            <Tooltip contentStyle={{ background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }} />
                            <Bar dataKey="orders" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="admin-table-card">
                <div className="admin-table-header">
                    <h3>Transaksi Terbaru</h3>
                    <a href="/admin/transactions" className="see-all-link" style={{ fontSize: 'var(--text-sm)' }}>Lihat Semua</a>
                </div>
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr><th>ID</th><th>Pelanggan</th><th>Produk</th><th>Total</th><th>Status</th><th>Tanggal</th></tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(o => (
                                <tr key={o.id}>
                                    <td className="trx-id">{o.id}</td>
                                    <td>{o.customer}</td>
                                    <td>{o.product}</td>
                                    <td>Rp{o.amount.toLocaleString('id-ID')}</td>
                                    <td>
                                        <span className={`status-badge ${o.status === 'Berhasil' ? 'success' : o.status === 'Pending' ? 'warning' : 'error'}`}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="text-muted">{o.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
