import { useState } from 'react';
import { Search, Eye, Ban } from 'lucide-react';
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
    const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
    const formatCurrency = (v) => `Rp${v.toLocaleString('id-ID')}`;

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
                                            <button className="btn-icon"><Eye size={15} /></button>
                                            <button className="btn-icon delete"><Ban size={15} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
