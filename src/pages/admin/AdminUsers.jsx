import { useState } from 'react';
import { Search, Eye, Ban, X, Mail, Phone, Calendar, Shield, CreditCard, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import './Admin.css';

const users = [
    { id: 1, name: 'Budi Santoso', email: 'budi@mail.com', joined: '2024-10-15', purchases: 3, totalSpent: 1647000, status: 'Aktif' },
    { id: 2, name: 'Rina Pratiwi', email: 'rina@mail.com', joined: '2024-11-02', purchases: 1, totalSpent: 299000, status: 'Aktif' },
    { id: 3, name: 'Ahmad Rahmat', email: 'ahmad@mail.com', joined: '2024-12-20', purchases: 2, totalSpent: 428000, status: 'Aktif' },
    { id: 4, name: 'Dewi Sutanto', email: 'dewi@mail.com', joined: '2025-01-05', purchases: 1, totalSpent: 1999000, status: 'Aktif' },
    { id: 5, name: 'Hendra Wijaya', email: 'hendra@mail.com', joined: '2025-01-18', purchases: 0, totalSpent: 0, status: 'Nonaktif' },
];

export default function AdminUsers() {
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manajemen Pengguna</h1>
                <p className="admin-page-subtitle">Kelola semua pengguna yang terdaftar</p>
            </div>
            <div className="admin-controls">
                <div className="admin-search-wrap">
                    <Search size={15} className="admin-search-icon" />
                    <input placeholder="Cari nama / email..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="admin-table-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead><tr><th>Pengguna</th><th>Bergabung</th><th>Pembelian</th><th>Total Belanja</th><th>Status</th><th>Aksi</th></tr></thead>
                        <tbody>
                            {filtered.map(u => (
                                <tr key={u.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', flexShrink: 0 }}>{u.name[0]}</div>
                                            <div>
                                                <p style={{ fontWeight: 500 }}>{u.name}</p>
                                                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-muted">{u.joined}</td>
                                    <td>{u.purchases} produk</td>
                                    <td style={{ fontWeight: 600 }}>{formatCurrency(u.totalSpent)}</td>
                                    <td><span className={`status-badge ${u.status === 'Aktif' ? 'success' : 'error'}`}>{u.status}</span></td>
                                    <td>
                                        <div className="actions-col">
                                            <button className="btn-icon" onClick={() => setSelectedUser(u)} title="Lihat Detail"><Eye size={15} /></button>
                                            <button className="btn-icon delete" title="Nonaktifkan"><Ban size={15} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Detail Modal */}
            {selectedUser && (
                <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
                    <div className="modal modal-detail" onClick={e => e.stopPropagation()}>
                        <div className="modal-detail-header" style={{ borderColor: 'var(--color-border)' }}>
                            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'white', fontSize: '1.5rem', flexShrink: 0 }}>
                                {selectedUser.name[0]}
                            </div>
                            <div style={{ marginLeft: 'var(--space-4)' }}>
                                <p className="modal-detail-id">USER-ID: #{selectedUser.id.toString().padStart(4, '0')}</p>
                                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text)' }}>{selectedUser.name}</h3>
                                <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 4 }}>
                                    <span className={`status-badge ${selectedUser.status === 'Aktif' ? 'success' : 'error'}`} style={{ fontSize: 'var(--text-xs)' }}>
                                        {selectedUser.status}
                                    </span>
                                    <span className="status-badge" style={{ fontSize: 'var(--text-xs)', background: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>Pelanggan</span>
                                </div>
                            </div>
                            <button className="btn-icon" onClick={() => setSelectedUser(null)} style={{ marginLeft: 'auto' }}><X size={20} /></button>
                        </div>

                        <div className="modal-detail-body">
                            <div className="detail-section-block">
                                <div className="detail-section-label"><Mail size={14} /> Informasi Kontak</div>
                                <div className="detail-grid">
                                    <div style={{ gridColumn: '1 / -1' }}><span>Email</span><strong>{selectedUser.email}</strong></div>
                                    <div><span>No. HP</span><strong>0812-xxxx-xxxx</strong></div>
                                    <div><span>Joined</span><strong>{selectedUser.joined}</strong></div>
                                </div>
                            </div>

                            <div className="detail-section-block">
                                <div className="detail-section-label"><ShoppingBag size={14} /> Aktivitas Pembelian</div>
                                <div className="detail-grid">
                                    <div><span>Total Transaksi</span><strong>{selectedUser.purchases} Produk</strong></div>
                                    <div><span>Total Belanja</span><strong style={{ color: 'var(--color-accent-light)' }}>{formatCurrency(selectedUser.totalSpent)}</strong></div>
                                </div>
                            </div>

                            <div className="detail-section-block">
                                <div className="detail-section-label"><Shield size={14} /> Keamanan & Akun</div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                    Akun ini dalam status <strong>{selectedUser.status}</strong>. Pengguna memiliki akses penuh ke produk yang telah dibeli. Terakhir login: 2 jam yang lalu.
                                </p>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="btn-modal-cancel" style={{ flex: 1 }} onClick={() => setSelectedUser(null)}>Tutup</button>
                            <button className="btn-modal-save" style={{ flex: 1, background: selectedUser.status === 'Aktif' ? 'var(--color-error)' : 'var(--color-success)' }}>
                                {selectedUser.status === 'Aktif' ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
