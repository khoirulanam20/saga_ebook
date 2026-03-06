import { useState } from 'react';
import { Search, Eye, Download, X, User, Package, CreditCard, Calendar, CheckCircle2, XCircle, Clock, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../utils/helpers';
import './Admin.css';

const initialTransactions = [
    { id: 'TRX-089', customer: 'Budi Santoso', email: 'budi@mail.com', phone: '0812-3456-7890', product: 'Growth Pack', productType: 'Paket', amount: 799000, status: 'Berhasil', method: 'BCA', date: '2025-02-28', time: '10:24:33', note: 'Pembayaran otomatis terverifikasi', paymentProof: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=400&auto=format&fit=crop' },
    { id: 'TRX-088', customer: 'Rina Pratiwi', email: 'rina@mail.com', phone: '0813-5678-9012', product: 'Video Kelas: Instagram Marketing Mastery', productType: 'Video Kelas', amount: 299000, status: 'Berhasil', method: 'Mandiri', date: '2025-02-27', time: '14:05:12', note: '', paymentProof: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=400&auto=format&fit=crop' },
    { id: 'TRX-087', customer: 'Ahmad Rahmat', email: 'ahmad@mail.com', phone: '0815-1234-5678', product: 'Ebook: SEO Mastery 2024', productType: 'Ebook', amount: 129000, status: 'Pending', method: 'BCA', date: '2025-02-27', time: '09:18:45', note: 'Menunggu verifikasi admin', paymentProof: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=400&auto=format&fit=crop' },
    { id: 'TRX-086', customer: 'Dewi Sutanto', email: 'dewi@mail.com', phone: '0819-8765-4321', product: 'Ultimate Pack', productType: 'Paket', amount: 1999000, status: 'Berhasil', method: 'BNI', date: '2025-02-26', time: '16:33:20', note: '', paymentProof: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=400&auto=format&fit=crop' },
    { id: 'TRX-085', customer: 'Hendra Wijaya', email: 'hendra@mail.com', phone: '0811-2222-3333', product: 'Webinar: Financial Planning', productType: 'Webinar', amount: 99000, status: 'Gagal', method: 'BRI', date: '2025-02-26', time: '12:00:58', note: 'Bukti transfer tidak valid/palsu', paymentProof: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400&auto=format&fit=crop' },
    { id: 'TRX-084', customer: 'Sara Kusuma', email: 'sara@mail.com', phone: '0856-4444-5555', product: 'Starter Pack', productType: 'Paket', amount: 399000, status: 'Pending', method: 'Mandiri', date: '2025-02-25', time: '08:45:01', note: 'Menunggu verifikasi admin', paymentProof: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=400&auto=format&fit=crop' },
];

const statusConfig = {
    'Berhasil': { class: 'success', icon: CheckCircle2, color: 'var(--color-success)' },
    'Pending': { class: 'warning', icon: Clock, color: 'var(--color-warning)' },
    'Gagal': { class: 'error', icon: XCircle, color: 'var(--color-error)' },
};

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState(initialTransactions);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedTrx, setSelectedTrx] = useState(null);
    const [editStatus, setEditStatus] = useState('');

    // Update editStatus when modal opens
    const handleOpenDetail = (trx) => {
        setSelectedTrx(trx);
        setEditStatus(trx.status);
    };


    const filtered = transactions.filter(t =>
        (statusFilter === 'all' || t.status === statusFilter) &&
        (t.id.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase()))
    );

    const cfg = selectedTrx ? statusConfig[selectedTrx.status] : null;
    const handleVerify = (id, newStatus) => {
        setTransactions(prev => prev.map(t =>
            t.id === id ? { ...t, status: newStatus, note: newStatus === 'Berhasil' ? 'Pembayaran diverifikasi admin' : 'Pembayaran ditolak admin' } : t
        ));
        toast.success(`Transaksi ${newStatus === 'Berhasil' ? 'diverifikasi' : 'ditolak'}`);
        setSelectedTrx(null);
    };

    const StatusIcon = cfg?.icon;

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manajemen Transaksi</h1>
                <p className="admin-page-subtitle">Monitor semua transaksi yang terjadi di platform</p>
            </div>

            {/* Summary chips */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
                {[
                    { label: 'Total', count: transactions.length, color: 'var(--color-accent-light)', bg: 'var(--color-accent-dim)' },
                    { label: 'Berhasil', count: transactions.filter(t => t.status === 'Berhasil').length, color: 'var(--color-success)', bg: 'rgba(16,185,129,0.1)' },
                    { label: 'Pending', count: transactions.filter(t => t.status === 'Pending').length, color: 'var(--color-warning)', bg: 'rgba(245,158,11,0.1)' },
                    { label: 'Gagal', count: transactions.filter(t => t.status === 'Gagal').length, color: 'var(--color-error)', bg: 'rgba(239,68,68,0.1)' },
                ].map(chip => (
                    <div key={chip.label} style={{ padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-lg)', background: chip.bg, border: `1px solid ${chip.color}30`, fontSize: 'var(--text-sm)' }}>
                        <span style={{ color: chip.color, fontWeight: 700 }}>{chip.count}</span>
                        <span style={{ color: 'var(--color-text-secondary)', marginLeft: 6 }}>{chip.label}</span>
                    </div>
                ))}
            </div>

            <div className="admin-controls">
                <div style={{ display: 'flex', gap: 'var(--space-3)', flex: 1, alignItems: 'center' }}>
                    <div className="admin-search-wrap">
                        <Search size={15} className="admin-search-icon" />
                        <input placeholder="Cari ID / pelanggan..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', outline: 'none' }}
                    >
                        <option value="all">Semua Status</option>
                        <option value="Berhasil">Berhasil</option>
                        <option value="Pending">Pending</option>
                        <option value="Gagal">Gagal</option>
                    </select>
                </div>
                <button className="btn-admin-primary"><Download size={16} /> Export CSV</button>
            </div>

            <div className="admin-table-card">
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr><th>ID Transaksi</th><th>Pelanggan</th><th>Produk</th><th>Total</th><th>Metode</th><th>Status</th><th>Tanggal</th><th>Detail</th></tr>
                        </thead>
                        <tbody>
                            {filtered.map(t => {
                                const sc = statusConfig[t.status];
                                const Icon = sc.icon;
                                return (
                                    <tr key={t.id}>
                                        <td className="trx-id">{t.id}</td>
                                        <td>
                                            <div style={{ lineHeight: 1.4 }}>
                                                <p style={{ fontWeight: 500 }}>{t.customer}</p>
                                                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{t.email}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ lineHeight: 1.4 }}>
                                                <p style={{ fontSize: 'var(--text-sm)' }}>{t.product.length > 30 ? t.product.slice(0, 30) + '…' : t.product}</p>
                                                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{t.productType}</p>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: 600 }}>{formatCurrency(t.amount)}</td>
                                        <td className="text-muted">{t.method}</td>
                                        <td>
                                            <span className={`status-badge ${sc.class}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                                <Icon size={11} /> {t.status}
                                            </span>
                                        </td>
                                        <td className="text-muted">{t.date}</td>
                                        <td>
                                            <button className="btn-show" onClick={() => handleOpenDetail(t)} title="Lihat Detail">
                                                <Eye size={14} /> Show
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--color-border)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    Menampilkan {filtered.length} dari {transactions.length} transaksi
                </div>
            </div>

            {/* Transaction Detail Modal */}
            {selectedTrx && (
                <div className="modal-overlay" onClick={() => setSelectedTrx(null)}>
                    <div className="modal modal-detail" onClick={e => e.stopPropagation()}>
                        {/* Header with status */}
                        <div className="modal-detail-header" style={{ borderColor: `${cfg.color}40` }}>
                            <div className="modal-detail-status-icon" style={{ background: `${cfg.color}15`, color: cfg.color }}>
                                <StatusIcon size={28} />
                            </div>
                            <div>
                                <p className="modal-detail-id">{selectedTrx.id}</p>
                                <p className="modal-detail-date">{selectedTrx.date} · {selectedTrx.time}</p>
                            </div>
                            <span className={`status-badge ${cfg.class}`} style={{ marginLeft: 'auto' }}>{selectedTrx.status}</span>
                            <button className="btn-icon" onClick={() => setSelectedTrx(null)} style={{ marginLeft: 8 }}><X size={18} /></button>
                        </div>

                        <div className="modal-detail-body">
                            {/* Customer */}
                            <div className="detail-section-block">
                                <div className="detail-section-label"><User size={14} /> Informasi Pelanggan</div>
                                <div className="detail-grid">
                                    <div><span>Nama</span><strong>{selectedTrx.customer}</strong></div>
                                    <div><span>Email</span><strong>{selectedTrx.email}</strong></div>
                                    <div><span>No. HP</span><strong>{selectedTrx.phone}</strong></div>
                                </div>
                            </div>

                            {/* Product */}
                            <div className="detail-section-block">
                                <div className="detail-section-label"><Package size={14} /> Detail Produk</div>
                                <div className="detail-grid">
                                    <div style={{ gridColumn: '1 / -1' }}><span>Produk</span><strong>{selectedTrx.product}</strong></div>
                                    <div><span>Tipe</span><strong>{selectedTrx.productType}</strong></div>
                                </div>
                            </div>

                            <div className="detail-section-block">
                                <div className="detail-section-label"><CreditCard size={14} /> Informasi Pembayaran</div>
                                <div className="detail-grid">
                                    <div><span>Transfer Ke</span><strong style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Building2 size={14} /> {selectedTrx.method} (PT SAGA Academy)</strong></div>
                                    <div><span>Total Bayar</span><strong style={{ color: 'var(--color-accent-light)', fontSize: 'var(--text-lg)' }}>{formatCurrency(selectedTrx.amount)}</strong></div>
                                    <div style={{ gridColumn: '1 / -1', marginTop: 8, padding: 'var(--space-2) var(--space-3)', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--color-border)' }}>
                                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Status Verifikasi: <strong style={{ color: cfg.color }}>{selectedTrx.status}</strong></p>
                                    </div>
                                </div>
                            </div>

                            {selectedTrx.paymentProof && (
                                <div className="detail-section-block">
                                    <div className="detail-section-label">📎 Bukti Pembayaran</div>
                                    <div style={{ marginTop: 'var(--space-2)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                                        <img src={selectedTrx.paymentProof} alt="Bukti Pembayaran" style={{ width: '100%', maxHeight: 300, objectFit: 'contain', display: 'block' }} />
                                    </div>
                                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>Wajib diverifikasi kesesuaian nominal sebelum disetujui.</p>
                                </div>
                            )}

                            {selectedTrx.note && (
                                <div className="detail-section-block">
                                    <div className="detail-section-label">📝 Catatan Sistem</div>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{selectedTrx.note}</p>
                                </div>
                            )}
                        </div>

                        <div className="modal-actions" style={{ flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'stretch' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Ubah Status Transaksi
                                </label>
                                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                                    <select
                                        value={editStatus}
                                        onChange={(e) => setEditStatus(e.target.value)}
                                        style={{
                                            flex: 1,
                                            padding: 'var(--space-3) var(--space-4)',
                                            background: 'var(--color-bg)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-lg)',
                                            color: 'var(--color-text)',
                                            fontSize: 'var(--text-sm)',
                                            outline: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="Pending">🕒 Pending (Menunggu Verifikasi)</option>
                                        <option value="Berhasil">✅ Berhasil (Terverifikasi)</option>
                                        <option value="Gagal">❌ Gagal (Ditolak)</option>
                                    </select>
                                    <button
                                        className="btn-modal-save"
                                        style={{ margin: 0, padding: '0 var(--space-6)' }}
                                        onClick={() => handleVerify(selectedTrx.id, editStatus)}
                                        disabled={editStatus === selectedTrx.status}
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </div>
                            {/* <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
                                {selectedTrx.status === 'Berhasil' && (
                                    <button className="btn-modal-save" style={{ flex: 1, margin: 0 }} onClick={() => toast.success('Email konfirmasi dikirim!')}>
                                        📧 Kirim Ulang Email Akses
                                    </button>
                                )}
                                <button className="btn-modal-cancel" style={{ flex: selectedTrx.status === 'Berhasil' ? 0 : 1 }} onClick={() => setSelectedTrx(null)}>Tutup</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
