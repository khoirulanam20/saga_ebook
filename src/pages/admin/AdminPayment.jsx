import { useState } from 'react';
import { Save, Plus, Trash2, Building2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import './Admin.css';

// Using exported array so it can be temporarily imported by Checkout if needed, 
// though ideally this would be in a global context or fetched from API.
export const initialBankAccounts = [
    { id: 'bca', icon: Building2, label: 'BCA (Bank Central Asia)', accName: 'PT SAGA Academy', accNo: '1234567890', enabled: true },
    { id: 'mandiri', icon: Building2, label: 'Bank Mandiri', accName: 'PT SAGA Academy', accNo: '0987654321', enabled: true },
    { id: 'bni', icon: Building2, label: 'BNI (Bank Negara Indonesia)', accName: 'PT SAGA Academy', accNo: '1122334455', enabled: true },
    { id: 'bri', icon: Building2, label: 'BRI (Bank Rakyat Indonesia)', accName: 'PT SAGA Academy', accNo: '5544332211', enabled: true }
];

export default function AdminPayment() {
    const [accounts, setAccounts] = useState(initialBankAccounts);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ id: '', label: '', accName: '', accNo: '' });

    const toggleAccount = (id) => setAccounts(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));

    const handleDelete = (id) => {
        setAccounts(prev => prev.filter(a => a.id !== id));
        toast.success('Rekening berhasil dihapus');
    };

    const handleSaveAccount = (e) => {
        e.preventDefault();
        if (!formData.label || !formData.accNo || !formData.accName) return toast.error('Harap lengkapi semua field!');

        setAccounts(prev => [
            ...prev,
            {
                ...formData,
                id: formData.label.toLowerCase().replace(/\s+/g, '-'),
                icon: Building2,
                enabled: true
            }
        ]);
        setFormData({ id: '', label: '', accName: '', accNo: '' });
        setShowForm(false);
        toast.success('Rekening berhasil ditambahkan');
    };

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Pengaturan Pembayaran (Transfer Bank)</h1>
                <p className="admin-page-subtitle">Kelola daftar rekening bank tujuan untuk pembayaran manual</p>
                <div style={{ marginTop: 'var(--space-4)' }}>
                    <button className="btn-admin-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Batal Tambah' : <><Plus size={16} /> Tambah Rekening</>}
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="admin-table-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
                    <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-5)' }}>Tambah Rekening Baru</h3>
                    <form onSubmit={handleSaveAccount} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--space-4)' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Nama Bank (Contoh: BCA, BNI, Mandiri)</label>
                            <input value={formData.label} onChange={e => setFormData({ ...formData, label: e.target.value })} className="form-input" placeholder="Masukkan nama bank" />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Nomor Rekening</label>
                            <input value={formData.accNo} onChange={e => setFormData({ ...formData, accNo: e.target.value })} className="form-input" placeholder="Masukkan nomor rekening" />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label>Atas Nama (Pemilik Rekening)</label>
                            <input value={formData.accName} onChange={e => setFormData({ ...formData, accName: e.target.value })} className="form-input" placeholder="Masukkan nama pemilik" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
                            <button type="submit" className="btn-admin-primary"><Save size={16} /> Simpan Rekening</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Methods */}
            <div className="admin-table-card" style={{ padding: 'var(--space-6)' }}>
                <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-5)' }}>Daftar Rekening Tujuan</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {accounts.map(acc => (
                        <div key={acc.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--color-bg)', border: `1px solid ${acc.enabled ? 'var(--color-accent)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-lg)', transition: 'all 0.2s' }}>
                            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: `${acc.enabled ? 'var(--color-accent)15' : 'var(--color-bg-card)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: acc.enabled ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                                <acc.icon size={24} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 600, color: acc.enabled ? 'var(--color-text)' : 'var(--color-text-secondary)' }}>{acc.label}</p>
                                <p style={{ fontSize: 'var(--text-xl)', fontFamily: 'monospace', fontWeight: 600, color: acc.enabled ? 'var(--color-text)' : 'var(--color-text-muted)', marginTop: 4 }}>{acc.accNo}</p>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: 4 }}>a.n <strong>{acc.accName}</strong></p>
                            </div>
                            {acc.enabled && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 600, background: 'rgba(16,185,129,0.12)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>Aktif</span>}
                            <button onClick={() => toggleAccount(acc.id)} style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 600, background: acc.enabled ? 'rgba(239,68,68,0.1)' : 'var(--gradient-accent)', color: acc.enabled ? 'var(--color-error)' : 'white', border: 'none', cursor: 'pointer' }}>
                                {acc.enabled ? 'Nonaktifkan' : 'Aktifkan'}
                            </button>
                            <button onClick={() => handleDelete(acc.id)} style={{ padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', background: 'transparent', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s' }} className="hover-error">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    {accounts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>
                            <p>Belum ada rekening yang ditambahkan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
