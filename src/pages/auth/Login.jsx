import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            const result = login(form.email, form.password);
            if (result.success) {
                toast.success(`Selamat datang, ${result.user.name}!`);
                navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
            } else {
                toast.error(result.error);
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="auth-page">
            <div className="auth-bg-glow" />
            <div className="auth-card">
                <div className="auth-header">
                    <Link to="/" className="auth-brand">SAGA<span>Academy</span></Link>
                    <h1 className="auth-title">Selamat Datang</h1>
                    <p className="auth-subtitle">Masuk ke akun SAGA Academy Anda</p>
                </div>

                <div className="demo-credentials">
                    <p className="demo-title">Demo Akun:</p>
                    <div className="demo-accounts">
                        <button onClick={() => setForm({ email: 'user@saga.id', password: 'user123' })} className="demo-btn">
                            👤 User Demo
                        </button>
                        <button onClick={() => setForm({ email: 'admin@saga.id', password: 'admin123' })} className="demo-btn">
                            🛡️ Admin Demo
                        </button>
                    </div>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-input" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrap">
                            <input type={showPass ? 'text' : 'password'} className="form-input" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                            <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn-auth" disabled={loading}>
                        {loading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                <p className="auth-footer">
                    Belum punya akun? <Link to="/register">Daftar sekarang</Link>
                </p>
                <p className="auth-footer">
                    Kembali ke halaman utama? <Link to="/">Kembali</Link>
                </p>
            </div>
        </div>
    );
}
