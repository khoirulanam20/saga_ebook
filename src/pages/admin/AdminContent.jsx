import { useState } from 'react';
import { Save, Home as HomeIcon, Info, Phone as PhoneIcon, FileText, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { useContent } from '../../context/ContentContext';
import HomePreview from '../guest/Home';
import AboutPreview from '../guest/About';
import ContactPreview from '../guest/Contact';
import './Admin.css';

export default function AdminContent() {
    const { content, updateContent } = useContent();
    const [activeTab, setActiveTab] = useState('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleChange = (key, value) => {
        updateContent(activeTab, key, value);
    };

    const handleSave = () => {
        toast.success('Semua perubahan berhasil disimpan secara permanen!');
        // Note: Context already saves to localStorage automatically
    };

    const tabs = [
        { id: 'home', label: 'Beranda', icon: HomeIcon },
        { id: 'about', label: 'Tentang Kami', icon: Info },
        { id: 'contact', label: 'Kontak', icon: PhoneIcon },
    ];

    return (
        <div className="admin-cms-layout">
            {/* LEFT: EDITOR SIDEBAR */}
            <div className={`cms-sidebar ${!isSidebarOpen ? 'collapsed' : ''}`}>
                <div className="cms-sidebar-header">
                    <h2>Site Builder CMS</h2>
                    <p>Edit konten langsung terlihat</p>
                </div>

                <div className="cms-tabs">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            className={`cms-tab-btn ${activeTab === t.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(t.id)}
                        >
                            <t.icon size={16} /> {t.label}
                        </button>
                    ))}
                </div>

                <div className="cms-editor-fields">
                    {activeTab === 'home' && (
                        <div className="cms-form-group">
                            <label>Label Badge (Hero)</label>
                            <input value={content.home.heroBadge} onChange={e => handleChange('heroBadge', e.target.value)} />

                            <label>Judul Baris 1</label>
                            <input value={content.home.heroTitleLine1} onChange={e => handleChange('heroTitleLine1', e.target.value)} />

                            <label>Judul Baris 2 (Gradien)</label>
                            <input value={content.home.heroTitleLine2} onChange={e => handleChange('heroTitleLine2', e.target.value)} />

                            <label>Deskripsi Subjudul</label>
                            <textarea rows={4} value={content.home.heroSubtitle} onChange={e => handleChange('heroSubtitle', e.target.value)} />

                            <label>Teks Tombol Utama</label>
                            <input value={content.home.ctaPrimary} onChange={e => handleChange('ctaPrimary', e.target.value)} />

                            <label>Teks Tombol Sekunder</label>
                            <input value={content.home.ctaSecondary} onChange={e => handleChange('ctaSecondary', e.target.value)} />
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="cms-form-group">
                            <div className="cms-section-label">Bagian Hero</div>
                            <label>Kata Kunci Judul</label>
                            <input value={content.about.heroTitle} onChange={e => handleChange('heroTitle', e.target.value)} />

                            <label>Deskripsi Perusahaan</label>
                            <textarea rows={3} value={content.about.heroDesc} onChange={e => handleChange('heroDesc', e.target.value)} />

                            <div className="cms-section-label" style={{ marginTop: 20 }}>Cerita Tim</div>
                            <label>Judul Cerita</label>
                            <input value={content.about.storyTitle} onChange={e => handleChange('storyTitle', e.target.value)} />

                            <label>Paragraf 1</label>
                            <textarea rows={4} value={content.about.storyP1} onChange={e => handleChange('storyP1', e.target.value)} />

                            <label>Paragraf 2</label>
                            <textarea rows={4} value={content.about.storyP2} onChange={e => handleChange('storyP2', e.target.value)} />
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="cms-form-group">
                            <label>Judul Halaman Kontak</label>
                            <input value={content.contact.title} onChange={e => handleChange('title', e.target.value)} />

                            <label>Deskripsi Bantuan</label>
                            <textarea rows={3} value={content.contact.subtitle} onChange={e => handleChange('subtitle', e.target.value)} />

                            <label>Alamat Email</label>
                            <input value={content.contact.email} onChange={e => handleChange('email', e.target.value)} />

                            <label>Nomor Telepon / WhatsApp</label>
                            <input value={content.contact.phone} onChange={e => handleChange('phone', e.target.value)} />

                            <label>Lokasi Fisik / Kantor</label>
                            <textarea rows={3} value={content.contact.address} onChange={e => handleChange('address', e.target.value)} />
                        </div>
                    )}
                </div>

                <div className="cms-sidebar-footer">
                    <button className="btn-admin-primary" style={{ width: '100%' }} onClick={handleSave}>
                        <Save size={16} /> Simpan Perubahan
                    </button>
                    <p style={{ fontSize: '11px', textAlign: 'center', color: 'var(--color-text-muted)', marginTop: 8 }}>
                        Perubahan otomatis terupdate pada live preview di sebelah kanan.
                    </p>
                </div>
            </div>

            {/* RIGHT: LIVE PREVIEW CONTAINER */}
            <div className="cms-preview-area">
                <div className="cms-preview-wrapper">
                    <div className="cms-preview-header">
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                            </div>
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="cms-toggle-btn"
                                title={isSidebarOpen ? "Sembunyikan Sidebar" : "Tampilkan Sidebar"}
                            >
                                {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
                            </button>
                        </div>
                        <div className="cms-url-bar">saga-academy.com{activeTab === 'home' ? '/' : `/${activeTab}`}</div>
                        <div className="cms-preview-badge">✨ Live Preview</div>
                    </div>

                    <div className="cms-preview-frame">
                        <div className="cms-preview-content">
                            {activeTab === 'home' && <HomePreview />}
                            {activeTab === 'about' && <AboutPreview />}
                            {activeTab === 'contact' && <ContactPreview />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
