import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password.length < 6) return toast.error('Password minimal 6 karakter');
        setLoading(true);
        setTimeout(() => {
            register(form.name, form.email, form.password);
            toast.success('Akun berhasil dibuat!');
            navigate('/dashboard');
            setLoading(false);
        }, 800);
    };

    return (
        <div className="auth-page">
            <div className="auth-bg-glow" />
            <div className="auth-card">
                <div className="auth-header">
                    <Link to="/" className="auth-brand">SAGA<span>Academy</span></Link>
                    <h1 className="auth-title">Buat Akun</h1>
                    <p className="auth-subtitle">Daftar dan mulai perjalanan belajar Anda</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nama Lengkap</label>
                        <input type="text" className="form-input" placeholder="Nama lengkap Anda" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-input" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-wrap">
                            <input type={showPass ? 'text' : 'password'} className="form-input" placeholder="Minimal 6 karakter" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                            <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn-auth" disabled={loading}>
                        {loading ? 'Memproses...' : 'Daftar Sekarang'}
                    </button>
                </form>

                <p className="auth-footer">
                    Sudah punya akun? <Link to="/login">Masuk</Link>
                </p>
                <p className="auth-footer">
                    Kembali ke halaman utama? <Link to="/">Kembali</Link>
                </p>
            </div>
        </div>
    );
}
