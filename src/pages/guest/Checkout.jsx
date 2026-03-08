import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Smartphone, Building2, Wallet, CheckCircle2, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';
import './Checkout.css';

import { Upload } from 'lucide-react';
import { initialBankAccounts } from '../admin/AdminPayment';

const paymentMethods = initialBankAccounts.filter(acc => acc.enabled);

export default function Checkout() {
    const { cartItems, getTotal, clearCart, removeFromCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState('');
    const [step, setStep] = useState(1); // 1=form, 2=payment, 3=success
    const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '' });
    const [proofFile, setProofFile] = useState(null);
    const [processing, setProcessing] = useState(false);

    const total = getTotal();
    const tax = Math.round(total * 0.11);
    const grandTotal = total + tax;

    const handleOrder = () => {
        if (!form.name || !form.email) return toast.error('Lengkapi data diri');
        setStep(2);
    };

    const handlePay = () => {
        if (!selectedMethod) return toast.error('Pilih metode pembayaran (Bank Tujuan)');
        if (!proofFile) return toast.error('Harap unggah bukti pembayaran');

        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            clearCart();
            setStep(3);
        }, 2000);
    };

    if (step === 3) {
        return (
            <div className="checkout-success">
                <div className="success-card">
                    <div className="success-icon"><CheckCircle2 size={64} /></div>
                    <h2>Pembayaran Berhasil!</h2>
                    <p>Terima kasih telah berbelanja di SAGA Academy. Akses produk Anda kini tersedia.</p>
                    <div className="success-actions">
                        <Link to="/dashboard" className="btn-hero-primary">Lihat Dashboard Saya</Link>
                        <Link to="/products" className="btn-hero-secondary">Belanja Lagi</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0 && step !== 3) {
        return (
            <div className="checkout-empty">
                <ShoppingBag size={64} className="empty-icon" />
                <h2>Keranjang Kosong</h2>
                <p>Tambahkan produk ke keranjang terlebih dahulu.</p>
                <Link to="/products" className="btn-hero-primary">Jelajahi Produk</Link>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container checkout-inner">
                <div className="checkout-steps">
                    {['Data Diri', 'Pembayaran', 'Selesai'].map((s, i) => (
                        <div key={s} className={`step-item ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
                            <div className="step-circle">{step > i + 1 ? '✓' : i + 1}</div>
                            <span>{s}</span>
                        </div>
                    ))}
                </div>

                <div className="checkout-layout">
                    {/* Left form */}
                    <div className="checkout-form-section">
                        {step === 1 && (
                            <div className="checkout-card">
                                <h2 className="checkout-card-title">Data Pemesanan</h2>
                                <div className="form-group">
                                    <label>Nama Lengkap</label>
                                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Masukkan nama lengkap" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" type="email" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label>Nomor HP</label>
                                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+62 xxx-xxxx-xxxx" className="form-input" />
                                </div>
                                <button className="btn-hero-primary w-full" onClick={handleOrder}>Lanjutkan ke Pembayaran</button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="checkout-card">
                                <h2 className="checkout-card-title">Transfer Manual</h2>
                                <p className="text-muted" style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>Silakan transfer sesuai total tagihan ke salah satu rekening di bawah ini, lalu unggah buktinya.</p>

                                <div className="payment-methods">
                                    {paymentMethods.map(method => (
                                        <div key={method.id} className={`payment-option ${selectedMethod === method.id ? 'selected' : ''}`} onClick={() => setSelectedMethod(method.id)}>
                                            <div className="payment-option__header">
                                                <div className="payment-icon">
                                                    {/* Check if method.icon is a valid component (like from lucide-react) or string, default to Building2 if undefined */}
                                                    {method.icon ? <method.icon size={20} /> : <Building2 size={20} />}
                                                </div>
                                                <span className="payment-label">{method.label}</span>
                                                <div className={`payment-radio ${selectedMethod === method.id ? 'checked' : ''}`} />
                                            </div>
                                            {selectedMethod === method.id && (
                                                <div className="bank-details" style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                                                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Nomor Rekening</p>
                                                    <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600, fontFamily: 'monospace', letterSpacing: '1px', color: 'var(--color-text)' }}>{method.accNo}</p>
                                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: 4 }}>Atas Nama: <strong>{method.accName}</strong></p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="proof-upload-section" style={{ marginTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-5)' }}>
                                    <h3 style={{ fontSize: 'var(--text-md)', marginBottom: 'var(--space-3)' }}>Upload Bukti Pembayaran</h3>
                                    <label className="proof-upload-label" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)', border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', background: proofFile ? 'rgba(16,185,129,0.05)' : 'var(--color-bg)', borderColor: proofFile ? 'var(--color-success)' : 'inherit', transition: 'all 0.2s' }}>
                                        {proofFile ? (
                                            <>
                                                <CheckCircle2 size={32} color="var(--color-success)" style={{ marginBottom: 8 }} />
                                                <span style={{ color: 'var(--color-success)', fontWeight: 500 }}>{proofFile.name}</span>
                                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 4 }}>(Klik untuk mengganti)</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={32} color="var(--color-text-muted)" style={{ marginBottom: 8 }} />
                                                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Pilih File Bukti Transfer</span>
                                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 4 }}>JPG, PNG, atau PDF (Max 2MB)</span>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setProofFile(e.target.files[0]);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>

                                <button className={`btn-hero-primary w-full ${processing ? 'loading' : ''}`} style={{ marginTop: 'var(--space-5)' }} onClick={handlePay} disabled={processing}>
                                    {processing ? 'Memproses Pesanan...' : `Konfirmasi Pembayaran ${formatCurrency(grandTotal)}`}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Order summary */}
                    <div className="checkout-summary">
                        <div className="checkout-card">
                            <h3 className="checkout-card-title">Ringkasan Pesanan</h3>
                            <div className="order-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="order-item">
                                        <div className="order-item-main">
                                            <span className="order-item-name">{item.title}</span>
                                            <span className="order-item-price">{formatCurrency(item.price)}</span>
                                        </div>
                                        {step === 1 && (
                                            <button
                                                className="btn-remove-item"
                                                onClick={() => removeFromCart(item.id)}
                                                title="Hapus produk"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="order-divider" />
                            <div className="order-totals">
                                <div className="order-row">
                                    <span>Subtotal</span><span>{formatCurrency(total)}</span>
                                </div>
                                <div className="order-row">
                                    <span>Pajak (11%)</span><span>{formatCurrency(tax)}</span>
                                </div>
                                <div className="order-row total-row">
                                    <span>Total</span><span>{formatCurrency(grandTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
