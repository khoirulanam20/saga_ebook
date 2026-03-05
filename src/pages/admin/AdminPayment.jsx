import { useState } from 'react';
import { Save, CreditCard, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import './Admin.css';

const paymentGateways = [
    { id: 'midtrans', name: 'Midtrans', logo: '💳', desc: 'Gateway pembayaran terpopuler di Indonesia', enabled: true },
    { id: 'doku', name: 'DOKU', logo: '🏦', desc: 'Solusi pembayaran digital terpercaya', enabled: false },
    { id: 'xendit', name: 'Xendit', logo: '⚡', desc: 'Payment API untuk bisnis digital', enabled: false },
];

const methods = [
    { id: 'transfer', label: 'Transfer Bank', enabled: true },
    { id: 'va', label: 'Virtual Account', enabled: true },
    { id: 'qris', label: 'QRIS', enabled: true },
    { id: 'gopay', label: 'GoPay', enabled: true },
    { id: 'ovo', label: 'OVO', enabled: true },
    { id: 'dana', label: 'DANA', enabled: false },
    { id: 'shopeepay', label: 'ShopeePay', enabled: false },
    { id: 'cc', label: 'Kartu Kredit/Debit', enabled: false },
];

export default function AdminPayment() {
    const [gateways, setGateways] = useState(paymentGateways);
    const [payMethods, setPayMethods] = useState(methods);

    const toggleGateway = (id) => setGateways(prev => prev.map(g => ({ ...g, enabled: g.id === id ? !g.enabled : (g.id !== id ? false : g.enabled) })));
    const toggleMethod = (id) => setPayMethods(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Pengaturan Pembayaran</h1>
                <p className="admin-page-subtitle">Kelola metode dan gateway pembayaran</p>
            </div>

            {/* Gateway */}
            <div className="admin-table-card" style={{ padding: 'var(--space-6)' }}>
                <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-5)' }}>Payment Gateway</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {gateways.map(g => (
                        <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--color-bg)', border: `1px solid ${g.enabled ? 'var(--color-accent)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-lg)', transition: 'all 0.2s' }}>
                            <span style={{ fontSize: 32 }}>{g.logo}</span>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 600 }}>{g.name}</p>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{g.desc}</p>
                            </div>
                            {g.enabled && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 600, background: 'rgba(16,185,129,0.12)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>Aktif</span>}
                            <button onClick={() => toggleGateway(g.id)} style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', fontWeight: 600, background: g.enabled ? 'rgba(239,68,68,0.1)' : 'var(--gradient-accent)', color: g.enabled ? 'var(--color-error)' : 'white', border: 'none', cursor: 'pointer' }}>
                                {g.enabled ? 'Nonaktifkan' : 'Aktifkan'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Methods */}
            <div className="admin-table-card" style={{ padding: 'var(--space-6)' }}>
                <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-5)' }}>Metode Pembayaran</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
                    {payMethods.map(m => (
                        <div key={m.id} onClick={() => toggleMethod(m.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4)', background: 'var(--color-bg)', border: `1px solid ${m.enabled ? 'var(--color-accent)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.2s' }}>
                            <span style={{ fontWeight: m.enabled ? 600 : 400, fontSize: 'var(--text-sm)', color: m.enabled ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>{m.label}</span>
                            <div style={{ width: 20, height: 20, borderRadius: 4, background: m.enabled ? 'var(--color-accent)' : 'transparent', border: `2px solid ${m.enabled ? 'var(--color-accent)' : 'var(--color-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}>
                                {m.enabled && <CheckCircle size={12} color="white" />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-admin-primary" onClick={() => toast.success('Pengaturan pembayaran disimpan!')}><Save size={16} /> Simpan Pengaturan</button>
            </div>
        </div>
    );
}
