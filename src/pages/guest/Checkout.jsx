import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Smartphone, Building2, Wallet, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';
import './Checkout.css';

const paymentMethods = [
    { id: 'transfer', icon: Building2, label: 'Transfer Bank', banks: ['BCA', 'BNI', 'Mandiri', 'BRI'] },
    { id: 'va', icon: CreditCard, label: 'Virtual Account', banks: ['BCA VA', 'BNI VA', 'Mandiri VA'] },
    { id: 'qris', icon: Smartphone, label: 'QRIS', desc: 'Bayar dengan QR Code' },
    { id: 'ewallet', icon: Wallet, label: 'E-Wallet', banks: ['GoPay', 'OVO', 'DANA', 'ShopeePay'] },
];

export default function Checkout() {
    const { cartItems, getTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [step, setStep] = useState(1); // 1=form, 2=payment, 3=success
    const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '' });
    const [processing, setProcessing] = useState(false);

    const total = getTotal();
    const tax = Math.round(total * 0.11);
    const grandTotal = total + tax;

    const handleOrder = () => {
        if (!form.name || !form.email) return toast.error('Lengkapi data diri');
        setStep(2);
    };

    const handlePay = () => {
        if (!selectedMethod) return toast.error('Pilih metode pembayaran');
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
                                <h2 className="checkout-card-title">Metode Pembayaran</h2>
                                <div className="payment-methods">
                                    {paymentMethods.map(method => (
                                        <div key={method.id} className={`payment-option ${selectedMethod === method.id ? 'selected' : ''}`} onClick={() => { setSelectedMethod(method.id); setSelectedBank(''); }}>
                                            <div className="payment-option__header">
                                                <div className="payment-icon"><method.icon size={20} /></div>
                                                <span className="payment-label">{method.label}</span>
                                                <div className={`payment-radio ${selectedMethod === method.id ? 'checked' : ''}`} />
                                            </div>
                                            {selectedMethod === method.id && method.banks && (
                                                <div className="bank-grid">
                                                    {method.banks.map(bank => (
                                                        <button key={bank} className={`bank-btn ${selectedBank === bank ? 'selected' : ''}`} onClick={() => setSelectedBank(bank)}>
                                                            {bank}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            {method.desc && selectedMethod === method.id && (
                                                <p className="payment-desc">{method.desc}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button className={`btn-hero-primary w-full ${processing ? 'loading' : ''}`} onClick={handlePay} disabled={processing}>
                                    {processing ? 'Memproses Pembayaran...' : `Bayar ${formatCurrency(grandTotal)}`}
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
                                        <span className="order-item-name">{item.title}</span>
                                        <span className="order-item-price">{formatCurrency(item.price)}</span>
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
