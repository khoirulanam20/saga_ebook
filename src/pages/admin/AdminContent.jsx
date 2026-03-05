import { useState } from 'react';
import { Save, Edit3, Image, Layout } from 'lucide-react';
import toast from 'react-hot-toast';
import './Admin.css';

export default function AdminContent() {
    const [heroTitle, setHeroTitle] = useState('Kuasai Skill Digital, Akselerasi Karir Anda');
    const [heroSubtitle, setHeroSubtitle] = useState('Pelajari keterampilan digital terbaru dari para mentor berpengalaman.');
    const [aboutDesc, setAboutDesc] = useState('SAGA Academy lahir dari keyakinan bahwa setiap orang berhak mendapatkan akses ke pendidikan berkualitas tinggi.');

    const handleSave = () => toast.success('Konten berhasil disimpan!');

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <h1>Manajemen Konten</h1>
                <p className="admin-page-subtitle">Edit konten halaman website</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {/* Hero section */}
                <div className="admin-table-card" style={{ padding: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--color-accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-light)' }}><Layout size={18} /></div>
                        <h3 style={{ fontWeight: 600 }}>Halaman Beranda (Hero Section)</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <div>
                            <label style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 8 }}>Judul Utama</label>
                            <input value={heroTitle} onChange={e => setHeroTitle(e.target.value)} style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)', outline: 'none' }} />
                        </div>
                        <div>
                            <label style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 8 }}>Sub-judul</label>
                            <textarea value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} rows={2} style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                        </div>
                    </div>
                </div>

                {/* About section */}
                <div className="admin-table-card" style={{ padding: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--color-accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-light)' }}><Edit3 size={18} /></div>
                        <h3 style={{ fontWeight: 600 }}>Halaman Tentang Kami</h3>
                    </div>
                    <div>
                        <label style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', display: 'block', marginBottom: 8 }}>Deskripsi Perusahaan</label>
                        <textarea value={aboutDesc} onChange={e => setAboutDesc(e.target.value)} rows={3} style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
                    </div>
                </div>

                {/* Banner */}
                <div className="admin-table-card" style={{ padding: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--color-accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent-light)' }}><Image size={18} /></div>
                        <h3 style={{ fontWeight: 600 }}>Banner Promosi</h3>
                    </div>
                    <div style={{ border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-10)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        <Image size={32} style={{ margin: '0 auto var(--space-3)' }} />
                        <p>Klik untuk upload banner promosi</p>
                        <p style={{ fontSize: 'var(--text-xs)', marginTop: 4 }}>PNG, JPG, WebP · Max 2MB</p>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn-admin-primary" onClick={handleSave}><Save size={16} /> Simpan Semua Perubahan</button>
                </div>
            </div>
        </div>
    );
}
