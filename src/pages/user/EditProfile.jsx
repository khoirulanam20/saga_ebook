import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import './EditProfile.css';

export default function EditProfile() {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '0812-3456-7890', // Default dummy format
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password && form.password !== form.confirmPassword) {
            toast.error('Password baru tidak cocok');
            return;
        }

        // Simulating save
        toast.success('Profil berhasil diperbarui');

        // Update user context (simplified for dummy purposes)
        if (form.name !== user.name || form.email !== user.email) {
            login({ ...user, name: form.name, email: form.email });
        }

        navigate('/dashboard');
    };

    return (
        <div className="edit-profile-page">
            <div className="dashboard-header">
                <div className="container">
                    <button className="btn-back" onClick={() => navigate('/dashboard')}>
                        <ArrowLeft size={18} /> Kembali ke Dashboard
                    </button>
                    <div className="dashboard-welcome" style={{ marginTop: 'var(--space-4)' }}>
                        <div className="welcome-avatar">{user?.name?.[0] || 'U'}</div>
                        <div>
                            <h1>Edit Profil, <span className="text-gradient">{user?.name}</span>!</h1>
                            <p>Perbarui informasi pribadi dan keamanan akun Anda.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container edit-profile-main">
                <div className="edit-profile-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h3 className="section-title-small">Informasi Pribadi</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Nama Lengkap</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Nomor Telepon</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-divider" />

                        <div className="form-section">
                            <h3 className="section-title-small">Keamanan (Opsional)</h3>
                            <p className="section-desc">Kosongkan jika tidak ingin mengubah password.</p>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Password Baru</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Min. 8 karakter"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Konfirmasi Password Baru</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>Batal</button>
                            <button type="submit" className="btn-primary"><Save size={16} /> Simpan Perubahan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
